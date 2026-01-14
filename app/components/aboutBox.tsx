import { loadBio } from '@/lib/loadBio';

import BioBoxClient from '../about/BioBoxClient';

export default function AboutBox() {
  const bios = {
    alex: loadBio('alex'),
    sam: loadBio('sam'),
  };
  return <BioBoxClient bios={bios} />;
}
