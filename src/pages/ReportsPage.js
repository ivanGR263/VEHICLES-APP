import React from 'react';
const fmt = n => new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(n);
const months = ['Ene','Feb','Mar','Abr','May','Jun'];
const data = [320000,285000,195000,245000,380000,310000];
const maxVal = Math.max(...data);
export default function ReportsPage() {
  return (
    <div>
      <h1 style={{ fontFamily:'var(--font-display)', fontSize:'26px', fontWeight:'600', marginBottom:'24px' }}>Reportes</h1>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'12px', marginBottom:'24px' }}>
        {[
          { label:'Ventas Este Mes', value:fmt(380000), delta:'+12%' },
          { label:'Unidades Vendidas', value:'18', delta:'+3' },
          { label:'Ticket Promedio', value:fmt(289167), delta:'+8%' },
        ].map((s,i)=>(
          <div key={i} style={{ background:'var(--bg-card)', border:'1px solid var(--border)',
            borderRadius:'var(--radius-lg)', padding:'20px 24px' }}>
            <p style={{ fontSize:'11px', color:'var(--text-muted)', textTransform:'uppercase', letterSpacing:'0.8px', marginBottom:'8px' }}>{s.label}</p>
            <p style={{ fontFamily:'var(--font-display)', fontSize:'24px', fontWeight:'600', color:'var(--text-primary)', marginBottom:'4px' }}>{s.value}</p>
            <p style={{ fontSize:'12px', color:'var(--success)' }}>{s.delta} vs mes anterior</p>
          </div>
        ))}
      </div>
      <div style={{ background:'var(--bg-card)', border:'1px solid var(--border)', borderRadius:'var(--radius-lg)', padding:'24px' }}>
        <h3 style={{ fontFamily:'var(--font-display)', fontSize:'16px', fontWeight:'600', marginBottom:'24px', color:'var(--text-primary)' }}>Ventas por Mes</h3>
        <div style={{ display:'flex', alignItems:'flex-end', gap:'12px', height:'160px' }}>
          {data.map((val,i)=>(
            <div key={i} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:'8px', height:'100%', justifyContent:'flex-end' }}>
              <span style={{ fontSize:'10px', color:'var(--text-muted)' }}>{fmt(val)}</span>
              <div style={{ width:'100%', borderRadius:'4px 4px 0 0',
                height:`${(val/maxVal)*120}px`,
                background: i===data.length-1
                  ? 'linear-gradient(180deg, var(--gold-light), var(--gold-dark))'
                  : 'var(--bg-elevated)',
                border: `1px solid ${i===data.length-1 ? 'var(--gold-border)' : 'var(--border)'}`,
                transition:'all 0.3s' }} />
              <span style={{ fontSize:'11px', color:'var(--text-muted)' }}>{months[i]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
