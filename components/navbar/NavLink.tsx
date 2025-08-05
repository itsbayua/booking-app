"use client";

import React, { useState } from "react";
import { IoClose, IoMenu } from "react-icons/io5";
import clsx from "clsx";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import type { Session } from "next-auth";
import Image from "next/image";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/room", label: "Rooms" },
  { href: "/contact", label: "Contact" },
  { href: "/my-reservation", label: "My Reservation", requiresAuth: true },
  {
    href: "/admin/dashboard",
    label: "Dashboard",
    requiresAuth: true,
    adminOnly: true,
  },
  {
    href: "/admin/room",
    label: "Manage Room",
    requiresAuth: true,
    adminOnly: true,
  },
];

const filterNavItems = (session: Session | null) => {
  const role = session?.user?.role;
  return navItems.filter((item) => {
    if (item.requiresAuth && !session) return false;
    if (item.adminOnly && role !== "admin") return false;
    return true;
  });
};

export default function NavLink() {
  const [open, setOpen] = useState(false);
  const { data: session, status } = useSession();

  if (status === "loading") return null;

  const visibleNavItems = filterNavItems(session);

  return (
    <>
      {session?.user ? (
        <div className="flex items-center justify-end md:order-2">
          <div className="hidden text-sm bg-gray-50 border rounded-full md:me-0 md:block focus:ring-4 focus:ring-gray-300">
            <Image
              src={session.user.image || "/avatar.svg"}
              width={64}
              height={64}
              alt="avatar"
              className="size-8 rounded-full"
            />
          </div>

          <div className="flex items-center">
            <button
              className="md:block hidden py-2 px-4 bg-gray-50 text-gray-700 hover:bg-gray-100 rounded-sm cursor-pointer"
              onClick={() => signOut()}
            >
              Sign Out
            </button>
          </div>
        </div>
      ) : null}

      <button
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex items-center p-2 justify-center text-sm text-gray-500 rounded-md md:hidden hover:bg-gray-100"
      >
        {open ? <IoClose className="size-8" /> : <IoMenu className="size-8" />}
      </button>

      <div className={clsx("w-full md:block md:w-auto", { hidden: !open })}>
        <ul className="flex flex-col md:flex-row md:items-center md:space-x-10 p-4 md:p-0 mt-4 md:mt-0 bg-gray-50 md:bg-white rounded-sm font-semibold text-sm uppercase">
          {visibleNavItems.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className="block py-2 px-3 text-gray-800 hover:bg-gray-100 rounded-sm md:hover:bg-transparent md:p-0"
              >
                {label}
              </Link>
            </li>
          ))}

          <li className="pt-2 md:pt-0">
            {session ? (
              <button
                onClick={() => signOut()}
                className="md:hidden py-2.5 px-4 bg-red-400 text-white hover:bg-red-600 rounded-sm cursor-pointer"
              >
                Sign Out
              </button>
            ) : (
              <Link
                href="/sign-in"
                className="py-2.5 px-6 bg-orange-400 text-white hover:bg-orange-500 rounded-sm"
              >
                Sign In
              </Link>
            )}
          </li>
        </ul>
      </div>
    </>
  );
}
