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
      setNote("\u540e\u53f0\u77ed\u8bed\u672a\u8bbe\u7f6e / Admin phrase is not set.");
      return;
    }

    if (phrase.trim() !== quietAdminAccess.phrase) {
      setPhrase("");
      setNote("\u5bc6\u7801\u4e0d\u6b63\u786e / Still closed.");
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
        <p className="text-sm text-[#9f8a60]">\u540e\u53f0\u5165\u53e3 / Admin Access</p>
        <h1 className="mt-3 text-4xl font-semibold leading-tight text-[#f3db9b]">Reverent Inquiry Admin OS</h1>
        <p className="mt-4 text-base leading-8 text-[#b9a878]">
          \u5de5\u4e1a\u5316\u8fd0\u8425\u5165\u53e3\u3002\u7528\u4e8e\u5de5\u7a0b\u3001CMS\u3001\u7d20\u6750\u6cbb\u7406\u3001AI Operations\u3001\u652f\u4ed8\u3001GEO \u4e0e\u89c4\u5219\u8054\u52a8\u3002
        </p>

        <form onSubmit={enterAdmin} className="mt-8 space-y-4 border-t border-[#2d2214] pt-6">
          <label className="block text-sm leading-6 text-[#9f8a60]" htmlFor="quiet-admin-phrase">
            \u540e\u53f0\u77ed\u8bed / Admin phrase
          </label>
          <input
            id="quiet-admin-phrase"
            value={phrase}
            onChange={(event) => setPhrase(event.target.value)}
            type="password"
            autoComplete="off"
            className="w-full rounded-xl border border-[#3b2c18] bg-[#100d09] px-4 py-3 text-base text-[#f1e7cf] outline-none transition-colors placeholder:text-[#6f6045] focus:border-[#d8bd78]"
            placeholder="\u8f93\u5165\u540e\u53f0\u77ed\u8bed / Enter phrase"
          />
          <div className="flex items-center justify-between gap-3">
            <button
              type="submit"
              className="rounded-xl border border-[#8d7446]/55 bg-[#20180d] px-4 py-3 text-sm text-[#d8bd78] transition-colors hover:border-[#d8bd78]"
            >
              \u8fdb\u5165\u540e\u53f0 / Enter Admin OS
            </button>
            <p className="text-right text-sm leading-5 text-[#9f8a60]">{note}</p>
          </div>
        </form>
      </section>
    </main>
  );
}
