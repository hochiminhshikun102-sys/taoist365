"use client";

import { useState } from "react";
import { quietAdminAccess } from "@/config/admin-access";

function readStoredAccess() {
  if (typeof window === "undefined") {
    return false;
  }

  return window.sessionStorage.getItem(quietAdminAccess.storageKey) === quietAdminAccess.storageValue;
}

export function AdminOSAccess({ children }: Readonly<{ children: React.ReactNode }>) {
  const [phrase, setPhrase] = useState("");
  const [isOpen, setIsOpen] = useState(readStoredAccess);
  const [note, setNote] = useState("");

  function enterAdmin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!quietAdminAccess.enabled) {
      setNote("后台短语未设置 / Admin phrase is not set.");
      return;
    }

    if (phrase.trim() !== quietAdminAccess.phrase) {
      setPhrase("");
      setNote("密码不正确 / Still closed.");
      return;
    }

    window.sessionStorage.setItem(quietAdminAccess.storageKey, quietAdminAccess.storageValue);
    setIsOpen(true);
  }

  if (isOpen) {
    return children;
  }

  return (
    <main className="min-h-dvh bg-[#070605] px-4 py-6 text-[#f1e7cf] sm:px-6">
      <section className="mx-auto flex min-h-[82dvh] w-full max-w-xl flex-col justify-center">
        <p className="text-sm text-[#9f8a60]">后台入口 / Admin Access</p>
        <h1 className="mt-3 text-4xl font-semibold leading-tight text-[#f3db9b]">Reverent Inquiry Admin OS</h1>
        <p className="mt-4 text-base leading-8 text-[#b9a878]">
          工业化运营入口。用于工程、CMS、素材治理、AI Operations、支付、GEO 与规则联动。
        </p>

        <form onSubmit={enterAdmin} className="mt-8 space-y-4 border-t border-[#2d2214] pt-6">
          <label className="block text-sm leading-6 text-[#9f8a60]" htmlFor="quiet-admin-phrase">
            后台短语 / Admin phrase
          </label>
          <input
            id="quiet-admin-phrase"
            value={phrase}
            onChange={(event) => setPhrase(event.target.value)}
            type="password"
            autoComplete="off"
            className="w-full rounded-xl border border-[#3b2c18] bg-[#100d09] px-4 py-3 text-base text-[#f1e7cf] outline-none transition-colors placeholder:text-[#6f6045] focus:border-[#d8bd78]"
            placeholder="输入后台短语 / Enter phrase"
          />
          <div className="flex items-center justify-between gap-3">
            <button
              type="submit"
              className="rounded-xl border border-[#8d7446]/55 bg-[#20180d] px-4 py-3 text-sm text-[#d8bd78] transition-colors hover:border-[#d8bd78]"
            >
              进入后台 / Enter Admin OS
            </button>
            <p className="text-right text-sm leading-5 text-[#9f8a60]">{note}</p>
          </div>
        </form>
      </section>
    </main>
  );
}
