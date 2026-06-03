"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, LogOut } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/dashboard/applications", label: "Applications" },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        className="md:hidden text-zinc-400 hover:text-white cursor-pointer"
        asChild
      >
        <button>
          <Menu className="h-5 w-5" />
        </button>
      </SheetTrigger>
      <SheetContent
        side="left"
        style={{ width: "256px", maxWidth: "256px" }}
        className="bg-zinc-950 border-zinc-800 text-zinc-100 px-5 py-6 flex flex-col"
      >
        <SheetTitle className="sr-only">Navigation</SheetTitle>
        <div>
          <h2 className="text-xl font-semibold">ApplyFlow</h2>
          <p className="mt-1 text-sm text-zinc-400">Job Tracking</p>
        </div>
        <nav className="mt-8 flex-1 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm text-zinc-300 hover:bg-zinc-900 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <form action="/api/auth/signout" method="POST">
          <button
            type="submit"
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-zinc-400 hover:bg-zinc-900 hover:text-white cursor-pointer"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </form>
      </SheetContent>
    </Sheet>
  );
}