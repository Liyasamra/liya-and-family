"use client";
import { t } from "@/lib/i18n";
import { useState } from "react";
import { claimDeviceCode } from "@/lib/account-link";

// Lets a child's device join the parent account with a one-time code from the Parent portal.
export default function DeviceLink({ onClose }: { onClose: () => void }) {
  const [code, setCode] = useState(""), [busy, setBusy] = useState(false), [error, setError] = useState("");
  async function submit() {
    setBusy(true); setError("");
    try {
      const r = await claimDeviceCode(code);
      const q = new URLSearchParams({ student: r.studentId, ...(r.grade ? { grade: r.grade } : {}) });
      window.location.href = `./index.html?${q.toString()}#learn`;
    } catch (e) { setError(e instanceof Error ? e.message : t("Something went wrong. Please try again.")); setBusy(false); }
  }
  return <section className="device-link family-resource" aria-labelledby="device-link-title">
    <div className="section-title"><h2 id="device-link-title">{t("Link this device to a parent account")}</h2><button type="button" className="link-btn" onClick={onClose}>{t("Close")}</button></div>
    <p>{t("A parent makes a code in the")}{' '}<a href="./parent-portal.html">{t("Parent portal")}</a>{t(": open the child’s card and tap")}{' '}<strong>{t("Link a device")}</strong>{t(". Type the code here within 15 minutes.")}</p>
    <form onSubmit={e => { e.preventDefault(); void submit(); }}>
      <label className="field">{t("Link code")}<input value={code} onChange={e => setCode(e.target.value.toUpperCase())} placeholder={t("ABCD-EFGH")} maxLength={9} autoComplete="off" autoCapitalize="characters" inputMode="text" required pattern="[A-Za-z0-9]{4}-?[A-Za-z0-9]{4}" /></label>
      {error && <p className="auth-error" role="alert">{error}</p>}
      <button className="learn-btn" disabled={busy || code.replace(/[^A-Za-z0-9]/g, "").length !== 8}>{busy ? t("Linking…") : t("Link this device")}</button>
    </form>
    <p className="fine-print">{t("After linking, finished lessons and quizzes save to the parent account automatically. This device can only add results. It cannot see the account, names, or other children. A parent can unlink it anytime.")}</p>
  </section>;
}
