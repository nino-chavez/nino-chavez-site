import { profile, projects, destinations, groups } from '../content.js';

const setText = (selector, value) => document.querySelectorAll(selector).forEach(node => { node.textContent = value; });
const setHref = (selector, value) => document.querySelectorAll(selector).forEach(node => { node.href = value; });
const element = (tag, className, text) => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
};
const destinationByName = name => destinations.find(destination => destination.name === name);
const linkEntry = (destination, className) => {
  const link = element('a', className);
  link.href = destination.href;
  const name = element('strong', '', destination.name);
  link.append(name);
  if (destination.description) link.append(element('span', '', destination.description));
  return link;
};

setText('[data-profile-name]', profile.name);
setText('[data-profile-intro]', profile.intro);
setText('[data-profile-bio]', profile.bio);
setHref('[data-about]', profile.about);
setHref('[data-projects]', profile.projects);
setHref('[data-email]', profile.email);

const portrait = document.querySelector('[data-portrait]');
if (portrait) {
  portrait.src = profile.portrait;
  portrait.alt = `Portrait of ${profile.name}`;
}

if (document.body.dataset.page === 'home') {
  const homeDestinations = document.querySelector('[data-home-destinations]');
  const signalDispatch = destinationByName('Signal Dispatch');
  const photography = destinationByName('Photography');
  const email = destinationByName('Email');
  const homeChoices = [
    { name: 'Projects', description: 'Apps, websites, and other work.', href: profile.projects },
    { name: 'Writing', description: signalDispatch.description, href: profile.writing },
    { name: 'Photography', description: photography.description, href: profile.photography },
    { name: 'Contact', description: email.description, href: profile.email },
  ];
  homeChoices.forEach(choice => homeDestinations.append(linkEntry(choice, 'destination-link')));

  const projectList = document.querySelector('[data-projects-list]');
  projects.forEach(project => {
    const article = element('article', 'project-entry');
    const link = element('a');
    link.href = project.href;
    link.append(element('h3', '', project.name));
    article.append(link, element('p', '', project.description));
    projectList.append(article);
  });
}

if (document.body.dataset.page === 'links') {
  const directory = document.querySelector('[data-directory-groups]');
  groups.forEach(group => {
    const section = element('section', 'directory-group');
    const headingId = `group-${group.toLowerCase().replaceAll(/[^a-z]+/g, '-')}`;
    const heading = element('h2', '', group);
    heading.id = headingId;
    section.setAttribute('aria-labelledby', headingId);
    section.append(heading);
    destinations.filter(destination => destination.group === group).forEach(destination => {
      section.append(linkEntry(destination, 'directory-entry'));
    });
    directory.append(section);
  });
}
