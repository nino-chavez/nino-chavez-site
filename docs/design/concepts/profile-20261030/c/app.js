import { profile, projects, destinations, groups, asset } from '../content.js';

const page = document.body.dataset.page;
const $ = selector => document.querySelector(selector);

function escapeHtml(value = '') {
  return String(value).replace(/[&<>"']/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[character]);
}

function header() {
  return `
    <div class="shell header-inner">
      <a class="wordmark" href="index.html" ${page === 'home' ? 'aria-current="page"' : ''}>${escapeHtml(profile.name)}</a>
      <nav aria-label="Primary">
        <a href="index.html" ${page === 'home' ? 'aria-current="page"' : ''}>Home</a>
        <a href="${escapeHtml(profile.writing)}">Writing</a>
        <a href="${escapeHtml(profile.photography)}">Photography</a>
        <a href="links.html" ${page === 'links' ? 'aria-current="page"' : ''}>Links</a><a href="${escapeHtml(profile.email)}">Email</a>
      </nav>
    </div>`;
}

function footer() {
  return `<p><span>${escapeHtml(profile.name)}</span><a href="${escapeHtml(profile.email)}">Email</a><a href="${escapeHtml(profile.about)}">About</a></p>`;
}

function projectMarkup(project, index) {
  const featured = '';
  const caption = project.caption ? `<p class="media-caption">${escapeHtml(project.caption)}</p>` : '';
  return `
    <article class="project${featured}">
      <a class="project-image" href="${escapeHtml(project.href)}" aria-label="Open ${escapeHtml(project.name)}">
        <img src="${escapeHtml(project.image)}" alt="${escapeHtml(project.alt)}" ${index === 0 ? 'fetchpriority="high"' : 'loading="lazy"'}>
      </a>
      <div class="project-copy">
        <p class="project-kind">${escapeHtml(project.kind)}</p>
        <h3><a href="${escapeHtml(project.href)}">${escapeHtml(project.name)}</a></h3>
        <p>${escapeHtml(project.description)}</p>
        ${caption}
      </div>
    </article>`;
}

function renderHome() {
  const portrait = profile.portrait || asset('work/nino.jpg');
  $('#intro').innerHTML = `
    <div class="portrait-wrap"><img src="${escapeHtml(portrait)}" alt="Portrait of ${escapeHtml(profile.name)}"></div>
    <div class="intro-copy">

      <h1 id="page-title">${escapeHtml(profile.name)}</h1>
      <p class="lead">${escapeHtml(profile.intro)}</p>
      <nav class="quick-links" aria-label="Explore Nino's work">
        <a href="${escapeHtml(profile.writing)}"><span>Writing</span><small>Signal Dispatch</small></a>
        <a href="${escapeHtml(profile.photography)}"><span>Photography</span><small>Volleyball and event galleries</small></a>
      </nav>
    </div>`;
  $('#all-work-link').outerHTML = `<a class="text-link" href="${escapeHtml(profile.projects)}">View all projects</a>`;
  $('#project-grid').innerHTML = projects.map(projectMarkup).join('');
  $('#about').innerHTML = `
    <div><h2 id="about-title">A little more</h2><p>${escapeHtml(profile.bio)}</p></div>
    <div><p>${escapeHtml(profile.practice)}</p><p class="about-actions"><a href="${escapeHtml(profile.about)}">Read the fuller biography</a><a href="${escapeHtml(profile.email)}">Get in touch</a></p></div>`;
}

function renderLinks() {
  $('#directory-opening').innerHTML = `
    <div><p class="role">Directory</p><h1 id="page-title">Links</h1></div>
    <p class="lead">A direct route to the work, writing, photographs, and places I share publicly.</p>`;
  $('#directory-grid').innerHTML = groups.map(group => {
    const items = destinations.filter(destination => destination.group === group);
    return `<section class="directory-group" aria-labelledby="group-${group.replace(/\W+/g, '-').toLowerCase()}">
      <h2 id="group-${group.replace(/\W+/g, '-').toLowerCase()}">${escapeHtml(group)}</h2>
      <ul>${items.map(destination => `<li><a href="${escapeHtml(destination.href)}">${escapeHtml(destination.name)}</a><p>${escapeHtml(destination.description)}</p></li>`).join('')}</ul>
    </section>`;
  }).join('');
}

$('#site-header').innerHTML = header();
$('#site-footer').innerHTML = footer();
if (page === 'home') renderHome();
if (page === 'links') renderLinks();
