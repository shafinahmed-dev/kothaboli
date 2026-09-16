export const metadata = { title: 'Terms of Service | KothaBoli' }

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4 space-y-8 pb-24">
      <h1 className="text-3xl md:text-4xl font-black text-white">Terms of Service</h1>
      
      <section className="space-y-4 text-neutral-300 leading-relaxed font-medium">
        <h2 className="text-xl font-bold text-white mt-8">1. User Generated Content (UGC) Disclaimer</h2>
        <p>KothaBoli is an open, ephemeral discussion platform. The views, opinions, and information posted by users (Archetypes) are their own and do not reflect the views of KothaBoli. We are not responsible for the accuracy or consequences of user-generated content.</p>
        
        <h2 className="text-xl font-bold text-white mt-8">2. Ephemeral Data Policy</h2>
        <p>All discussion threads and their associated comments are designed to be explicitly temporary. Exactly 7 days (168 hours) after creation, the original text bodies are permanently purged from our primary database structures. We do not offer recovery services for purged data.</p>
        
        <h2 className="text-xl font-bold text-white mt-8">3. Strict Prohibitions</h2>
        <p>You agree not to post any content that constitutes:</p>
        <ul className="list-disc pl-6 space-y-2 text-neutral-400">
          <li>Child Sexual Abuse Material (CSAM).</li>
          <li>Hate speech, severe harassment, or targeted doxxing.</li>
          <li>Promotion or coordination of physical violence or illegal acts.</li>
        </ul>
        <p className="font-bold text-neutral-200 mt-2">Violation of these rules will result in immediate bans and permanent removal of content.</p>

        <h2 className="text-xl font-bold text-white mt-8">4. Law Enforcement Cooperation</h2>
        <p>While content is ephemeral and profiles are pseudo-anonymous, we explicitly comply with verified legal subpoenas and court orders. As an intermediary, in cases of severe illegal activity, we will cooperate with law enforcement and may provide available session data or connected authentication tokens if required by localized laws.</p>

        <h2 className="text-xl font-bold text-white mt-8">5. AdSense & Third-Party Integrations</h2>
        <p>Our platform uses third-party advertising vendors like Google AdSense. By using KothaBoli, you agree to our use of these integrations in accordance with our Privacy Policy.</p>
      </section>
    </div>
  )
}
