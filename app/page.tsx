export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-black text-white">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 max-w-5xl w-full px-2">
        
        {/* Card 1 */}
        <a
          href="/chat"
          className="group rounded-xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition"
        >
          <h2 className="text-xl font-semibold mb-2">
            Ic3Point
          </h2>
          <p className="text-sm text-white/70">
            Earn By Booking Services or Cleaning Ice Machines
          </p>
        </a>

        {/* Card 2 */}
        <a
          href="/api"
          className="group rounded-xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition"
        >
          <h2 className="text-xl font-semibold mb-2">
            Coming Soon - Bird Dawgs
          </h2>
          <p className="text-sm text-white/70">
            Earn By Finding Real Estate Deals for Investors 
          </p>
        </a>
        {/* Card 3 */}
        <a
          href="/Coming Soon"
          className="group rounded-xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition"
        >
          <h2 className="text-xl font-semibold mb-2">
            Coming Soon
          </h2>
          <p className="text-sm text-white/70">
            More Coming Soon.
          </p>
        </a>

      </div>
    </main>
  );
}
