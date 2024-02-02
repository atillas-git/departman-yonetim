import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-zinc-900 text-zinc-50 gap-5 ">
      <p className="text-zinc-50 text-4xl">DeptConnect&apos;e hoş geldiniz</p>
      <div className="text-zinc flex items-center gap-2">
        <p>Lütfen </p>
        <Link href={"/girisyap"}>
          <Button variant={"outline"} className="text-zinc-900">Giriş yapın</Button>
        </Link>
        <p>veya</p>
        <Link href={"/kayitol"}>
          <Button variant={"outline"} className="text-zinc-900">Kayıt Olun</Button>
        </Link>
      </div>
    </main>
  );
}
