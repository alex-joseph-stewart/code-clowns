import Image from 'next/image';

export default function AboutMeOpt({
  name,
  src,
}: {
  name: string;
  src: string;
}) {
  return (
    <div className="contentOpt">
      <button>
        <Image
          src={src}
          alt={`Image of ${name}`}
          width={100}
          height={250}
        ></Image>
        <h2 className="redTextBlock">{name}</h2>
      </button>
    </div>
  );
}
