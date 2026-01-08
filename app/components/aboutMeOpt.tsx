import Image from 'next/image';

export default function AboutMeOpt({
  name,
  src,
}: {
  name: string;
  src: string;
}) {
  return (
    <div className="w-half">
      <button>
        <Image
          src={src}
          alt={`Image of ${name}`}
          width={200}
          height={500}
          className="vidImgBox"
        ></Image>
        <h2 className="redTextBlock textBlockFont w-full">{name}</h2>
      </button>
    </div>
  );
}
