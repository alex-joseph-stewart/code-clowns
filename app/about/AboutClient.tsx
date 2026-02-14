'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import AboutMeOpt from '../components/aboutMeOpt';
import type { Slug } from './types';
import { bios } from './bios';

type Photo = { name: string; key: string; signedUrl: string; slug: BioSlug };
type BioSlug = Exclude<Slug, null>

export default function AboutClient({ photos }: { photos: Photo[] }) {
  const [hovered, setHovered] = useState<string | null>(null);
  const dialogueRef = useRef<HTMLDialogElement | null>(null);
  const [selected, setSelected] = useState<Slug>('');

  function open(slug: Slug) {
    setSelected(slug);
    dialogueRef.current?.showModal();
  }

  function close(){
    dialogueRef.current!.close();
    setSelected('');
    
  }

  const selectedBio = selected !== '' ? bios[selected] : null;

  const photoURLS: Partial<Record<BioSlug, string>> = {};

  for(const photo of photos){
    console.log(photo);
    photoURLS[photo.slug] = photo.signedUrl 
  }
  
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
    overflow-visible
    bg-gray-100
    rounded-2xl
    border-4
    border-black
    p-0
  "ref={dialogueRef} >
    {selected && photoURLS[selected] && (
      <div className="absolute object-cover -top-14 left-1/2 -translate-x-1/2 h-28 w-28 overflow-hidden rounded-full border-4 border-black">
        <Image
          alt={selectedBio?.name ?? selected}
          src={photoURLS[selected]}
          fill
          sizes="112px"
          className='object-cover object-[50%_25%]'
        />
      </div>
    )}
    <button className="absolute -top-4 -right-4 border-3 aspect-square rounded-full w-15 redTextBlock flex-col justify-center textBlockFont" onClick={close}>X</button>
    <div className='max-h-[80vh] overflow-auto p-4'>
    
    <h1 className="font-display text-shadow-none! text-2xl">{selectedBio?.name}</h1>
    <h2 className="font-display text-shadow-none! text-gray-600">{selectedBio?.title}</h2>
   
          <p className="font-serif">{selectedBio?.bio}</p>
          </div>
        </dialog>
        
    </div>
  );
}
