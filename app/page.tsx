import Image from "next/image";

export default function Home() {
  return (
    <div className="flex w-full h-screen items-center justify-center flex-col space-y-24">
      <Image src="/logo.png" alt="logo-name" width={400} height={400} />
      <div className="font-mono font-bold">Coming Soon!</div>
    </div>
  );
}
