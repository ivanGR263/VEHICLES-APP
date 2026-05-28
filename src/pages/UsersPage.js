import React from 'react';
const users = [
  { name:'John Doe', email:'john@prestigeauto.com', role:'Admin', status:'Activo' },
  { name:'María García', email:'maria@prestigeauto.com', role:'Vendedor', status:'Activo' },
  { name:'Carlos López', email:'carlos@prestigeauto.com', role:'Vendedor', status:'Inactivo' },
  { name:'Ana Martínez', email:'ana@prestigeauto.com', role:'Gerente', status:'Activo' },
];
export default function UsersPage() {
  return (
    <div>
      <h1 style={{ fontFamily:'var(--font-display)', fontSize:'26px', fontWeight:'600', marginBottom:'24px' }}>Usuarios</h1>
      <div style={{ background:'var(--bg-card)', border:'1px solid var(--border)', borderRadius:'var(--radius-lg)', overflow:'hidden' }}>
        <table style={{ width:'100%', borderCollapse:'collapse' }}>
          <thead>
            <tr style={{ borderBottom:'1px solid var(--border)' }}>
              {['Usuario','Email','Rol','Estado','Acciones'].map(h => (
                <th key={h} style={{ padding:'14px 20px', textAlign:'left', fontSize:'11px',
                  color:'var(--text-muted)', fontWeight:'600', textTransform:'uppercase', letterSpacing:'0.8px' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map((u,i) => (
              <tr key={i} style={{ borderBottom: i<users.length-1 ? '1px solid var(--border)' : 'none' }}
                onMouseEnter={e=>e.currentTarget.style.background='var(--bg-elevated)'}
                onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                <td style={{ padding:'16px 20px' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:'12px' }}>
                    <div style={{ width:'36px', height:'36px', borderRadius:'50%',
                      background:'var(--gold-subtle)', border:'1px solid var(--gold-border)',
                      display:'flex', alignItems:'center', justifyContent:'center',
                      fontSize:'13px', fontWeight:'600', color:'var(--gold)' }}>
                      {u.name.charAt(0)}
                    </div>
                    <span style={{ fontSize:'14px', fontWeight:'500', color:'var(--text-primary)' }}>{u.name}</span>
                  </div>
                </td>
                <td style={{ padding:'16px 20px', fontSize:'13px', color:'var(--text-secondary)' }}>{u.email}</td>
                <td style={{ padding:'16px 20px' }}>
                  <span style={{ fontSize:'12px', padding:'3px 12px', borderRadius:'20px',
                    background:'var(--gold-subtle)', border:'1px solid var(--gold-border)', color:'var(--gold)' }}>
                    {u.role}
                  </span>
                </td>
                <td style={{ padding:'16px 20px' }}>
                  <span style={{ fontSize:'12px', color: u.status==='Activo' ? 'var(--success)' : 'var(--text-muted)' }}>
                    ● {u.status}
                  </span>
                </td>
                <td style={{ padding:'16px 20px' }}>
                  <button style={{ background:'none', border:'1px solid var(--border)', borderRadius:'var(--radius-sm)',
                    color:'var(--text-secondary)', padding:'6px 14px', fontSize:'12px', cursor:'pointer' }}>
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
