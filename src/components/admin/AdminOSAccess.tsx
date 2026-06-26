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
    <main className="min-h-dvh bg-[#F5F6F8] px-4 py-6 text-[#2D333A] sm:px-6">
      <section className="mx-auto flex min-h-[82dvh] w-full max-w-xl flex-col justify-center">
        <p className="text-sm text-[#6B7280]">\u540e\u53f0\u5165\u53e3 / Admin Access</p>
        <h1 className="mt-3 text-4xl font-semibold leading-tight text-[#2D333A]">Dohara Admin OS</h1>
        <p className="mt-4 text-base leading-8 text-[#6B7280]">
          \u5de5\u4e1a\u5316\u8fd0\u8425\u5165\u53e3\u3002\u7528\u4e8e\u5de5\u7a0b\u3001CMS\u3001\u7d20\u6750\u6cbb\u7406\u3001AI Operations\u3001\u652f\u4ed8\u3001GEO \u4e0e\u89c4\u5219\u8054\u52a8\u3002
        </p>

        <form onSubmit={enterAdmin} className="mt-8 space-y-4 border-t border-[#D9DCE0] pt-6">
          <label className="block text-sm leading-6 text-[#6B7280]" htmlFor="quiet-admin-phrase">
            \u540e\u53f0\u77ed\u8bed / Admin phrase
          </label>
          <input
            id="quiet-admin-phrase"
            value={phrase}
            onChange={(event) => setPhrase(event.target.value)}
            type="password"
            autoComplete="off"
            className="w-full rounded-xl border border-[#D9DCE0] bg-white px-4 py-3 text-base text-[#2D333A] outline-none transition-colors placeholder:text-[#9CA3AF] focus:border-[#A88C75]"
            placeholder="\u8f93\u5165\u540e\u53f0\u77ed\u8bed / Enter phrase"
          />
          <div className="flex items-center justify-between gap-3">
            <button
              type="submit"
              className="rounded-xl border border-[#947A66] bg-[#947A66] px-4 py-3 text-sm text-white transition-colors hover:border-[#A88C75] hover:bg-[#A88C75]"
            >
              \u8fdb\u5165\u540e\u53f0 / Enter Admin OS
            </button>
            <p className="text-right text-sm leading-5 text-[#6B7280]">{note}</p>
          </div>
        </form>
      </section>
    </main>
  );
}
