import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

interface bios {
  name: string;
  title: string;
  bio: string;
}

export function loadBio(slug: 'alex' | 'sam') {
  const bioPath = path.join(process.cwd(), `about/bios/${slug}.yml`);
  const raw = fs.readFileSync(bioPath, { encoding: 'utf-8' });

  return yaml.load(raw) as bios;
}
