import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
  ArrowUpRight, ArrowRight, ArrowLeft, Check, ChevronDown, Sparkles, Lock
} from 'lucide-react';
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip,
  BarChart, Bar, CartesianGrid, Legend, LineChart, Line, Cell
} from 'recharts';
import { FORMSPREE } from '../../data/site.js';
import './legacy.css';

/* Recruiting pages (Epique agent model, calculators, revenue share), carried over
   from the original single-page site and re-skinned to the new palette. */

const C = {"bg": "#F4F1EA", "bg2": "#FAF8F3", "bg3": "#ECE6DA", "ink": "#0B0B0B", "ink2": "#4A463F", "ink3": "#5E584D", "gold": "#B9A27C", "goldDeep": "#7A6845", "goldLight": "#E3D7BF", "black": "#0B0B0B", "hair": "rgba(11,11,11,0.10)", "hairStrong": "rgba(11,11,11,0.16)"};

const fmt = (n) => '$' + Math.round(n).toLocaleString('en-US', { maximumFractionDigits: 0 });
const fmtK = (n) => Math.abs(n) >= 1000 ? '$' + (n / 1000).toFixed(Math.abs(n) >= 10000 ? 0 : 1) + 'k' : fmt(n);
const fmtM = (n) => Math.abs(n) >= 1000000 ? '$' + (n / 1000000).toFixed(2) + 'M' : fmtK(n);

// Shared submit helper. Returns true on success, false otherwise.
// Falls back to opening a mailto if the Formspree ID hasn't been configured yet,
// so no lead is ever lost during setup.
async function submitToFormspree({ formId, payload, mailtoSubject, mailtoBody, addToast }) {
  if (!formId || formId.startsWith('YOUR_')) {
    const subject = encodeURIComponent(mailtoSubject || 'Epique inquiry');
    const body = encodeURIComponent(mailtoBody || '');
    window.location.href = `mailto:DennisPrieto@Epique.me?cc=JaellyPrieto@Epique.me&subject=${subject}&body=${body}`;
    addToast && addToast('Opening your email client · Formspree not yet configured');
    return false;
  }
  try {
    const res = await fetch(`https://formspree.io/f/${formId}`, {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (res.ok) return true;
    const data = await res.json().catch(() => ({}));
    addToast && addToast(data?.errors?.[0]?.message || 'Could not send · Please try again');
    return false;
  } catch (err) {
    addToast && addToast('Network error · Please try again or email us directly');
    return false;
  }
}

/* ---------------- REVEAL HOOK ---------------- */
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current || visible) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); io.disconnect(); } }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [visible]);
  return [ref, visible];
}
const Reveal = ({ children, delay = 0, className = '' }) => {
  const [ref, visible] = useReveal();
  return <div ref={ref} className={`fade-up ${visible ? 'in' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
};

const Eyebrow = ({ children, color = C.gold }) => (
  <div className="ui-eyebrow flex items-center gap-3" style={{ color }}><span style={{ width: 28, height: 1, background: color, display: 'inline-block' }} />{children}</div>
);
const SectionHeading = ({ eyebrow, title, sub, align = 'left', inverted = false }) => (
  <div style={{ textAlign: align }}>
    {eyebrow && (<div style={{ display: align === 'center' ? 'flex' : 'block', justifyContent: 'center' }}><Eyebrow color={C.gold}>{eyebrow}</Eyebrow></div>)}
    <h2 className="font-display text-balance" style={{ fontSize: 'clamp(34px, 5vw, 64px)', fontWeight: 400, color: inverted ? '#F1EFE9' : C.ink, marginTop: 16, lineHeight: 1.05 }}>{title}</h2>
    {sub && (<p className="font-body text-balance" style={{ color: inverted ? 'rgba(241,239,233,0.7)' : C.ink2, fontSize: 17, lineHeight: 1.6, marginTop: 20, maxWidth: 620, marginLeft: align === 'center' ? 'auto' : 0, marginRight: align === 'center' ? 'auto' : 0 }}>{sub}</p>)}
  </div>
);
const ChoiceChip = ({ label, active, onClick }) => (
  <button onClick={onClick} className="px-4 py-2.5 text-xs transition-all" style={{ background: active ? C.ink : 'transparent', color: active ? '#fff' : C.ink, border: `1px solid ${active ? C.ink : C.hair}`, fontFamily: 'Inter', letterSpacing: '0.04em', fontWeight: 500 }}>{label}</button>
);
function InputSlider({ label, value, setValue, min, max, step = 1, display }) {
  const fillPct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="flex items-baseline justify-between mb-3"><div className="ui-eyebrow" style={{ color: C.ink2 }}>{label}</div><div className="font-display" style={{ fontSize: 26, fontWeight: 500 }}>{display}</div></div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => setValue(Number(e.target.value))} style={{ '--fill': `${fillPct}%` }} />
      <div className="flex justify-between text-xs mt-3" style={{ color: C.ink2 }}><span>{typeof min === 'number' && min >= 1000 ? fmtK(min) : min}</span><span>{typeof max === 'number' && max >= 1000 ? fmtK(max) : max}</span></div>
    </div>
  );
}
function BigStat({ label, value, accent, muted, large }) {
  return (<div><div className="ui-eyebrow" style={{ color: C.ink2 }}>{label}</div><div className="font-display mt-3" style={{ fontSize: large ? 'clamp(48px, 6.5vw, 80px)' : 'clamp(34px, 4vw, 52px)', fontWeight: 500, lineHeight: 1, color: accent ? C.gold : (muted ? C.ink2 : C.ink) }}>{value}</div></div>);
}
function MiniStat({ label, value }) {
  return (<div className="card-soft p-6"><div className="ui-eyebrow" style={{ color: C.ink2 }}>{label}</div><div className="font-display mt-3" style={{ fontSize: 28, fontWeight: 500 }}>{value}</div></div>);
}
function Field({ label, children }) {
  return (<label className="block"><div className="ui-eyebrow" style={{ color: C.ink2 }}>{label}</div><div className="mt-2">{children}</div></label>);
}
function SelectField({ label, value, onChange, options }) {
  return (
    <div>
      <div className="ui-eyebrow mb-2" style={{ color: C.ink2 }}>{label}</div>
      <div className="relative">
        <select value={value} onChange={(e) => onChange(e.target.value)} className="w-full appearance-none num-input pr-8" style={{ fontSize: 16, fontFamily: 'Inter', fontWeight: 500 }}>
          {options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
        <ChevronDown size={14} className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" color={C.ink2} />
      </div>
    </div>
  );
}

/* ---------------- COMPARISON TABLE ---------------- */
const ComparisonTable = () => {
  const rows = [
    ['Commission Split', '85 / 15', '60–70 / 30–40', '80 / 20'],
    ['Annual Cap', '$15,000', 'None', '$16,000+'],
    ['Monthly Fee', '$150 all-inclusive', '$200–$1,200+', '$85–$149'],
    ['Tech Stack', 'Built-in, unified', 'Patchwork', 'Built-in'],
    ['Revenue Share', '5 levels · 10% co. $', 'None', 'Limited tiers'],
    ['Stock / Equity', 'Yes', 'No', 'Yes'],
    ['Training Included', 'Yes', 'Limited', 'Yes'],
    ['Declining Cap', 'Yes · to $10k floor', 'No', 'No'],
  ];
  return (
    <div className="card-soft overflow-hidden">
      <div className="grid grid-cols-4 px-6 py-5 ui-eyebrow" style={{ color: C.ink2, background: C.bg2, gap: 16 }}>
        <div></div><div className="text-center" style={{ color: C.gold }}>Epique</div><div className="text-center">Traditional</div><div className="text-center">Cloud Brokerage</div>
      </div>
      {rows.map(([label, p, t, c], i) => (
        <div key={i} className="grid grid-cols-4 px-6 py-5 items-center hairline border-t" style={{ gap: 16 }}>
          <div className="text-sm font-medium">{label}</div>
          <div className="text-center font-display" style={{ fontSize: 16, color: C.gold }}>{p}</div>
          <div className="text-center text-sm" style={{ color: C.ink2 }}>{t}</div>
          <div className="text-center text-sm" style={{ color: C.ink2 }}>{c}</div>
        </div>
      ))}
    </div>
  );
};

/* ---------------- FAQ ---------------- */
const FAQItem = ({ q, children }) => (
  <details className="hairline border-b">
    <summary className="flex items-center justify-between py-6 group">
      <span className="font-display pr-8 text-balance" style={{ fontSize: 'clamp(18px, 2vw, 22px)', fontWeight: 500 }}>{q}</span>
      <ChevronDown size={20} className="chev flex-shrink-0" color={C.gold} />
    </summary>
    <div className="pb-6 pr-8" style={{ color: C.ink2, lineHeight: 1.7, fontSize: 15 }}>{children}</div>
  </details>
);

function AgentEcosystemPage({ go }) {
  return (
    <main style={{ background: C.bg }}>
      <section className="pt-16 pb-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="auto-fade-up"><Eyebrow>The Agent Ecosystem</Eyebrow></div>
          <h1 className="font-display auto-fade-up delay-1 mt-8 text-balance" style={{ fontSize: 'clamp(44px, 8vw, 110px)', lineHeight: 1, fontWeight: 400 }}>Built for the<br /><em style={{ color: C.gold, fontStyle: 'italic' }}>agent of the next decade.</em></h1>
          <p className="auto-fade-up delay-2 mt-10" style={{ color: C.ink2, fontSize: 19, lineHeight: 1.6, maxWidth: 680 }}>Transparent economics. Modern technology. Generational wealth tools. Epique was built by agents — for the agents who refuse the old paradigm.</p>
          <div className="auto-fade-up delay-3 mt-10 flex flex-wrap gap-4"><button onClick={() => go('usa')} className="lux-btn lux-btn-primary">Open Calculator <ArrowUpRight size={14} /></button><button onClick={() => go('contact')} className="lux-btn lux-btn-ghost">Book Consultation <ArrowRight size={14} /></button></div>
        </div>
      </section>

      <section className="py-20" style={{ background: C.bg2 }}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <Reveal><SectionHeading eyebrow="Benefits & Costs" title="Transparent. To the dollar." /></Reveal>
          <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {[{ t: 'Commission Split', big: '85 / 15', d: 'Agent keeps 85% of every commission until cap.' }, { t: 'Annual Cap', big: '$15,000', d: '100% commission after cap — minus a transaction fee of 0.1% of the sales price.' }, { t: 'Monthly Fee', big: '$150', d: 'All-in. Tech, CRM, training, support. No nickel-and-diming.' }].map((c, i) => (
              <Reveal key={c.t} delay={i * 100}><div className="card-soft card-soft-lift p-10 h-full"><Eyebrow>{c.t}</Eyebrow><div className="font-display mt-6" style={{ fontSize: 64, fontWeight: 500, lineHeight: 1 }}>{c.big}</div><p className="mt-6" style={{ color: C.ink2, lineHeight: 1.65 }}>{c.d}</p></div></Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <Reveal className="lg:col-span-5">
              <Eyebrow>Declining Cap</Eyebrow>
              <h2 className="font-display mt-6 text-balance" style={{ fontSize: 'clamp(32px, 4vw, 56px)', lineHeight: 1.05 }}>Your cap drops $1,000 every year — to a $10,000 floor.</h2>
              <p className="mt-8" style={{ color: C.ink2, lineHeight: 1.65 }}>Your annual cap decreases by $1,000 for each year you're with Epique, until it reaches $10,000 — where it stays for the rest of your time. The longer you stay, the less you pay.</p>
              <ul className="mt-8 space-y-3 text-sm" style={{ color: C.ink2 }}><li className="flex items-start gap-3"><span style={{ color: C.gold, marginTop: 3 }}>—</span> Starts at $15,000 in your first year</li><li className="flex items-start gap-3"><span style={{ color: C.gold, marginTop: 3 }}>—</span> Reduces $1,000 each year thereafter</li><li className="flex items-start gap-3"><span style={{ color: C.gold, marginTop: 3 }}>—</span> Floors at $10,000 and holds permanently</li></ul>
            </Reveal>
            <Reveal delay={120} className="lg:col-span-7"><div className="card-soft p-2"><div className="p-8">
              <div className="ui-eyebrow" style={{ color: C.ink2 }}>Year-over-year cap</div>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={[{ y: 'Year 1', cap: 15000 }, { y: 'Year 2', cap: 14000 }, { y: 'Year 3', cap: 13000 }, { y: 'Year 4', cap: 12000 }, { y: 'Year 5', cap: 11000 }, { y: 'Year 6+', cap: 10000 }]}>
                  <CartesianGrid stroke={C.hair} vertical={false} /><XAxis dataKey="y" stroke={C.ink2} fontSize={11} /><YAxis stroke={C.ink2} fontSize={11} domain={[0, 16000]} tickFormatter={(v) => '$' + (v / 1000) + 'k'} />
                  <Tooltip contentStyle={{ background: '#fff', border: `1px solid ${C.hair}`, borderRadius: 0, fontFamily: 'Inter', fontSize: 12 }} formatter={(v) => [fmt(v), 'Annual cap']} />
                  <Bar dataKey="cap" fill={C.gold} radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
              <p className="text-xs mt-4" style={{ color: C.ink2 }}>* Cap reduces $1,000 per year to a $10,000 floor, then holds.</p>
            </div></div></Reveal>
          </div>
        </div>
      </section>

      <section className="py-20" style={{ background: C.bg2 }}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <Reveal><SectionHeading eyebrow="Platform" title="A single, unified operating system." /></Reveal>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: C.hair }}>
            {[{ t: 'Technology', d: 'CRM, IDX websites, smart lead routing, AI assistants, transaction OS. Connected, not stitched.', items: ['Unified CRM', 'AI assistant', 'Lead routing', 'Transaction OS'] }, { t: 'Training', d: 'Daily mentorship calls, weekly masterclasses, on-demand academy, and a private business school for agents.', items: ['Daily mentorship', 'Masterclasses', 'Business school', 'On-demand library'] }, { t: 'Support', d: 'Live broker support across business hours, marketing studio, compliance, and area leaders when you need them.', items: ['Live broker desk', 'Marketing studio', 'Compliance', 'Area leaders'] }, { t: 'Community', d: 'Annual leadership conference, regional summits, private mastermind groups, and peer accountability circles.', items: ['Annual conference', 'Regional summits', 'Masterminds', 'Peer circles'] }].map((b, i) => (
              <Reveal key={b.t} delay={i * 80}><div className="bg-white p-12 h-full"><h3 className="font-display" style={{ fontSize: 30, fontWeight: 500 }}>{b.t}</h3><p className="mt-5" style={{ color: C.ink2, lineHeight: 1.65 }}>{b.d}</p><ul className="mt-6 grid grid-cols-2 gap-2 text-sm">{b.items.map((x) => (<li key={x} className="flex items-center gap-2" style={{ color: C.ink2 }}><span style={{ color: C.gold }}>—</span>{x}</li>))}</ul></div></Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <Reveal><SectionHeading eyebrow="Side by Side" title="See the difference at a glance." /></Reveal>
          <div className="mt-12"><Reveal><ComparisonTable /></Reveal></div>
        </div>
      </section>

      <section className="py-20" style={{ background: C.bg2 }}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <Reveal><div className="ink-card p-12 grain h-full"><Eyebrow color={C.gold}>Revenue Share</Eyebrow><h3 className="font-display mt-6" style={{ fontSize: 'clamp(28px, 3.4vw, 44px)', lineHeight: 1.1, color: '#F1EFE9' }}>5 levels of residual income.</h3><p className="mt-6" style={{ color: 'rgba(241,239,233,0.75)', lineHeight: 1.65 }}>Sponsor agents and earn 10% of Epique's company dollar across five levels of your downline — 20% on Level 1 with Power Award. A true compounding asset.</p><button onClick={() => go('revshare')} className="lux-btn lux-btn-gold mt-10">Explore Revenue Share <ArrowUpRight size={14} /></button></div></Reveal>
            <Reveal delay={120}><div className="card-soft p-12 h-full"><Eyebrow>Stock & Equity</Eyebrow><h3 className="font-display mt-6" style={{ fontSize: 'clamp(28px, 3.4vw, 44px)', lineHeight: 1.1 }}>Real ownership. Real growth.</h3><p className="mt-6" style={{ color: C.ink2, lineHeight: 1.65 }}>Agents participate in stock programs tied directly to platform growth — turning production into long-term equity, not just commission.</p><button onClick={() => go('contact')} className="lux-btn lux-btn-primary mt-10">Book Consultation <ArrowUpRight size={14} /></button></div></Reveal>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-10">
          <Reveal><SectionHeading eyebrow="Frequently Asked" title="Answers to the questions that matter." /></Reveal>
          <div className="mt-12"><Reveal>
            <FAQItem q="How does the 85/15 commission split actually work?">You keep 85% of every commission you earn. The remaining 15% goes to the brokerage — but only until you hit your annual cap of $15,000. After cap, you keep 100% of every commission, minus a small transaction fee of 0.1% of the sales price.</FAQItem>
            <FAQItem q="What's actually included in the $150/month?">Everything. Your CRM, IDX-enabled website, lead routing tools, transaction OS, training library, broker support, compliance, marketing templates, and full platform access. No upsells, no surprise fees.</FAQItem>
            <FAQItem q="How does the declining cap work?">Your annual cap is reduced by $1,000 each year you're with Epique — from $15,000 in year one — until it reaches a $10,000 floor, where it remains for the rest of your time. The longer you stay, the less you pay.</FAQItem>
            <FAQItem q="What is revenue share — and is it like an MLM?">Revenue share is a residual income stream paid to you when you sponsor other agents to join the platform. It is paid out of the brokerage's share — not the sponsored agent's commission. You earn across 5 levels of your sponsorship downline — 10% of Epique's company dollar (the 15% Epique keeps), and 20% on Level 1 with Power Award. There is nothing to buy.</FAQItem>
            <FAQItem q="How does the stock / equity program work?">Eligible agents participate in a stock program tied to platform performance. The specifics — vesting, thresholds, and structure — are confirmed during your private consultation. As the platform grows, you grow with it.</FAQItem>
            <FAQItem q="Can I bring my team?">Yes. There are dedicated team economics, including overrides and team caps. Use the Team Calculator to model your team's numbers before a conversation.</FAQItem>
            <FAQItem q="What's the onboarding process?">A single, confidential conversation. We model your current economics, walk you through the platform, answer every question, and provide a side-by-side comparison. Onboarding typically takes 7–14 days depending on your state's licensing transfer.</FAQItem>
          </Reveal></div>
        </div>
      </section>

      <section className="py-24" style={{ background: C.black, color: '#F1EFE9' }}>
        <div className="max-w-[1100px] mx-auto px-6 lg:px-10 text-center"><Reveal><h2 className="font-display text-balance" style={{ fontSize: 'clamp(34px, 5vw, 64px)', lineHeight: 1.05, color: '#F1EFE9' }}>Ready to build differently?</h2><p className="mt-6 mx-auto" style={{ color: 'rgba(241,239,233,0.7)', maxWidth: 520, lineHeight: 1.6 }}>One conversation. A custom comparison of your current and future economics. Confidential, always.</p><button onClick={() => go('contact')} className="lux-btn lux-btn-gold mt-10">Book Private Consultation <ArrowUpRight size={14} /></button></Reveal></div>
      </section>
    </main>
  );
}

/* ---------------- USA CALCULATOR ---------------- */
function USACalculator({ go, addToast }) {
  const [deals, setDeals] = useState(24);
  const [price, setPrice] = useState(450000);
  const [commission, setCommission] = useState(2.5);
  const [tradSplit, setTradSplit] = useState(70);
  const [years, setYears] = useState(5);
  const calc = useMemo(() => {
    const cap = 15000, feeRate = 0.001;
    const perDealGci = price * (commission / 100);
    const gci = deals * perDealGci;
    const dealsToCap = Math.ceil(cap / (perDealGci * 0.15));
    const brokerageTake = Math.min(gci * 0.15, cap);
    const postCapDeals = Math.max(0, deals - dealsToCap);
    const postCapFees = postCapDeals * (price * feeRate);
    const totalKept = gci - brokerageTake - postCapFees;
    const tradKept = gci * (tradSplit / 100);
    const advantage = totalKept - tradKept;
    const monthly = []; const dpm = deals / 12;
    for (let m = 1; m <= 12; m++) { const cumGci = perDealGci * dpm * m; const cumBroker = Math.min(cumGci * 0.15, cap); const cumPostCap = Math.max(0, (m * dpm - dealsToCap)) * (price * feeRate); monthly.push({ month: `M${m}`, Epique: Math.max(0, cumGci - cumBroker - cumPostCap), Traditional: cumGci * (tradSplit / 100) }); }
    const yearly = []; let cE = 0, cT = 0;
    for (let y = 1; y <= years; y++) { const g = Math.pow(1.08, y - 1); const yGci = gci * g; const yBroker = Math.min(yGci * 0.15, cap); const yPost = Math.max(0, (deals * g - dealsToCap)) * (price * feeRate); cE += yGci - yBroker - yPost; cT += yGci * (tradSplit / 100); yearly.push({ year: `Y${y}`, Epique: cE, Traditional: cT }); }
    return { gci, brokerageTake, dealsToCap, postCapFees, totalKept, tradKept, advantage, monthly, yearly };
  }, [deals, price, commission, tradSplit, years]);
  return (
    <main style={{ background: C.bg }}>
      <section className="pt-16 pb-12"><div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <button onClick={() => go('home')} className="ui-eyebrow flex items-center gap-2 mb-8" style={{ color: C.ink2 }}><ArrowLeft size={12} /> Back to Home</button>
        <div className="auto-fade-up"><Eyebrow>USA Calculator</Eyebrow></div>
        <h1 className="font-display auto-fade-up delay-1 mt-8 text-balance" style={{ fontSize: 'clamp(40px, 6.5vw, 86px)', lineHeight: 1.02 }}>Model your earnings.<br /><em style={{ color: C.gold, fontStyle: 'italic' }}>To the dollar.</em></h1>
        <p className="auto-fade-up delay-2 mt-8 max-w-2xl" style={{ color: C.ink2, fontSize: 17, lineHeight: 1.6 }}>Adjust your inputs to model your annual income under the Epique 85/15 cap model versus your current brokerage. Updates in real time.</p>
      </div></section>
      <section className="pb-20"><div className="max-w-[1400px] mx-auto px-6 lg:px-10"><div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5"><div className="card-soft p-10 lg:sticky lg:top-28">
          <div className="flex items-center justify-between"><Eyebrow>Your Inputs</Eyebrow><button onClick={() => { setDeals(24); setPrice(450000); setCommission(2.5); setTradSplit(70); setYears(5); addToast('Reset to defaults'); }} className="ui-eyebrow link-under" style={{ color: C.ink2, fontSize: 10 }}>Reset</button></div>
          <div className="space-y-9 mt-10">
            <InputSlider label="Transactions per year" value={deals} setValue={setDeals} min={1} max={120} display={deals} />
            <InputSlider label="Avg sales price" value={price} setValue={setPrice} min={100000} max={3000000} step={25000} display={fmt(price)} />
            <InputSlider label="Your commission %" value={commission} setValue={setCommission} min={1} max={3.5} step={0.05} display={commission.toFixed(2) + '%'} />
            <InputSlider label="Current brokerage — your take-home % of GCI" value={tradSplit} setValue={setTradSplit} min={50} max={95} step={1} display={tradSplit + '%'} />
            <InputSlider label="Projection horizon (years)" value={years} setValue={setYears} min={1} max={10} display={years + ' yrs'} />
          </div>
          <div className="mt-10 pt-8 hairline border-t"><button onClick={() => go('contact')} className="lux-btn lux-btn-primary w-full justify-center">Talk to an Advisor <ArrowUpRight size={14} /></button></div>
        </div></div>
        <div className="lg:col-span-7 space-y-6">
          <div className="card-soft p-8 lg:p-10"><Eyebrow>Annual Result</Eyebrow>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-8"><BigStat label="You keep with Epique" value={fmt(calc.totalKept)} accent /><BigStat label="You keep currently" value={fmt(calc.tradKept)} muted /></div>
            <div className="mt-10 pt-8 hairline border-t"><div className="ui-eyebrow" style={{ color: C.ink2 }}>Your annual advantage</div><div className="font-display mt-3" style={{ fontSize: 'clamp(40px, 5vw, 64px)', color: calc.advantage >= 0 ? C.gold : C.ink, fontWeight: 500 }}>{calc.advantage >= 0 ? '+' : ''}{fmt(calc.advantage)}</div><p className="text-sm mt-3" style={{ color: C.ink2 }}>Compared to a {tradSplit}% traditional split on identical production.</p></div>

            {/* Assumptions disclosure */}
            <details className="mt-8 pt-6 hairline border-t">
              <summary className="flex items-center justify-between group cursor-pointer">
                <div className="ui-eyebrow" style={{ color: C.gold }}>How "You keep currently" is calculated</div>
                <ChevronDown size={16} className="chev" color={C.gold} />
              </summary>
              <div className="mt-6 text-sm" style={{ color: C.ink2, lineHeight: 1.75 }}>
                <p>This is a simple, conservative split-only model based on the inputs above:</p>
                <div className="mt-4 p-5" style={{ background: C.bg2, fontFamily: 'Inter' }}>
                  <div style={{ color: C.ink, fontSize: 13 }}><strong>You keep currently</strong> = GCI × your take-home %</div>
                  <div className="mt-2 text-xs" style={{ color: C.ink3 }}>
                    where <strong style={{ color: C.ink }}>GCI</strong> = transactions × avg sales price × your commission %
                  </div>
                  <div className="mt-3 pt-3 border-t" style={{ borderColor: C.hair, fontSize: 12, color: C.ink2 }}>
                    Example with your current inputs:<br />
                    GCI = {deals} × {fmt(price)} × {commission.toFixed(2)}% = <strong style={{ color: C.ink }}>{fmt(calc.gci)}</strong><br />
                    You keep currently = {fmt(calc.gci)} × {tradSplit}% = <strong style={{ color: C.ink }}>{fmt(calc.tradKept)}</strong>
                  </div>
                </div>
                <div className="mt-5">
                  <div className="ui-eyebrow" style={{ color: C.ink2, fontSize: 10 }}>Assumed for the comparison</div>
                  <ul className="mt-3 space-y-1.5">
                    <li>· Your traditional brokerage takes a flat percentage of every commission — no cap, no 100% tier.</li>
                    <li>· Production is identical to the Epique scenario (same transactions, price, commission %).</li>
                    <li>· The 8% annual production growth applied in the multi-year chart applies to both scenarios equally.</li>
                  </ul>
                </div>
                <div className="mt-5">
                  <div className="ui-eyebrow" style={{ color: C.ink2, fontSize: 10 }}>Not deducted from "You keep currently"</div>
                  <ul className="mt-3 space-y-1.5">
                    <li>· Monthly desk / office / technology fees</li>
                    <li>· Per-transaction fees, franchise royalties, or E&amp;O insurance</li>
                    <li>· Marketing, CRM, lead-source, or training subscriptions</li>
                    <li>· Income, self-employment, or business taxes</li>
                  </ul>
                  <p className="mt-4 text-xs" style={{ color: C.ink3 }}>
                    Because these real-world costs are excluded, the traditional figure shown is generous —
                    your actual take-home at most brokerages is typically lower than what's displayed here.
                  </p>
                </div>
                <div className="mt-5">
                  <div className="ui-eyebrow" style={{ color: C.ink2, fontSize: 10 }}>For "You keep with Epique"</div>
                  <p className="mt-3">85% pre-cap, then 100% after the <strong style={{ color: C.ink }}>$15,000 annual cap</strong>, minus a per-transaction fee of <strong style={{ color: C.ink }}>0.1% of sales price</strong> on post-cap deals. Monthly tech fees are not included in either side of this comparison.</p>
                </div>
              </div>
            </details>
          </div>
          <div className="card-soft p-8 lg:p-10"><Eyebrow>Cumulative Earnings — Monthly</Eyebrow><div className="mt-6"><ResponsiveContainer width="100%" height={280}><AreaChart data={calc.monthly}><defs><linearGradient id="gp" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={C.gold} stopOpacity={0.35} /><stop offset="100%" stopColor={C.gold} stopOpacity={0} /></linearGradient><linearGradient id="gt" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={C.ink} stopOpacity={0.2} /><stop offset="100%" stopColor={C.ink} stopOpacity={0} /></linearGradient></defs><CartesianGrid stroke={C.hair} vertical={false} /><XAxis dataKey="month" stroke={C.ink2} fontSize={11} /><YAxis stroke={C.ink2} fontSize={11} tickFormatter={(v) => fmtK(v)} /><Tooltip contentStyle={{ background: '#fff', border: `1px solid ${C.hair}`, fontFamily: 'Inter', fontSize: 12 }} formatter={(v) => fmt(v)} /><Legend wrapperStyle={{ fontFamily: 'Inter', fontSize: 12 }} /><Area type="monotone" dataKey="Epique" stroke={C.gold} strokeWidth={2} fill="url(#gp)" /><Area type="monotone" dataKey="Traditional" stroke={C.ink} strokeWidth={1.5} fill="url(#gt)" /></AreaChart></ResponsiveContainer></div></div>
          <div className="card-soft p-8 lg:p-10"><Eyebrow>{years}-Year Cumulative Projection</Eyebrow><p className="text-sm mt-3" style={{ color: C.ink2 }}>Assumes 8% annual production growth · For illustration only</p><div className="mt-6"><ResponsiveContainer width="100%" height={260}><LineChart data={calc.yearly}><CartesianGrid stroke={C.hair} vertical={false} /><XAxis dataKey="year" stroke={C.ink2} fontSize={11} /><YAxis stroke={C.ink2} fontSize={11} tickFormatter={(v) => fmtK(v)} /><Tooltip contentStyle={{ background: '#fff', border: `1px solid ${C.hair}`, fontFamily: 'Inter', fontSize: 12 }} formatter={(v) => fmt(v)} /><Legend wrapperStyle={{ fontFamily: 'Inter', fontSize: 12 }} /><Line type="monotone" dataKey="Epique" stroke={C.gold} strokeWidth={2.5} dot={{ fill: C.gold, r: 4 }} /><Line type="monotone" dataKey="Traditional" stroke={C.ink} strokeWidth={1.5} strokeDasharray="4 4" dot={{ fill: C.ink, r: 3 }} /></LineChart></ResponsiveContainer></div><div className="mt-6 pt-6 hairline border-t"><div className="ui-eyebrow" style={{ color: C.ink2 }}>{years}-year total advantage</div><div className="font-display mt-2" style={{ fontSize: 32, color: C.gold, fontWeight: 500 }}>+{fmt(calc.yearly[calc.yearly.length - 1].Epique - calc.yearly[calc.yearly.length - 1].Traditional)}</div></div></div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6"><MiniStat label="Total GCI" value={fmt(calc.gci)} /><MiniStat label="Brokerage Take" value={fmt(calc.brokerageTake + calc.postCapFees)} /><MiniStat label="Deals to Cap" value={`${calc.dealsToCap}`} /></div>
        </div>
      </div></div></section>
    </main>
  );
}

/* ---------------- CANADA — ACCESS REQUIRED GATE ---------------- */
function CanadaCalculator({ go, addToast }) {
  const [mode, setMode] = useState('request'); // 'request' | 'status'
  const [form, setForm] = useState({ name: '', email: '', phone: '', province: '', brokerage: '' });
  const [statusEmail, setStatusEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const PROVINCES = ['Alberta', 'British Columbia', 'Manitoba', 'New Brunswick', 'Newfoundland and Labrador', 'Nova Scotia', 'Ontario', 'Prince Edward Island', 'Quebec', 'Saskatchewan', 'Northwest Territories', 'Nunavut', 'Yukon'];

  const submitRequest = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.province) { addToast('Please complete the required fields'); return; }
    if (sending) return;
    setSending(true);
    const ok = await submitToFormspree({
      formId: FORMSPREE.canadaAccess,
      payload: {
        name: form.name,
        email: form.email,
        phone: form.phone,
        province: form.province,
        current_brokerage: form.brokerage,
        _subject: `Canada Access Request — ${form.name} (${form.province})`,
        _replyto: form.email,
      },
      mailtoSubject: `Canada Access Request — ${form.name}`,
      mailtoBody: `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone || '—'}\nProvince: ${form.province}\nCurrent brokerage: ${form.brokerage || '—'}`,
      addToast,
    });
    setSending(false);
    if (ok) { setSubmitted(true); addToast('Access request received · We will review and respond'); }
  };
  const checkStatus = (e) => {
    e.preventDefault();
    if (!statusEmail) { addToast('Enter the email you applied with'); return; }
    addToast('No decision on file yet · You will be notified by email');
  };

  return (
    <main style={{ background: C.bg }}>
      <section className="pt-16 pb-32">
        <div className="max-w-[760px] mx-auto px-6 lg:px-10">
          <button onClick={() => go('home')} className="ui-eyebrow flex items-center gap-2 mb-10" style={{ color: C.ink2 }}><ArrowLeft size={12} /> Back to Home</button>

          {/* Canada Exclusive badge */}
          <div className="flex items-center justify-center gap-4 auto-fade-up">
            <CanadaFlag />
            <span className="ui-eyebrow px-4 py-2" style={{ color: C.gold, border: `1px solid ${C.gold}` }}>Canada Exclusive</span>
            <CanadaFlag />
          </div>

          {/* Lock + heading */}
          <div className="text-center mt-10 auto-fade-up delay-1">
            <div className="mx-auto flex items-center justify-center" style={{ width: 56, height: 56, borderRadius: 999, border: `1px solid ${C.gold}` }}>
              <Lock size={22} color={C.gold} strokeWidth={1.5} />
            </div>
            <h1 className="font-display mt-8 text-balance" style={{ fontSize: 'clamp(40px, 6vw, 72px)', lineHeight: 1.02, fontWeight: 400 }}>Access Required</h1>
            <p className="mt-8 text-balance mx-auto" style={{ color: C.ink2, fontSize: 18, lineHeight: 1.6, maxWidth: 560 }}>
              The <strong style={{ color: C.ink, fontWeight: 600 }}>Epique Canada Cost &amp; Commission Calculator</strong> is exclusively available to Canadian real estate agents. All figures are in <strong style={{ color: C.gold, fontWeight: 600 }}>Canadian Dollars (CAD)</strong>.
            </p>
            <p className="mt-5 text-balance mx-auto" style={{ color: C.ink3, fontSize: 14, lineHeight: 1.6, maxWidth: 520 }}>
              Dennis Prieto personally reviews and approves each access request.
            </p>
          </div>

          {/* Toggle */}
          <div className="mt-12 card-soft p-2 flex gap-2 auto-fade-up delay-2">
            <button onClick={() => { setMode('request'); setSubmitted(false); }} className="flex-1 py-4 text-center transition-all" style={{ background: mode === 'request' ? C.ink : 'transparent', color: mode === 'request' ? '#fff' : C.ink, fontFamily: 'Inter', fontWeight: 500, fontSize: 14, letterSpacing: '0.04em' }}>Request Access</button>
            <button onClick={() => setMode('status')} className="flex-1 py-4 text-center transition-all" style={{ background: mode === 'status' ? C.ink : 'transparent', color: mode === 'status' ? '#fff' : C.ink2, fontFamily: 'Inter', fontWeight: 500, fontSize: 14, letterSpacing: '0.04em' }}>Check My Status</button>
          </div>

          {/* Panel */}
          <div className="mt-8 card-soft p-8 lg:p-12 auto-fade-up delay-3">
            {mode === 'request' ? (
              submitted ? (
                <div className="text-center py-12">
                  <div className="mx-auto w-14 h-14 flex items-center justify-center" style={{ background: C.gold, color: C.ink, borderRadius: 999 }}><Check size={24} /></div>
                  <h3 className="font-display mt-8" style={{ fontSize: 30, fontWeight: 500 }}>Request received, {form.name.split(' ')[0] || 'thank you'}.</h3>
                  <p className="mt-4 mx-auto" style={{ color: C.ink2, lineHeight: 1.65, maxWidth: 420 }}>
                    Your access request has been submitted for personal review. You'll receive an email at <strong style={{ color: C.ink }}>{form.email}</strong> once it's approved, with your link to the Canada calculator.
                  </p>
                  <button onClick={() => { setMode('status'); }} className="lux-btn lux-btn-ghost mt-10">Check My Status <ArrowRight size={14} /></button>
                </div>
              ) : (
                <form onSubmit={submitRequest} className="space-y-7">
                  <Field label="Full Name *"><input className="num-input" type="text" required value={form.name} onChange={set('name')} placeholder="Jane Smith" /></Field>
                  <Field label="Email Address *"><input className="num-input" type="email" required value={form.email} onChange={set('email')} placeholder="jane@example.com" /></Field>
                  <Field label="Phone Number"><input className="num-input" type="tel" value={form.phone} onChange={set('phone')} placeholder="(416) 555-0100" /></Field>
                  <div>
                    <div className="ui-eyebrow mb-2" style={{ color: C.ink2 }}>Province *</div>
                    <div className="relative">
                      <select required value={form.province} onChange={set('province')} className="w-full appearance-none num-input pr-8" style={{ fontSize: 16, fontFamily: 'Inter', fontWeight: 500, color: form.province ? C.ink : C.ink3 }}>
                        <option value="" disabled>Select your province</option>
                        {PROVINCES.map((p) => <option key={p} value={p} style={{ color: C.ink }}>{p}</option>)}
                      </select>
                      <ChevronDown size={14} className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" color={C.ink2} />
                    </div>
                  </div>
                  <Field label="Current Brokerage"><input className="num-input" type="text" value={form.brokerage} onChange={set('brokerage')} placeholder="e.g. RE/MAX, Royal LePage, Century 21…" style={{ fontSize: 16, fontFamily: 'Inter' }} /></Field>
                  <div className="pt-4">
                    <button type="submit" disabled={sending} className="lux-btn lux-btn-primary w-full justify-center" style={{ opacity: sending ? 0.65 : 1, cursor: sending ? 'wait' : 'pointer' }}>{sending ? 'Sending…' : <><Sparkles size={14} /> Request Access to Canada Calculator</>}</button>
                    <p className="text-xs mt-4 text-center" style={{ color: C.ink2 }}>Limited to licensed Canadian agents. Each request is personally reviewed.</p>
                  </div>
                </form>
              )
            ) : (
              <form onSubmit={checkStatus} className="space-y-7">
                <p style={{ color: C.ink2, lineHeight: 1.6 }}>Enter the email you used to request access and we'll look up your status.</p>
                <Field label="Email Address *"><input className="num-input" type="email" required value={statusEmail} onChange={(e) => setStatusEmail(e.target.value)} placeholder="jane@example.com" /></Field>
                <div className="pt-2">
                  <button type="submit" className="lux-btn lux-btn-primary w-full justify-center">Check My Status <ArrowRight size={14} /></button>
                  <p className="text-xs mt-4 text-center" style={{ color: C.ink2 }}>Approvals are sent by email. Haven't applied yet? Switch to Request Access.</p>
                </div>
              </form>
            )}
          </div>

          <p className="text-xs mt-8 text-center" style={{ color: C.ink2 }}>
            Questions? <button onClick={() => go('contact')} className="link-under" style={{ color: C.ink }}>Contact us</button> · All figures in CAD and confirmed during onboarding.
          </p>
        </div>
      </section>
    </main>
  );
}

/* Small inline Canadian flag mark for the Canada page */
const CanadaFlag = () => (
  <svg width="34" height="20" viewBox="0 0 34 20" aria-hidden="true" style={{ borderRadius: 2, overflow: 'hidden' }}>
    <rect width="34" height="20" fill="#fff" />
    <rect width="8" height="20" fill="#D52B1E" />
    <rect x="26" width="8" height="20" fill="#D52B1E" />
    <path d="M17 5 l1.1 2.4 2.5-.6-1.2 2.2 1.9 1.6-2.6.4.1 2.6L17 14.6l-1.8 1.6.1-2.6-2.6-.4 1.9-1.6-1.2-2.2 2.5.6z" fill="#D52B1E" />
  </svg>
);

/* ---------------- TEAM CALCULATOR ---------------- */
/* ---------------- TEAM TYPES CONFIG ---------------- */
const TEAM_TYPES = {
  traditional: {
    key: 'traditional',
    label: 'Traditional',
    tagline: 'A 2+ person team with a formal Team Agreement.',
    leaderCap: 15000,
    leaderCapDeclines: true,
    memberCap: 10000,
    memberCapDeclines: false,
    leaderMonthly: 149,
    memberMonthly: 99,
    txFeeRate: 0.001,       // 0.1% of sale price
    txFeeCapPerDeal: null,  // no per-deal cap
    description: 'Shared, approved team name on all marketing. Members can still qualify for Power Award based on their cap.',
    color: 'C.gold',
  },
  family: {
    key: 'family',
    label: 'Family',
    tagline: 'Spouses, parents, siblings, blood relatives, or court-recognized family.',
    leaderCap: 15000,
    leaderCapDeclines: true,
    memberCap: 10000,
    memberCapDeclines: false,
    leaderMonthly: 99,
    memberMonthly: 99,
    txFeeRate: 0.001,
    txFeeCapPerDeal: null,
    description: 'All members billed at $99/month individually. Newly licensed family members can join on day one. Power Award eligible.',
    color: 'C.gold',
  },
  power: {
    key: 'power',
    label: 'Power',
    tagline: 'High-production teams: $40M+ in sales OR 140+ transactions in the anniversary year.',
    leaderCap: 15000,
    leaderCapDeclines: true,
    memberCap: 5000,
    memberCapDeclines: false,
    leaderMonthly: 149,
    memberMonthly: 99,
    txFeeRate: 0.001,
    txFeeCapPerDeal: 250,   // $250 per-deal cap; no annual cap
    description: 'Lowest member cap, per-transaction fee capped at $250. Includes all Traditional Team benefits.',
    color: 'C.gold',
  },
};

/* ---------------- TEAM CALCULATOR ---------------- */
function TeamCalculator({ go, addToast }) {
  const [teamType, setTeamType] = useState('traditional');
  const [teamSize, setTeamSize] = useState(6);
  const [avgDeals, setAvgDeals] = useState(18);
  const [avgPrice, setAvgPrice] = useState(425000);
  const [commission, setCommission] = useState(2.5);
  const [teamSplit, setTeamSplit] = useState(15); // minimum 5% per ICA

  const T = TEAM_TYPES[teamType];

  // Compute fresh on every render — no useMemo needed for math this cheap, and it guarantees the cards always reflect the current slider values.
  const gciPerDeal = avgPrice * (commission / 100);
  const txFeeRaw = avgPrice * T.txFeeRate;
  const txFee = T.txFeeCapPerDeal != null ? Math.min(txFeeRaw, T.txFeeCapPerDeal) : txFeeRaw;

  // MEMBER side
  const memberSplitPerDeal = gciPerDeal * (teamSplit / 100);
  const memberRemainPerDeal = gciPerDeal - memberSplitPerDeal;
  const memberAnnualRemain = memberRemainPerDeal * avgDeals;
  const memberBrokerage = Math.min(memberAnnualRemain * 0.15, T.memberCap);
  const memberTxFees = txFee * avgDeals;
  const memberMonthlyFees = T.memberMonthly * 12;
  const memberNet = memberAnnualRemain - memberBrokerage - memberTxFees - memberMonthlyFees;

  // LEADER side
  const leaderOwnGci = gciPerDeal * avgDeals;
  const leaderBrokerage = Math.min(leaderOwnGci * 0.15, T.leaderCap);
  const leaderTxFees = txFee * avgDeals;
  const leaderMonthlyFees = T.leaderMonthly * 12;
  const leaderOwnNet = leaderOwnGci - leaderBrokerage - leaderTxFees - leaderMonthlyFees;
  const teamSplitsCollected = memberSplitPerDeal * avgDeals * teamSize;
  const leaderNet = leaderOwnNet + teamSplitsCollected;

  // Team-wide
  const totalTeamGci = (memberRemainPerDeal * avgDeals * teamSize) + (memberSplitPerDeal * avgDeals * teamSize) + leaderOwnGci;
  const totalBrokerage = memberBrokerage * teamSize + leaderBrokerage;
  const totalTxFees = memberTxFees * teamSize + leaderTxFees;
  const totalMonthlyFees = memberMonthlyFees * teamSize + leaderMonthlyFees;

  // Convenience grouping so the existing card markup that reads `calc.*` keeps working
  const calc = {
    gciPerDeal, txFee,
    memberSplitPerDeal, teamSplitsCollected,
    memberAnnualRemain, memberBrokerage, memberTxFees, memberMonthlyFees, memberNet,
    leaderOwnGci, leaderBrokerage, leaderTxFees, leaderMonthlyFees, leaderOwnNet, leaderNet,
    totalTeamGci, totalBrokerage, totalTxFees, totalMonthlyFees,
  };

  const resetDefaults = () => {
    setTeamType('traditional'); setTeamSize(6); setAvgDeals(18); setAvgPrice(425000); setCommission(2.5); setTeamSplit(15);
    addToast('Reset to defaults');
  };

  return (
    <main style={{ background: C.bg }}>
      {/* HERO */}
      <section className="pt-16 pb-12"><div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <button onClick={() => go('home')} className="ui-eyebrow flex items-center gap-2 mb-8" style={{ color: C.ink2 }}><ArrowLeft size={12} /> Back to Home</button>
        <div className="auto-fade-up"><Eyebrow>Team Calculator</Eyebrow></div>
        <h1 className="font-display auto-fade-up delay-1 mt-8 text-balance" style={{ fontSize: 'clamp(40px, 6.5vw, 86px)', lineHeight: 1.02 }}>Lead a team.<br /><em style={{ color: C.gold, fontStyle: 'italic' }}>Build leverage.</em></h1>
        <p className="auto-fade-up delay-2 mt-8 max-w-3xl" style={{ color: C.ink2, fontSize: 17, lineHeight: 1.6 }}>
          Epique recognizes three official team structures, each with its own caps, fees, and rules. Choose a team type and model your role as team leader — own production, team splits, and combined economics.
        </p>
      </div></section>

      {/* TEAM TYPE SELECTOR */}
      <section className="pb-12"><div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <Reveal>
          <div className="ui-eyebrow mb-6" style={{ color: C.ink2 }}>Choose your team type</div>
          <div className="flex flex-col md:flex-row gap-px" style={{ background: C.hair }}>
            {Object.values(TEAM_TYPES).map((t) => {
              const active = teamType === t.key;
              return (
                <button key={t.key} onClick={() => setTeamType(t.key)} className={`p-8 text-left transition-all ${active ? 'ink-card grain' : 'bg-white'}`} style={{ position: 'relative', flex: '1 1 0%', minWidth: 0 }}>
                  <div className="flex items-center justify-between">
                    <div className="ui-eyebrow" style={{ color: active ? C.gold : C.ink2 }}>{t.label} Team</div>
                    {active && <span className="ui-eyebrow" style={{ color: C.gold, fontSize: 10 }}>SELECTED</span>}
                  </div>
                  <h3 className="font-display mt-4" style={{ fontSize: 22, fontWeight: 500, color: active ? '#F1EFE9' : C.ink, lineHeight: 1.2 }}>{t.tagline}</h3>
                  <div className="mt-6 pt-5 hairline border-t" style={{ borderColor: active ? 'rgba(241,239,233,0.12)' : C.hair }}>
                    <div className="grid grid-cols-2 gap-3 text-xs" style={{ color: active ? 'rgba(241,239,233,0.7)' : C.ink2 }}>
                      <div><div className="ui-eyebrow mb-1" style={{ fontSize: 9 }}>Leader cap</div><div className="font-display" style={{ fontSize: 16, color: active ? '#F1EFE9' : C.ink, fontWeight: 500 }}>{fmt(t.leaderCap)}</div></div>
                      <div><div className="ui-eyebrow mb-1" style={{ fontSize: 9 }}>Member cap</div><div className="font-display" style={{ fontSize: 16, color: active ? '#F1EFE9' : C.ink, fontWeight: 500 }}>{fmt(t.memberCap)}</div></div>
                      <div><div className="ui-eyebrow mb-1" style={{ fontSize: 9 }}>Leader / mo</div><div className="font-display" style={{ fontSize: 16, color: active ? '#F1EFE9' : C.ink, fontWeight: 500 }}>${t.leaderMonthly}</div></div>
                      <div><div className="ui-eyebrow mb-1" style={{ fontSize: 9 }}>Member / mo</div><div className="font-display" style={{ fontSize: 16, color: active ? '#F1EFE9' : C.ink, fontWeight: 500 }}>${t.memberMonthly}</div></div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </Reveal>
      </div></section>

      {/* CALCULATOR */}
      <section className="pb-20"><div className="max-w-[1400px] mx-auto px-6 lg:px-10"><div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5"><div className="card-soft p-10 lg:sticky lg:top-28">
          <div className="flex items-center justify-between"><Eyebrow>Team Inputs</Eyebrow><button onClick={resetDefaults} className="ui-eyebrow link-under" style={{ color: C.ink2, fontSize: 10 }}>Reset</button></div>
          <div className="space-y-10 mt-10">
            <InputSlider label="Team size (excluding leader)" value={teamSize} setValue={setTeamSize} min={1} max={30} display={teamSize + (teamSize === 1 ? ' member' : ' members')} />
            <InputSlider label="Avg deals per agent / year" value={avgDeals} setValue={setAvgDeals} min={1} max={60} display={avgDeals} />
            <InputSlider label="Avg sales price" value={avgPrice} setValue={setAvgPrice} min={100000} max={2500000} step={25000} display={fmt(avgPrice)} />
            <InputSlider label="Commission %" value={commission} setValue={setCommission} min={1} max={3.5} step={0.05} display={commission.toFixed(2) + '%'} />
            <InputSlider label="Team split (member → leader)" value={teamSplit} setValue={setTeamSplit} min={5} max={50} step={1} display={teamSplit + '%'} />
            <p className="text-xs -mt-6" style={{ color: C.ink2 }}>Minimum 5% per Epique's Team Agreement policy. Your Team Agreement may set a higher split.</p>
          </div>
          <div className="mt-10 pt-8 hairline border-t"><button onClick={() => go('contact')} className="lux-btn lux-btn-primary w-full justify-center">Talk to an Advisor <ArrowUpRight size={14} /></button></div>
        </div></div>

        <div className="lg:col-span-7 space-y-6">
          {/* Active type banner */}
          <div className="ink-card p-8 grain">
            <div className="ui-eyebrow" style={{ color: C.gold }}>You're modeling</div>
            <h3 className="font-display mt-3" style={{ fontSize: 26, fontWeight: 500, color: '#F1EFE9' }}>{T.label} Team</h3>
            <p className="mt-3 text-sm" style={{ color: 'rgba(241,239,233,0.7)', lineHeight: 1.6 }}>{T.description}</p>
          </div>

          {/* Leader net */}
          <div className="card-soft p-10">
            <Eyebrow>Team Leader Net (Annual)</Eyebrow>
            <BigStat label="Take-home as team leader" value={fmt(calc.leaderNet)} accent large />
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <MiniStat label="Own production net" value={fmt(calc.leaderOwnNet)} />
              <MiniStat label="Team splits collected" value={fmt(calc.teamSplitsCollected)} />
            </div>
            <div className="mt-6 pt-6 hairline border-t">
              <div className="ui-eyebrow mb-4" style={{ color: C.ink2, fontSize: 10 }}>Breakdown of leader's own production</div>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span style={{ color: C.ink2 }}>Own gross GCI</span>
                  <span className="font-display" style={{ fontSize: 15, fontWeight: 500 }}>{fmt(calc.leaderOwnGci)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span style={{ color: C.ink2 }}>Less: brokerage (15% to cap of {fmt(T.leaderCap)})</span>
                  <span className="font-display" style={{ fontSize: 15, fontWeight: 500 }}>{fmt(calc.leaderBrokerage)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span style={{ color: C.ink2 }}>Less: transaction fees (0.1% / deal{T.txFeeCapPerDeal != null ? `, max $${T.txFeeCapPerDeal}` : ''})</span>
                  <span className="font-display" style={{ fontSize: 15, fontWeight: 500 }}>{fmt(calc.leaderTxFees)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span style={{ color: C.ink2 }}>Less: annual tech fee (${T.leaderMonthly}/month)</span>
                  <span className="font-display" style={{ fontSize: 15, fontWeight: 500 }}>{fmt(calc.leaderMonthlyFees)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Per-member net */}
          <div className="card-soft p-10">
            <Eyebrow>Per Team Member (Annual)</Eyebrow>
            <BigStat label="Take-home per member" value={fmt(calc.memberNet)} />
            <div className="mt-6 pt-6 hairline border-t">
              <div className="ui-eyebrow mb-4" style={{ color: C.ink2, fontSize: 10 }}>Breakdown of member's gross GCI</div>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span style={{ color: C.ink2 }}>Member's gross GCI</span>
                  <span className="font-display" style={{ fontSize: 15, fontWeight: 500 }}>{fmt(calc.gciPerDeal * avgDeals)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span style={{ color: C.ink2 }}>Less: paid to team leader ({teamSplit}% split)</span>
                  <span className="font-display" style={{ fontSize: 15, fontWeight: 500, color: C.ink }}>{fmt(calc.memberSplitPerDeal * avgDeals)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span style={{ color: C.ink2 }}>Less: brokerage (15% to cap of {fmt(T.memberCap)})</span>
                  <span className="font-display" style={{ fontSize: 15, fontWeight: 500, color: C.ink }}>{fmt(calc.memberBrokerage)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span style={{ color: C.ink2 }}>Less: transaction fees (0.1% / deal{T.txFeeCapPerDeal != null ? `, max $${T.txFeeCapPerDeal}` : ''})</span>
                  <span className="font-display" style={{ fontSize: 15, fontWeight: 500, color: C.ink }}>{fmt(calc.memberTxFees)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span style={{ color: C.ink2 }}>Less: annual tech fee (${T.memberMonthly}/month)</span>
                  <span className="font-display" style={{ fontSize: 15, fontWeight: 500, color: C.ink }}>{fmt(calc.memberMonthlyFees)}</span>
                </div>
                <div className="flex items-center justify-between pt-3 hairline border-t">
                  <span className="ui-eyebrow" style={{ color: C.gold }}>= Take-home</span>
                  <span className="font-display" style={{ fontSize: 18, fontWeight: 500, color: calc.memberNet >= 0 ? C.gold : '#c0392b' }}>{fmt(calc.memberNet)}</span>
                </div>
              </div>
            </div>
            {calc.memberNet < 0 && <p className="text-xs mt-4" style={{ color: '#c0392b' }}>Net is negative at these inputs — deductions exceed earnings. Try lower team split, more deals, or higher commission.</p>}
            {T.txFeeCapPerDeal != null && calc.memberNet >= 0 && <p className="text-xs mt-4" style={{ color: C.gold }}>Power Team: per-deal transaction fee capped at ${T.txFeeCapPerDeal}.</p>}
          </div>

          {/* Team economics chart */}
          <div className="card-soft p-10">
            <Eyebrow>Team Economics</Eyebrow>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={[
                { name: 'Team GCI', value: calc.totalTeamGci },
                { name: 'Leader Net', value: calc.leaderNet },
                { name: 'All Members Net', value: calc.memberNet * teamSize },
                { name: 'To Brokerage', value: calc.totalBrokerage + calc.totalTxFees + calc.totalMonthlyFees },
              ]}>
                <CartesianGrid stroke={C.hair} vertical={false} />
                <XAxis dataKey="name" stroke={C.ink2} fontSize={11} />
                <YAxis stroke={C.ink2} fontSize={11} tickFormatter={(v) => fmtK(v)} />
                <Tooltip contentStyle={{ background: '#fff', border: `1px solid ${C.hair}`, fontFamily: 'Inter', fontSize: 12 }} formatter={(v) => fmt(v)} />
                <Bar dataKey="value" fill={C.gold} radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Math disclosure */}
          <details className="card-soft p-6">
            <summary className="flex items-center justify-between cursor-pointer">
              <div className="ui-eyebrow" style={{ color: C.gold }}>How this is calculated</div>
              <ChevronDown size={16} className="chev" color={C.gold} />
            </summary>
            <div className="mt-5 text-sm" style={{ color: C.ink2, lineHeight: 1.75 }}>
              <p><strong style={{ color: C.ink }}>Per deal:</strong> GCI = price × commission %. The team split comes off the top of the member's GCI to the team leader (5% minimum). Each agent's remaining share is split 85/15 with Epique until they hit their cap (leader {fmt(T.leaderCap)} declining; member {fmt(T.memberCap)} fixed). Post-cap, agents keep 100% of their share less a transaction fee of 0.1% of sales price{T.txFeeCapPerDeal != null && <> (capped at ${T.txFeeCapPerDeal}/deal for Power Teams)</>}.</p>
              <p className="mt-3"><strong style={{ color: C.ink }}>Monthly fees:</strong> ${T.leaderMonthly}/mo for the leader · ${T.memberMonthly}/mo per member, billed individually.</p>
              <p className="mt-3 text-xs" style={{ color: C.ink3 }}>Modeled simply: the same per-deal economics apply on every transaction (the actual transition between pre-cap and post-cap deals depends on order; this calculator collapses that into annualized figures for planning).</p>
            </div>
          </details>
        </div>
      </div></div></section>

      {/* COMPARISON TABLE */}
      <section className="py-20" style={{ background: C.bg2 }}><div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <Reveal><SectionHeading eyebrow="Side-by-side" title="Three team structures." sub="The same shared platform — different caps, fees, and qualification rules." /></Reveal>
        <Reveal>
          <div className="mt-12 card-soft overflow-hidden">
            <div className="grid grid-cols-4 px-6 py-5 ui-eyebrow" style={{ color: C.ink2, background: C.bg2 }}>
              <div></div>
              <div className="text-center">Traditional</div>
              <div className="text-center">Family</div>
              <div className="text-center" style={{ color: C.gold }}>Power</div>
            </div>
            {[
              ['Leader cap (annual)', '$15,000 (declining)', '$15,000 (declining)', '$15,000 (declining)'],
              ['Member cap (annual)', '$10,000 (fixed)', '$10,000 (fixed)', '$5,000 (fixed)'],
              ['Leader tech fee', '$149 / mo', '$99 / mo', '$149 / mo'],
              ['Member tech fee', '$99 / mo', '$99 / mo', '$99 / mo'],
              ['Transaction fee', '0.1% / deal', '0.1% / deal', '0.1% / deal · max $250'],
              ['Min. team split', '5% from member', '5% from member', '5% from member'],
              ['Newly licensed eligible', 'After 1 yr at Epique', 'From day one', 'After 1 yr at Epique'],
              ['Power Award eligibility', 'Yes (by cap)', 'Yes (by cap)', 'Yes (by cap)'],
              ['Qualification', '1 yr at Epique + plan approval', 'Family relationship + DBA', '$40M volume OR 140 deals / yr'],
            ].map((row, i) => (
              <div key={i} className="grid grid-cols-4 px-6 py-4 items-center hairline border-t text-sm">
                <div style={{ color: C.ink2 }}>{row[0]}</div>
                <div className="text-center" style={{ color: C.ink }}>{row[1]}</div>
                <div className="text-center" style={{ color: C.ink }}>{row[2]}</div>
                <div className="text-center" style={{ color: C.gold, fontWeight: 500 }}>{row[3]}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div></section>

      {/* UNIVERSAL RULES */}
      <section className="py-20"><div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <Reveal><SectionHeading eyebrow="Universal Rules" title="What applies to every Epique team." /></Reveal>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { h: 'DBA & branding', d: 'Any team using a Team Name must register a DBA locally, comply with state/provincial law, and have the Team Name, logo, and branding approved in writing by the Managing Broker before use.' },
            { h: 'Team Agreement', d: 'Every team requires a written Team Agreement compliant with law and company policy, signed by all members (and a Company Rep / Managing Broker for Traditional & Power), then submitted to teams@epiquerealty.com.' },
            { h: 'Minimum 5% team split', d: 'Team members owe the team leader at least 5% of their GCI from each transaction. The Team Agreement can set a higher split, never lower.' },
            { h: '0.1% transaction fee', d: 'Every closing carries a 0.1% transaction fee on sales price, paid by leader, member, or split per the Team Agreement. Power Teams cap this at $250 per deal.' },
            { h: '85/15 split until cap', d: "After the team split, each agent's remaining share is split 85/15 with Epique until they hit their individual cap. Post-cap, agents keep 100% of their share less transaction fees." },
            { h: '5-recruit lifetime limit', d: 'A team leader may recruit no more than five (5) active, established Epique agents to join their team — for the entire life of the team. Prevents internal over-consolidation.' },
            { h: 'Newly licensed agents', d: 'New agents (or those with no closed transactions) can only join Family Teams (or UnOfficial Teams) on day one. They must be with Epique for at least one year before joining a Traditional or Power Team.' },
            { h: 'Independent → team', d: 'Agents who joined Epique as Independent Agents cannot join a team as a member until they have been with Epique at least 1 year. Exceptions reviewed case-by-case.' },
            { h: 'Team changes (30-day review)', d: 'Adding or changing team members requires a formal request to teams@epiquerealty.com. Brokerage management reviews and responds within 30 days.' },
            { h: 'Leaving / transferring teams', d: 'A member can leave a team and go independent at any time with written notice to the leader and teams@epiquerealty.com. Members may transfer to another team a maximum of once per lifetime.' },
            { h: 'Internal disputes', d: 'Epique does not intervene in internal disputes between team leader and members. The signed Team Agreement is referenced if a dispute affects other departments (commissions, compliance).' },
            { h: 'Power Award stock', d: "Members of any team type can still qualify for Power Award. When they do, stock awards are calculated based on their cap." },
          ].map((r, i) => (
            <Reveal key={i} delay={i * 30}><div className="card-soft p-7 h-full">
              <div className="ui-eyebrow" style={{ color: C.gold }}>{String(i + 1).padStart(2, '0')}</div>
              <h4 className="font-display mt-3" style={{ fontSize: 18, fontWeight: 500 }}>{r.h}</h4>
              <p className="mt-3 text-sm" style={{ color: C.ink2, lineHeight: 1.6 }}>{r.d}</p>
            </div></Reveal>
          ))}
        </div>
        <Reveal>
          <p className="text-xs mt-10" style={{ color: C.ink2, maxWidth: 720 }}>
            Summary of Epique's team structure rules for planning purposes. The full Team Agreement and Independent Contractor Agreement govern exact terms and are confirmed during onboarding. Contact <a href="mailto:teams@epiquerealty.com" className="link-under" style={{ color: C.ink }}>teams@epiquerealty.com</a> for the formal team formation process.
          </p>
        </Reveal>
      </div></section>

    </main>
  );
}

/* ---------------- REVENUE SHARE (5 LEVELS · COMPANY DOLLAR) ---------------- */
function RevenueSharePage({ go }) {
  // Epique keeps 15% of an agent's commission ("Company Revenue") until they cap.
  // You earn revenue share as a percentage of that Company Revenue, across 5 levels of sponsorship.
  const COMPANY_SPLIT = 0.15;
  const BASE_RS = 0.10;       // 10% of Company Revenue on all levels
  const POWER_L1_RS = 0.20;   // Power Award: 20% on Level 1 only

  const levels = [
    { lvl: 1, who: 'Agents you personally recruit', detail: 'They name you as sponsor on their application.' },
    { lvl: 2, who: 'Recruited by your Level 1 agents', detail: 'Second generation of your downline.' },
    { lvl: 3, who: 'Recruited by your Level 2 agents', detail: 'Third generation.' },
    { lvl: 4, who: 'Recruited by your Level 3 agents', detail: 'Fourth generation.' },
    { lvl: 5, who: 'Recruited by your Level 4 agents', detail: 'Fifth generation.' },
  ];

  const [powerAward, setPowerAward] = useState(false);
  const [activeLevel, setActiveLevel] = useState(1);

  // Per-level inputs: number of agents + their avg monthly closings
  const [agentsPerLevel, setAgentsPerLevel] = useState([3, 5, 8, 12, 18]);
  const [closingsPerAgent, setClosingsPerAgent] = useState(1);
  const [avgPrice, setAvgPrice] = useState(400000);
  const [commission, setCommission] = useState(3.0);

  const calc = useMemo(() => {
    const gci = avgPrice * (commission / 100);
    const companyRevenue = gci * COMPANY_SPLIT; // the 15% Epique keeps on each closing
    const rows = levels.map((l, i) => {
      const rsRate = (powerAward && l.lvl === 1) ? POWER_L1_RS : BASE_RS;
      const perClosing = companyRevenue * rsRate;
      const monthly = agentsPerLevel[i] * closingsPerAgent * perClosing;
      return { lvl: l.lvl, rsRate, perClosing, agents: agentsPerLevel[i], monthly };
    });
    const totalMonthly = rows.reduce((s, r) => s + r.monthly, 0);
    return { gci, companyRevenue, rows, totalMonthly, totalAnnual: totalMonthly * 12 };
  }, [powerAward, agentsPerLevel, closingsPerAgent, avgPrice, commission]);

  const setAgents = (i, v) => setAgentsPerLevel((p) => p.map((x, idx) => (idx === i ? v : x)));
  const activeRate = (powerAward && activeLevel === 1) ? POWER_L1_RS : BASE_RS;

  return (
    <main style={{ background: C.bg }}>
      {/* HERO */}
      <section className="pt-16 pb-12"><div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <button onClick={() => go('home')} className="ui-eyebrow flex items-center gap-2 mb-8" style={{ color: C.ink2 }}><ArrowLeft size={12} /> Back to Home</button>
        <div className="auto-fade-up"><Eyebrow>Revenue Share</Eyebrow></div>
        <h1 className="font-display auto-fade-up delay-1 mt-8 text-balance" style={{ fontSize: 'clamp(40px, 6.5vw, 86px)', lineHeight: 1.02 }}>Earn on the company dollar.<br /><em style={{ color: C.gold, fontStyle: 'italic' }}>Across five levels.</em></h1>
        <p className="auto-fade-up delay-2 mt-8 max-w-3xl" style={{ color: C.ink2, fontSize: 17, lineHeight: 1.6 }}>
          Epique's revenue share is built on five levels of agents connected to you by sponsorship. You earn a percentage of <strong style={{ color: C.ink, fontWeight: 600 }}>Epique's company dollar</strong> — the 15% Epique keeps from each agent's commission — not of the full commission.
        </p>
      </div></section>

      {/* HOW THE COMPANY DOLLAR WORKS */}
      <section className="pb-12"><div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <Reveal>
          <div className="ink-card p-10 lg:p-14 grain">
            <Eyebrow color={C.gold}>How it's calculated</Eyebrow>
            <h2 className="font-display mt-6 text-balance" style={{ fontSize: 'clamp(26px, 3.4vw, 40px)', lineHeight: 1.15, color: '#F1EFE9' }}>
              You earn a share of the 15% Epique keeps — not the agent's commission.
            </h2>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-px" style={{ background: 'rgba(255,255,255,0.08)' }}>
              {[
                { k: 'Commission (GCI)', v: 'Agent\u2019s full commission on a sale', note: 'You do NOT earn on this' },
                { k: 'Company Revenue', v: '15% Epique keeps before cap', note: 'Your share is drawn from here' },
                { k: 'Your Revenue Share', v: '10% of Company Revenue', note: '20% on Level 1 with Power Award' },
              ].map((s, i) => (
                <div key={i} className="p-8" style={{ background: C.black }}>
                  <div className="ui-eyebrow" style={{ color: 'rgba(241,239,233,0.5)' }}>Step 0{i + 1}</div>
                  <div className="font-display mt-4" style={{ fontSize: 22, color: i === 2 ? C.gold : '#F1EFE9', fontWeight: 500 }}>{s.k}</div>
                  <div className="mt-3 text-sm" style={{ color: 'rgba(241,239,233,0.7)', lineHeight: 1.5 }}>{s.v}</div>
                  <div className="mt-4 ui-eyebrow" style={{ color: i === 2 ? C.gold : 'rgba(241,239,233,0.4)', fontSize: 10 }}>{s.note}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div></section>

      {/* THE 5 LEVELS */}
      <section className="py-20" style={{ background: C.bg2 }}><div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <Reveal><SectionHeading eyebrow="Your Downline" title="The five levels of sponsorship." sub="Each level is defined by who recruited whom. If an agent leaves, Epique holds the spot with a company placeholder, so your levels never shift." /></Reveal>
        <div className="mt-12 flex flex-col md:flex-row gap-px" style={{ background: C.hair }}>
          {levels.map((l, i) => {
            const boosted = powerAward && l.lvl === 1;
            return (
              <Reveal key={l.lvl} delay={i * 60}>
                <div className="bg-white p-6 h-full relative" style={{ flex: '1 1 0%', minWidth: 0 }}>
                  {/* Level pill */}
                  <div className="flex items-center justify-between">
                    <div className="font-display flex items-baseline" style={{ color: C.gold, fontWeight: 500, lineHeight: 1 }}>
                      <span style={{ fontSize: 14, letterSpacing: '0.06em' }}>L</span>
                      <span style={{ fontSize: 26 }}>{l.lvl}</span>
                    </div>
                    {/* Rev share badge */}
                    <div className="text-right">
                      <div className="font-display" style={{ fontSize: 18, fontWeight: 500, color: boosted ? C.gold : C.ink, lineHeight: 1 }}>
                        {boosted ? '20%' : '10%'}
                      </div>
                      {boosted && <div className="ui-eyebrow mt-1" style={{ color: C.gold, fontSize: 8 }}>POWER</div>}
                    </div>
                  </div>
                  {/* Gold accent line */}
                  <div className="mt-4 gold-rule" style={{ width: 24, opacity: boosted ? 1 : 0.5 }} />
                  {/* Description */}
                  <h4 className="font-display mt-4" style={{ fontSize: 14, fontWeight: 500, lineHeight: 1.35 }}>{l.who}</h4>
                  <p className="mt-2 text-xs" style={{ color: C.ink2, lineHeight: 1.5 }}>{l.detail}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
        <Reveal>
          <div className="mt-6 card-soft p-5 flex items-start gap-3">
            <div style={{ color: C.gold, marginTop: 2 }}><Check size={16} /></div>
            <p className="text-sm" style={{ color: C.ink2, lineHeight: 1.6 }}>
              <strong style={{ color: C.ink }}>Placeholder rule:</strong> if someone in your downline leaves the company, Epique holds that spot with a company placeholder so the levels below do not collapse upward.
            </p>
          </div>
        </Reveal>
      </div></section>

      {/* PERCENTAGE BY LEVEL + POWER AWARD */}
      <section className="py-20"><div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <Reveal className="lg:col-span-5">
            <Eyebrow>Revenue Share by Level</Eyebrow>
            <h2 className="font-display mt-6 text-balance" style={{ fontSize: 'clamp(30px, 4vw, 52px)', lineHeight: 1.05 }}>10% of company revenue — on all five levels.</h2>
            <p className="mt-8" style={{ color: C.ink2, lineHeight: 1.65 }}>
              On every transaction closed by an agent in your Levels 1–5, you earn 10% of the Company Revenue (the 15% Epique keeps from that agent's commission before they cap).
            </p>
            <div className="mt-10 card-soft p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="font-display" style={{ fontSize: 20, fontWeight: 500 }}>Power Award status</div>
                  <p className="text-sm mt-1" style={{ color: C.ink2 }}>Doubles your Level 1 rev share to 20%.</p>
                </div>
                <button onClick={() => setPowerAward((p) => !p)} aria-label="Toggle Power Award"
                  style={{ width: 56, height: 30, borderRadius: 999, background: powerAward ? C.gold : C.hair, position: 'relative', transition: 'background 280ms', flexShrink: 0, border: 0, cursor: 'pointer' }}>
                  <span style={{ position: 'absolute', top: 3, left: powerAward ? 29 : 3, width: 24, height: 24, borderRadius: 999, background: '#fff', transition: 'left 280ms cubic-bezier(.2,.7,.2,1)', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
                </button>
              </div>
            </div>
          </Reveal>
          <Reveal delay={120} className="lg:col-span-7">
            <div className="card-soft overflow-hidden">
              <div className="grid grid-cols-12 px-6 py-5 ui-eyebrow" style={{ color: C.ink2, background: C.bg2 }}>
                <div className="col-span-2">Level</div>
                <div className="col-span-6">Who</div>
                <div className="col-span-4 text-right">Your rev share</div>
              </div>
              {levels.map((l, i) => {
                const rate = (powerAward && l.lvl === 1) ? 20 : 10;
                const boosted = powerAward && l.lvl === 1;
                return (
                  <div key={l.lvl} className="grid grid-cols-12 px-6 py-5 items-center hairline border-t">
                    <div className="col-span-2 font-display" style={{ fontSize: 24, color: C.gold, fontWeight: 500 }}>L{l.lvl}</div>
                    <div className="col-span-6 text-sm" style={{ color: C.ink2 }}>{l.who}</div>
                    <div className="col-span-4 text-right">
                      <span className="font-display" style={{ fontSize: 24, fontWeight: 500, color: boosted ? C.gold : C.ink }}>{rate}%</span>
                      <span className="text-xs font-body ml-1" style={{ color: C.ink2 }}>of co. rev</span>
                      {boosted && <div className="ui-eyebrow mt-1" style={{ color: C.gold, fontSize: 9 }}>Power Award</div>}
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div></section>

      {/* POWER AWARD */}
      <section className="py-20"><div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <Reveal>
          <div className="ink-card p-10 lg:p-16 grain relative overflow-hidden">
            <div className="absolute -top-16 -right-16 w-80 h-80 rounded-full opacity-10" style={{ background: `radial-gradient(circle, ${C.gold}, transparent 70%)` }} />
            <div className="relative">
              <Eyebrow color={C.gold}>Power Award</Eyebrow>
              <h2 className="font-display mt-6 text-balance" style={{ fontSize: 'clamp(30px, 4.5vw, 60px)', lineHeight: 1.05, color: '#F1EFE9', maxWidth: 820 }}>
                Epique's elite, invitation-only recognition for top producers.
              </h2>
              <p className="mt-8 text-balance" style={{ color: 'rgba(241,239,233,0.7)', fontSize: 18, lineHeight: 1.6, maxWidth: 720 }}>
                A status that unlocks enhanced equity, double Level 1 revenue share, and a reduced technology fee — granted to agents producing at the highest level.
              </p>
            </div>
          </div>
        </Reveal>

        {/* What it is / How to qualify */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <Reveal><div className="card-soft p-10 h-full">
            <div className="ui-eyebrow" style={{ color: C.gold }}>How You Qualify</div>
            <h3 className="font-display mt-4" style={{ fontSize: 26, fontWeight: 500 }}>Hit one benchmark in your anniversary year</h3>
            <div className="mt-8 space-y-4">
              {[
                ['24+', 'closed residential / commercial sales transactions in your Epique anniversary year'],
                ['$10M+', 'in total closed sales volume in your anniversary year'],
              ].map(([big, d], i) => (
                <div key={i} className="flex items-start gap-5 pb-4 hairline border-b last:border-0">
                  <div className="font-display flex-shrink-0" style={{ fontSize: 36, color: C.gold, fontWeight: 500, lineHeight: 1, minWidth: 90 }}>{big}</div>
                  <div className="text-sm" style={{ color: C.ink2, lineHeight: 1.55, paddingTop: 4 }}>{d}</div>
                </div>
              ))}
              <div className="flex items-center justify-center py-1"><span className="ui-eyebrow" style={{ color: C.ink2 }}>— or —</span></div>
            </div>
            <p className="mt-2 text-sm" style={{ color: C.ink2, lineHeight: 1.65 }}>
              Only closed sales count — no leases, rentals, referrals, or TC fees — and the 24 transactions must close within your Epique anniversary year.
            </p>
          </div></Reveal>

          <Reveal delay={120}><div className="card-soft p-10 h-full">
            <div className="ui-eyebrow" style={{ color: C.gold }}>Eligibility</div>
            <h3 className="font-display mt-4" style={{ fontSize: 26, fontWeight: 500 }}>Invitation only</h3>
            <ul className="mt-8 space-y-4">
              {[
                'You must be invited by an Epique Executive team member.',
                'Limited to agents in good standing — current on dues, no outstanding balances, no disciplinary issues.',
              ].map((x) => (
                <li key={x} className="flex items-start gap-3 text-sm"><span style={{ color: C.gold, marginTop: 2 }}><Check size={16} /></span><span style={{ color: C.ink2, lineHeight: 1.55 }}>{x}</span></li>
              ))}
            </ul>
            <div className="mt-8 pt-6 hairline border-t">
              <div className="ui-eyebrow" style={{ color: C.ink2 }}>Believe you qualify?</div>
              <p className="mt-3 text-sm" style={{ color: C.ink2, lineHeight: 1.6 }}>
                Email <a href="mailto:transactions@epiquerealty.com" className="link-under" style={{ color: C.ink, fontWeight: 500 }}>transactions@epiquerealty.com</a> to request an official Power Award review and audit.
              </p>
            </div>
          </div></Reveal>
        </div>

        {/* Three main benefits */}
        <Reveal>
          <div className="mt-12">
            <SectionHeading eyebrow="What It Gives You" title="Three elevated benefits." />
          </div>
        </Reveal>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10">
          {/* Benefit 1 — 2X Stock */}
          <Reveal><div className="card-soft p-10 h-full">
            <div className="font-display" style={{ fontSize: 40, color: C.gold, fontWeight: 400 }}>01</div>
            <h4 className="font-display mt-4" style={{ fontSize: 24, fontWeight: 500 }}>2X Stock Awards</h4>
            <p className="mt-2 text-sm" style={{ color: C.ink2 }}>Up to 3,000 shares / $30,000 in equity</p>
            <p className="mt-5 text-sm" style={{ color: C.ink2, lineHeight: 1.65 }}>
              Double the standard Epique stock awards — up to 3,000 shares or $30,000 in company equity (whichever is less), commensurate with your current cap.
            </p>
            <div className="mt-6 p-5" style={{ background: C.bg3 }}>
              <div className="ui-eyebrow" style={{ color: C.ink2 }}>Example · $12,000 cap</div>
              <div className="mt-3 space-y-2 text-sm">
                <div className="flex justify-between"><span style={{ color: C.ink2 }}>Standard stock</span><span className="font-display" style={{ fontWeight: 500 }}>1,200 sh / $12k</span></div>
                <div className="flex justify-between"><span style={{ color: C.ink2 }}>Power Award 2X</span><span className="font-display" style={{ fontWeight: 500, color: C.gold }}>2,400 sh / $24k</span></div>
              </div>
            </div>
            <div className="mt-6 pt-5 hairline border-t">
              <div className="ui-eyebrow" style={{ color: C.ink2 }}>Enhanced stock events</div>
              <ul className="mt-3 space-y-2 text-sm" style={{ color: C.ink2 }}>
                <li className="flex justify-between"><span>Capping</span><span style={{ color: C.ink }}>200 sh / $2,000</span></li>
                <li className="flex justify-between"><span>Cap anniversary date</span><span style={{ color: C.ink }}>100 sh / $1,000</span></li>
                <li className="flex justify-between"><span>Recruiting an agent</span><span style={{ color: C.ink }}>50 sh / $500</span></li>
              </ul>
              <p className="mt-3 text-xs" style={{ color: C.ink2 }}>Whichever is less, per event.</p>
            </div>
          </div></Reveal>

          {/* Benefit 2 — Double Level 1 Rev Share */}
          <Reveal delay={100}><div className="ink-card p-10 h-full grain">
            <div className="font-display" style={{ fontSize: 40, color: C.gold, fontWeight: 400 }}>02</div>
            <h4 className="font-display mt-4" style={{ fontSize: 24, fontWeight: 500, color: '#F1EFE9' }}>Double Level 1 Revenue Share</h4>
            <p className="mt-2 text-sm" style={{ color: 'rgba(241,239,233,0.6)' }}>20% of company revenue on Level 1</p>
            <div className="mt-8 flex items-end gap-6">
              <div><div className="ui-eyebrow" style={{ color: 'rgba(241,239,233,0.5)' }}>Normal L1</div><div className="font-display mt-1" style={{ fontSize: 36, color: 'rgba(241,239,233,0.55)', fontWeight: 500, lineHeight: 1 }}>10%</div></div>
              <ArrowRight size={20} color={C.gold} className="mb-2" />
              <div><div className="ui-eyebrow" style={{ color: 'rgba(241,239,233,0.5)' }}>Power Award L1</div><div className="font-display mt-1" style={{ fontSize: 48, color: C.gold, fontWeight: 500, lineHeight: 1 }}>20%</div></div>
            </div>
            <ul className="mt-8 space-y-3 text-sm">
              {[
                'Level 1 recruits: 20% of company revenue (double the normal 10%).',
                'Levels 2–5: remain at 10% of company revenue.',
                'You must maintain Power Award status to keep the 20% on Level 1.',
              ].map((x) => (
                <li key={x} className="flex items-start gap-3"><span style={{ color: C.gold, marginTop: 2 }}><Check size={15} /></span><span style={{ color: 'rgba(241,239,233,0.8)', lineHeight: 1.5 }}>{x}</span></li>
              ))}
            </ul>
          </div></Reveal>

          {/* Benefit 3 — Reduced Tech Fee */}
          <Reveal delay={200}><div className="card-soft p-10 h-full">
            <div className="font-display" style={{ fontSize: 40, color: C.gold, fontWeight: 400 }}>03</div>
            <h4 className="font-display mt-4" style={{ fontSize: 24, fontWeight: 500 }}>Reduced Technology Fee</h4>
            <p className="mt-2 text-sm" style={{ color: C.ink2 }}>A lower monthly platform cost</p>
            <div className="mt-8 flex items-end gap-6">
              <div><div className="ui-eyebrow" style={{ color: C.ink2 }}>Standard</div><div className="font-display mt-1" style={{ fontSize: 32, color: C.ink2, fontWeight: 500, lineHeight: 1, textDecoration: 'line-through', textDecorationColor: C.hairStrong }}>$150</div></div>
              <ArrowRight size={20} color={C.gold} className="mb-2" />
              <div><div className="ui-eyebrow" style={{ color: C.ink2 }}>Power Award</div><div className="font-display mt-1" style={{ fontSize: 48, color: C.gold, fontWeight: 500, lineHeight: 1 }}>$99</div></div>
            </div>
            <p className="mt-8 text-sm" style={{ color: C.ink2, lineHeight: 1.65 }}>
              Power Award agents pay only $99/month for technology — a standing reduction for as long as you hold the status.
            </p>
          </div></Reveal>
        </div>

        {/* Requalification */}
        <Reveal>
          <div className="mt-6 card-soft p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7">
                <div className="ui-eyebrow" style={{ color: C.gold }}>Keeping It</div>
                <h3 className="font-display mt-4" style={{ fontSize: 26, fontWeight: 500 }}>Requalify each anniversary year</h3>
                <p className="mt-4" style={{ color: C.ink2, lineHeight: 1.65, maxWidth: 560 }}>
                  To maintain Power Award benefits and 2X stock each anniversary year, you must again hit <strong style={{ color: C.ink }}>24+ closed sales</strong> or <strong style={{ color: C.ink }}>$10M+ in total closed volume</strong> during each cap anniversary year.
                </p>
              </div>
              <div className="lg:col-span-5">
                <div className="p-6" style={{ background: C.bg3 }}>
                  <div className="ui-eyebrow" style={{ color: C.ink2 }}>If you don't re-hit the benchmark</div>
                  <p className="mt-3 text-sm" style={{ color: C.ink2, lineHeight: 1.6 }}>
                    You lose the enhanced benefits going forward — the 2X stock, the 20% Level 1 revenue share, and the reduced $99 tech fee.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <p className="text-xs mt-8" style={{ color: C.ink2, maxWidth: 760 }}>
            Power Award terms, qualification, stock award amounts, and benefits are governed by Epique's current policies and subject to change. Stock figures are illustrative examples — confirm current details during your review and audit.
          </p>
        </Reveal>
      </div></section>

      {/* WORKED MONEY EXAMPLES */}
      <section className="py-20" style={{ background: C.bg2 }}><div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <Reveal><SectionHeading eyebrow="Worked Example" title="Follow the dollar." sub="A $400,000 sale at 3% commission — see exactly what reaches you per closing." /></Reveal>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-12">
          <Reveal><div className="card-soft p-10 h-full">
            <div className="ui-eyebrow" style={{ color: C.ink2 }}>Base — Non-Power Award</div>
            <div className="mt-8 space-y-4">
              {[
                ['Property price', '$400,000'],
                ['Commission (3%)', 'GCI = $12,000'],
                ['Company Revenue (15% of GCI)', '$1,800'],
              ].map(([k, v]) => (
                <div key={k} className="flex items-center justify-between pb-4 hairline border-b">
                  <span className="text-sm" style={{ color: C.ink2 }}>{k}</span>
                  <span className="font-display" style={{ fontSize: 18, fontWeight: 500 }}>{v}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 p-6" style={{ background: C.bg3 }}>
              <div className="ui-eyebrow" style={{ color: C.ink2 }}>Your rev share · any level (1–5)</div>
              <div className="font-display mt-2" style={{ fontSize: 'clamp(32px, 4vw, 48px)', color: C.gold, fontWeight: 500, lineHeight: 1 }}>$180</div>
              <div className="text-sm mt-2" style={{ color: C.ink2 }}>= 10% of $1,800, per closing</div>
            </div>
            <div className="mt-6 space-y-2 text-sm" style={{ color: C.ink2, lineHeight: 1.7 }}>
              <div>· 3 Level-1 agents each close one → 3 × $180 = <strong style={{ color: C.ink }}>$540</strong>/mo</div>
              <div>· 5 Level-2 agents each close one → 5 × $180 = <strong style={{ color: C.ink }}>$900</strong>/mo</div>
              <div>· and so on, through Level 5.</div>
            </div>
          </div></Reveal>
          <Reveal delay={120}><div className="ink-card p-10 h-full grain">
            <div className="ui-eyebrow" style={{ color: 'rgba(241,239,233,0.5)' }}>With Power Award — Level 1 only</div>
            <div className="mt-8 space-y-4">
              {[
                ['Company Revenue', '$1,800'],
                ['Level 1 rate', '20% of company rev'],
                ['Levels 2–5 rate', '10% of company rev'],
              ].map(([k, v]) => (
                <div key={k} className="flex items-center justify-between pb-4" style={{ borderBottom: '1px solid rgba(241,239,233,0.12)' }}>
                  <span className="text-sm" style={{ color: 'rgba(241,239,233,0.7)' }}>{k}</span>
                  <span className="font-display" style={{ fontSize: 18, fontWeight: 500, color: '#F1EFE9' }}>{v}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 p-6" style={{ background: 'rgba(198,169,114,0.12)' }}>
              <div className="ui-eyebrow" style={{ color: 'rgba(241,239,233,0.6)' }}>Per Level-1 closing</div>
              <div className="font-display mt-2" style={{ fontSize: 'clamp(32px, 4vw, 48px)', color: C.gold, fontWeight: 500, lineHeight: 1 }}>$360</div>
              <div className="text-sm mt-2" style={{ color: 'rgba(241,239,233,0.7)' }}>= 20% of $1,800, per closing</div>
            </div>
            <div className="mt-6 text-sm" style={{ color: 'rgba(241,239,233,0.7)', lineHeight: 1.7 }}>
              A single Level-1 agent doing 2 of those deals in a month → 2 × $360 = <strong style={{ color: '#F1EFE9' }}>$720</strong> to you from that one agent. Levels 2–5 remain $180 per closing.
            </div>
          </div></Reveal>
        </div>
      </div></section>

      {/* INTERACTIVE PROJECTION */}
      <section className="py-20"><div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <Reveal><SectionHeading eyebrow="Projection" title="Model your monthly revenue share." sub="Set how many agents sit on each level and their average closings. Toggle Power Award to see the Level 1 boost." /></Reveal>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-12">
          <div className="lg:col-span-5">
            <div className="card-soft p-10">
              <div className="flex items-center justify-between mb-2">
                <Eyebrow>Your Network</Eyebrow>
                <button onClick={() => setPowerAward((p) => !p)} className="ui-eyebrow flex items-center gap-2" style={{ color: powerAward ? C.gold : C.ink2, fontSize: 10 }}>
                  Power Award {powerAward ? 'ON' : 'OFF'}
                  <span style={{ width: 34, height: 18, borderRadius: 999, background: powerAward ? C.gold : C.hair, position: 'relative', display: 'inline-block', transition: 'background 240ms' }}>
                    <span style={{ position: 'absolute', top: 2, left: powerAward ? 18 : 2, width: 14, height: 14, borderRadius: 999, background: '#fff', transition: 'left 240ms', boxShadow: '0 1px 2px rgba(0,0,0,0.25)' }} />
                  </span>
                </button>
              </div>
              <div className="space-y-7 mt-8">
                {levels.map((l, i) => (
                  <InputSlider key={l.lvl} label={`Level ${l.lvl} agents${powerAward && l.lvl === 1 ? ' · 20%' : ' · 10%'}`} value={agentsPerLevel[i]} setValue={(v) => setAgents(i, v)} min={0} max={l.lvl <= 2 ? 50 : 400} display={agentsPerLevel[i]} />
                ))}
                <div className="pt-2 hairline border-t" />
                <InputSlider label="Avg closings / agent / month" value={closingsPerAgent} setValue={setClosingsPerAgent} min={0.25} max={4} step={0.25} display={closingsPerAgent + '/mo'} />
                <InputSlider label="Avg sales price" value={avgPrice} setValue={setAvgPrice} min={150000} max={2000000} step={25000} display={fmt(avgPrice)} />
                <InputSlider label="Commission %" value={commission} setValue={setCommission} min={1} max={4} step={0.05} display={commission.toFixed(2) + '%'} />
              </div>
            </div>
          </div>
          <div className="lg:col-span-7 space-y-6">
            <div className="card-soft p-10">
              <Eyebrow>Projected Revenue Share</Eyebrow>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-8">
                <BigStat label="Per month" value={fmt(calc.totalMonthly)} accent large />
                <BigStat label="Per year" value={fmt(calc.totalAnnual)} />
              </div>
              <div className="mt-8 pt-6 hairline border-t grid grid-cols-2 gap-6">
                <MiniStat label="Company rev / closing" value={fmt(calc.companyRevenue)} />
                <MiniStat label="GCI / closing" value={fmt(calc.gci)} />
              </div>
            </div>
            <div className="card-soft p-10">
              <Eyebrow>Monthly Contribution by Level</Eyebrow>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={calc.rows.map((r) => ({ name: 'L' + r.lvl, monthly: r.monthly }))}>
                  <CartesianGrid stroke={C.hair} vertical={false} />
                  <XAxis dataKey="name" stroke={C.ink2} fontSize={11} />
                  <YAxis stroke={C.ink2} fontSize={11} tickFormatter={(v) => fmtK(v)} />
                  <Tooltip contentStyle={{ background: '#fff', border: `1px solid ${C.hair}`, fontFamily: 'Inter', fontSize: 12 }} formatter={(v) => fmt(v) + '/mo'} />
                  <Bar dataKey="monthly" radius={[2, 2, 0, 0]}>
                    {calc.rows.map((r, i) => (<Cell key={i} fill={(powerAward && r.lvl === 1) ? C.goldDeep : C.gold} />))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <p className="text-xs mt-4" style={{ color: C.ink2 }}>* Illustrative. Assumes each agent in good standing and pre-cap on the modeled closings.</p>
            </div>
          </div>
        </div>
      </div></section>

      {/* KEY RULES & VESTING */}
      <section className="py-20" style={{ background: C.bg2 }}><div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <Reveal><SectionHeading eyebrow="Rules & Requirements" title="What it takes to earn — and keep — revenue share." /></Reveal>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-12">
          <Reveal><div className="card-soft p-10 h-full">
            <div className="ui-eyebrow" style={{ color: C.gold }}>Good Standing</div>
            <h3 className="font-display mt-4" style={{ fontSize: 26, fontWeight: 500 }}>To receive revenue share</h3>
            <ul className="mt-6 space-y-4">
              {[
                'Be an active Epique agent in good standing',
                'Current on monthly tech fees and any invoices',
                'Current on Association / MLS dues',
              ].map((x) => (
                <li key={x} className="flex items-start gap-3 text-sm"><span style={{ color: C.gold, marginTop: 2 }}><Check size={16} /></span><span style={{ color: C.ink2 }}>{x}</span></li>
              ))}
            </ul>
          </div></Reveal>
          <Reveal delay={120}><div className="ink-card p-10 h-full grain">
            <div className="ui-eyebrow" style={{ color: C.gold }}>Vesting</div>
            <h3 className="font-display mt-4" style={{ fontSize: 26, fontWeight: 500, color: '#F1EFE9' }}>Understand vesting</h3>
            <ul className="mt-6 space-y-4">
              {[
                'A rev share stream vests after 36 months \u2014 both you and that recruit must each be with Epique at least 36 months.',
                'If you leave voluntarily, you keep only your vested streams.',
                'If you are terminated or join a competing brokerage, all rev share \u2014 vested and non-vested \u2014 is forfeited.',
              ].map((x) => (
                <li key={x} className="flex items-start gap-3 text-sm"><span style={{ color: C.gold, marginTop: 2 }}><Check size={16} /></span><span style={{ color: 'rgba(241,239,233,0.8)' }}>{x}</span></li>
              ))}
            </ul>
          </div></Reveal>
        </div>
        <Reveal>
          <p className="text-xs mt-8" style={{ color: C.ink2, maxWidth: 760 }}>
            This page summarizes Epique's revenue share for planning purposes. Exact percentages, Power Award qualification, vesting terms, and good-standing requirements are governed by Epique's current policies and your agreement — confirmed during onboarding.
          </p>
        </Reveal>
      </div></section>

      {/* CTA */}
      <section className="py-24" style={{ background: C.black, color: '#F1EFE9' }}><div className="max-w-[1100px] mx-auto px-6 lg:px-10 text-center"><Reveal><h3 className="font-display text-balance" style={{ fontSize: 'clamp(32px, 4.5vw, 56px)', lineHeight: 1.05, color: '#F1EFE9' }}>Income today. <em style={{ color: C.gold, fontStyle: 'italic' }}>Asset tomorrow.</em></h3><button onClick={() => go('contact')} className="lux-btn lux-btn-gold mt-10">Book Consultation <ArrowUpRight size={14} /></button></Reveal></div></section>
    </main>
  );
}

/* ---------------- CONTACT ---------------- */

const ROUTES = { home: '/join', agents: '/join', usa: '/join/calculator', canada: '/join/canada', team: '/join/team', revshare: '/join/revenue-share', contact: '/contact' };
const PAGES = { agents: AgentEcosystemPage, usa: USACalculator, canada: CanadaCalculator, team: TeamCalculator, revshare: RevenueSharePage };

export default function Recruiting({ page }) {
  const [toasts, setToasts] = useState([]);
  const addToast = useCallback((msg) => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, msg }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3200);
  }, []);
  const go = (key) => { window.location.href = ROUTES[key] || '/join'; };
  const Page = PAGES[page] || AgentEcosystemPage;
  return (
    <div className="recruit">
      <Page go={go} addToast={addToast} />
      {toasts.map((t, idx) => (<div key={t.id} className="toast" role="status" style={{ bottom: `${24 + idx * 60}px` }}>{t.msg}</div>))}
    </div>
  );
}
