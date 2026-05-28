import React from 'react';
const sales = [
  { id:'#V-001', vehicle:'Ferrari Roma', client:'Roberto Salinas', date:'2024-01-15', amount:320000, status:'Completada' },
  { id:'#V-002', vehicle:'Lamborghini Huracán', client:'Andrea Torres', date:'2024-01-20', amount:285000, status:'Completada' },
  { id:'#V-003', vehicle:'Porsche 911 GT3', client:'Miguel Ángel Ruiz', date:'2024-01-28', amount:195000, status:'Pendiente' },
  { id:'#V-004', vehicle:'Bentley Continental', client:'Patricia Mendoza', date:'2024-02-05', amount:245000, status:'Completada' },
  { id:'#V-005', vehicle:'Rolls-Royce Ghost', client:'Jorge Castellanos', date:'2024-02-10', amount:380000, status:'En proceso' },
];
const fmt = n => new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(n);
const statusColor = s => s==='Completada' ? 'var(--success)' : s==='Pendiente' ? 'var(--gold)' : 'var(--text-secondary)';
export default function SalesPage() {
  const total = sales.reduce((a,s)=>a+s.amount,0);
  return (
    <div>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'24px' }}>
        <div>
          <h1 style={{ fontFamily:'var(--font-display)', fontSize:'26px', fontWeight:'600' }}>Ventas</h1>
          <p style={{ fontSize:'13px', color:'var(--text-muted)', marginTop:'2px' }}>Total: <span style={{ color:'var(--gold)', fontWeight:'600' }}>{fmt(total)}</span></p>
        </div>
      </div>
      <div style={{ background:'var(--bg-card)', border:'1px solid var(--border)', borderRadius:'var(--radius-lg)', overflow:'hidden' }}>
        <table style={{ width:'100%', borderCollapse:'collapse' }}>
          <thead>
            <tr style={{ borderBottom:'1px solid var(--border)' }}>
              {['ID','Vehículo','Cliente','Fecha','Monto','Estado'].map(h=>(
                <th key={h} style={{ padding:'14px 20px', textAlign:'left', fontSize:'11px',
                  color:'var(--text-muted)', fontWeight:'600', textTransform:'uppercase', letterSpacing:'0.8px' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sales.map((s,i)=>(
              <tr key={i} style={{ borderBottom: i<sales.length-1 ? '1px solid var(--border)' : 'none' }}
                onMouseEnter={e=>e.currentTarget.style.background='var(--bg-elevated)'}
                onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                <td style={{ padding:'16px 20px', fontSize:'13px', fontFamily:'var(--font-display)', color:'var(--gold)' }}>{s.id}</td>
                <td style={{ padding:'16px 20px', fontSize:'13px', fontWeight:'500', color:'var(--text-primary)' }}>{s.vehicle}</td>
                <td style={{ padding:'16px 20px', fontSize:'13px', color:'var(--text-secondary)' }}>{s.client}</td>
                <td style={{ padding:'16px 20px', fontSize:'13px', color:'var(--text-muted)' }}>{s.date}</td>
                <td style={{ padding:'16px 20px', fontSize:'14px', fontWeight:'600', color:'var(--gold)', fontFamily:'var(--font-display)' }}>{fmt(s.amount)}</td>
                <td style={{ padding:'16px 20px' }}>
                  <span style={{ fontSize:'12px', color:statusColor(s.status) }}>● {s.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
