import React, { useState } from 'react';
import { useAuth } from '../App';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg> },
  { id: 'vehicles', label: 'Vehículos', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M5 17H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1l2-3h10l2 3h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2"/><circle cx="7.5" cy="17.5" r="2.5"/><circle cx="16.5" cy="17.5" r="2.5"/></svg> },
  { id: 'brands', label: 'Marcas', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg> },
  { id: 'users', label: 'Usuarios', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
  { id: 'sales', label: 'Ventas', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg> },
  { id: 'reports', label: 'Reportes', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg> },
  { id: 'settings', label: 'Configuración', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg> },
];

export default function DashboardLayout({ children, currentPage, setCurrentPage }) {
  const { user, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div style={{ display:'flex', height:'100vh', overflow:'hidden', background:'var(--bg-base)' }}>
      <style>{`
        .nav-item {
          display: flex; align-items: center; gap: 12px;
          padding: 10px 16px; border-radius: var(--radius-md);
          cursor: pointer; transition: all 0.2s; font-size: 14px;
          color: var(--text-secondary); font-weight: 400;
          white-space: nowrap; overflow: hidden;
        }
        .nav-item:hover { background: var(--bg-hover); color: var(--text-primary); }
        .nav-item.active {
          background: var(--gold-subtle); color: var(--gold);
          border: 1px solid var(--gold-border);
        }
        .nav-item.active svg { stroke: var(--gold); }
        .header-btn {
          background: var(--bg-elevated); border: 1px solid var(--border);
          border-radius: var(--radius-md); padding: 8px;
          color: var(--text-secondary); transition: all 0.2s;
          display: flex; align-items: center; justify-content: center;
        }
        .header-btn:hover { border-color: var(--gold-border); color: var(--gold); }
      `}</style>

      <div style={{
        width: collapsed ? '64px' : '240px', transition: 'width 0.3s ease',
        background: 'var(--bg-surface)', borderRight: '1px solid var(--border)',
        display: 'flex', flexDirection: 'column', overflow: 'hidden', flexShrink: 0
      }}>
        <div style={{ padding: '20px 16px', borderBottom: '1px solid var(--border)',
          display:'flex', alignItems:'center', gap:'12px', minHeight:'64px' }}>
          <div style={{ width:'32px', height:'32px', borderRadius:'8px',
            background:'var(--gold-subtle)', border:'1px solid var(--gold-border)',
            display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.8">
              <path d="M5 17H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1l2-3h10l2 3h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2"/>
              <circle cx="7.5" cy="17.5" r="2.5"/><circle cx="16.5" cy="17.5" r="2.5"/>
            </svg>
          </div>
          {!collapsed && (
            <div style={{ overflow:'hidden' }}>
              <p style={{ fontFamily:'var(--font-display)', fontSize:'15px', fontWeight:'600', color:'var(--text-primary)', lineHeight:1.2 }}>Prestige Auto</p>
              <p style={{ fontSize:'10px', color:'var(--gold)', letterSpacing:'1.5px', textTransform:'uppercase' }}>Sales System</p>
            </div>
          )}
        </div>

        <nav style={{ flex:1, padding:'12px 8px', overflowY:'auto', overflowX:'hidden' }}>
          {navItems.map(item => (
            <div key={item.id} className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
              onClick={() => setCurrentPage(item.id)}
              title={collapsed ? item.label : ''}>
              <span style={{ flexShrink:0 }}>{item.icon}</span>
              {!collapsed && <span>{item.label}</span>}
            </div>
          ))}
        </nav>

        {!collapsed && (
          <div style={{ padding:'12px 8px', borderTop:'1px solid var(--border)' }}>
            <div style={{ display:'flex', alignItems:'center', gap:'10px', padding:'10px 12px',
              background:'var(--bg-elevated)', borderRadius:'var(--radius-md)', border:'1px solid var(--border)' }}>
              <div style={{ width:'32px', height:'32px', borderRadius:'50%', background:'var(--gold-subtle)',
                border:'1px solid var(--gold-border)', display:'flex', alignItems:'center', justifyContent:'center',
                fontSize:'12px', fontWeight:'600', color:'var(--gold)', flexShrink:0 }}>
                {user?.name?.charAt(0) || 'U'}
              </div>
              <div style={{ flex:1, minWidth:0 }}>
                <p style={{ fontSize:'13px', fontWeight:'500', color:'var(--text-primary)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{user?.name}</p>
                <p style={{ fontSize:'11px', color:'var(--text-muted)' }}>{user?.role}</p>
              </div>
              <button onClick={logout} style={{ background:'none', border:'none', color:'var(--text-muted)', padding:'4px', cursor:'pointer' }} title="Cerrar sesión">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>

      <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' }}>
        <header style={{ height:'64px', background:'var(--bg-surface)', borderBottom:'1px solid var(--border)',
          display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 24px', flexShrink:0 }}>
          <button className="header-btn" onClick={() => setCollapsed(!collapsed)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>
          <div style={{ display:'flex', alignItems:'center', gap:'12px' }}>
            <span style={{ fontSize:'13px', color:'var(--text-secondary)' }}>Bienvenido, <span style={{ color:'var(--gold)' }}>{user?.name}</span></span>
            <div style={{ width:'36px', height:'36px', borderRadius:'50%', background:'var(--gold-subtle)',
              border:'1px solid var(--gold-border)', display:'flex', alignItems:'center', justifyContent:'center',
              fontSize:'13px', fontWeight:'600', color:'var(--gold)' }}>
              {user?.name?.charAt(0) || 'U'}
            </div>
          </div>
        </header>

        <main style={{ flex:1, overflow:'auto', padding:'24px' }}>
          {children}
        </main>
      </div>
    </div>
  );
}
