import Link from 'next/link'
import Image from 'next/image'

export function Footer() {
  return (
    <footer className="w-full border-t border-neutral-800/60 bg-neutral-950 mt-auto">
      <div className="container mx-auto px-4 py-10 md:py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-2.5 mb-2">
              <Image 
                src="/logo.png" 
                alt="KothaBoli" 
                width={24} 
                height={24} 
                className="w-6 h-6 object-contain" 
              />
              <span className="text-xl font-black tracking-tight text-white">
                KothaBoli
              </span>
            </div>
            <p className="text-xs text-neutral-500 font-bold tracking-wide">The HQ of Yappers!</p>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-[11px] font-bold uppercase tracking-widest text-neutral-500">
            <Link href="/" className="hover:text-white transition">Home</Link>
            <Link href="/guidelines" className="hover:text-white transition">Guidelines</Link>
            <Link href="/terms" className="hover:text-white transition">Terms</Link>
            <Link href="/privacy" className="hover:text-white transition">Privacy</Link>
            <Link href="/contact" className="hover:text-white transition">Contact</Link>
          </nav>
        </div>
        
        <div className="text-center md:text-left text-[11px] text-neutral-600 mt-10 font-bold tracking-wide">
          &copy; {new Date().getFullYear()} KothaBoli. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
