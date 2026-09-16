'use client'

export function AdBanner() {
  const isProd = process.env.NODE_ENV === 'production'
  const hasAdClient = !!process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID

  return (
    <div className="w-full py-5 my-6 border border-dashed border-neutral-800/80 rounded-xl bg-neutral-900/10 flex flex-col items-center justify-center min-h-[120px] transition-colors relative overflow-hidden">
      {isProd && hasAdClient ? (
        <ins
          className="adsbygoogle w-full text-center block"
          data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}
          data-ad-slot="PLACEHOLDER_SLOT"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
      ) : (
        <div className="flex flex-col items-center justify-center z-10">
          <span className="text-[10px] font-black text-neutral-600 uppercase tracking-widest mb-1.5">— Sponsored Section —</span>
          <span className="text-[11px] text-neutral-500 font-bold">AdSense Placeholder Slot</span>
        </div>
      )}
    </div>
  )
}
