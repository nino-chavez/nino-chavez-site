<script>
	import Hero from '$lib/components/Hero.svelte';
	import ChannelRow from '$lib/components/ChannelRow.svelte';

	const channels = [
		{ label: 'nino@ninochavez.co', href: 'mailto:nino@ninochavez.co' },
		{ label: 'github.com/nino-chavez', href: 'https://github.com/nino-chavez' },
		{ label: 'linkedin.com/in/ninochavez', href: 'https://www.linkedin.com/in/ninochavez/' }
	];
</script>

<svelte:head>
	<title>Contact — Nino Chavez</title>
	<meta name="description" content="Not selling services. Reachable when the conversation is worth having." />
</svelte:head>

<main id="main">
	<section class="container">
		<Hero kicker="/contact">
			Contact.
			<svelte:fragment slot="sub">
				I'm not selling services. I respond to <em>interesting</em> work.
			</svelte:fragment>
		</Hero>
	</section>

	<div class="container contact-body">

		<p class="contact-lede">
			Day job at commerce.com is full-time. The receipts on this site exist to make me reachable
			when the conversation is worth having — not to convert visitors into clients. Email or
			LinkedIn is the fastest path. The form below is here for the people who prefer it.
		</p>

		<section class="receipts-band" aria-label="Direct channels">
			<p class="receipts-tag">Direct channels</p>
			<div class="receipts-grid">
				<div class="receipt">
					<p class="receipt-label">Email</p>
					<p class="receipt-value"><a href="mailto:nino@ninochavez.co">nino@ninochavez.co</a></p>
				</div>
				<div class="receipt">
					<p class="receipt-label">GitHub</p>
					<p class="receipt-value"><a href="https://github.com/nino-chavez" rel="noopener">github.com/nino-chavez</a></p>
				</div>
				<div class="receipt">
					<p class="receipt-label">LinkedIn</p>
					<p class="receipt-value"><a href="https://www.linkedin.com/in/ninochavez/" rel="noopener">linkedin.com/in/ninochavez</a></p>
				</div>
			</div>
		</section>

		<section class="form-section">
			<p class="form-tag">Form</p>
			<h2 class="form-title">If the form is your speed.</h2>
			<p class="form-sub">
				Goes to the same inbox as the email above. Resend handles delivery; Cloudflare
				Turnstile catches bot traffic before it reaches me.
			</p>

			<form action="/api/contact" method="POST" class="contact-form">
				<div class="field">
					<label for="name">Your name</label>
					<input type="text" id="name" name="name" required />
				</div>
				<div class="field">
					<label for="email">Your email</label>
					<input type="email" id="email" name="email" required />
				</div>
				<div class="field">
					<label for="message">What you're working on</label>
					<textarea id="message" name="message" required></textarea>
				</div>
				<div class="field turnstile-placeholder">
					<label for="turnstile">Verification</label>
					<div id="turnstile">[ Cloudflare Turnstile widget mounts here on production ]</div>
				</div>
				<button type="submit" class="submit-btn">Send</button>
				<p class="form-meta">No newsletter signup. No marketing follow-up. One reply, then the thread is yours.</p>
			</form>
		</section>

		<footer class="contact-footer">
			<p class="footer-tag">All channels in one row</p>
			<ChannelRow channels={channels} />
		</footer>

	</div>
</main>

<style>
	main { padding-bottom: var(--space-16); }

	.contact-body { max-width: var(--container-prose); }

	.contact-lede {
		font-size: var(--type-base);
		color: var(--text-secondary);
		line-height: var(--leading-relaxed);
		margin-bottom: var(--space-8);
	}

	.receipts-band {
		padding-block: var(--space-6);
		border-top: var(--border-1) solid var(--border-subtle);
		border-bottom: var(--border-1) solid var(--border-subtle);
		margin-bottom: var(--space-12);
	}

	.receipts-tag {
		font-family: var(--font-mono);
		font-size: 10px;
		text-transform: uppercase;
		letter-spacing: var(--tracking-mono);
		color: var(--brand-400);
		margin-bottom: var(--space-4);
	}

	.receipts-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
		gap: var(--space-4);
	}

	.receipt {
		padding: var(--space-4);
		border: var(--border-1) solid var(--border-subtle);
		background: var(--surface-1);
	}

	.receipt-label {
		font-family: var(--font-mono);
		font-size: 10px;
		text-transform: uppercase;
		letter-spacing: var(--tracking-mono);
		color: var(--text-muted);
		margin-bottom: var(--space-2);
	}

	.receipt-value {
		font-family: var(--font-mono);
		font-size: var(--type-sm);
		color: var(--text-primary);
		word-break: break-all;
		margin: 0;
	}

	.receipt-value a {
		color: var(--text-primary);
		text-decoration: none;
	}

	.receipt-value a:hover {
		color: var(--brand-400);
	}

	.form-section { margin-bottom: var(--space-12); }

	.form-tag {
		font-family: var(--font-mono);
		font-size: 10px;
		text-transform: uppercase;
		letter-spacing: var(--tracking-mono);
		color: var(--brand-400);
		margin-bottom: var(--space-2);
	}

	.form-title {
		font-family: var(--font-display);
		font-size: var(--type-2xl);
		font-weight: var(--weight-semibold);
		margin-bottom: var(--space-3);
	}

	.form-sub {
		font-size: var(--type-base);
		color: var(--text-secondary);
		line-height: var(--leading-relaxed);
		margin-bottom: var(--space-6);
	}

	.contact-form .field { margin-bottom: var(--space-4); }

	.contact-form label {
		display: block;
		font-family: var(--font-mono);
		font-size: 10px;
		text-transform: uppercase;
		letter-spacing: var(--tracking-mono);
		color: var(--text-muted);
		margin-bottom: var(--space-1);
	}

	.contact-form input,
	.contact-form textarea {
		width: 100%;
		padding: var(--space-3) var(--space-4);
		border: var(--border-1) solid var(--border-strong);
		background: var(--surface-1);
		color: var(--text-primary);
		font-family: var(--font-sans);
		font-size: var(--type-base);
	}

	.contact-form input:focus,
	.contact-form textarea:focus {
		outline: 2px solid var(--brand-500);
		outline-offset: 1px;
		border-color: var(--brand-500);
	}

	.contact-form textarea {
		resize: vertical;
		min-height: 120px;
	}

	.turnstile-placeholder #turnstile {
		min-height: 65px;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 1px dashed var(--border-strong);
		font-family: var(--font-mono);
		font-size: 10px;
		text-transform: uppercase;
		letter-spacing: var(--tracking-mono);
		color: var(--text-muted);
	}

	.submit-btn {
		margin-top: var(--space-4);
		padding: var(--space-3) var(--space-6);
		border: var(--border-1) solid var(--brand-500);
		background: var(--brand-500);
		color: white;
		font-family: var(--font-mono);
		font-size: var(--type-sm);
		text-transform: uppercase;
		letter-spacing: var(--tracking-mono);
		cursor: pointer;
		transition: background var(--duration-fast) var(--ease-out);
	}

	.submit-btn:hover {
		background: var(--brand-700);
		border-color: var(--brand-700);
	}

	.form-meta {
		margin-top: var(--space-3);
		font-family: var(--font-mono);
		font-size: 10px;
		color: var(--text-muted);
	}

	.contact-footer {
		padding-top: var(--space-8);
		border-top: var(--border-1) solid var(--border-subtle);
	}

	.footer-tag {
		font-family: var(--font-mono);
		font-size: 10px;
		text-transform: uppercase;
		letter-spacing: var(--tracking-mono);
		color: var(--text-muted);
		margin-bottom: var(--space-3);
	}
</style>
