'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

function UserIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-3.5 w-3.5"
      aria-hidden="true"
    >
      <path d="M20 21a8 8 0 0 0-16 0" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

export function AnnouncementBar() {
  const { user, logout } = useAuth();

  return (
    <div className="border-b border-black/10 bg-black/[0.03] dark:border-white/10 dark:bg-white/[0.03]">
      <div className="mx-auto flex max-w-6xl items-center justify-end gap-4 px-4 py-2 text-xs">
        <UserIcon />
        {user ? (
          <>
            <span>{user.firstName}</span>
            <Link href="/orders" className="opacity-80 hover:opacity-100">
              My orders
            </Link>
            <button onClick={logout} className="opacity-80 hover:opacity-100">
              Log out
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="opacity-80 hover:opacity-100">
              Log in
            </Link>
            <Link href="/register" className="opacity-80 hover:opacity-100">
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
