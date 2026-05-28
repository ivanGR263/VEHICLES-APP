import React from 'react';
const brands = [
  { name:'Ferrari', country:'Italia', founded:1939, models:12 },
  { name:'Lamborghini', country:'Italia', founded:1963, models:8 },
  { name:'Porsche', country:'Alemania', founded:1931, models:15 },
  { name:'Bentley', country:'Reino Unido', founded:1919, models:6 },
  { name:'McLaren', country:'Reino Unido', founded:1963, models:9 },
  { name:'Rolls-Royce', country:'Reino Unido', founded:1906, models:5 },
];
export default function BrandsPage() {
  return (
    <div>
      <h1 style={{ fontFamily:'var(--font-display)', fontSize:'26px', fontWeight:'600', marginBottom:'24px' }}>Marcas</h1>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(280px,1fr))', gap:'16px' }}>
        {brands.map(b => (
          <div key={b.name} style={{ background:'var(--bg-card)', border:'1px solid var(--border)',
            borderRadius:'var(--radius-lg)', padding:'24px', transition:'border-color 0.2s' }}
            onMouseEnter={e=>e.currentTarget.style.borderColor='var(--gold-border)'}
            onMouseLeave={e=>e.currentTarget.style.borderColor='var(--border)'}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'16px' }}>
              <div style={{ width:'48px', height:'48px', borderRadius:'var(--radius-md)',
                background:'var(--gold-subtle)', border:'1px solid var(--gold-border)',
                display:'flex', alignItems:'center', justifyContent:'center', fontSize:'24px' }}>🏎️</div>
              <span style={{ fontSize:'11px', padding:'3px 10px', borderRadius:'20px',
                background:'var(--bg-elevated)', border:'1px solid var(--border)', color:'var(--text-muted)' }}>
                {b.country}
              </span>
            </div>
            <h3 style={{ fontFamily:'var(--font-display)', fontSize:'18px', fontWeight:'600', color:'var(--text-primary)', marginBottom:'4px' }}>{b.name}</h3>
            <p style={{ fontSize:'12px', color:'var(--text-muted)', marginBottom:'16px' }}>Fundada en {b.founded}</p>
            <div style={{ display:'flex', justifyContent:'space-between', paddingTop:'16px', borderTop:'1px solid var(--border)' }}>
              <div><p style={{ fontSize:'11px', color:'var(--text-muted)' }}>Modelos</p><p style={{ fontSize:'16px', fontWeight:'600', color:'var(--gold)' }}>{b.models}</p></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
