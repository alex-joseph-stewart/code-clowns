'use client';

import { useState } from 'react';
import type { bio } from '@/lib/loadBio';

export default function BioBoxClient({ bio }: bio) {
  const [selected, setSelected] = useState<'alex' | 'sam' | ''>('');

  return <div>{bio}</div>;
}
