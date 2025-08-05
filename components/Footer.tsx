import Image from "next/image";
import Link from "next/link";
import React from "react";

const footerLinks = [
  {
    title: "Links",
    items: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Rooms", href: "/room" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    items: [
      { label: "Legal", href: "#" },
      { label: "Term & Conditions", href: "/#" },
      { label: "Payment Method", href: "/#" },
      { label: "Privacy Policy", href: "/#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900">
      <div className="max-w-screen-xl mx-auto px-4 py-10 md:py-16">
        <div className="grid md:grid-cols-3 gap-7">
          <div>
            <Link href="/" className="mb-10 block">
              <Image src="/logo.png" width={128} height={49} alt="logo" />
            </Link>
            <p className="text-gray-400">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio
              quidem iure numquam tenetur deleniti quis?
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10">
            {footerLinks.map((section) => (
              <div key={section.title}>
                <h4 className="mb-8 text-xl font-semibold text-white">
                  {section.title}
                </h4>
                <ul className="space-y-5 text-gray-400">
                  {section.items.map(({ label, href }) => (
                    <li key={label}>
                      <Link href={href}>{label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div>
            <h4 className="mb-8 text-xl font-semibold text-white">
              Newsletter
            </h4>
            <p className="text-gray-400">
              Lorem ipsum dolor sit amet consectetur adipisicing.
            </p>
            <form className="mt-5">
              <input
                type="text"
                name="email"
                className="w-full p-3 mb-5 rounded-sm bg-white"
                placeholder="johndoe@gmail.com"
              />
              <button className="bg-orange-400 p-3 font-bold text-white w-full rounded-sm hover:bg-orange-500">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 border-t border-gray-500 py-8 text-center text-base text-gray-500">
        &copy; Copyright-2025 | itsbayua | All rights reserved.
      </div>
    </footer>
  );
}
