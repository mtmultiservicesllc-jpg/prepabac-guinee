import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

export default function Dashboard() {
  const router = useRouter()
  const [filiere, setFiliere] = useState('Toutes')
  const [question, setQuestion] = useState(null)
  const [loading, setLoading] = useState(false)
  const [answered, setAnswered] = useState(false)
  const [selectedLetter, setSelectedLetter] = useState(null)

  const [stats, setStats] = useState({
    total: 0,
    correct: 0,
    byFiliere: {
      'Toutes': { total: 0, correct: 0 },
      'Mathématiques': { total: 0, correct: 0 },
      'Expérimentales': { total: 0, correct: 0 },
      'Sociales': { total: 0, correct: 0 },
      'BEPC': { total: 0, correct: 0 }
    }
  })

  useEffect(() => {
    const saved = localStorage.getItem('prepabac_stats')
    if (saved) {
      try { setStats(JSON.parse(saved)) } catch (e) {}
    }
  }, [])

  async function fetchQuestion() {
    setLoading(true)
    setQuestion(null)
    setAnswered(false)
    setSelectedLetter(null)

    try {
      const res = await fetch('/api/generate-question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filiere })
      })
      const data = await res.json()
      setQuestion(data.data)
    } catch (e) {
      console.error(e)
    }
    setLoading(false)
  }

  function handleSelect(letter) {
    if (answered) return
    setAnswered(true)
    setSelectedLetter(letter)

    const isCorrect = letter === question.correct_answer

    setStats(prev => {
      const newStats = {
        total: prev.total + 1,
        correct: prev.correct + (isCorrect ? 1 : 0),
        byFiliere: { ...prev.byFiliere }
      }
      localStorage.setItem('prepabac_stats', JSON.stringify(newStats))
      return newStats
    })
  }

  const filieresList = [
    { key: 'Toutes', label: '🇬🇳 Toutes les Séries (Épreuves Mixtes)' },
    { key: 'Mathématiques', label: '📐 Terminale Sciences Mathématiques (SM)' },
    { key: 'Expérimentales', label: '🧬 Terminale Sciences Expérimentales (SE)' },
    { key: 'Sociales', label: '📜 Terminale Sciences Sociales (SS)' },
    { key: 'BEPC', label: '🎓 Collège (10ème Année - BEPC)' }
  ]

  const scoreRate = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0

  return (
    <div style={{ display:'flex', height:'100vh', background:'#060B13', color:'#EAEFF5', fontFamily:"'DM Sans',system-ui,sans-serif", overflow:'hidden' }}>
      <Head>
        <title>Espace Candidat | PRÉPABAC GUINÉE IA</title>
      </Head>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;700&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-thumb { background: rgba(16,185,129,0.2); border-radius:2px; }
        button { cursor: pointer; transition: all 0.15s; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeUp { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
      `}</style>

      {/* SIDEBAR */}
      <aside style={{ width:'270px', background:'#0B1320', borderRight:'1px solid rgba(16,185,129,0.12)', padding:'24px 0', display:'flex', flexDirection:'column', flexShrink:0 }}>
        <div style={{ padding:'0 20px 24px', borderBottom:'1px solid rgba(16,185,129,0.12)', marginBottom:'16px' }}>
          <div style={{ fontSize:'18px', color:'#10B981', fontWeight:'800' }}>PRÉPABAC<span style={{ color:'#FFFFFF' }}> IA</span></div>
          <div style={{ fontSize:'11px', color:'#64748B', marginTop:'2px' }}>Simulateur Officiel Bac &amp; BEPC</div>
        </div>

        <div style={{ padding:'0 16px', marginBottom:'24px' }}>
          <div style={{ background:'rgba(16,185,129,0.06)', border:'1px solid rgba(16,185,129,0.15)', borderRadius:'10px', padding:'14px' }}>
            <div style={{ fontSize:'11px', color:'#94A3B8', textTransform:'uppercase' }}>Score Global du Candidat</div>
            <div style={{ fontSize:'28px', fontWeight:'800', color: stats.total > 0 ? (scoreRate >= 60 ? '#10B981' : '#EF4444') : '#94A3B8', marginTop:'4px' }}>
              {stats.total > 0 ? `${scoreRate}%` : '0%'}
            </div>
            <div style={{ fontSize:'11px', color:'#64748B', marginTop:'2px' }}>{stats.correct} bonnes réponses sur {stats.total}</div>
          </div>
        </div>

        <div style={{ padding:'0 16px', display:'flex', flexDirection:'column', gap:'6px' }}>
          <div style={{ fontSize:'11px', color:'#64748B', paddingLeft:'4px', marginBottom:'4px', textTransform:'uppercase', fontWeight:'600' }}>Séries &amp; Filières</div>
          {filieresList.map(item => (
            <button key={item.key} onClick={() => { setFiliere(item.key); setQuestion(null); }}
              style={{
                textAlign:'left', padding:'10px 12px', borderRadius:'8px', fontSize:'13px', border:'none',
                background: filiere === item.key ? 'rgba(16,185,129,0.15)' : 'transparent',
                color: filiere === item.key ? '#34D399' : '#94A3B8',
                fontWeight: filiere === item.key ? '700' : '400'
              }}>
              {item.label}
            </button>
          ))}
        </div>

        <div style={{ marginTop:'auto', padding:'16px 20px', borderTop:'1px solid rgba(16,185,129,0.12)' }}>
          <button onClick={() => router.push('/')}
            style={{ width:'100%', background:'transparent', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'6px', padding:'8px', fontSize:'12px', color:'#94A3B8' }}>
            Retour à l'accueil
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' }}>
        <header style={{ height:'64px', borderBottom:'1px solid rgba(16,185,129,0.12)', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 32px', flexShrink:0 }}>
          <div style={{ fontSize:'14px', color:'#94A3B8' }}>
            Filière active : <span style={{ color:'#FFFFFF', fontWeight:'700' }}>{filieresList.find(f => f.key === filiere)?.label}</span>
          </div>
          <button onClick={fetchQuestion} style={{ background:'#10B981', color:'#060B13', border:'none', borderRadius:'8px', padding:'8px 18px', fontSize:'13px', fontWeight:'700' }}>
            + Tirer un Sujet Type Bac
          </button>
        </header>

        <div style={{ flex:1, overflowY:'auto', padding:'32px', maxWidth:'900px', margin:'0 auto', width:'100%' }}>
          {!question && !loading && (
            <div style={{ background:'#0F172A', border:'1px solid rgba(16,185,129,0.15)', borderRadius:'16px', padding:'36px', textAlign:'center' }}>
              <div style={{ fontSize:'40px', marginBottom:'12px' }}>📖</div>
              <h2 style={{ fontSize:'22px', fontWeight:'700', color:'#FFFFFF', marginBottom:'10px' }}>
                Entraînement aux Épreuves Types du Baccalauréat &amp; BEPC
              </h2>
              <p style={{ color:'#94A3B8', fontSize:'14px', maxWidth:'600px', margin:'0 auto 24px', lineHeight:'1.5' }}>
                Choisissez votre série dans le menu de gauche puis cliquez ci-dessous pour générer un sujet conforme aux barèmes du Ministère de l'Enseignement Pré-Universitaire (MEPU-A).
              </p>
              <button onClick={fetchQuestion}
                style={{ background:'#10B981', color:'#060B13', border:'none', borderRadius:'10px', padding:'14px 32px', fontSize:'15px', fontWeight:'700', boxShadow:'0 4px 15px rgba(16,185,129,0.3)' }}>
                Commencer la Session d'Évaluation ➔
              </button>
            </div>
          )}

          {loading && (
            <div style={{ textAlign:'center', padding:'60px 0' }}>
              <div style={{ width:'36px', height:'36px', border:'2px solid rgba(16,185,129,0.2)', borderTopColor:'#10B981', borderRadius:'50%', animation:'spin 0.8s linear infinite', margin:'0 auto 16px' }}></div>
              <p style={{ color:'#94A3B8' }}>Sélection d'une épreuve officielle en cours...</p>
            </div>
          )}

          {question && (
            <div style={{ background:'#0F172A', border:'1px solid rgba(16,185,129,0.2)', borderRadius:'16px', padding:'28px', animation:'fadeUp 0.3s ease' }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'16px', borderBottom:'1px solid rgba(255,255,255,0.06)', paddingBottom:'12px' }}>
                <div style={{ display:'flex', gap:'8px', alignItems:'center' }}>
                  <span style={{ fontSize:'12px', background:'rgba(16,185,129,0.12)', color:'#34D399', padding:'4px 10px', borderRadius:'15px', fontWeight:'700' }}>
                    {question.matiere}
                  </span>
                  <span style={{ fontSize:'12px', color:'#94A3B8' }}>{question.filiere}</span>
                </div>
                <span style={{ fontSize:'11px', color:'#64748B' }}>Barème Officiel MEPU-A</span>
              </div>

              <div style={{ fontSize:'13px', color:'#34D399', fontWeight:'600', marginBottom:'8px' }}>
                Thème : {question.topic}
              </div>

              <p style={{ fontSize:'16px', lineHeight:'1.6', color:'#FFFFFF', marginBottom:'24px', fontWeight:'500' }}>
                {question.stem}
              </p>

              <div style={{ display:'flex', flexDirection:'column', gap:'12px', marginBottom:'24px' }}>
                {Object.entries(question.options || {}).map(([letter, text]) => {
                  let borderCol = 'rgba(255,255,255,0.08)'
                  let bgCol = '#1E293B'
                  let textCol = '#FFFFFF'

                  if (answered) {
                    if (letter === question.correct_answer) {
                      borderCol = '#10B981'
                      bgCol = 'rgba(16,185,129,0.15)'
                      textCol = '#34D399'
                    } else if (letter === selectedLetter) {
                      borderCol = '#EF4444'
                      bgCol = 'rgba(239,68,68,0.15)'
                      textCol = '#F87171'
                    }
                  }

                  return (
                    <button key={letter} onClick={() => handleSelect(letter)} disabled={answered}
                      style={{ display:'flex', alignItems:'flex-start', gap:'12px', padding:'14px 16px', borderRadius:'8px', border:`1px solid ${borderCol}`, background: bgCol, textAlign:'left', width:'100%' }}>
                      <span style={{ fontWeight:'700', color: textCol, flexShrink:0 }}>{letter}.</span>
                      <span style={{ color: textCol, fontSize:'14px', lineHeight:'1.4' }}>{text}</span>
                    </button>
                  )
                })}
              </div>

              {answered && (
                <div style={{ background:'rgba(16,185,129,0.05)', border:'1px solid rgba(16,185,129,0.2)', borderRadius:'12px', padding:'20px', marginBottom:'24px' }}>
                  <div style={{ fontSize:'14px', fontWeight:'700', color: selectedLetter === question.correct_answer ? '#10B981' : '#EF4444', marginBottom:'8px' }}>
                    {selectedLetter === question.correct_answer ? '✓ Excellente réponse (Plein barème)' : '✗ Erreur d\'analyse ou de démarche'}
                  </div>
                  <p style={{ fontSize:'14px', color:'#CBD5E1', lineHeight:'1.5', marginBottom:'12px' }}>
                    {question.rationale?.correct}
                  </p>
                  {question.conseil_bac && (
                    <div style={{ background:'#1E293B', borderLeft:'3px solid #10B981', padding:'10px 14px', borderRadius:'4px', fontSize:'13px', color:'#34D399' }}>
                      💡 <strong>Conseil du Correcteur du Bac :</strong> {question.conseil_bac}
                    </div>
                  )}
                </div>
              )}

              <div style={{ display:'flex', justifyContent:'space-between' }}>
                <button onClick={() => setQuestion(null)}
                  style={{ background:'transparent', border:'1px solid rgba(255,255,255,0.1)', color:'#94A3B8', padding:'10px 18px', borderRadius:'8px', fontSize:'13px' }}>
                  Changer de Série
                </button>
                {answered && (
                  <button onClick={fetchQuestion}
                    style={{ background:'#10B981', color:'#060B13', border:'none', padding:'10px 22px', borderRadius:'8px', fontSize:'13px', fontWeight:'700' }}>
                    Épreuve Suivante ➔
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
