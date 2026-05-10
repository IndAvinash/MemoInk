// app/layout.tsx

"use client";

import type { Metadata } from "next";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import "./globals.css";

import {
  BookOpen,
  Home,
  PenSquare,
  User,
  Settings,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

// Remove this block if Next.js shows an error
// about metadata in client component
// export const metadata: Metadata = {
//   title: "MemoInk",
//   description: "A modern diary writing app",
// };

const navItems = [
  {
    name: "Home",
    href: "/?status=0",
    icon: Home,
  },
  {
    name: "Write",
    href: "/write",
    icon: PenSquare,
  },
  {
    name: "My Diary",
    href: "/diary",
    icon: BookOpen,
  },
  {
    name: "Profile",
    href: "/profile",
    icon: User,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const [collapsed, setCollapsed] = useState(false);

  return (
    <html lang="en">
      <body className="bg-[--background] text-gray-800 antialiased">
        <div className="flex min-h-screen">
          {/* Sidebar */}
          <aside
            className={`
              hidden lg:flex flex-col
              bg-white border-r border-gray-200 shadow-sm
              transition-all duration-300 ease-in-out
              ${collapsed ? "w-24" : "w-72"}
            `}
          >
            {/* Top */}
            <div className="flex items-center justify-between px-5 py-6 border-b border-gray-200">
              {/* Logo */}
             

                {!collapsed && (
                   <Link
                href="/"
                className={`flex items-center ${
                  collapsed ? "justify-center w-full" : "gap-3"
                }`}
              >
                <BookOpen
                  size={22}
                  className="text-[#5c3d2e] flex-shrink-0"
                />
                  <span className="text-2xl font-bold text-[#5c3d2e]">
                    MemoInk
                  </span>
                </Link>)}
              

              {!collapsed && (
                <button
                  onClick={() => setCollapsed(true)}
                  className="p-2 rounded-xl text-[#5c3d2e] hover:bg-[#ede0d4] transition"
                >
                  <PanelLeftClose size={20} />
                </button>
              )}
               {collapsed && (
                <button
                  onClick={() => setCollapsed(false)}
                  className="p-2 rounded-xl text-[#5c3d2e] hover:bg-[#ede0d4] transition"
                >
                  <PanelLeftOpen size={20} />
                </button>
            )}
            </div>

            {/* Expand Button */}
           

            {/* Navigation */}
            <nav className="flex-1 px-3 py-6 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;

                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`
                      group flex items-center
                      ${
                        collapsed
                          ? "justify-center px-0"
                          : "gap-4 px-4"
                      }
                      py-3 rounded-2xl
                      transition-all duration-200
                      ${
                        isActive
                          ? "bg-[#5c3d2e] text-white shadow-md"
                          : "text-gray-700 hover:bg-[#ede0d4] hover:text-[#5c3d2e]"
                      }
                    `}
                  >
                    <Icon
                      size={22}
                      className="flex-shrink-0"
                    />

                    {!collapsed && (
                      <span className="font-medium text-lg">
                        {item.name}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Bottom Profile */}
            <div className="p-4 border-t border-gray-200">
              <div
                className={`
                  bg-[#f5ebe0]
                  rounded-2xl
                  transition-all duration-300
                  ${
                    collapsed
                      ? "flex justify-center p-3"
                      : "flex items-center gap-3 p-4"
                  }
                `}
              >
                {/* Avatar */}
                <div className="w-12 h-12 rounded-full bg-[#5c3d2e] flex items-center justify-center text-white font-bold text-lg">
                  D
                </div>

                {!collapsed && (
                  <div>
                    <h3 className="font-semibold text-[#5c3d2e]">
                      Diary User
                    </h3>

                    <p className="text-sm text-gray-500">
                      Keep writing ✨
                    </p>
                  </div>
                )}
              </div>
            </div>
          </aside>
                 <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-white border-t border-gray-200 shadow-md">
    <div className="flex items-center justify-around py-2">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.name}
            href={item.href}
            className={`
              flex flex-col items-center justify-center
              px-3 py-2 rounded-xl transition
              ${
                isActive
                  ? "text-[#5c3d2e]"
                  : "text-gray-500 hover:text-[#5c3d2e]"
              }
            `}
          >
            <Icon size={22} />

            <span className="text-xs mt-1">
              {item.name}
            </span>
          </Link>
        );
      })}
    </div>
  </nav>
          {/* Main Content */}
          <div className="flex-1 flex flex-col">
            {/* Mobile Header */}
            <header className="md:hidden sticky top-0 z-50 bg-white border-b border-gray-200 px-4 py-4 flex items-center justify-between">
              <Link
                href="/"
                className="flex items-center gap-2 text-2xl font-bold text-[#5c3d2e]"
              >
                <BookOpen size={28} />
                <span>MemoInk</span>
              </Link>
            </header>

            {/* Content */}
            <main className="flex-1 px-4 sm:px-8 py-8">
              <div className="max-w-6xl mx-auto">
                {children}
              </div>
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}