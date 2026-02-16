import Link from "next/link";
import { Chat } from "@/components/chat";
export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-black text-white">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 max-w-5xl w-full px-2">

        <Chat/>

      </div>
    </main>
  );
}
