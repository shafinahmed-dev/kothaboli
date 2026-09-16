export const metadata = { title: 'Contact & Legal | KothaBoli' }

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4 space-y-8 pb-24">
      <h1 className="text-3xl md:text-4xl font-black text-white">Contact & Legal</h1>
      
      <section className="space-y-4 text-neutral-300 leading-relaxed font-medium">
        <p>For generalized feedback, operational questions, or critical reporting, use the comm channels below.</p>

        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 md:p-8 mt-6">
          <h2 className="text-xl font-bold text-white mb-2">Law Enforcement & Takedown Requests</h2>
          <p className="text-sm mb-4 text-neutral-400">If you are a law enforcement agency or need to report a severe Terms of Service violation (such as CSAM, extreme harassment, or illegal material) for immediate takedown, email us.</p>
          <a href="mailto:legal@kothaboli.com" className="font-mono text-blue-400 hover:text-blue-300 transition font-bold tracking-wide">legal@kothaboli.com</a>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 md:p-8 mt-4">
          <h2 className="text-xl font-bold text-white mb-2">Editorial & AdSense Inquiries</h2>
          <p className="text-sm mb-4 text-neutral-400">For advertising opportunities, bug reports, or general archetype feedback.</p>
          <a href="mailto:contact@kothaboli.com" className="font-mono text-blue-400 hover:text-blue-300 transition font-bold tracking-wide">contact@kothaboli.com</a>
        </div>
      </section>
    </div>
  )
}
