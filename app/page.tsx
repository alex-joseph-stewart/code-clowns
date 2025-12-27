import Image from 'next/image';

export default function Home() {
  return (
    <main className="bg-primary min-h-screen flex justify-center">
      <Image src="/logo.svg" width="600" height="600" alt="code clowns logo" />
    </main>
  );
}
