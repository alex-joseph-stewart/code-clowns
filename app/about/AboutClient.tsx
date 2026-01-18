'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import AboutMeOpt from '../components/aboutMeOpt';
import type { Slug } from './types';
import { bios } from './bios';

type Photo = { name: string; key: string; signedUrl: string; slug: Slug };

export default function AboutClient({ photos }: { photos: Photo[] }) {
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
        
      </div>
      <dialog   className="
    fixed inset-0 m-auto
    w-[min(700px,92vw)]
    max-h-[80vh]
    overflow-auto
    bg-gray-100
    rounded-2xl
    border-4
    border-black
    
    p-4
  "ref={dialogueRef} >
    <h1>{selectedBio?.name}</h1>
    <h2>{selectedBio?.title}</h2>
          <p>{selectedBio?.bio}</p>
        </dialog>
    </div>
  );
}
