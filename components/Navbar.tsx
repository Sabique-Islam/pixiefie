'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Github, Twitter, Menu as MenuIcon, Coffee} from 'lucide-react'
import { MenuContainer, MenuItem } from '@/components/ui/fluid-menu'

export default function Navbar() {

  const links = [
    { href: "https://coff.ee/nope.js", icon: <Coffee className="w-5 h-5" />, label: "Buy Me Coffee" },
    { href: "https://github.com/Sabique-Islam/pixiefie", icon: <Github className="w-5 h-5" />, label: "GitHub" },
    { href: "https://x.com/nopeJS", icon: <Twitter className="w-5 h-5" />, label: "X" },
  ]

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-4xl px-4 md:px-6  bg-black/10 backdrop-blur-lg border border-gray-400 rounded-4xl flex items-center justify-between text-white">

      <div className="flex items-center gap-2.5">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Image
            src="/favicon.svg"
            alt="Icon"
            width={20}
            height={20}
            className="md:w-6 md:h-6 rounded bg-black/20 p-1"
          />
          <span className="font-semibold text-sm md:text-base">Pixiefie</span>
        </Link>
      </div>

      <div className="hidden md:flex items-center gap-3">
        {links.map(({ href, icon, label }) => (
          <div key={label} className="relative group">
            <Link
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 hover:text-zinc-300 transition-colors"
              title={label}
            >
              {icon}
            </Link>
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 text-xs bg-black text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              {label}
            </div>
          </div>
        ))}
      </div>

      <div className="md:hidden">
        <MenuContainer>
          <MenuItem icon={<MenuIcon className="w-5 h-5" />} />
          {links.map(({ href, icon, label }) => (
            <MenuItem
              key={label}
              icon={
                <Link
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  {icon}
                </Link>
              }
            />
          ))}
        </MenuContainer>
      </div>
    </nav>
  )
}