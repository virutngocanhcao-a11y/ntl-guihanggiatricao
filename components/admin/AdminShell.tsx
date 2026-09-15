"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CONTENT_SECTIONS } from "./nav";
import {
  IconChevronDown,
  IconEdit,
  IconExternal,
  IconGrid,
  IconLogout,
  IconMenu,
  IconUsers,
  IconX,
} from "./icons";

const MAIN_NAV = [
  { href: "/admin", label: "Tổng quan", icon: IconGrid },
  { href: "/admin/leads", label: "Quản lý lead", icon: IconUsers },
];

async function logout() {
  await fetch("/api/auth", { method: "DELETE" });
  window.location.href = "/admin/login";
}

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/images/logo-ntl.png"
      alt="Nhất Tín Logistics"
      className={compact ? "h-auto w-[50px]" : "h-9 w-auto"}
    />
  );
}

function itemClass(active: boolean, expanded: boolean) {
  return `group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
    expanded ? "" : "lg:justify-center"
  } ${active ? "bg-brand-50 text-brand-500" : "text-gray-700 hover:bg-gray-100"}`;
}

function iconClass(active: boolean) {
  return `h-6 w-6 shrink-0 ${active ? "text-brand-500" : "text-gray-500 group-hover:text-gray-700"}`;
}

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const onContentPage = pathname.startsWith("/admin/content");

  const [collapsed, setCollapsed] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [contentOpen, setContentOpen] = useState(onContentPage);
  const [activeHash, setActiveHash] = useState("");
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Thu gọn trên desktop thì chỉ hiện icon, rê chuột vào sẽ tạm mở rộng
  const expanded = !collapsed || hovered || mobileOpen;

  useEffect(() => {
    setMobileOpen(false);
    if (onContentPage) setContentOpen(true);
  }, [pathname, onContentPage]);

  useEffect(() => {
    const sync = () => setActiveHash(window.location.hash.slice(1));
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  useEffect(() => {
    if (!userMenuOpen) return;
    const close = (e: MouseEvent) => {
      if (!userMenuRef.current?.contains(e.target as Node)) setUserMenuOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [userMenuOpen]);

  function toggleSidebar() {
    if (window.innerWidth >= 1024) setCollapsed((v) => !v);
    else setMobileOpen((v) => !v);
  }

  return (
    <div className="min-h-screen">
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-gray-900/50 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}

      <aside
        onMouseEnter={() => collapsed && setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`fixed left-0 top-0 z-50 flex h-screen flex-col border-r border-gray-200 bg-white px-5 transition-all duration-300 ease-in-out ${
          expanded ? "w-[290px]" : "w-[90px]"
        } ${mobileOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <div className={`flex h-16 shrink-0 items-center ${expanded ? "" : "lg:justify-center"}`}>
          <Link href="/admin" className="flex items-center gap-2.5">
            <Logo compact={!expanded} />
            {expanded && (
              <span className="rounded-md bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">Admin</span>
            )}
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto pb-6 pt-4">
          <p className={`mb-3 text-xs uppercase leading-5 text-gray-400 ${expanded ? "" : "lg:text-center"}`}>
            {expanded ? "Menu" : "•••"}
          </p>
          <ul className="flex flex-col gap-1">
            {MAIN_NAV.map(({ href, label, icon: Icon }) => {
              const active = href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
              return (
                <li key={href}>
                  <Link href={href} className={itemClass(active, expanded)} title={expanded ? undefined : label}>
                    <Icon className={iconClass(active)} />
                    {expanded && <span className="whitespace-nowrap">{label}</span>}
                  </Link>
                </li>
              );
            })}

            <li>
              <button
                type="button"
                onClick={() => (expanded ? setContentOpen((v) => !v) : setCollapsed(false))}
                className={itemClass(onContentPage, expanded)}
                title={expanded ? undefined : "Nội dung landing"}
              >
                <IconEdit className={iconClass(onContentPage)} />
                {expanded && (
                  <>
                    <span className="whitespace-nowrap">Nội dung landing</span>
                    <IconChevronDown
                      className={`ml-auto h-5 w-5 transition-transform duration-200 ${contentOpen ? "rotate-180" : ""}`}
                    />
                  </>
                )}
              </button>
              {expanded && contentOpen && (
                <ul className="ml-9 mt-2 space-y-1">
                  {CONTENT_SECTIONS.map((section) => {
                    const active = onContentPage && activeHash === section.id;
                    return (
                      <li key={section.id}>
                        <Link
                          href={`/admin/content#${section.id}`}
                          onClick={() => setActiveHash(section.id)}
                          className={`block rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                            active ? "bg-brand-50 text-brand-500" : "text-gray-700 hover:bg-gray-100"
                          }`}
                        >
                          {section.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          </ul>

          <p className={`mb-3 mt-8 text-xs uppercase leading-5 text-gray-400 ${expanded ? "" : "lg:text-center"}`}>
            {expanded ? "Khác" : "•••"}
          </p>
          <ul className="flex flex-col gap-1">
            <li>
              <a href="/" target="_blank" rel="noreferrer" className={itemClass(false, expanded)}>
                <IconExternal className={iconClass(false)} />
                {expanded && <span className="whitespace-nowrap">Xem landing page</span>}
              </a>
            </li>
            <li>
              <button type="button" onClick={logout} className={itemClass(false, expanded)}>
                <IconLogout className={iconClass(false)} />
                {expanded && <span className="whitespace-nowrap">Đăng xuất</span>}
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      <div className={`transition-all duration-300 ease-in-out ${collapsed ? "lg:pl-[90px]" : "lg:pl-[290px]"}`}>
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-3 border-b border-gray-200 bg-white px-4 lg:px-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={toggleSidebar}
              aria-label="Mở hoặc thu gọn menu"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition-colors hover:bg-gray-100 lg:h-11 lg:w-11"
            >
              {mobileOpen ? <IconX /> : <IconMenu />}
            </button>
            <Link href="/admin" className="flex items-center lg:hidden">
              <Logo />
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="hidden h-10 items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 text-sm font-medium text-gray-700 shadow-theme-xs transition-colors hover:bg-gray-50 sm:inline-flex"
            >
              <IconExternal className="h-4 w-4" />
              Xem landing page
            </a>

            <div className="relative" ref={userMenuRef}>
              <button
                type="button"
                onClick={() => setUserMenuOpen((v) => !v)}
                className="flex items-center gap-2 text-gray-700"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-50 text-sm font-semibold text-brand-500">
                  A
                </span>
                <span className="hidden text-sm font-medium sm:block">Admin</span>
                <IconChevronDown
                  className={`h-4 w-4 text-gray-500 transition-transform ${userMenuOpen ? "rotate-180" : ""}`}
                />
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-3 w-60 rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg">
                  <div className="border-b border-gray-100 px-3 pb-3">
                    <p className="text-sm font-medium text-gray-800">Quản trị viên</p>
                    <p className="mt-0.5 text-xs text-gray-500">Nhất Tín Logistics</p>
                  </div>
                  <a
                    href="/"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                  >
                    <IconExternal className="h-5 w-5 text-gray-500" />
                    Xem landing page
                  </a>
                  <button
                    type="button"
                    onClick={logout}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                  >
                    <IconLogout className="h-5 w-5 text-gray-500" />
                    Đăng xuất
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-screen-2xl p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
