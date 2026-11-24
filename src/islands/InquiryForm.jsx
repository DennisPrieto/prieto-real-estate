import React, { useState } from 'react';

// Generic Formspree form. `fields` drives the layout; rows of two use `half`.
export default function InquiryForm({ formId, subject, fields, submitLabel = 'Send', inquiryType, successTitle = 'Received.', successBody = 'We will reply within one business day.' }) {
  const initial = Object.fromEntries(fields.map((f) => [f.name, f.type === 'chips' ? '' : (f.default || '')]));
  const [v, setV] = useState(initial);
  const [errors, setErrors] = useState({});
  const [state, setState] = useState('idle'); // idle | sending | sent | failed
  const [gotcha, setGotcha] = useState(''); // honeypot: real people never fill this in

  const set = (k, val) => { setV((p) => ({ ...p, [k]: val })); if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined })); };

  const validate = () => {
    const e = {};
    fields.forEach((f) => {
      const val = (v[f.name] || '').trim();
      if (f.required && !val) e[f.name] = f.type === 'chips' ? 'Choose one.' : `Enter ${f.label.toLowerCase().replace(' *', '')}.`;
      else if (f.type === 'email' && val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) e[f.name] = 'Enter a valid email address.';
    });
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (ev) => {
    ev.preventDefault();
    if (state === 'sending' || !validate()) return;
    setState('sending');
    try {
      const res = await fetch(`https://formspree.io/f/${formId}`, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...v, _gotcha: gotcha, inquiry_type: inquiryType, page: window.location.pathname, _subject: `${subject}: ${v.name || 'New inquiry'}`, _replyto: v.email }),
      });
      setState(res.ok ? 'sent' : 'failed');
    } catch {
      setState('failed');
    }
  };

  if (state === 'sent') {
    return (
      <div className="form-status" role="status">
        <p className="h4">{successTitle}</p>
        <p className="small" style={{ marginTop: 8 }}>{successBody}</p>
      </div>
    );
  }

  const rows = [];
  for (let i = 0; i < fields.length; i++) {
    const f = fields[i];
    if (f.half && fields[i + 1]?.half) { rows.push([f, fields[i + 1]]); i++; } else rows.push([f]);
  }

  const renderField = (f) => {
    const id = `f-${formId}-${f.name}`;
    const err = errors[f.name];
    const common = { id, name: f.name, value: v[f.name], 'aria-invalid': !!err, 'aria-describedby': err ? `${id}-err` : undefined, onChange: (e) => set(f.name, e.target.value) };
    return (
      <div className="field" key={f.name}>
        {f.type === 'chips' ? (
          <fieldset>
            <legend>{f.label}</legend>
            <div className="chips">
              {f.options.map((o) => (
                <button type="button" key={o} className="chip" aria-pressed={v[f.name] === o} onClick={() => set(f.name, o)}>{o}</button>
              ))}
            </div>
          </fieldset>
        ) : (
          <>
            <label htmlFor={id}>{f.label}</label>
            {f.type === 'select' ? (
              <select {...common}>
                <option value="">Select</option>
                {f.options.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            ) : f.type === 'textarea' ? (
              <textarea {...common} placeholder={f.placeholder} rows={4} />
            ) : (
              <input {...common} type={f.type} placeholder={f.placeholder} autoComplete={f.autoComplete} />
            )}
          </>
        )}
        {f.hint && !err && <p className="hint">{f.hint}</p>}
        {err && <p className="error" id={`${id}-err`}>{err}</p>}
      </div>
    );
  };

  return (
    <form className="form" onSubmit={submit} noValidate>
      <div aria-hidden="true" style={{ position: 'absolute', left: '-10000px', width: 1, height: 1, overflow: 'hidden' }}>
        <label htmlFor={`f-${formId}-gotcha`}>Leave this field empty</label>
        <input id={`f-${formId}-gotcha`} type="text" tabIndex={-1} autoComplete="off" value={gotcha} onChange={(e) => setGotcha(e.target.value)} />
      </div>
      {rows.map((r, i) => r.length === 2 ? <div className="form-row" key={i}>{r.map(renderField)}</div> : renderField(r[0]))}
      {state === 'failed' && (
        <p className="form-status form-status--error" role="alert">
          That didn't go through. Try again, or email <a className="textlink" href="mailto:DennisPrieto@Epique.me">DennisPrieto@Epique.me</a>.
        </p>
      )}
      <div>
        <button type="submit" className="btn btn--primary" disabled={state === 'sending'}>
          {state === 'sending' ? 'Sending…' : submitLabel}
          {state !== 'sending' && <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2 8h11M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.4" /></svg>}
        </button>
        <p className="small muted" style={{ marginTop: 12 }}>Confidential. Sent to Dennis and Jaelly directly.</p>
      </div>
    </form>
  );
}
