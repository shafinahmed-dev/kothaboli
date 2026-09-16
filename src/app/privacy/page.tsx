export const metadata = { title: 'Privacy Policy | KothaBoli' }

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4 space-y-8 pb-24">
      <h1 className="text-3xl md:text-4xl font-black text-white">Privacy Policy</h1>
      
      <section className="space-y-4 text-neutral-300 leading-relaxed font-medium">
        <h2 className="text-xl font-bold text-white mt-8">1. Minimal Data Collection</h2>
        <p>KothaBoli is built on the premise of pseudo-anonymity. We require Google OAuth solely to prevent spam and abuse. Your email address is stored securely on our backend authentication provider and is never displayed publicly, linked to your archetype, or sold to third parties.</p>

        <h2 className="text-xl font-bold text-white mt-8">2. Ephemeral Storage Life-Cycle</h2>
        <p>We do not hoard your words. Text bodies in threads and comments are rigidly hard-deleted from our active relational database after 168 hours. Only structural interaction metadata (e.g., total interlinks) and standard system logs remain for operational integrity.</p>

        <h2 className="text-xl font-bold text-white mt-8">3. Cookies & Local Session Handling</h2>
        <p>We use essential cookies to maintain your authenticated session. We do not deploy proprietary long-term behavioral tracking cookies for our own analytics.</p>

        <h2 className="text-xl font-bold text-white mt-8">4. Third-Party Advertising (Google AdSense)</h2>
        <p>To keep KothaBoli free, we use third-party advertising companies like Google to serve ads when you visit our website. These companies may use aggregated information (not including your name, address, email address, or telephone number) about your visits to this and other Web sites using cookies (like the DoubleClick cookie) to provide advertisements about goods and services of interest to you.</p>

        <h2 className="text-xl font-bold text-white mt-8">5. Account Deletion</h2>
        <p>Since your presence is pseudo-anonymous, your footprint automatically vanishes as threads expire. If you wish to revoke authentication entirely, contact us for a hard auth-token revocation.</p>
      </section>
    </div>
  )
}
