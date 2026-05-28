import React, { useState } from 'react';
import { useAuth } from '../App';

export default function LoginPage() {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '', phone: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [remember, setRemember] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.email || !form.password) { setError('Por favor completa todos los campos'); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      login({ name: 'John Doe', email: form.email, role: 'Admin' });
    }, 1200);
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'var(--bg-base)', position: 'relative', overflow: 'hidden'
    }}>
      {/* Background decorations */}
      <div style={{
        position: 'absolute', top: '-20%', right: '-10%',
        width: '600px', height: '600px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute', bottom: '-20%', left: '-10%',
        width: '500px', height: '500px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(201,168,76,0.04) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      <div style={{
        width: '100%', maxWidth: '420px', margin: '0 1rem',
        background: 'var(--bg-card)',
        border: '1px solid var(--gold-border)',
        borderRadius: 'var(--radius-xl)',
        padding: '48px 40px',
        boxShadow: 'var(--shadow-gold)',
        position: 'relative', zIndex: 1,
        animation: 'fadeUp 0.5s ease'
      }}>
        <style>{`
          @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
          @keyframes spin { to { transform: rotate(360deg); } }
          .login-input {
            width: 100%; padding: 12px 16px 12px 44px;
            background: var(--bg-elevated); border: 1px solid var(--border);
            border-radius: var(--radius-md); color: var(--text-primary);
            font-size: 14px; transition: border-color 0.2s;
          }
          .login-input:focus { border-color: var(--gold); }
          .login-input::placeholder { color: var(--text-muted); }
          .login-btn {
            width: 100%; padding: 14px;
            background: linear-gradient(135deg, var(--gold) 0%, var(--gold-dark) 100%);
            color: #0A0A0B; font-size: 15px; font-weight: 600;
            border-radius: var(--radius-md); letter-spacing: 1px;
            transition: opacity 0.2s, transform 0.1s;
          }
          .login-btn:hover { opacity: 0.92; transform: translateY(-1px); }
          .login-btn:active { transform: translateY(0); }
        `}</style>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            width: '64px', height: '64px', borderRadius: '50%',
            background: 'var(--bg-elevated)', border: '1px solid var(--gold-border)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 16px',
          }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5">
              <path d="M5 17H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1l2-3h10l2 3h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2"/>
              <circle cx="7.5" cy="17.5" r="2.5"/><circle cx="16.5" cy="17.5" r="2.5"/>
              <path d="M7.5 15H16.5"/>
            </svg>
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '4px' }}>
            Prestige Auto
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Vehicle Sales System</p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div style={{ position: 'relative', marginBottom: '14px' }}>
            <svg style={{ position:'absolute', left:'14px', top:'50%', transform:'translateY(-50%)', pointerEvents:'none' }}
              width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2">
              <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
            </svg>
            <input className="login-input" type="email" placeholder="Email" value={form.email}
              onChange={e => setForm({...form, email: e.target.value})} />
          </div>

          {/* Password */}
          <div style={{ position: 'relative', marginBottom: '14px' }}>
            <svg style={{ position:'absolute', left:'14px', top:'50%', transform:'translateY(-50%)', pointerEvents:'none' }}
              width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            <input className="login-input" type={showPass ? 'text' : 'password'} placeholder="Contraseña"
              value={form.password} onChange={e => setForm({...form, password: e.target.value})}
              style={{ paddingRight: '44px' }} />
            <button type="button" onClick={() => setShowPass(!showPass)}
              style={{ position:'absolute', right:'14px', top:'50%', transform:'translateY(-50%)',
                background:'none', border:'none', color:'var(--text-muted)', padding:'0' }}>
              {showPass
                ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              }
            </button>
          </div>

          {/* Phone */}
          <div style={{ position: 'relative', marginBottom: '20px' }}>
            <svg style={{ position:'absolute', left:'14px', top:'50%', transform:'translateY(-50%)', pointerEvents:'none' }}
              width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
            <input className="login-input" type="tel" placeholder="Teléfono móvil" value={form.phone}
              onChange={e => setForm({...form, phone: e.target.value})} />
          </div>

          {/* Remember / Forgot */}
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'24px' }}>
            <label style={{ display:'flex', alignItems:'center', gap:'8px', cursor:'pointer', fontSize:'13px', color:'var(--text-secondary)' }}>
              <div onClick={() => setRemember(!remember)} style={{
                width:'18px', height:'18px', borderRadius:'4px', border:`2px solid ${remember ? 'var(--gold)' : 'var(--border-hover)'}`,
                background: remember ? 'var(--gold)' : 'transparent',
                display:'flex', alignItems:'center', justifyContent:'center', transition:'all 0.2s'
              }}>
                {remember && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#0A0A0B" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>}
              </div>
              Recordarme
            </label>
            <button type="button" style={{ background:'none', border:'none', color:'var(--gold)', fontSize:'13px' }}>
              ¿Olvidaste tu contraseña?
            </button>
          </div>

          {error && <p style={{ color:'var(--danger)', fontSize:'13px', marginBottom:'14px', textAlign:'center' }}>{error}</p>}

          <button className="login-btn" type="submit" disabled={loading}>
            {loading
              ? <span style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'8px' }}>
                  <span style={{ width:'16px', height:'16px', border:'2px solid #0A0A0B', borderTopColor:'transparent', borderRadius:'50%', display:'inline-block', animation:'spin 0.7s linear infinite' }} />
                  Ingresando...
                </span>
              : 'INGRESAR'
            }
          </button>
        </form>

        <div style={{ display:'flex', alignItems:'center', gap:'8px', marginTop:'28px',
          padding:'14px', background:'var(--bg-elevated)', borderRadius:'var(--radius-md)',
          border:'1px solid var(--gold-border)' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
          <div>
            <p style={{ fontSize:'12px', fontWeight:'600', color:'var(--gold)' }}>Acceso Seguro</p>
            <p style={{ fontSize:'11px', color:'var(--text-muted)' }}>Email, contraseña y teléfono móvil</p>
          </div>
        </div>
      </div>
    </div>
  );
}
