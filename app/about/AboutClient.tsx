'use client';

import { useState } from 'react';
import Image from 'next/image';
import AboutMeOpt from '../components/aboutMeOpt';

type Photo = { name: string; key: string; signedUrl: string };

export default function AboutClient({ photos }: { photos: Photo[] }) {
  const [hovered, setHovered] = useState<string | null>(null);

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
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
