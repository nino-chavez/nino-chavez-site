import { profile, projects, destinations, groups, asset } from '../content.js';

void asset;

const page = document.body.dataset.page;
const shell = document.querySelector('#site-shell');
const escapeHTML = value => String(value).replace(/[&<>'"]/g, character => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;',
}[character]));

const navItems = [
  { name: 'Home', href: 'index.html', page: 'home' },
  { name: 'Links', href: 'links.html', page: 'links' },
  { name: 'About', href: profile.about },
  { name: 'Email', href: profile.email },
];

function navigation() {
  return navItems.map(item => {
    const active = item.page === page ? ' aria-current="page"' : '';
    return `<a href="${escapeHTML(item.href)}"${active}>${escapeHTML(item.name)}</a>`;
  }).join('');
}

function rail() {
  return `
    <aside class="identity-rail" aria-label="Profile navigation">
      <a class="portrait-link" href="index.html" aria-label="Nino Chavez home">
        <img class="portrait" src="${escapeHTML(profile.portrait)}" alt="Portrait of Nino Chavez">
      </a>
      <div class="identity-copy">
        <a class="name" href="index.html">${escapeHTML(profile.name)}</a>
        <p>Chicago</p>
      </div>
      <nav class="primary-nav" aria-label="Primary">${navigation()}</nav>

    </aside>`;
}

function projectRows() {
  return projects.map(project => `
    <article class="project-row">
      <a class="project-image" href="${escapeHTML(project.href)}">
        <img src="${escapeHTML(project.image)}" alt="${escapeHTML(project.alt)}">
      </a>
      <div class="project-copy">
        <p class="project-kind">${escapeHTML(project.kind)}</p>
        <h3><a href="${escapeHTML(project.href)}">${escapeHTML(project.name)}</a></h3>
        <p>${escapeHTML(project.description)}</p>
        ${project.caption ? `<p class="image-caption">${escapeHTML(project.caption)}</p>` : ''}
      </div>
    </article>`).join('');
}

function home() {
  return `
    <main id="main" class="main-column home-main">
      <header class="opening">
        <h1>Nino Chavez</h1><p class="intro-text">${escapeHTML(profile.intro)}</p>
      </header>
      <section class="destinations" aria-labelledby="ways-to-find-title">
        <h2 id="ways-to-find-title">Start here</h2>
        <div class="feature-links">
          <a class="feature-link" href="${escapeHTML(profile.writing)}">
            <span>Writing</span>
            <small>Signal Dispatch</small>
          </a>
          <a class="feature-link" href="${escapeHTML(profile.photography)}">
            <span>Photography</span>
            <small>Albums and galleries</small>
          </a>
        </div>
      </section>
      <section class="selected-work" aria-labelledby="selected-work-title">
        <div class="section-heading">
          <h2 id="selected-work-title">Selected projects</h2>
          <a href="${escapeHTML(profile.projects)}">All projects</a>
        </div>
        <div class="project-list">${projectRows()}</div>
      </section>
      <section class="profile-note" aria-labelledby="more-about-title">
        <h2 id="more-about-title">More about me</h2>
        <p>${escapeHTML(profile.bio)}</p>
        <p>${escapeHTML(profile.practice)}</p>
        <p><a href="${escapeHTML(profile.about)}">Read more about me</a> or <a href="${escapeHTML(profile.email)}">email me</a>.</p>
      </section>
    </main>`;
}

function directory() {
  return groups.map(group => {
    const entries = destinations.filter(destination => destination.group === group);
    return `
      <section class="directory-group" id="${group.toLowerCase().replaceAll(' ', '-')}">
        <h2>${escapeHTML(group)}</h2>
        <ul>
          ${entries.map(destination => `
            <li>
              <a href="${escapeHTML(destination.href)}">${escapeHTML(destination.name)}</a>
              <p>${escapeHTML(destination.description)}</p>
            </li>`).join('')}
        </ul>
      </section>`;
  }).join('');
}

function links() {
  return `
    <main id="main" class="main-column links-main">
      <header class="page-title">
        <p class="eyebrow">Directory</p>
        <h1>Links</h1>
      </header>
      <nav class="group-nav" aria-label="Directory groups">
        ${groups.map(group => `<a href="#${group.toLowerCase().replaceAll(' ', '-')}">${escapeHTML(group)}</a>`).join('')}
      </nav>
      <div class="directory">${directory()}</div>
    </main>`;
}

shell.innerHTML = `${rail()}${page === 'links' ? links() : home()}`;
