import { error } from '@sveltejs/kit';
import { Marked } from 'marked';
import { blueprintDocs, getDoc, listSlugs } from '../blueprint-docs';

export const prerender = true;

const GH_BLOB = 'https://github.com/nino-chavez/nino-chavez-site/blob/redesign/v3-context-engineer';
const GH_TREE = 'https://github.com/nino-chavez/nino-chavez-site/tree/redesign/v3-context-engineer';

// Resolve a markdown link href against the source doc's location inside
// `blueprint/`. In-blueprint .md/.yml that's in our doc map → /blueprint/<slug>.
// Everything else → GitHub source URL on the redesign branch. This guarantees
// the prerender crawler never sees a relative href it can't satisfy.
function resolveLink(href: string, docSlug: string): string {
	if (/^(https?:|mailto:|tel:)/i.test(href)) return href;
	if (href.startsWith('#')) return href;
	if (href === '') return href;
	if (href.startsWith('/')) return href;

	const hashIdx = href.indexOf('#');
	const path = hashIdx >= 0 ? href.slice(0, hashIdx) : href;
	const fragment = hashIdx >= 0 ? href.slice(hashIdx) : '';

	if (path === '') return fragment;

	const isDir = path.endsWith('/');

	const docDir = docSlug.includes('/')
		? `blueprint/${docSlug.substring(0, docSlug.lastIndexOf('/'))}`
		: 'blueprint';

	const stack = docDir.split('/').filter(Boolean);
	for (const seg of path.split('/')) {
		if (seg === '' || seg === '.') continue;
		if (seg === '..') {
			if (stack.length > 0) stack.pop();
			continue;
		}
		stack.push(seg);
	}

	if (stack[0] === 'blueprint' && !isDir) {
		const candidate = stack.slice(1).join('/').replace(/\.(md|yml)$/, '');
		if (candidate === '') return `/blueprint${fragment}`;
		if (blueprintDocs.has(candidate)) return `/blueprint/${candidate}${fragment}`;
	}

	const repoPath = stack.join('/').replace(/\/$/, '');
	const base = isDir ? GH_TREE : GH_BLOB;
	return `${base}/${repoPath}`;
}

export function entries() {
	return listSlugs().map((slug) => ({ slug }));
}

export function load({ params }: { params: { slug: string } }) {
	const doc = getDoc(params.slug);
	if (!doc) {
		throw error(404, `Blueprint doc not found: ${params.slug}`);
	}

	const source =
		doc.ext === 'yml' ? '```yaml\n' + doc.content + '\n```\n' : doc.content;

	const marked = new Marked({ gfm: true, breaks: false });
	marked.use({
		renderer: {
			link(token) {
				const rewritten = resolveLink(token.href, doc.slug);
				const isExternal = /^https?:/i.test(rewritten);
				const text = this.parser.parseInline(token.tokens);
				const titleAttr = token.title ? ` title="${token.title}"` : '';
				const relAttr = isExternal ? ' rel="noopener"' : '';
				const targetAttr = isExternal ? ' target="_blank"' : '';
				return `<a href="${rewritten}"${titleAttr}${relAttr}${targetAttr}>${text}</a>`;
			}
		}
	});

	const html = marked.parse(source) as string;

	return {
		slug: doc.slug,
		title: doc.title,
		ext: doc.ext,
		html
	};
}
