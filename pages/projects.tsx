import Link from 'next/link';

import { SITE_NAME, SITE_URL } from '../utils/constants';
import { getBreadcrumb } from '../utils/seo';
import BackButton from '../components/back_button';
import Seo from '../components/seo';

const PROJECTS = [
  {
    name: 'Board Game Shelf',
    href: 'https://bg.kvn.pt',
    description: 'A set of tools for tracking and exploring a board game collection.',
    tag: 'Board games',
  },
  {
    name: 'Pocket Grimoire',
    href: 'https://botc.kvn.pt',
    description: 'Run Blood on the Clocktower without a physical grimoire.',
    tag: 'Board games',
  },
  {
    name: 'Marvel Champions Tracker',
    href: 'https://champions.kvn.pt',
    description: 'Track heroes, villains, schemes, and counters without physical tokens.',
    tag: 'Board games',
  },
  {
    name: 'Fiasco',
    href: 'https://fiasco.kvn.pt',
    description: 'Online engine deck and tracker for playing Fiasco.',
    tag: 'Board games',
  },
  {
    name: 'Eldrow',
    href: 'https://eldrow.kvn.pt',
    description: 'A Wordle and Katla solver built around information theory.',
    tag: 'Tools',
  },
  {
    name: 'Effenc',
    href: 'https://effenc.kvn.pt',
    description: 'A Minecraft efficient enchantment order calculator.',
    tag: 'Tools',
  },
  {
    name: 'Pixela',
    href: 'https://pixela.kvn.pt',
    description: 'Convert images into triangle mosaics.',
    tag: 'Tools',
  },
  {
    name: 'Spill',
    href: 'https://spill.kvn.pt',
    description: 'A simple bill splitter that cares about your time.',
    tag: 'Tools',
  },
  {
    name: 'Sudolver',
    href: 'https://sudolver.kvn.pt',
    description: 'A simple and lightweight Sudoku solver.',
    tag: 'Tools',
  },
  {
    name: 'Monoto',
    href: 'https://monoto.kvn.pt',
    description: 'A note-taking app with a text editor feel.',
    tag: 'Apps',
  },
];

export default function Projects() {
  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: `Projects — ${SITE_NAME}`,
      url: `${SITE_URL}/projects`,
      description: `Side projects and tools built by ${SITE_NAME}.`,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      itemListElement: PROJECTS.map((project, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: project.name,
        url: project.href,
        description: project.description,
      })),
    },
    getBreadcrumb([
      { name: 'Home', path: '/' },
      { name: 'Projects', path: '/projects' },
    ]),
  ];

  return (
    <>
      <Seo
        title="Projects"
        description={`Side projects and tools built by ${SITE_NAME}: board game helpers, Minecraft calculators, a Sudoku solver, and more.`}
        path="/projects"
        jsonLd={structuredData}
      />

      <BackButton href="/" />
      <h1 className="mb-2 text-2xl font-semibold">Projects</h1>
      <p className="text-scheme-third mb-8 text-sm">
        Small tools and experiments I build for myself, friends, and the occasional internet stranger.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        {PROJECTS.map((project) => (
          <a className="kvn-card block" href={project.href} target="_blank" rel="noreferrer" key={project.href}>
            <div className="text-scheme-third mb-1 text-xs uppercase tracking-wide">{project.tag}</div>
            <h2 className="mb-1 font-semibold">{project.name}</h2>
            <p className="text-scheme-second text-sm">{project.description}</p>
          </a>
        ))}
      </div>

      <p className="text-scheme-third mt-8 text-sm">
        More experiments live on <Link href="/blog/pages/1">the blog</Link>.
      </p>
    </>
  );
}
