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
    <Link href="">
      <Image src={img} alt="book" height={500} width={500}></Image>
      <div></div>
    </Link>
  );
}
