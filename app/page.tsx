import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-black text-white">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 max-w-5xl w-full px-2">

        {/* Card 1 */}
        <Link
          href="/ic3point"
          className="group rounded-xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition"
        >
          <h2 className="text-xl font-semibold mb-2">
            Ic3Point
          </h2>
          <p className="text-sm text-white/70">
            Earn by booking services or cleaning ice machines
          </p>
        </Link>

        {/* Card 2 */}
        <Link
          href="/bird-dawgs"
          className="group rounded-xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition"
        >
          <h2 className="text-xl font-semibold mb-2">
            Coming Soon - Bird Dawgs
          </h2>
          <p className="text-sm text-white/70">
            Earn by finding real estate deals for investors
          </p>
        </Link>

        {/* Card 3 */}
        <Link
          href="/coming-soon"
          className="group rounded-xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition"
        >
          <h2 className="text-xl font-semibold mb-2">
            Coming Soon
          </h2>
          <p className="text-sm text-white/70">
            More coming soon.
          </p>
        </Link>

      </div>
    </main>
  );
}
