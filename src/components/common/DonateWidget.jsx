import { useEffect, useState } from "react";
import { Heart, X, Copy, Check, Landmark } from "lucide-react";

const PAYBILL = "522533";
const ACCOUNT_NUMBER = "8116577";
const ACCOUNT_NAME = "Goalkeepers Welfare Ass Kenya";
const BANK_NAME = "KCB Bank";

export default function DonateWidget() {
  const [open, setOpen] = useState(false);
  const [copiedField, setCopiedField] = useState(null);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleCopy = async (field, value) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(field);
      setTimeout(() => setCopiedField((current) => (current === field ? null : current)), 2000);
    } catch {
      // Clipboard API unavailable; user can still copy manually.
    }
  };

  const details = [
    { label: "Bank", value: BANK_NAME, copyable: false },
    { label: "Paybill Number", value: PAYBILL, copyable: true, field: "paybill" },
    { label: "Account Number", value: ACCOUNT_NUMBER, copyable: true, field: "account" },
    { label: "Account Name", value: ACCOUNT_NAME, copyable: true, field: "name" },
  ];

  return (
    <>
      {/* Floating Donate Button */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Donate to Goalkeepers Alliance"
        className="fixed bottom-6 right-6 z-50 group flex items-center gap-2 bg-linear-to-r from-orange-500 to-red-500 text-white pl-4 pr-5 py-4 rounded-full shadow-2xl shadow-orange-500/40 hover:shadow-orange-500/60 hover:scale-105 transition-all duration-300"
      >
        <span className="absolute inset-0 rounded-full bg-orange-500 animate-ping opacity-20"></span>
        <Heart size={20} className="relative fill-white" />
        <span className="relative hidden sm:inline font-black text-sm tracking-wide">Donate</span>
      </button>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="donate-modal-title"
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md bg-slate-950 border border-orange-500/20 rounded-2xl shadow-2xl shadow-orange-500/10 overflow-hidden"
          >
            {/* Decorative gradient glow */}
            <div className="absolute inset-0 bg-linear-to-br from-orange-600/10 via-red-600/5 to-slate-950 pointer-events-none"></div>
            <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-orange-500 to-transparent"></div>

            <button
              onClick={() => setOpen(false)}
              aria-label="Close donate dialog"
              className="absolute top-4 right-4 z-10 p-2 rounded-xl text-gray-400 hover:text-white hover:bg-orange-500/10 border border-transparent hover:border-orange-500/20 transition-all duration-300"
            >
              <X size={20} />
            </button>

            <div className="relative p-6 sm:p-8">
              {/* Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="shrink-0 h-14 w-14 rounded-2xl bg-linear-to-r from-orange-500 to-red-500 flex items-center justify-center shadow-lg shadow-orange-500/30">
                  <Heart size={26} className="fill-white text-white" />
                </div>
                <div>
                  <h2 id="donate-modal-title" className="text-white font-black text-xl leading-tight">
                    Support the Alliance
                  </h2>
                  <p className="text-orange-500/70 text-xs font-semibold tracking-wider uppercase mt-1">
                    Every contribution counts
                  </p>
                </div>
              </div>

              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Your donation helps us champion Kenyan goalkeepers through training, recognition and welfare support. Give via M-Pesa Paybill below.
              </p>

              {/* Payment Details Card */}
              <div className="bg-slate-900 border border-orange-500/20 rounded-xl p-4 sm:p-5 space-y-4">
                <div className="flex items-center gap-2 text-orange-500 text-xs font-black uppercase tracking-wider mb-1">
                  <Landmark size={14} />
                  <span>M-Pesa Paybill</span>
                </div>

                {details.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between gap-3 border-b border-orange-500/10 last:border-b-0 pb-3 last:pb-0"
                  >
                    <div className="min-w-0">
                      <p className="text-gray-500 text-xs font-semibold uppercase tracking-wide">{item.label}</p>
                      <p className="text-white font-bold text-sm sm:text-base truncate">{item.value}</p>
                    </div>
                    {item.copyable && (
                      <button
                        onClick={() => handleCopy(item.field, item.value)}
                        aria-label={`Copy ${item.label}`}
                        className="shrink-0 p-2 rounded-lg bg-slate-950 border border-orange-500/20 hover:border-orange-500/50 text-gray-400 hover:text-orange-500 transition-all duration-300"
                      >
                        {copiedField === item.field ? (
                          <Check size={16} className="text-green-500" />
                        ) : (
                          <Copy size={16} />
                        )}
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <p className="text-gray-500 text-xs text-center mt-6">
                Thank you for standing with Kenya's goalkeepers.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
