<script>
	import { onMount } from 'svelte';
	import { fly, fade } from 'svelte/transition';

	let mounted = false;
	let activeTab = 'glossary';
	let searchQuery = '';
	let expandedTerm = null;

	const tabs = [
		{ id: 'glossary', label: 'Glossary' },
		{ id: 'architectures', label: 'Architectures' },
		{ id: 'patterns', label: 'Patterns' }
	];

	// Category badge mappings
	const categoryBadges = {
		'Protocols': 'badge-protocols',
		'Orchestration': 'badge-orchestration',
		'Fundamentals': 'badge-aiml',
		'Data': 'badge-data',
		'Visibility': 'badge-geo'
	};

	const glossary = [
		// Agentic Commerce Protocols
		{ term: 'MCP', fullName: 'Model Context Protocol', category: 'Protocols', definition: 'Anthropic\'s open protocol for connecting LLMs to external tools, data sources, and services. Think of it as the "USB port" that lets any AI model plug into enterprise systems.', example: 'A Claude-powered shopping agent uses MCP to query real-time inventory, pull customer profiles, check pricing, and execute orders—all through standardized tool interfaces.' },
		{ term: 'Tool Calling', fullName: null, category: 'Protocols', definition: 'The ability for an LLM to invoke external functions, APIs, or services during a conversation. This capability transforms a chatbot into an "agentic" system.', example: 'Customer asks "Is this item in stock near me?" → Agent calls check_inventory(sku, zip) → Returns real-time answer with store locations.' },
		{ term: 'Human-in-the-Loop', fullName: 'HITL', category: 'Protocols', definition: 'A pattern where certain agent decisions require human approval before execution. Essential for high-stakes actions.', example: 'Agent finds a great deal on a $2000 appliance but mandate caps at $1500—agent pauses, presents the opportunity, and waits for explicit customer approval.' },

		// Agent Orchestration
		{ term: 'ReAct', fullName: 'Reasoning and Acting', category: 'Orchestration', definition: 'A pattern where the agent iteratively reasons about actions, executes them, observes results, and adjusts its approach. Combines chain-of-thought reasoning with tool use.', example: 'Agent thinks "I need inventory data" → calls inventory API → sees "5 in stock" → reasons about delivery options → presents choices to customer.' },
		{ term: 'Reflection', fullName: null, category: 'Orchestration', definition: 'A pattern where the agent evaluates its own output and iteratively refines through self-critique until quality thresholds are met.', example: 'Agent drafts a product comparison → critiques it for completeness → finds missing spec → revises → re-evaluates → approves and delivers.' },
		{ term: 'Planning Pattern', fullName: 'Orchestrator-Workers', category: 'Orchestration', definition: 'An orchestration approach where the agent creates a multi-step plan before execution, allowing complex tasks to be broken into manageable steps.', example: 'Customer asks "Help me set up a home theater under $5000". Planner creates subtasks: research TVs, research audio, check compatibility, verify budget—delegates each to specialists.' },
		{ term: 'Multi-Agent System', fullName: null, category: 'Orchestration', definition: 'An architecture where multiple specialized AI agents collaborate to complete complex tasks. Each agent has distinct capabilities and responsibilities.', example: 'Shopping journey: Discovery Agent (finds products) → Comparison Agent (evaluates options) → Checkout Agent (completes purchase)—each specialized for its task.' },
		{ term: 'Guardrails', fullName: null, category: 'Orchestration', definition: 'Safety systems that constrain what an AI agent can say or do—including content filtering, PII protection, action limits, and compliance.', example: 'Guardrails prevent an agent from: revealing other customers\' data, making purchases over spending limits, recommending competitor products, or processing suspicious transactions.' },
		{ term: 'Context Engine', fullName: null, category: 'Orchestration', definition: 'A component that enriches each request with everything known about the user—combining real-time session context with historical data and preferences.', example: 'Customer asks about laptops; Context Engine automatically adds: past purchase history (Apple ecosystem), typical spend range ($1000-1500), preferred fulfillment (in-store pickup), loyalty tier (Gold).' },

		// AI/ML Fundamentals
		{ term: 'LLM', fullName: 'Large Language Model', category: 'Fundamentals', definition: 'AI systems like ChatGPT, Claude, or Gemini that understand and generate human language. The "brain" powering conversational AI.', example: 'GPT-4, Claude 3, and Gemini are all LLMs that can understand natural requests like "I need a laptop for video editing under $1500" and provide helpful, contextual responses.' },
		{ term: 'RAG', fullName: 'Retrieval-Augmented Generation', category: 'Fundamentals', definition: 'A technique that teaches AI to look up real information from authoritative sources before answering, instead of relying solely on training data. Dramatically reduces hallucinations.', example: 'When asked about return policies, the AI retrieves the retailer\'s actual policy document from a knowledge base before responding—ensuring accurate, up-to-date information.' },
		{ term: 'Embedding', fullName: 'Vector Embedding', category: 'Fundamentals', definition: 'Converting text, images, or products into lists of numbers (vectors) that capture their semantic meaning. Similar items have similar vectors, enabling intelligent search.', example: '"MacBook Air" and "lightweight laptop for students" have similar embeddings, so a semantic search for one finds the other—even without exact keyword matches.' },
		{ term: 'Hallucination', fullName: null, category: 'Fundamentals', definition: 'When AI confidently states information that isn\'t factually correct. A significant risk where incorrect information can lead to problems.', example: 'AI stating "This TV includes built-in Dolby Atmos speakers" when the product actually requires separate speakers. Could lead to customer disappointment and returns.' },
		{ term: 'Groundedness', fullName: null, category: 'Fundamentals', definition: 'How well AI responses are anchored to actual source data versus generated assumptions. Grounded responses cite real information.', example: 'A grounded response: "This laptop has 16GB RAM (per manufacturer specs)". An ungrounded response: "This laptop should have enough memory for your needs" (assumption without verification).' },
		{ term: 'Fine-Tuning', fullName: null, category: 'Fundamentals', definition: 'The process of training a pre-existing LLM on domain-specific data to improve its performance for particular tasks.', example: 'Fine-tuning a model on retail product catalogs, customer service transcripts, and return policies to create a specialized commerce assistant.' },
		{ term: 'Temperature', fullName: null, category: 'Fundamentals', definition: 'A parameter controlling the randomness/creativity of LLM outputs. Lower temperature produces more consistent responses; higher temperature increases variety.', example: 'For product specs and pricing: use low temperature for accuracy. For creative product descriptions and personalized recommendations: higher temperature enables more engaging, varied content.' },
		{ term: 'Token', fullName: null, category: 'Fundamentals', definition: 'The basic unit of text that LLMs process. Words are broken into tokens (roughly 4 characters each). Token limits constrain how much context an LLM can consider.', example: '"MacBook Pro" is typically 3-4 tokens. A product page with specifications might be 500+ tokens. Understanding token economics is essential for cost and context management.' },

		// Data & Analytics
		{ term: 'Vector Database', fullName: null, category: 'Data', definition: 'A specialized database optimized for storing and querying vector embeddings, enabling fast semantic similarity search across large datasets.', example: 'Pinecone, Weaviate, or Qdrant storing product embeddings that enable "find products similar to this one" or "match customer query to relevant products" functionality.' },
		{ term: 'kNN', fullName: 'k-Nearest Neighbors', category: 'Data', definition: 'An algorithm for finding the most similar vectors to a query vector. Used in semantic search to find content most relevant to a user\'s intent.', example: 'Customer asks "laptop for photo editing"—kNN finds the 10 products with embeddings most similar to the query embedding, surfacing relevant laptops even without exact keyword matches.' },
		{ term: 'Feature Store', fullName: null, category: 'Data', definition: 'A centralized repository for storing, managing, and serving machine learning features. Ensures consistency between training and production.', example: 'Customer features (lifetime value, purchase frequency, category preferences) stored centrally and served to AI agents in real-time during conversations.' },
		{ term: 'Observability', fullName: null, category: 'Data', definition: 'The ability to understand the internal state of AI systems through external outputs—logs, metrics, traces. Critical for debugging and optimization.', example: 'Tracing why an AI agent recommended a specific product: what context was provided, which tools were called, what data was retrieved, and how the final response was generated.' },

		// GEO/AEO
		{ term: 'GEO', fullName: 'Generative Engine Optimization', category: 'Visibility', definition: 'Optimizing content so AI agents cite and recommend it. Like SEO, but for ChatGPT, Gemini, Perplexity, and other AI assistants.', example: 'When someone asks ChatGPT "what\'s the best 4K TV for gaming?", GEO strategies help ensure the retailer\'s buying guide gets cited as a trusted source in the response.' },
		{ term: 'AEO', fullName: 'Answer Engine Optimization', category: 'Visibility', definition: 'Optimizing content specifically for visibility in AI-powered answer engines like ChatGPT, Claude, Perplexity, and Google\'s AI Overviews.', example: 'Restructuring FAQ content with clear questions and concise answers to improve likelihood of being cited when customers ask similar questions to AI assistants.' },
		{ term: 'Citation Share', fullName: null, category: 'Visibility', definition: 'The percentage of AI-generated answers that cite a source. A key GEO metric replacing traditional search rankings.', example: 'If 100 people ask ChatGPT about laptop recommendations and 35 responses cite a specific retailer\'s content, that retailer has 35% citation share for that topic.' },
		{ term: 'E-E-A-T', fullName: 'Experience, Expertise, Authoritativeness, Trustworthiness', category: 'Visibility', definition: 'Quality criteria that AI agents use to evaluate content credibility. Content from credible experts ranks higher.', example: 'A TV buying guide written by certified technicians with cited hands-on testing has higher E-E-A-T than generic AI-generated comparison content.' }
	];

	const architectures = [
		{
			id: 'rag-conversational',
			title: 'Conversational RAG',
			description: 'Pattern for building chatbots with document retrieval and source citations',
			layers: [
				{ name: 'Interface', components: ['Chat UI', 'Streaming Response'] },
				{ name: 'Orchestration', components: ['Query Router', 'Context Injector'] },
				{ name: 'Retrieval', components: ['Vector Store', 'Embedding Model', 'Reranker'] },
				{ name: 'Generation', components: ['LLM', 'System Prompt', 'Memory'] },
				{ name: 'Data', components: ['Document Store', 'Chunking Pipeline', 'Metadata'] }
			],
			useCases: ['Knowledge bases', 'Documentation search', 'Q&A systems', 'Customer support']
		},
		{
			id: 'c4-progressive',
			title: 'C4 Model (Progressive Disclosure)',
			description: 'Architecture documentation at 4 levels of abstraction',
			layers: [
				{ name: 'Context (L1)', components: ['System boundary', 'External actors', 'Key relationships'] },
				{ name: 'Container (L2)', components: ['Major building blocks', 'Data stores', 'External services'] },
				{ name: 'Component (L3)', components: ['Internal structure', 'Key components', 'Dependencies'] },
				{ name: 'Code (L4)', components: ['Classes', 'Functions', 'Implementation details'] }
			],
			useCases: ['Solution architecture', 'Technical documentation', 'Team communication', 'Stakeholder presentations']
		},
		{
			id: 'agentic-workflow',
			title: 'Agentic Workflow',
			description: 'Multi-step AI workflows with tool use and human checkpoints',
			layers: [
				{ name: 'Planning', components: ['Task Decomposition', 'Step Sequencing'] },
				{ name: 'Execution', components: ['Tool Registry', 'API Gateway', 'Error Handler'] },
				{ name: 'Validation', components: ['Output Checker', 'Human Review Gate'] },
				{ name: 'Memory', components: ['Conversation History', 'Task State', 'Learned Preferences'] }
			],
			useCases: ['Content generation', 'Data processing', 'Research automation', 'Multi-step tasks']
		}
	];

	const patterns = [
		{
			id: 'react',
			title: 'ReAct Pattern',
			description: 'Reason → Act → Observe → Repeat',
			flow: 'Agent thinks about what to do → Takes action (tool call) → Observes result → Reasons about next step → Repeats until done',
			when: 'Complex tasks requiring multiple steps, unknown number of iterations',
			avoid: 'Simple queries that can be answered directly'
		},
		{
			id: 'rag-basic',
			title: 'Basic RAG',
			description: 'Retrieve → Augment → Generate',
			flow: 'Embed user query → Search vector store → Inject top-K chunks into prompt → Generate response with context',
			when: 'Q&A over documents, grounded responses, reducing hallucinations',
			avoid: 'Creative tasks, real-time data needs, very long documents'
		},
		{
			id: 'reflection',
			title: 'Reflection Pattern',
			description: 'Generate → Critique → Refine → Repeat',
			flow: 'Generate initial output → Self-critique against criteria → Identify improvements → Refine output → Re-evaluate until threshold met',
			when: 'High-quality content generation, code review, document editing',
			avoid: 'Time-sensitive responses, simple factual queries'
		},
		{
			id: 'hitl',
			title: 'Human-in-the-Loop',
			description: 'Automate → Gate → Approve → Execute',
			flow: 'Agent prepares action → Pauses at checkpoint → Human reviews and approves → Agent executes approved action',
			when: 'High-stakes decisions, irreversible actions, compliance requirements',
			avoid: 'Low-risk automation, high-volume repetitive tasks'
		},
		{
			id: 'tool-use',
			title: 'Tool Use Pattern',
			description: 'Identify need → Select tool → Format call → Parse result',
			flow: 'LLM identifies need for external data → Selects appropriate tool → Formats parameters → Executes call → Parses response into context',
			when: 'Real-time data, external APIs, calculations, database queries',
			avoid: 'Information in training data, creative tasks'
		}
	];

	function toggleTerm(key) {
		expandedTerm = expandedTerm === key ? null : key;
	}

	$: filteredGlossary = searchQuery
		? glossary.filter(item =>
			item.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
			item.definition.toLowerCase().includes(searchQuery.toLowerCase()) ||
			(item.fullName && item.fullName.toLowerCase().includes(searchQuery.toLowerCase())) ||
			(item.example && item.example.toLowerCase().includes(searchQuery.toLowerCase()))
		)
		: glossary;

	$: categories = [...new Set(glossary.map(item => item.category))];
	$: totalTerms = filteredGlossary.length;

	onMount(() => {
		mounted = true;
	});
</script>

<svelte:head>
	<title>Reference - AI Patterns & Glossary | Nino Chavez</title>
	<meta name="description" content="AI/ML glossary, architecture patterns, and agent orchestration reference." />
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>

<style>
	/* Category badge colors */
	.badge-protocols { background: rgba(161, 0, 255, 0.15); color: #A100FF; }
	.badge-orchestration { background: rgba(0, 212, 170, 0.15); color: #00A080; }
	.badge-aiml { background: rgba(59, 130, 246, 0.15); color: #3B82F6; }
	.badge-data { background: rgba(34, 197, 94, 0.15); color: #16A34A; }
	.badge-geo { background: rgba(236, 72, 153, 0.15); color: #DB2777; }

	:global([data-ai-theme="dark"]) .badge-protocols { background: rgba(196, 77, 255, 0.2); color: #c44dff; }
	:global([data-ai-theme="dark"]) .badge-orchestration { background: rgba(0, 255, 204, 0.15); color: #00ffcc; }
	:global([data-ai-theme="dark"]) .badge-aiml { background: rgba(96, 165, 250, 0.2); color: #60A5FA; }
	:global([data-ai-theme="dark"]) .badge-data { background: rgba(74, 222, 128, 0.2); color: #4ADE80; }
	:global([data-ai-theme="dark"]) .badge-geo { background: rgba(244, 114, 182, 0.2); color: #F472B6; }

	.search-input {
		background: var(--ai-bg-card);
		border: 1px solid var(--ai-border-color);
		color: var(--ai-text-primary);
		transition: all 0.2s ease;
	}

	.search-input:focus {
		border-color: var(--ai-accent-purple);
		outline: none;
	}

	.search-input::placeholder {
		color: var(--ai-text-muted);
	}

	.term-card {
		transition: all 0.2s ease;
	}

	.term-card:hover {
		transform: translateY(-2px);
		box-shadow: 0 8px 25px rgba(161, 0, 255, 0.15);
	}

	:global([data-ai-theme="dark"]) .term-card:hover {
		box-shadow: 0 8px 25px rgba(161, 0, 255, 0.25);
	}
</style>

<main class="max-w-7xl mx-auto p-6">
	<!-- Hero Section -->
	<section class="py-8 md:py-12">
		{#if mounted}
			<h1
				in:fly={{ y: 20, duration: 800, delay: 200 }}
				class="text-3xl md:text-4xl font-bold mb-4 leading-tight"
				style="color: var(--ai-text-primary);"
			>
				Reference
			</h1>

			<p
				in:fly={{ y: 20, duration: 800, delay: 300 }}
				class="text-lg leading-relaxed max-w-2xl"
				style="color: var(--ai-text-secondary);"
			>
				Patterns, architectures, and terminology. Genericized from real client work.
			</p>
		{/if}
	</section>

	<!-- Tab Navigation + Search -->
	<section class="mb-6">
		{#if mounted}
			<div in:fly={{ y: 20, duration: 800, delay: 400 }} class="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
				<div class="flex gap-1 p-1 rounded-lg" style="background: var(--ai-bg-card); border: 1px solid var(--ai-border-color);">
					{#each tabs as tab}
						<button
							on:click={() => activeTab = tab.id}
							class="px-4 py-2 rounded-md text-sm font-medium transition-colors"
							style="{activeTab === tab.id
								? 'background: var(--ai-accent-purple); color: white;'
								: 'color: var(--ai-text-muted);'}"
						>
							{tab.label}
						</button>
					{/each}
				</div>

				{#if activeTab === 'glossary'}
					<div class="flex items-center gap-3">
						<div class="relative">
							<svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" style="color: var(--ai-text-muted);" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<circle cx="11" cy="11" r="8"/>
								<path d="m21 21-4.3-4.3"/>
							</svg>
							<input
								type="text"
								bind:value={searchQuery}
								placeholder="Search terms... (Press / to focus)"
								class="search-input w-64 pl-10 pr-4 py-2 rounded-lg text-sm"
							/>
						</div>
						<span class="text-sm" style="color: var(--ai-text-muted);">{totalTerms} terms</span>
					</div>
				{/if}
			</div>
		{/if}
	</section>

	<!-- Content -->
	<section class="pb-8">
		{#if mounted}
			<!-- Glossary Tab -->
			{#if activeTab === 'glossary'}
				<div in:fade={{ duration: 200 }} class="space-y-8 ai-animate-in">
					{#each categories as category}
						{@const categoryTerms = filteredGlossary.filter(t => t.category === category)}
						{#if categoryTerms.length > 0}
							<section class="ai-card rounded-xl overflow-hidden" style="background: var(--ai-bg-card); border: 1px solid var(--ai-border-color);">
								<!-- Category Header -->
								<div class="px-6 py-4" style="background: var(--ai-bg-card-alt); border-bottom: 1px solid var(--ai-border-color);">
									<div class="flex items-center gap-3">
										<div class="w-10 h-10 rounded-xl flex items-center justify-center {categoryBadges[category]}">
											{#if category === 'Protocols'}
												<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
												</svg>
											{:else if category === 'Orchestration'}
												<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<rect x="16" y="16" width="6" height="6" rx="1"/>
													<rect x="2" y="16" width="6" height="6" rx="1"/>
													<rect x="9" y="2" width="6" height="6" rx="1"/>
													<path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3"/>
													<path d="M12 12V8"/>
												</svg>
											{:else if category === 'Fundamentals'}
												<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path d="M12 4.5a2.5 2.5 0 0 0-4.96-.46 2.5 2.5 0 0 0-1.98 3 2.5 2.5 0 0 0-1.32 4.24 3 3 0 0 0 .34 5.58 2.5 2.5 0 0 0 2.96 3.08 2.5 2.5 0 0 0 4.91.05L12 20V4.5Z"/>
													<path d="M16 8V5c0-1.1.9-2 2-2"/>
													<path d="M12 13h4"/>
													<path d="M12 18h6a2 2 0 0 1 2 2v1"/>
													<path d="M12 8h8"/>
												</svg>
											{:else if category === 'Data'}
												<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<ellipse cx="12" cy="5" rx="9" ry="3"/>
													<path d="M3 5V19A9 3 0 0 0 21 19V5"/>
													<path d="M3 12A9 3 0 0 0 21 12"/>
												</svg>
											{:else if category === 'Visibility'}
												<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<circle cx="12" cy="12" r="10"/>
													<circle cx="12" cy="12" r="6"/>
													<circle cx="12" cy="12" r="2"/>
												</svg>
											{/if}
										</div>
										<div>
											<h2 class="text-lg font-bold" style="color: var(--ai-text-primary);">{category}</h2>
										</div>
										<span class="ml-auto px-3 py-1 rounded-full text-xs font-semibold {categoryBadges[category]}">
											{categoryTerms.length} terms
										</span>
									</div>
								</div>

								<!-- Terms Grid -->
								<div class="p-4 grid md:grid-cols-2 gap-4">
									{#each categoryTerms as item, idx}
										{@const termKey = `${category}-${idx}`}
										<button
											class="term-card rounded-xl p-4 text-left cursor-pointer {expandedTerm === termKey ? 'ring-2' : ''}"
											style="background: var(--ai-bg-card-alt); border: 1px solid var(--ai-border-color); {expandedTerm === termKey ? '--tw-ring-color: var(--ai-accent-purple);' : ''}"
											on:click={() => toggleTerm(termKey)}
										>
											<div class="flex items-start justify-between gap-2 mb-2">
												<div>
													<span class="font-bold" style="color: var(--ai-text-primary);">{item.term}</span>
													{#if item.fullName}
														<span class="text-sm ml-2" style="color: var(--ai-text-muted);">({item.fullName})</span>
													{/if}
												</div>
												<svg
													class="w-4 h-4 transition-transform flex-shrink-0 {expandedTerm === termKey ? 'rotate-90' : ''}"
													style="color: var(--ai-text-muted);"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
												>
													<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 18 6-6-6-6"/>
												</svg>
											</div>
											<p class="text-sm leading-relaxed" style="color: var(--ai-text-secondary);">{item.definition}</p>

											<!-- Expanded Example -->
											{#if expandedTerm === termKey && item.example}
												<div class="mt-3 pt-3" style="border-top: 1px solid var(--ai-border-color);">
													<div class="text-xs font-semibold uppercase tracking-wide mb-1" style="color: var(--ai-accent-purple);">
														Example
													</div>
													<p class="text-sm italic p-3 rounded-lg" style="background: var(--ai-bg-card); color: var(--ai-text-secondary);">
														{item.example}
													</p>
												</div>
											{/if}
										</button>
									{/each}
								</div>
							</section>
						{/if}
					{/each}

					{#if filteredGlossary.length === 0}
						<div class="rounded-xl p-12 text-center" style="background: var(--ai-bg-card); border: 1px solid var(--ai-border-color);">
							<svg class="mx-auto mb-4 w-12 h-12" style="color: var(--ai-text-muted);" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<circle cx="11" cy="11" r="8"/>
								<path d="m21 21-4.3-4.3"/>
							</svg>
							<h3 class="text-lg font-semibold mb-2" style="color: var(--ai-text-primary);">No terms found</h3>
							<p style="color: var(--ai-text-muted);">Try a different search query</p>
							<button
								on:click={() => searchQuery = ''}
								class="mt-4 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
								style="background: var(--ai-accent-purple); color: white;"
							>
								Clear Search
							</button>
						</div>
					{/if}
				</div>
			{/if}

			<!-- Architectures Tab -->
			{#if activeTab === 'architectures'}
				<div in:fade={{ duration: 200 }} class="space-y-4 ai-animate-in">
					{#each architectures as arch}
						<div class="ai-card rounded-xl p-6" style="background: var(--ai-bg-card); border: 1px solid var(--ai-border-color);">
							<h3 class="text-lg font-bold mb-2" style="color: var(--ai-text-primary);">{arch.title}</h3>
							<p class="text-sm mb-4" style="color: var(--ai-text-secondary);">{arch.description}</p>

							<!-- Layers -->
							<div class="mb-4">
								<h4 class="text-xs font-semibold uppercase tracking-wider mb-3" style="color: var(--ai-text-muted);">Layers</h4>
								<div class="space-y-2">
									{#each arch.layers as layer, i}
										<div class="flex items-start gap-3">
											<div class="w-6 h-6 rounded flex items-center justify-center text-xs font-bold flex-shrink-0 ai-badge-reference">
												{i + 1}
											</div>
											<div>
												<span class="text-sm font-medium" style="color: var(--ai-text-primary);">{layer.name}</span>
												<div class="flex flex-wrap gap-1 mt-1">
													{#each layer.components as comp}
														<span class="text-xs px-2 py-0.5 rounded" style="background: var(--ai-bg-card-alt); color: var(--ai-text-muted);">{comp}</span>
													{/each}
												</div>
											</div>
										</div>
									{/each}
								</div>
							</div>

							<!-- Use Cases -->
							<div>
								<h4 class="text-xs font-semibold uppercase tracking-wider mb-2" style="color: var(--ai-text-muted);">Use Cases</h4>
								<div class="flex flex-wrap gap-2">
									{#each arch.useCases as useCase}
										<span class="text-xs px-2 py-1 rounded ai-badge-learn">{useCase}</span>
									{/each}
								</div>
							</div>
						</div>
					{/each}
				</div>
			{/if}

			<!-- Patterns Tab -->
			{#if activeTab === 'patterns'}
				<div in:fade={{ duration: 200 }} class="space-y-4 ai-animate-in">
					{#each patterns as pattern}
						<div class="ai-card rounded-xl p-6" style="background: var(--ai-bg-card); border: 1px solid var(--ai-border-color);">
							<h3 class="text-lg font-bold mb-1" style="color: var(--ai-text-primary);">{pattern.title}</h3>
							<p class="text-sm mb-4" style="color: var(--ai-accent-purple);">{pattern.description}</p>

							<div class="space-y-4">
								<div>
									<h4 class="text-xs font-semibold uppercase tracking-wider mb-2" style="color: var(--ai-text-muted);">Flow</h4>
									<p class="text-sm" style="color: var(--ai-text-secondary);">{pattern.flow}</p>
								</div>

								<div class="grid md:grid-cols-2 gap-4">
									<div>
										<h4 class="text-xs font-semibold uppercase tracking-wider mb-2" style="color: var(--ai-accent-green);">When to use</h4>
										<p class="text-sm" style="color: var(--ai-text-secondary);">{pattern.when}</p>
									</div>
									<div>
										<h4 class="text-xs font-semibold uppercase tracking-wider mb-2 text-rose-400">Avoid when</h4>
										<p class="text-sm" style="color: var(--ai-text-secondary);">{pattern.avoid}</p>
									</div>
								</div>
							</div>
						</div>
					{/each}
				</div>
			{/if}
		{/if}
	</section>
</main>

<!-- Footer -->
<footer class="py-6 px-6 mt-8" style="background: var(--ai-bg-card-alt); border-top: 1px solid var(--ai-border-color);">
	<div class="max-w-7xl mx-auto flex justify-between items-center">
		<p class="text-xs" style="color: var(--ai-text-muted);">Reference</p>
		<a href="/ai" class="text-xs transition-colors" style="color: var(--ai-text-muted);">
			Back to AI Hub
		</a>
	</div>
</footer>
