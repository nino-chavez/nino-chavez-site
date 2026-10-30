// Frozen comparison content from app/page.tsx, app/links/page.tsx and
// app/selected-work.ts at 909b5f7. Not a production content owner.
const root = new URL('../../../../', import.meta.url);
export const asset = path => new URL(`public/${path}`, root).href;
export const profile = {
  name: 'Nino Chavez',
  intro: 'I’m a product architect in Chicago. Outside work, I run volleyball events, take photographs, write, and DJ.',
  bio: 'I started in software engineering, moved through architecture and consulting, and now work as a Product Architect at commerce.com. I still prefer the part where a decision becomes a working system.',
  practice: 'Outside the day job, I run Let’s Pepper, build and operate Rally HQ, shoot volleyball through Flickday Media, publish Signal Dispatch, and keep a music practice on SoundCloud.',
  portrait: asset('work/nino.jpg'),
  about: 'https://ninochavez.co/about',
  projects: 'https://ninochavez.co/work',
  email: 'mailto:nino@ninochavez.co',
  writing: 'https://ninochavez.co/blog/archive',
  photography: 'https://ninochavez.co/photography/albums',
};
export const projects = [
  {name:'Minder', description:'Activities, tasks, and selected calendars in one view of your day.', href:'https://apps.apple.com/us/app/minder-your-day/id6803974428', kind:'iPhone app', image:asset('work/minder.jpg'), alt:'Minder app preview showing a fictional sample day', caption:'Published app preview; fictional sample day.'},
  {name:'Rally HQ', description:'Tournament registration, brackets, schedules, and live court scoring.', href:'https://rallyhq.app', kind:'Web app', image:asset('work/rally-hq.webp'), alt:'Rally HQ tournament interface'},
  {name:'The Rotation', description:'Find college volleyball matches and where to watch them.', href:'https://therotation.tv', kind:'Website', image:asset('work/rotation.png'), alt:'The Rotation schedule and must-watch match cards'},
];
export const destinations = [
  {name:'Rally HQ', description:'Tournament registration, schedules, brackets, and live scoring.', href:'https://rallyhq.app', group:'Projects and businesses'},
  {name:'Let’s Pepper', description:'Grass volleyball tournaments in Chicagoland.', href:'https://letspepper.com', group:'Projects and businesses'},
  {name:'Flickday Media', description:'Tournament photography and grassroots sports media.', href:'https://flickdaymedia.com', group:'Projects and businesses'},
  {name:'Signal X Studio', description:'The company behind my sports, media, and software ventures.', href:'https://signalx.studio', group:'Projects and businesses'},
  {name:'GitHub', description:'Public code, tools, and repositories.', href:'https://github.com/nino-chavez', group:'Writing and code'},
  {name:'Signal Dispatch', description:'My writing: essays, guides, presentations, and fiction.', href:'https://ninochavez.co/blog', group:'Writing and code'},
  {name:'LinkedIn', description:'My professional history and current role.', href:'https://www.linkedin.com/in/nino-chavez/', group:'Contact'},
  {name:'Photography', description:'Volleyball, action-sports, and event galleries.', href:'https://ninochavez.co/photography?src=links', group:'Photography and music'},
  {name:'Instagram', description:'Current photography and event images.', href:'https://www.instagram.com/nino.chavez.photo/', group:'Photography and music'},
  {name:'SoundCloud', description:'DJ sets and mixes.', href:'https://soundcloud.com/ni-no-cha-vez', group:'Photography and music'},
  {name:'Email', description:'nino@ninochavez.co', href:'mailto:nino@ninochavez.co', group:'Contact'},
];
export const groups = ['Contact','Writing and code','Photography and music','Projects and businesses'];
