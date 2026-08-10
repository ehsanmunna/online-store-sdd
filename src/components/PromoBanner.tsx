'use client';

import { usePathname } from 'next/navigation';

export function PromoBanner() {
  const pathname = usePathname();

  if (pathname !== '/') {
    return null;
  }

  return (
    <div className="border-b border-black/10 dark:border-white/10">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 sm:flex-row">
        <div className="flex h-[350px] w-full flex-col items-center justify-center rounded-lg border border-black/10 bg-black/[0.03] px-6 text-center sm:w-[80%] dark:border-white/10 dark:bg-white/[0.03]">
          <h2 className="text-lg font-semibold">Big Season Sale</h2>
          <p className="mt-1 text-sm opacity-70">Placeholder banner — promotional creative goes here.</p>
        </div>

        <div className="flex h-[350px] w-full flex-col items-center justify-center gap-1 rounded-lg border border-black/10 bg-black/[0.03] px-4 text-center sm:w-[20%] dark:border-white/10 dark:bg-white/[0.03]">
          <p className="text-sm font-medium">Use code SAVE10</p>
          <p className="text-xs opacity-70">Placeholder announcement text</p>
        </div>
      </div>
    </div>
  );
}
