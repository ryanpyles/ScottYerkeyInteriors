import { useState } from 'react';
import { motion } from 'framer-motion';
import { VP } from './utils';

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
    <a href={`mailto:${address}`} onClick={handleCopy} className={className} title="Click to copy email address">
      {copied ? 'Copied!' : address}
    </a>
  );
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: VP('-60px'),
  transition: { duration: 1.0, delay, ease: [0.25, 0.1, 0.25, 1] },
});

export default function Inquiry() {
  const [form, setForm]       = useState({ name: '', email: '', project: '', message: '' });
  const [sent, setSent]       = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError]     = useState('');

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError('');
    try {
      const res = await fetch('/api/contact', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(form),
      });
      if (!res.ok) throw new Error((await res.json()).error || 'Send failed');
      setSent(true);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="bg-limestone/20 border-t border-limestone py-20 lg:py-56">
      <div className="editorial-container">

        {/* ── Header ── */}
        <motion.div className="flex items-center gap-5 mb-10 lg:mb-14" {...fadeUp(0)}>
          <span className="w-7 h-px bg-bronze shrink-0" />
          <span className="label-caps text-bronze tracking-[0.36em]">Begin a Conversation</span>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-32 xl:gap-48">

          {/* ── Left: Context ── */}
          <div>
            <motion.h2
              className="font-serif font-light text-charcoal leading-[1.05] mb-8 lg:mb-12
                         text-3xl md:text-5xl lg:text-[3.4rem] xl:text-[4rem]"
              {...fadeUp(0.1)}
            >
              Every considered<br />
              space begins<br />
              <em>with inquiry.</em>
            </motion.h2>

            <motion.p
              className="font-sans font-light text-[13px] lg:text-[14px] text-warm-gray leading-[1.9] max-w-sm"
              {...fadeUp(0.2)}
            >
              We accept a limited number of commissions each year. Initial conversations are conducted
              in complete confidence, with no obligation and absolute discretion.
            </motion.p>

            <motion.div className="mt-10 lg:mt-16 flex flex-col gap-1" {...fadeUp(0.3)}>
              <p className="label-caps-sm text-warm-gray/50 tracking-[0.3em] mb-2">Chicago, Illinois</p>
              <a href="tel:+13127713538" className="font-sans font-light text-[13px] text-charcoal/70 hover:text-bronze transition-colors duration-400 min-h-[44px] flex items-center">
                +1 (312) 771-3538
              </a>
              <CopyEmail
                address="chris@scottarthuryerkey.com"
                className="font-sans font-light text-[13px] text-charcoal/70 hover:text-bronze transition-colors duration-400 min-h-[44px] flex items-center"
              />
            </motion.div>
          </div>

          {/* ── Right: Form ── */}
          <motion.div {...fadeUp(0.2)}>
            {!sent ? (
              <form onSubmit={submit} className="flex flex-col gap-8 lg:gap-12">

                <Field label="Full Name"          name="name"    type="text"     value={form.name}    onChange={update} required />
                <Field label="Email Address"       name="email"   type="email"    value={form.email}   onChange={update} required />
                <Field label="Nature of Project"   name="project" type="text"     value={form.project} onChange={update}
                       placeholder="Residential, Estate, Penthouse…" />
                <Field label="Your Message"        name="message" type="textarea" value={form.message} onChange={update} required />

                {error && (
                  <p className="font-sans font-light text-[12px] text-bronze/80 -mt-4">{error}</p>
                )}

                <motion.button
                  type="submit"
                  disabled={sending}
                  className="flex items-center gap-4 mt-4 w-fit group disabled:opacity-50"
                  whileHover={sending ? {} : { x: 5 }}
                  transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <span className="label-caps text-[9px] tracking-[0.32em] text-charcoal group-hover:text-bronze transition-colors duration-400">
                    {sending ? 'Sending…' : 'Submit Inquiry'}
                  </span>
                  <span className="block h-px bg-charcoal group-hover:bg-bronze w-10 group-hover:w-16 transition-all duration-500 ease-refined" />
                </motion.button>

              </form>
            ) : (
              <motion.div
                className="flex flex-col gap-6 pt-8"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9 }}
              >
                <div className="w-7 h-px bg-bronze" />
                <h3 className="font-serif font-light text-charcoal text-4xl">Thank you.</h3>
                <p className="font-sans font-light text-[13px] text-warm-gray leading-[1.9] max-w-sm">
                  We have received your inquiry and will respond within two business days. We look
                  forward to learning more about your vision.
                </p>
              </motion.div>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
}

function Field({ label, name, type, value, onChange, required, placeholder }) {
  const base =
    'bg-transparent border-b border-limestone font-sans font-light text-[13px] text-charcoal py-3 outline-none ' +
    'focus:border-bronze transition-colors duration-500 placeholder:text-warm-gray/35 w-full';

  return (
    <div className="flex flex-col gap-3">
      <label className="label-caps-sm text-warm-gray/70 tracking-[0.3em]">{label}</label>
      {type === 'textarea' ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          rows={4}
          placeholder={placeholder}
          className={`${base} resize-none`}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          className={base}
        />
      )}
    </div>
  );
}
