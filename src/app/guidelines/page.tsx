export const metadata = { title: 'Community Guidelines | KothaBoli' }

export default function GuidelinesPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4 space-y-8 pb-24">
      <h1 className="text-3xl md:text-4xl font-black text-white">Community Guidelines</h1>
      
      <section className="space-y-4 text-neutral-300 leading-relaxed font-medium">
        <p className="text-lg text-neutral-400">KothaBoli operates across 14 dedicated frequency boards. To keep the signal clear, we ask all personas to abide by a simple set of norms.</p>

        <h2 className="text-xl font-bold text-white mt-8">1. Respect the Boards</h2>
        <p>Keep your comms assigned to their correct frequency. Post corporate thoughts in Corporate, monetary tactics in Money, and casual chatter in Vent or Stories. Misaligned threads clutter the void.</p>

        <h2 className="text-xl font-bold text-white mt-8">2. Constructive Chaos</h2>
        <p>Robust debate is encouraged, but malicious harassment and bigotry are not. Counter-intel should focus on ideas, not personal attacks against a handle.</p>

        <h2 className="text-xl font-bold text-white mt-8">3. Accept the Ephemeral</h2>
        <p>Do not attempt to bypass the 7-day wipe by repetitively reposting the exact same thread (spamming). Let thoughts die when their time comes.</p>
      </section>
    </div>
  )
}
