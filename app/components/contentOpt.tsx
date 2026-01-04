import Link from 'next/link';
import Image from 'next/image';

export default function ContentOpt({
  img,
  optMsg,
  href,
}: {
  img: string;
  optMsg: string;
  href: string;
}) {
  return (
    <Link href={href} className="contentOpt">
      <Image src={img} alt="book" height={500} width={500}></Image>
      <div className="redTextBlock">
        <p className="textBlockFont">{optMsg}</p>
      </div>
    </Link>
  );
}
