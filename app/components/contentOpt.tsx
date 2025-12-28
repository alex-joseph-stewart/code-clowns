import Link from 'next/link';
import Image from 'next/image';

export default function ContentOpt({
  img,
  optMsg,
}: {
  img: string;
  optMsg: string;
}) {
  return (
    <Link href="" className="flex flex-col items-center">
      <Image src={img} alt="book" height={500} width={500}></Image>
      <div className="redTextBlock">
        <p className="textBlockFont">{optMsg}</p>
      </div>
    </Link>
  );
}
