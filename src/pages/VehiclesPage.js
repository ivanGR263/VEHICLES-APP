import React, { useState } from 'react';

const initialVehicles = [
  { id:1, brand:'Lamborghini', model:'Huracán EVO', year:2023, color:'Amarillo', price:285000, stock:2, image:'🏎️' },
  { id:2, brand:'Ferrari', model:'Roma', year:2023, color:'Rojo', price:320000, stock:1, image:'🚗' },
  { id:3, brand:'Porsche', model:'911 GT3', year:2022, color:'Plata', price:195000, stock:3, image:'🏁' },
  { id:4, brand:'Bentley', model:'Continental GT', year:2023, color:'Negro', price:245000, stock:2, image:'🚙' },
  { id:5, brand:'McLaren', model:'720S', year:2022, color:'Naranja', price:310000, stock:1, image:'⚡' },
  { id:6, brand:'Rolls-Royce', model:'Ghost', year:2023, color:'Blanco', price:380000, stock:1, image:'👑' },
];

const emptyForm = { brand:'', model:'', year:'', color:'', price:'', stock:'' };

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState(initialVehicles);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editVehicle, setEditVehicle] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [page, setPage] = useState(1);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const perPage = 5;

  const filtered = vehicles.filter(v =>
    `${v.brand} ${v.model} ${v.color}`.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page-1)*perPage, page*perPage);

  const openAdd = () => { setForm(emptyForm); setEditVehicle(null); setShowModal(true); };
  const openEdit = (v) => { setForm({...v}); setEditVehicle(v.id); setShowModal(true); };
  const closeModal = () => { setShowModal(false); setEditVehicle(null); setForm(emptyForm); };

  const handleSave = () => {
    if (!form.brand || !form.model || !form.price) return;
    if (editVehicle) {
      setVehicles(vehicles.map(v => v.id === editVehicle ? {...form, id:editVehicle, image:v.image} : v));
    } else {
      setVehicles([...vehicles, {...form, id: Date.now(), image:'🚗'}]);
    }
    closeModal();
  };

  const handleDelete = (id) => {
    setVehicles(vehicles.filter(v => v.id !== id));
    setDeleteConfirm(null);
  };

  const fmt = (n) => new Intl.NumberFormat('en-US', { style:'currency', currency:'USD', maximumFractionDigits:0 }).format(n);

  return (
    <div>
      <style>{`
        .gold-btn {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 10px 20px; border-radius: var(--radius-md);
          background: linear-gradient(135deg, var(--gold) 0%, var(--gold-dark) 100%);
          color: #0A0A0B; font-size: 13px; font-weight: 600;
          border: none; cursor: pointer; transition: opacity 0.2s, transform 0.1s;
          letter-spacing: 0.3px;
        }
        .gold-btn:hover { opacity: 0.9; transform: translateY(-1px); }
        .ghost-btn {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 7px 14px; border-radius: var(--radius-md);
          background: transparent; color: var(--text-secondary);
          border: 1px solid var(--border); font-size: 13px;
          cursor: pointer; transition: all 0.2s;
        }
        .ghost-btn:hover { border-color: var(--gold-border); color: var(--gold); }
        .icon-btn {
          width: 32px; height: 32px; border-radius: var(--radius-sm);
          display: flex; align-items: center; justify-content: center;
          border: 1px solid var(--border); background: transparent;
          cursor: pointer; transition: all 0.2s;
        }
        .icon-btn.edit:hover { border-color: var(--gold-border); color: var(--gold); background: var(--gold-subtle); }
        .icon-btn.del:hover { border-color: rgba(224,82,82,0.3); color: var(--danger); background: rgba(224,82,82,0.08); }
        .search-input {
          background: var(--bg-elevated); border: 1px solid var(--border);
          border-radius: var(--radius-md); color: var(--text-primary);
          padding: 9px 14px 9px 38px; font-size: 13px; width: 260px;
          transition: border-color 0.2s;
        }
        .search-input:focus { border-color: var(--gold-border); }
        .search-input::placeholder { color: var(--text-muted); }
        .form-input {
          width: 100%; padding: 10px 14px;
          background: var(--bg-elevated); border: 1px solid var(--border);
          border-radius: var(--radius-md); color: var(--text-primary);
          font-size: 14px; transition: border-color 0.2s;
        }
        .form-input:focus { border-color: var(--gold); }
        .form-input::placeholder { color: var(--text-muted); }
        .page-btn {
          width: 32px; height: 32px; border-radius: var(--radius-sm);
          display: flex; align-items: center; justify-content: center;
          border: 1px solid var(--border); background: transparent;
          font-size: 13px; cursor: pointer; color: var(--text-secondary);
          transition: all 0.2s;
        }
        .page-btn:hover { border-color: var(--gold-border); color: var(--gold); }
        .page-btn.active { background: var(--gold-subtle); border-color: var(--gold-border); color: var(--gold); font-weight: 600; }
        @keyframes modalIn { from { opacity:0; transform:scale(0.96) translateY(10px); } to { opacity:1; transform:scale(1) translateY(0); } }
      `}</style>

      {/* Header */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'24px' }}>
        <div>
          <h1 style={{ fontFamily:'var(--font-display)', fontSize:'26px', fontWeight:'600', color:'var(--text-primary)' }}>Vehículos</h1>
          <p style={{ fontSize:'13px', color:'var(--text-muted)', marginTop:'2px' }}>{vehicles.length} vehículos en inventario</p>
        </div>
        <button className="gold-btn" onClick={openAdd}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Agregar Vehículo
        </button>
      </div>

      {/* Stats */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'12px', marginBottom:'24px' }}>
        {[
          { label:'Total Vehículos', value: vehicles.length, icon:'🚗' },
          { label:'En Stock', value: vehicles.reduce((a,v) => a+Number(v.stock),0), icon:'📦' },
          { label:'Valor Inventario', value: fmt(vehicles.reduce((a,v) => a+Number(v.price)*Number(v.stock),0)), icon:'💰' },
          { label:'Marcas', value: [...new Set(vehicles.map(v=>v.brand))].length, icon:'🏷️' },
        ].map((s,i) => (
          <div key={i} style={{ background:'var(--bg-card)', border:'1px solid var(--border)',
            borderRadius:'var(--radius-lg)', padding:'16px 20px' }}>
            <p style={{ fontSize:'12px', color:'var(--text-muted)', marginBottom:'8px', textTransform:'uppercase', letterSpacing:'0.8px' }}>{s.label}</p>
            <p style={{ fontSize:'22px', fontWeight:'600', color:'var(--text-primary)', fontFamily:'var(--font-display)' }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Table Card */}
      <div style={{ background:'var(--bg-card)', border:'1px solid var(--border)', borderRadius:'var(--radius-lg)', overflow:'hidden' }}>
        {/* Table Header */}
        <div style={{ padding:'16px 20px', borderBottom:'1px solid var(--border)',
          display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <div style={{ position:'relative' }}>
            <svg style={{ position:'absolute', left:'12px', top:'50%', transform:'translateY(-50%)', pointerEvents:'none' }}
              width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input className="search-input" placeholder="Buscar vehículos..." value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }} />
          </div>
          <div style={{ display:'flex', gap:'8px' }}>
            <button className="ghost-btn">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
              Filtrar
            </button>
          </div>
        </div>

        {/* Table */}
        <div style={{ overflowX:'auto' }}>
          <table style={{ width:'100%', borderCollapse:'collapse' }}>
            <thead>
              <tr style={{ borderBottom:'1px solid var(--border)' }}>
                {['Imagen','Marca','Modelo','Año','Color','Precio','Stock','Acciones'].map(h => (
                  <th key={h} style={{ padding:'12px 16px', textAlign:'left', fontSize:'11px',
                    color:'var(--text-muted)', fontWeight:'600', textTransform:'uppercase', letterSpacing:'0.8px',
                    whiteSpace:'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.map((v, i) => (
                <tr key={v.id} style={{
                  borderBottom: i < paginated.length-1 ? '1px solid var(--border)' : 'none',
                  transition:'background 0.15s',
                }} onMouseEnter={e => e.currentTarget.style.background='var(--bg-elevated)'}
                   onMouseLeave={e => e.currentTarget.style.background='transparent'}>
                  <td style={{ padding:'14px 16px' }}>
                    <div style={{ width:'52px', height:'40px', borderRadius:'var(--radius-sm)',
                      background:'var(--bg-elevated)', border:'1px solid var(--border)',
                      display:'flex', alignItems:'center', justifyContent:'center', fontSize:'22px' }}>
                      {v.image}
                    </div>
                  </td>
                  <td style={{ padding:'14px 16px' }}>
                    <span style={{ fontSize:'13px', fontWeight:'600', color:'var(--text-primary)' }}>{v.brand}</span>
                  </td>
                  <td style={{ padding:'14px 16px', fontSize:'13px', color:'var(--text-secondary)' }}>{v.model}</td>
                  <td style={{ padding:'14px 16px', fontSize:'13px', color:'var(--text-secondary)' }}>{v.year}</td>
                  <td style={{ padding:'14px 16px' }}>
                    <span style={{ fontSize:'12px', padding:'3px 10px', borderRadius:'20px',
                      background:'var(--bg-elevated)', border:'1px solid var(--border)', color:'var(--text-secondary)' }}>
                      {v.color}
                    </span>
                  </td>
                  <td style={{ padding:'14px 16px' }}>
                    <span style={{ fontSize:'14px', fontWeight:'600', color:'var(--gold)', fontFamily:'var(--font-display)' }}>
                      {fmt(v.price)}
                    </span>
                  </td>
                  <td style={{ padding:'14px 16px' }}>
                    <span style={{ fontSize:'13px', fontWeight:'500',
                      color: v.stock > 2 ? 'var(--success)' : v.stock > 0 ? 'var(--gold)' : 'var(--danger)' }}>
                      {v.stock}
                    </span>
                  </td>
                  <td style={{ padding:'14px 16px' }}>
                    <div style={{ display:'flex', gap:'6px' }}>
                      <button className="icon-btn edit" onClick={() => openEdit(v)} title="Editar" style={{ color:'var(--text-secondary)' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                      </button>
                      <button className="icon-btn del" onClick={() => setDeleteConfirm(v.id)} title="Eliminar" style={{ color:'var(--text-secondary)' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                          <path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={{ padding:'14px 20px', borderTop:'1px solid var(--border)',
            display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <span style={{ fontSize:'12px', color:'var(--text-muted)' }}>
              {(page-1)*perPage+1}–{Math.min(page*perPage, filtered.length)} de {filtered.length}
            </span>
            <div style={{ display:'flex', gap:'4px', alignItems:'center' }}>
              <button className="page-btn" onClick={() => setPage(p=>Math.max(1,p-1))} disabled={page===1}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
              </button>
              {Array.from({length:totalPages},(_,i)=>i+1).map(n => (
                <button key={n} className={`page-btn ${n===page?'active':''}`} onClick={() => setPage(n)}>{n}</button>
              ))}
              <button className="page-btn" onClick={() => setPage(p=>Math.min(totalPages,p+1))} disabled={page===totalPages}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.7)', display:'flex',
          alignItems:'center', justifyContent:'center', zIndex:1000, backdropFilter:'blur(4px)' }}>
          <div style={{ background:'var(--bg-card)', border:'1px solid var(--gold-border)',
            borderRadius:'var(--radius-xl)', padding:'32px', width:'100%', maxWidth:'480px',
            boxShadow:'var(--shadow-gold)', animation:'modalIn 0.25s ease' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'24px' }}>
              <h2 style={{ fontFamily:'var(--font-display)', fontSize:'20px', fontWeight:'600', color:'var(--text-primary)' }}>
                {editVehicle ? 'Editar Vehículo' : 'Nuevo Vehículo'}
              </h2>
              <button onClick={closeModal} style={{ background:'none', border:'none', color:'var(--text-muted)', cursor:'pointer' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'14px' }}>
              {[
                { label:'Marca', key:'brand', placeholder:'Ej: Ferrari' },
                { label:'Modelo', key:'model', placeholder:'Ej: Roma' },
                { label:'Año', key:'year', placeholder:'2023', type:'number' },
                { label:'Color', key:'color', placeholder:'Ej: Rojo' },
                { label:'Precio (USD)', key:'price', placeholder:'320000', type:'number' },
                { label:'Stock', key:'stock', placeholder:'1', type:'number' },
              ].map(f => (
                <div key={f.key} style={{ gridColumn: f.key==='brand'||f.key==='model' ? 'span 1' : 'span 1' }}>
                  <label style={{ fontSize:'12px', color:'var(--text-muted)', display:'block', marginBottom:'6px', textTransform:'uppercase', letterSpacing:'0.5px' }}>{f.label}</label>
                  <input className="form-input" type={f.type||'text'} placeholder={f.placeholder}
                    value={form[f.key]} onChange={e => setForm({...form, [f.key]: e.target.value})} />
                </div>
              ))}
            </div>
            <div style={{ display:'flex', gap:'10px', marginTop:'24px', justifyContent:'flex-end' }}>
              <button className="ghost-btn" onClick={closeModal}>Cancelar</button>
              <button className="gold-btn" onClick={handleSave}>
                {editVehicle ? 'Guardar Cambios' : 'Agregar Vehículo'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteConfirm && (
        <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.7)', display:'flex',
          alignItems:'center', justifyContent:'center', zIndex:1000, backdropFilter:'blur(4px)' }}>
          <div style={{ background:'var(--bg-card)', border:'1px solid rgba(224,82,82,0.3)',
            borderRadius:'var(--radius-xl)', padding:'32px', width:'100%', maxWidth:'360px',
            boxShadow:'0 0 30px rgba(224,82,82,0.1)', animation:'modalIn 0.25s ease', textAlign:'center' }}>
            <div style={{ width:'52px', height:'52px', borderRadius:'50%', background:'rgba(224,82,82,0.1)',
              display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 16px' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--danger)" strokeWidth="2">
                <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
              </svg>
            </div>
            <h3 style={{ fontFamily:'var(--font-display)', fontSize:'18px', marginBottom:'8px', color:'var(--text-primary)' }}>Eliminar Vehículo</h3>
            <p style={{ fontSize:'13px', color:'var(--text-secondary)', marginBottom:'24px' }}>Esta acción no se puede deshacer.</p>
            <div style={{ display:'flex', gap:'10px', justifyContent:'center' }}>
              <button className="ghost-btn" onClick={() => setDeleteConfirm(null)}>Cancelar</button>
              <button onClick={() => handleDelete(deleteConfirm)} style={{
                padding:'9px 20px', borderRadius:'var(--radius-md)',
                background:'var(--danger)', color:'#fff', border:'none',
                fontSize:'13px', fontWeight:'600', cursor:'pointer' }}>
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
