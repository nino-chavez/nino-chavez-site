<script>
  import { onMount, afterUpdate, tick } from 'svelte';
  import { browser } from '$app/environment';
  import AvatarRive from './avatars/AvatarRive.svelte';

  // Conversation state
  let conversations = [];
  let currentConversationId = null;
  let messages = [];
  let input = '';
  let isLoading = false;
  let error = null;
  let avatarState = 'idle';
  let showSidebar = false;

  // Auto-scroll state
  let messagesContainer;
  let shouldAutoScroll = true;
  let showScrollButton = false;
  let isNearBottom = true;

  const SCROLL_THRESHOLD = 100;
  const STORAGE_KEY = 'askdad_conversations';

  // Generate unique ID
  function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  // Generate title from first message
  function generateTitle(content) {
    const maxLength = 40;
    const cleaned = content.replace(/\n/g, ' ').trim();
    return cleaned.length > maxLength ? cleaned.substring(0, maxLength) + '...' : cleaned;
  }

  // Load conversations from localStorage
  function loadConversations() {
    if (!browser) return;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        conversations = JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed to load conversations:', e);
      conversations = [];
    }
  }

  // Save conversations to localStorage
  function saveConversations() {
    if (!browser) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations));
    } catch (e) {
      console.error('Failed to save conversations:', e);
      // Storage might be full
      if (e.name === 'QuotaExceededError') {
        alert('Browser storage is full. Consider exporting and deleting old conversations.');
      }
    }
  }

  // Create new conversation
  function newConversation() {
    const id = generateId();
    const conversation = {
      id,
      title: 'New conversation',
      messages: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    conversations = [conversation, ...conversations];
    currentConversationId = id;
    messages = [];
    saveConversations();
    showSidebar = false;
  }

  // Load a conversation
  function loadConversation(id) {
    const conversation = conversations.find(c => c.id === id);
    if (conversation) {
      currentConversationId = id;
      messages = [...conversation.messages];
      showSidebar = false;
    }
  }

  // Save current conversation
  function saveCurrentConversation() {
    if (!currentConversationId) return;

    const index = conversations.findIndex(c => c.id === currentConversationId);
    if (index !== -1) {
      conversations[index].messages = [...messages];
      conversations[index].updatedAt = new Date().toISOString();

      // Update title from first user message if still default
      if (conversations[index].title === 'New conversation' && messages.length > 0) {
        const firstUserMsg = messages.find(m => m.role === 'user');
        if (firstUserMsg) {
          conversations[index].title = generateTitle(firstUserMsg.content);
        }
      }

      conversations = [...conversations];
      saveConversations();
    }
  }

  // Delete a conversation
  function deleteConversation(id, event) {
    event?.stopPropagation();
    if (!confirm('Delete this conversation? This cannot be undone.')) return;

    conversations = conversations.filter(c => c.id !== id);
    saveConversations();

    if (currentConversationId === id) {
      if (conversations.length > 0) {
        loadConversation(conversations[0].id);
      } else {
        newConversation();
      }
    }
  }

  // Export conversation to markdown
  function exportToMarkdown() {
    if (messages.length === 0) {
      alert('No messages to export.');
      return;
    }

    const conversation = conversations.find(c => c.id === currentConversationId);
    const title = conversation?.title || 'Ask Dad Conversation';
    const date = new Date().toISOString().split('T')[0];

    let markdown = `# ${title}\n\n`;
    markdown += `*Exported from Ask Dad on ${date}*\n\n---\n\n`;

    messages.forEach(msg => {
      const role = msg.role === 'user' ? '**You**' : '**Virtual Nino**';
      markdown += `### ${role}\n\n${msg.content}\n\n---\n\n`;
    });

    // Create and download file
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ask-dad-${date}-${currentConversationId?.slice(0, 8) || 'export'}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // Clear all data
  function clearAllData() {
    if (!confirm('Delete ALL conversations? This cannot be undone.\n\nConsider exporting important conversations first.')) return;
    if (!confirm('Are you sure? This will permanently delete all your Ask Dad history.')) return;

    localStorage.removeItem(STORAGE_KEY);
    conversations = [];
    newConversation();
  }

  // Format relative time
  function formatRelativeTime(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  }

  // Auto-scroll helpers
  function checkIfNearBottom() {
    if (!messagesContainer) return true;
    const { scrollTop, scrollHeight, clientHeight } = messagesContainer;
    return scrollHeight - scrollTop - clientHeight < SCROLL_THRESHOLD;
  }

  function handleScroll() {
    isNearBottom = checkIfNearBottom();
    showScrollButton = !isNearBottom && messages.length > 0;
    // Only auto-scroll if user is near bottom - allow manual scrolling up
    shouldAutoScroll = isNearBottom;
  }

  function scrollToBottom(behavior = 'smooth') {
    if (!messagesContainer) return;
    messagesContainer.scrollTo({ top: messagesContainer.scrollHeight, behavior });
    shouldAutoScroll = true;
    showScrollButton = false;
  }

  afterUpdate(() => {
    if (shouldAutoScroll && messagesContainer) {
      const behavior = isLoading ? 'instant' : 'smooth';
      messagesContainer.scrollTo({ top: messagesContainer.scrollHeight, behavior });
    }
  });

  // Handle form submission
  async function handleSubmit(e) {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    input = '';
    error = null;
    shouldAutoScroll = true;

    // Create new conversation if needed
    if (!currentConversationId) {
      newConversation();
    }

    messages = [...messages, { role: 'user', content: userMessage }];
    await tick();
    scrollToBottom('smooth');

    messages = [...messages, { role: 'assistant', content: '' }];
    const assistantIndex = messages.length - 1;

    isLoading = true;
    avatarState = 'thinking';

    try {
      const response = await fetch('/api/ask/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: messages.slice(0, -1) })
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      if (!reader) throw new Error('No response body');

      let assistantContent = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        assistantContent += chunk;

        if (avatarState === 'thinking') avatarState = 'speaking';

        messages = [
          ...messages.slice(0, assistantIndex),
          { role: 'assistant', content: assistantContent }
        ];
      }
    } catch (err) {
      error = err instanceof Error ? err.message : 'Something went wrong';
      messages = messages.slice(0, -1);
    } finally {
      isLoading = false;
      avatarState = 'idle';
      saveCurrentConversation();
      await tick();
      if (shouldAutoScroll) scrollToBottom('smooth');
    }
  }

  function handleKeydown(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      const form = event.target.closest('form');
      if (form) form.requestSubmit();
    }
  }

  function formatMessage(content) {
    if (!content) return '';
    return content
      .replace(/^### (.+)$/gm, '<h3>$1</h3>')
      .replace(/^## (.+)$/gm, '<h2>$1</h2>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/```(\w*)\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>')
      .replace(/`(.+?)`/g, '<code>$1</code>')
      .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
      .replace(/^- (.+)$/gm, '<li>$1</li>')
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n/g, '<br>');
  }

  onMount(() => {
    loadConversations();
    if (conversations.length > 0) {
      loadConversation(conversations[0].id);
    } else {
      newConversation();
    }
  });
</script>

<div class="chat-layout">
  <!-- Mobile sidebar toggle -->
  <button class="sidebar-toggle" on:click={() => showSidebar = !showSidebar} aria-label="Toggle conversation history">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M3 12h18M3 6h18M3 18h18"/>
    </svg>
  </button>

  <!-- Conversation sidebar -->
  <aside class="conversation-sidebar" class:open={showSidebar}>
    <div class="sidebar-header">
      <h2>Conversations</h2>
      <button class="new-chat-btn" on:click={newConversation} title="New conversation">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 5v14M5 12h14"/>
        </svg>
      </button>
    </div>

    <!-- Storage warning banner -->
    <div class="storage-warning">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 8v4M12 16h.01"/>
      </svg>
      <span>Stored in this browser only. <button class="link-btn" on:click={exportToMarkdown}>Export</button> to keep.</span>
    </div>

    <div class="conversation-list">
      {#each conversations as conv (conv.id)}
        <div
          class="conversation-item"
          class:active={conv.id === currentConversationId}
          on:click={() => loadConversation(conv.id)}
          on:keydown={(e) => e.key === 'Enter' && loadConversation(conv.id)}
          role="button"
          tabindex="0"
        >
          <div class="conv-content">
            <span class="conv-title">{conv.title}</span>
            <span class="conv-meta">{conv.messages.length} messages · {formatRelativeTime(conv.updatedAt)}</span>
          </div>
          <button class="delete-btn" on:click={(e) => deleteConversation(conv.id, e)} title="Delete conversation">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
            </svg>
          </button>
        </div>
      {/each}

      {#if conversations.length === 0}
        <p class="no-conversations">No conversations yet</p>
      {/if}
    </div>

    <div class="sidebar-footer">
      <button class="export-btn" on:click={exportToMarkdown} disabled={messages.length === 0}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
        </svg>
        Export as Markdown
      </button>
      <button class="clear-btn" on:click={clearAllData}>
        Clear all data
      </button>
    </div>
  </aside>

  <!-- Sidebar backdrop for mobile -->
  {#if showSidebar}
    <button class="sidebar-backdrop" on:click={() => showSidebar = false} aria-label="Close sidebar"></button>
  {/if}

  <!-- Avatar sidebar -->
  <aside class="avatar-sidebar">
    <div class="avatar-wrapper">
      <AvatarRive state={avatarState} size={160} />
    </div>
    <div class="avatar-name">Ask Dad</div>
    <div class="avatar-status">{avatarState === 'idle' ? 'Ready' : avatarState === 'thinking' ? 'Thinking...' : 'Speaking...'}</div>
  </aside>

  <!-- Chat area -->
  <div class="chat-container">
    <header class="chat-header">
      <h1>Ask Dad</h1>
      <p class="subtitle">Virtual Nino - Feedback & Guidance</p>
    </header>

    <div class="messages" bind:this={messagesContainer} on:scroll={handleScroll}>
      {#if messages.length === 0}
        <div class="welcome">
          <p>Hey! This is Virtual Nino.</p>
          <p>I can help with:</p>
          <ul>
            <li>Feedback on your writing</li>
            <li>Questions about thinking, strategy, or approach</li>
            <li>Pushing your ideas further</li>
          </ul>
          <p class="note">I have access to Nino's blog posts and documented thinking, so I can ground my responses in his actual perspectives.</p>

          <div class="storage-notice">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 8v4M12 16h.01"/>
            </svg>
            <div>
              <strong>Your conversations are stored locally in this browser.</strong>
              <span>Clearing browser data or using a different device will lose your history. Use the export button to save important conversations.</span>
            </div>
          </div>
        </div>
      {/if}

      {#each messages as message, i}
        <div class="message {message.role}" class:streaming={isLoading && i === messages.length - 1 && message.role === 'assistant'}>
          <div class="message-header">
            {message.role === 'user' ? 'You' : 'Virtual Nino'}
          </div>
          <div class="message-content">
            {#if message.content}
              {@html formatMessage(message.content)}
            {:else if message.role === 'assistant'}
              <span class="typing-indicator">
                <span class="dot"></span>
                <span class="dot"></span>
                <span class="dot"></span>
              </span>
            {/if}
          </div>
        </div>
      {/each}

      {#if error}
        <div class="error">Something went wrong: {error}</div>
      {/if}

      <div class="scroll-anchor"></div>
    </div>

    {#if showScrollButton}
      <button class="scroll-to-bottom" on:click={() => scrollToBottom('smooth')} aria-label="Scroll to bottom">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 5v14M19 12l-7 7-7-7"/>
        </svg>
      </button>
    {/if}

    <form on:submit={handleSubmit} class="input-form">
      <textarea
        bind:value={input}
        on:keydown={handleKeydown}
        placeholder="Ask a question or share a draft for feedback..."
        rows={3}
        disabled={isLoading}
      ></textarea>
      <button type="submit" disabled={isLoading || !input.trim()}>
        {isLoading ? 'Sending...' : 'Send'}
      </button>
    </form>
  </div>
</div>

<style>
  .chat-layout {
    display: flex;
    height: 100vh;
    background: radial-gradient(ellipse 80% 50% at 50% -20%, rgba(161, 0, 255, 0.15) 0%, transparent 50%),
                radial-gradient(ellipse 60% 40% at 100% 100%, rgba(0, 212, 170, 0.1) 0%, transparent 40%),
                var(--ai-bg-page, #0f0a1a);
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    position: relative;
  }

  /* Sidebar toggle button (mobile) */
  .sidebar-toggle {
    display: none;
    position: fixed;
    top: 1rem;
    left: 1rem;
    z-index: 60;
    width: 40px;
    height: 40px;
    border-radius: 10px;
    background: var(--ai-bg-card, rgba(41, 37, 36, 0.95));
    border: 1px solid var(--ai-border-color, rgba(161, 0, 255, 0.2));
    color: var(--ai-text-secondary, #e7e5e4);
    cursor: pointer;
    align-items: center;
    justify-content: center;
  }

  /* Conversation sidebar */
  .conversation-sidebar {
    width: 280px;
    display: flex;
    flex-direction: column;
    background: var(--ai-bg-card, rgba(20, 16, 32, 0.95));
    border-right: 1px solid var(--ai-border-color, rgba(161, 0, 255, 0.08));
    z-index: 50;
  }

  .sidebar-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 1rem 0.75rem;
    border-bottom: 1px solid var(--ai-border-color, rgba(161, 0, 255, 0.08));
  }

  .sidebar-header h2 {
    margin: 0;
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--ai-text-muted, #a8a29e);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .new-chat-btn {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    background: var(--ai-accent-purple, #A100FF);
    border: none;
    color: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
  }

  .new-chat-btn:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(161, 0, 255, 0.4);
  }

  .storage-warning {
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
    padding: 0.75rem 1rem;
    background: rgba(245, 158, 11, 0.1);
    border-bottom: 1px solid rgba(245, 158, 11, 0.2);
    font-size: 0.7rem;
    color: #fbbf24;
    line-height: 1.4;
  }

  .storage-warning svg {
    flex-shrink: 0;
    margin-top: 1px;
  }

  .link-btn {
    background: none;
    border: none;
    color: #fbbf24;
    text-decoration: underline;
    cursor: pointer;
    padding: 0;
    font-size: inherit;
  }

  .link-btn:hover {
    color: #fcd34d;
  }

  .conversation-list {
    flex: 1;
    overflow-y: auto;
    padding: 0.5rem;
  }

  .conversation-item {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem;
    margin-bottom: 0.25rem;
    border-radius: 10px;
    background: transparent;
    border: 1px solid transparent;
    cursor: pointer;
    transition: all 0.15s ease;
    text-align: left;
    color: var(--ai-text-secondary, #e7e5e4);
  }

  .conversation-item:hover {
    background: var(--ai-bg-card-alt, rgba(41, 37, 36, 0.5));
  }

  .conversation-item.active {
    background: rgba(161, 0, 255, 0.15);
    border-color: rgba(161, 0, 255, 0.3);
  }

  .conv-content {
    flex: 1;
    min-width: 0;
  }

  .conv-title {
    display: block;
    font-size: 0.875rem;
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .conv-meta {
    display: block;
    font-size: 0.7rem;
    color: var(--ai-text-muted, #78716c);
    margin-top: 0.25rem;
  }

  .delete-btn {
    opacity: 0;
    width: 28px;
    height: 28px;
    border-radius: 6px;
    background: transparent;
    border: none;
    color: var(--ai-text-muted, #78716c);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.15s ease;
  }

  .conversation-item:hover .delete-btn {
    opacity: 1;
  }

  .delete-btn:hover {
    background: rgba(239, 68, 68, 0.2);
    color: #f87171;
  }

  .no-conversations {
    text-align: center;
    padding: 2rem 1rem;
    color: var(--ai-text-muted, #78716c);
    font-size: 0.875rem;
  }

  .sidebar-footer {
    padding: 0.75rem;
    border-top: 1px solid var(--ai-border-color, rgba(161, 0, 255, 0.08));
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .export-btn, .clear-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.625rem 1rem;
    border-radius: 8px;
    font-size: 0.8rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.15s ease;
  }

  .export-btn {
    background: var(--ai-bg-card-alt, rgba(41, 37, 36, 0.6));
    border: 1px solid var(--ai-border-color, rgba(161, 0, 255, 0.15));
    color: var(--ai-text-secondary, #e7e5e4);
  }

  .export-btn:hover:not(:disabled) {
    background: rgba(161, 0, 255, 0.15);
    border-color: rgba(161, 0, 255, 0.3);
  }

  .export-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .clear-btn {
    background: transparent;
    border: none;
    color: var(--ai-text-muted, #78716c);
    font-size: 0.7rem;
  }

  .clear-btn:hover {
    color: #f87171;
  }

  .sidebar-backdrop {
    display: none;
  }

  /* Avatar sidebar */
  .avatar-sidebar {
    width: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem 1rem;
    background: linear-gradient(180deg, var(--ai-bg-card, rgba(26, 20, 40, 0.8)) 0%, var(--ai-bg-page, rgba(15, 10, 26, 0.9)) 100%);
    border-right: 1px solid var(--ai-border-color, rgba(161, 0, 255, 0.08));
    position: relative;
  }

  .avatar-sidebar::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 150px;
    background: radial-gradient(ellipse at 50% 0%, rgba(161, 0, 255, 0.12) 0%, transparent 70%);
    pointer-events: none;
  }

  .avatar-wrapper {
    margin-bottom: 1rem;
    position: relative;
    z-index: 1;
  }

  .avatar-name {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--ai-text-primary, #fafaf9);
    margin-bottom: 0.375rem;
    letter-spacing: -0.02em;
  }

  .avatar-status {
    font-size: 0.7rem;
    color: var(--ai-text-muted, #a8a29e);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-weight: 500;
  }

  /* Chat container */
  .chat-container {
    display: flex;
    flex-direction: column;
    flex: 1;
    max-width: 800px;
    color: var(--ai-text-secondary, #e7e5e4);
    position: relative;
  }

  .chat-header {
    padding: 1.5rem 2rem 1rem;
    text-align: center;
    flex-shrink: 0;
  }

  .chat-header h1 {
    margin: 0;
    font-size: 1.75rem;
    font-weight: 800;
    background: linear-gradient(135deg, var(--ai-accent-purple, #c44dff) 0%, var(--ai-accent-green, #00ffcc) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    letter-spacing: -0.03em;
  }

  .subtitle {
    margin: 0.375rem 0 0;
    color: var(--ai-text-muted, #78716c);
    font-size: 0.85rem;
    font-weight: 400;
  }

  .messages {
    flex: 1;
    overflow-y: auto;
    padding: 1rem 1.5rem;
    scroll-behavior: smooth;
    scrollbar-width: thin;
    scrollbar-color: rgba(161, 0, 255, 0.3) transparent;
    overscroll-behavior: contain;
  }

  .messages::-webkit-scrollbar {
    width: 6px;
  }

  .messages::-webkit-scrollbar-track {
    background: transparent;
  }

  .messages::-webkit-scrollbar-thumb {
    background: rgba(161, 0, 255, 0.2);
    border-radius: 3px;
  }

  .messages::-webkit-scrollbar-thumb:hover {
    background: rgba(161, 0, 255, 0.4);
  }

  .scroll-anchor {
    height: 1px;
  }

  .welcome {
    background: linear-gradient(135deg, var(--ai-bg-card, rgba(41, 37, 36, 0.6)) 0%, var(--ai-bg-card-alt, rgba(28, 25, 23, 0.8)) 100%);
    border-radius: 20px;
    padding: 1.5rem;
    margin-bottom: 1rem;
    border: 1px solid var(--ai-border-color, rgba(161, 0, 255, 0.1));
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.2);
  }

  .welcome p {
    margin: 0 0 0.75rem;
    color: var(--ai-text-secondary, #e7e5e4);
    font-size: 0.95rem;
    line-height: 1.5;
  }

  .welcome p:first-child {
    font-size: 1rem;
    font-weight: 600;
    color: var(--ai-text-primary, #fafaf9);
  }

  .welcome ul {
    margin: 0.75rem 0;
    padding-left: 0;
    list-style: none;
    color: var(--ai-text-secondary, #d6d3d1);
  }

  .welcome li {
    margin: 0.375rem 0;
    padding-left: 1.25rem;
    position: relative;
    font-size: 0.9rem;
  }

  .welcome li::before {
    content: '\2192';
    position: absolute;
    left: 0;
    color: var(--ai-accent-purple, #c44dff);
    font-weight: 600;
  }

  .welcome .note {
    font-size: 0.8rem;
    color: var(--ai-text-muted, #78716c);
    margin-top: 1rem;
    margin-bottom: 0;
    padding-top: 0.75rem;
    border-top: 1px solid var(--ai-border-color, rgba(120, 113, 108, 0.2));
  }

  .storage-notice {
    display: flex;
    gap: 0.75rem;
    margin-top: 1rem;
    padding: 1rem;
    background: rgba(245, 158, 11, 0.08);
    border: 1px solid rgba(245, 158, 11, 0.2);
    border-radius: 12px;
    font-size: 0.8rem;
    color: #fbbf24;
    line-height: 1.5;
  }

  .storage-notice svg {
    flex-shrink: 0;
    margin-top: 2px;
  }

  .storage-notice strong {
    display: block;
    margin-bottom: 0.25rem;
  }

  .storage-notice span {
    color: var(--ai-text-muted, #a8a29e);
  }

  .message {
    margin-bottom: 1rem;
    padding: 1rem 1.25rem;
    border-radius: 16px;
    animation: messageSlideIn 0.3s ease-out;
  }

  @keyframes messageSlideIn {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .message.streaming {
    animation: none;
  }

  .message.user {
    background: linear-gradient(135deg, rgba(161, 0, 255, 0.15) 0%, rgba(0, 212, 170, 0.1) 100%);
    margin-left: 2rem;
    border: 1px solid rgba(161, 0, 255, 0.15);
  }

  .message.assistant {
    background: linear-gradient(135deg, var(--ai-bg-card, rgba(41, 37, 36, 0.6)) 0%, var(--ai-bg-card-alt, rgba(28, 25, 23, 0.7)) 100%);
    margin-right: 2rem;
    border: 1px solid var(--ai-border-color, rgba(168, 162, 158, 0.08));
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .message-header {
    font-size: 0.65rem;
    font-weight: 600;
    color: var(--ai-text-muted, #78716c);
    margin-bottom: 0.5rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  .message.user .message-header {
    color: var(--ai-accent-purple, #c44dff);
  }

  .message-content {
    line-height: 1.6;
    color: var(--ai-text-secondary, #e7e5e4);
    font-size: 0.9rem;
  }

  .message-content :global(h2),
  .message-content :global(h3) {
    margin: 1rem 0 0.5rem;
    font-size: 1rem;
    font-weight: 700;
    color: var(--ai-text-primary, #fafaf9);
  }

  .message-content :global(blockquote) {
    border-left: 3px solid var(--ai-accent-purple, #c44dff);
    margin: 0.75rem 0;
    padding: 0.75rem 1rem;
    background: rgba(161, 0, 255, 0.05);
    border-radius: 0 10px 10px 0;
    color: var(--ai-text-muted, #a8a29e);
    font-style: italic;
  }

  .message-content :global(code) {
    background: rgba(0, 0, 0, 0.3);
    padding: 0.15rem 0.35rem;
    border-radius: 5px;
    font-family: 'JetBrains Mono', 'SF Mono', Monaco, monospace;
    font-size: 0.8em;
    color: var(--ai-accent-green, #00ffcc);
  }

  .message-content :global(pre) {
    background: rgba(0, 0, 0, 0.4);
    padding: 1rem;
    border-radius: 12px;
    overflow-x: auto;
    border: 1px solid var(--ai-border-color, rgba(168, 162, 158, 0.08));
    margin: 0.75rem 0;
  }

  .message-content :global(pre code) {
    background: none;
    padding: 0;
    color: var(--ai-text-secondary, #e7e5e4);
  }

  .message-content :global(li) {
    margin: 0.3rem 0;
  }

  .typing-indicator {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 4px 0;
  }

  .typing-indicator .dot {
    width: 7px;
    height: 7px;
    background: var(--ai-accent-purple, #c44dff);
    border-radius: 50%;
    animation: typingBounce 1.4s ease-in-out infinite;
  }

  .typing-indicator .dot:nth-child(1) { animation-delay: 0s; }
  .typing-indicator .dot:nth-child(2) { animation-delay: 0.2s; }
  .typing-indicator .dot:nth-child(3) { animation-delay: 0.4s; }

  @keyframes typingBounce {
    0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
    30% { transform: translateY(-6px); opacity: 1; }
  }

  .error {
    background: linear-gradient(135deg, rgba(239, 68, 68, 0.15) 0%, rgba(185, 28, 28, 0.1) 100%);
    color: #fca5a5;
    padding: 1rem;
    border-radius: 12px;
    margin: 0.75rem 0;
    border: 1px solid rgba(239, 68, 68, 0.2);
    font-size: 0.875rem;
  }

  .scroll-to-bottom {
    position: absolute;
    bottom: 100px;
    right: 1.5rem;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: var(--ai-bg-card, rgba(41, 37, 36, 0.95));
    border: 1px solid var(--ai-border-color, rgba(161, 0, 255, 0.2));
    color: var(--ai-text-secondary, #e7e5e4);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
    z-index: 10;
    animation: fadeInUp 0.2s ease-out;
  }

  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .scroll-to-bottom:hover {
    background: var(--ai-accent-purple, #A100FF);
    color: white;
    border-color: var(--ai-accent-purple, #A100FF);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(161, 0, 255, 0.4);
  }

  .input-form {
    display: flex;
    gap: 0.75rem;
    padding: 1rem 1.5rem;
    background: linear-gradient(180deg, var(--ai-bg-card, rgba(28, 25, 23, 0.5)) 0%, var(--ai-bg-page, rgba(12, 10, 9, 0.8)) 100%);
    border-top: 1px solid var(--ai-border-color, rgba(161, 0, 255, 0.06));
    flex-shrink: 0;
  }

  textarea {
    flex: 1;
    padding: 0.875rem 1rem;
    border: 1px solid var(--ai-border-color, rgba(168, 162, 158, 0.15));
    border-radius: 14px;
    font-family: inherit;
    font-size: 0.9rem;
    resize: none;
    line-height: 1.5;
    background: var(--ai-bg-card, rgba(28, 25, 23, 0.6));
    color: var(--ai-text-secondary, #e7e5e4);
    transition: all 0.2s ease;
  }

  textarea::placeholder {
    color: var(--ai-text-muted, #57534e);
  }

  textarea:focus {
    outline: none;
    border-color: rgba(161, 0, 255, 0.4);
    box-shadow: 0 0 0 3px rgba(161, 0, 255, 0.1);
    background: var(--ai-bg-card-alt, rgba(28, 25, 23, 0.8));
  }

  textarea:disabled {
    background: rgba(28, 25, 23, 0.3);
    color: var(--ai-text-muted, #57534e);
  }

  button[type="submit"] {
    padding: 0.875rem 1.5rem;
    background: linear-gradient(135deg, var(--ai-accent-purple, #A100FF) 0%, var(--ai-accent-green, #00D4AA) 100%);
    color: var(--ai-bg-page, #0f0a1a);
    border: none;
    border-radius: 12px;
    font-size: 0.875rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s ease;
    align-self: flex-end;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  button[type="submit"]:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(161, 0, 255, 0.3);
  }

  button[type="submit"]:disabled {
    background: linear-gradient(135deg, #44403c 0%, #292524 100%);
    color: var(--ai-text-muted, #78716c);
    cursor: not-allowed;
  }

  /* Mobile styles */
  @media (max-width: 1024px) {
    .avatar-sidebar {
      display: none;
    }
  }

  @media (max-width: 768px) {
    .sidebar-toggle {
      display: flex;
    }

    .conversation-sidebar {
      position: fixed;
      left: 0;
      top: 0;
      bottom: 0;
      transform: translateX(-100%);
      transition: transform 0.3s ease;
      z-index: 55;
    }

    .conversation-sidebar.open {
      transform: translateX(0);
    }

    .sidebar-backdrop {
      display: block;
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.5);
      z-index: 52;
      border: none;
      cursor: pointer;
    }

    .chat-container {
      max-width: 100%;
    }

    .chat-header {
      padding: 1rem 1rem 0.75rem;
      padding-left: 3.5rem;
    }

    .chat-header h1 {
      font-size: 1.5rem;
    }

    .messages {
      padding: 0.75rem 1rem;
    }

    .message.user {
      margin-left: 0.5rem;
    }

    .message.assistant {
      margin-right: 0.5rem;
    }

    .input-form {
      padding: 0.75rem 1rem;
    }

    .scroll-to-bottom {
      bottom: 80px;
      right: 1rem;
    }
  }
</style>
