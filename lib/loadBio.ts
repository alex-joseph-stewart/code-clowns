import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

export interface Bio {
  name: string;
  title: string;
  bio: string;
}

export type Slug = 'alex' | 'sam';

export function loadBio(slug: 'alex' | 'sam') {
  const bioPath = path.join(process.cwd(), `app/about/bios/${slug}.yml`);
  const raw = fs.readFileSync(bioPath, { encoding: 'utf-8' });

  return yaml.load(raw) as Bio;
}
