import Image from 'next/image';

export default function Home() {
  return (
    <main className="bg-primary min-h-screen flex justify-center align-top">
      <Image src="/logo.svg" width="500" height="500" alt="code clowns logo" />
    </main>
  );
}
