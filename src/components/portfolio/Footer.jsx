import { useState } from 'react';

function CopyEmail({ address, className }) {
  const [copied, setCopied] = useState(false);
  function handleCopy(e) {
    e.preventDefault();
    navigator.clipboard.writeText(address).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }
  return (
    <a
      href={`mailto:${address}`}
      onClick={handleCopy}
      className={className}
      title="Click to copy email address"
    >
      {copied ? 'Copied!' : address}
    </a>
  );
}

function navigateTo(id) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  } else {
    window.location.href = `/#${id}`;
  }
}

const NAV_LINKS = ['residences', 'philosophy', 'approach', 'inquiry'];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-limestone bg-ivory">
      <div className="editorial-container py-24 lg:py-32">

        {/* ── Four columns ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-10">

          {/* Studio */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
            <img
              src="/signature-black.svg"
              alt="Scott Arthur Yerkey"
              className="w-44 mb-7 -ml-1 opacity-85"
            />
            <p className="font-sans font-light text-[12px] text-warm-gray leading-[1.85] max-w-[220px]">
              Interior architecture and design for those who understand that the finest spaces
              are not decorated, but composed.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-5">
            <p className="label-caps-sm text-warm-gray/45 tracking-[0.35em] mb-1" style={{ fontSize: '7px' }}>
              Navigation
            </p>
            {NAV_LINKS.map((id) => (
              <button
                key={id}
                onClick={() => navigateTo(id)}
                className="label-caps-sm text-charcoal/75 hover:text-bronze tracking-[0.22em] capitalize text-left transition-colors duration-400 w-fit min-h-[44px] flex items-center"
              >
                {id}
              </button>
            ))}
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-5">
            <p className="label-caps-sm text-warm-gray/45 tracking-[0.35em] mb-1" style={{ fontSize: '7px' }}>
              Contact
            </p>
            <CopyEmail
              address="chris@scottarthuryerkey.com"
              className="font-sans font-light text-[11px] text-charcoal/75 hover:text-bronze transition-colors duration-400 min-h-[44px] flex items-center"
            />
            <a
              href="tel:+13127713538"
              className="font-sans font-light text-[11px] text-warm-gray hover:text-bronze transition-colors duration-400 min-h-[44px] flex items-center"
            >
              +1 (312) 771-3538
            </a>
            <p className="font-sans font-light text-[11px] text-warm-gray leading-[1.85] mt-2">
              4809 N Ravenswood Ave<br />Suite 117<br />Chicago, IL 60640
            </p>
          </div>

          {/* Studio note */}
          <div className="flex flex-col gap-5">
            <p className="label-caps-sm text-warm-gray/45 tracking-[0.35em] mb-1" style={{ fontSize: '7px' }}>
              Studio
            </p>
            <p className="font-sans font-light text-[11px] text-warm-gray leading-[1.85]">
              Commissions accepted by introduction. Initial inquiries in complete confidence.
            </p>
            <div className="mt-1">
              <p className="label-caps-sm text-warm-gray/40 tracking-[0.28em] mb-2" style={{ fontSize: '7px' }}>
                Service Markets
              </p>
              <p className="font-sans font-light text-[11px] text-warm-gray leading-[1.85]">
                Chicago &mdash; New York<br />London &mdash; Los Angeles
              </p>
            </div>
            <div className="mt-auto pt-6 flex flex-col gap-1">
              <p className="label-caps-sm text-warm-gray/25 tracking-[0.22em]" style={{ fontSize: '7px' }}>
                Site by FORM&AElig;TRIX
              </p>
              <p className="label-caps-sm text-warm-gray/20 tracking-[0.22em]" style={{ fontSize: '7px' }}>
                Ryan J. Pyles
              </p>
            </div>
          </div>

        </div>

        {/* ── Bottom bar ── */}
        <div className="mt-20 pt-7 border-t border-limestone flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="label-caps-sm text-warm-gray/40 tracking-[0.2em]" style={{ fontSize: '7px' }}>
            &copy; {year} Scott Arthur Yerkey Interiors. All Rights Reserved.
          </p>
          <p className="label-caps-sm text-warm-gray/40 tracking-[0.2em]" style={{ fontSize: '7px' }}>
            Chicago &mdash; New York &mdash; London &mdash; Los Angeles
          </p>
        </div>

      </div>
    </footer>
  );
}
