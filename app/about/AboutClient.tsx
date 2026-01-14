'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import AboutMeOpt from '../components/aboutMeOpt';
import type { Slug, Bio } from '@/lib/loadBio';

type Photo = { name: string; key: string; signedUrl: string; slug: Slug };

export default function AboutClient({
  photos,
  bios,
}: {
  photos: Photo[];
  bios: Record<Slug, Bio>;
}) {
  const [hovered, setHovered] = useState<string | null>(null);
  const dialogueRef = useRef<HTMLDialogElement | null>(null);
  const [selected, setSelected] = useState<Slug | null>(null);

  function open(slug: Slug) {
    setSelected(slug);
    dialogueRef.current?.showModal();
  }

  const selectedBio = selected ? bios[selected] : null;

  return (
    <div>
      <h2 className="pageHeader">Who would you like to get to know?</h2>
      <div className="flex justify-center gap-14 relative">
        {photos.map((photo) => {
          const showBubble = hovered !== null && hovered !== photo.key;
          return (
            <div
              key={photo.key}
              className="relative"
              onMouseEnter={() => {
                return setHovered(photo.key);
              }}
              onMouseLeave={() => setHovered(null)}
            >
              {showBubble && (
                <Image
                  src={'/pickMeBubbleR.png'}
                  alt="pickMeImage"
                  width={300}
                  height={200}
                  className="absolute left-20"
                ></Image>
              )}
              <AboutMeOpt
                name={photo.name}
                src={photo.signedUrl}
                key={photo.key}
                onClick={() => open(photo.slug)}
              />
            </div>
          );
        })}
        <dialog ref={dialogueRef}>
          <p>{selectedBio?.bio}</p>
        </dialog>
      </div>
    </div>
  );
}
