import Image from 'next/image';

export default function AboutMeOpt({
  name,
  src,
  onClick,
}: {
  name: string;
  src: string;
  onClick: () => void;
}) {
  return (
    <div className="w-half">
      <button onClick={onClick}>
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
