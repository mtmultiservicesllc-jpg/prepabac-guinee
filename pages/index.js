import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  return (
    <div style={{ minHeight:'100vh', background:'#060B13', color:'#EAEFF5', fontFamily:"'DM Sans',system-ui,sans-serif" }}>
      <Head>
        <title>PRÉPABAC GUINÉE IA | Réussite au Baccalauréat & BEPC</title>
        <meta name="description" content="Plateforme nationale de simulation et préparation intelligente aux examens du Baccalauréat et BEPC en République de Guinée (MEPU-A)." />
      </Head>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;700&display=swap');
        * { box-sizing: border-box; }
        button { cursor: pointer; transition: all 0.2s; }
      `}</style>

      {/* HEADER */}
      <nav style={{ height:'72px', borderBottom:'1px solid rgba(16,185,129,0.15)', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 32px', maxWidth:'1200px', margin:'0 auto' }}>
        <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
          <span style={{ fontSize:'24px' }}>🇬🇳</span>
          <span style={{ fontSize:'20px', fontWeight:'700', color:'#10B981', letterSpacing:'-0.5px' }}>
            PRÉPABAC<span style={{ color:'#FFFFFF' }}> GUINÉE IA</span>
          </span>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:'16px' }}>
          <span style={{ fontSize:'12px', color:'#A0AEC0', border:'1px solid rgba(16,185,129,0.2)', padding:'4px 10px', borderRadius:'15px' }}>
            Programme Officiel MEPU-A
          </span>
          <Link href="/dashboard" style={{ background:'#10B981', color:'#060B13', padding:'10px 18px', borderRadius:'8px', fontWeight:'700', fontSize:'13px', textDecoration:'none' }}>
            Accéder à l'Espace Candidat ➔
          </Link>
        </div>
      </nav>

      {/* HERO SECTION */}
      <main style={{ maxWidth:'1000px', margin:'0 auto', padding:'60px 24px', textAlign:'center' }}>
        <div style={{ display:'inline-block', background:'rgba(16,185,129,0.1)', border:'1px solid rgba(16,185,129,0.25)', padding:'6px 16px', borderRadius:'20px', fontSize:'13px', color:'#34D399', fontWeight:'600', marginBottom:'24px' }}>
          🚀 Conforme aux Épreuves Types du Baccalauréat Unique &amp; BEPC Guinéen
        </div>

        <h1 style={{ fontSize:'42px', fontWeight:'800', lineHeight:'1.2', color:'#FFFFFF', marginBottom:'20px' }}>
          Décrochez Votre Mention au Baccalauréat Grâce à l'Entraînement Assisté par IA
        </h1>

        <p style={{ fontSize:'18px', lineHeight:'1.6', color:'#94A3B8', maxWidth:'750px', margin:'0 auto 36px' }}>
          Fini le par-cœur stérile. Entraînez-vous sur des sujets types corrigés selon les barèmes officiels guinéens, avec explications pas-à-pas pour les filières <strong>Sciences Mathématiques</strong>, <strong>Sciences Expérimentales</strong>, <strong>Sciences Sociales</strong> et <strong>Collège (10ème)</strong>.
        </p>

        <div style={{ display:'flex', justifyContent:'center', gap:'16px', flexWrap:'wrap', marginBottom:'48px' }}>
          <Link href="/dashboard" style={{ background:'#10B981', color:'#060B13', padding:'16px 36px', borderRadius:'10px', fontSize:'16px', fontWeight:'700', textDecoration:'none', boxShadow:'0 4px 20px rgba(16,185,129,0.3)' }}>
            Commencer un Sujet d'Examen Gratuit ➔
          </Link>
        </div>

        {/* 4 FILIERES CARDS */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(220px, 1fr))', gap:'20px', textAlign:'left', marginTop:'40px' }}>
          <div style={{ background:'#0F172A', border:'1px solid rgba(16,185,129,0.15)', borderRadius:'12px', padding:'24px' }}>
            <div style={{ fontSize:'28px', marginBottom:'10px' }}>📐</div>
            <h3 style={{ fontSize:'16px', fontWeight:'700', color:'#FFFFFF', marginBottom:'6px' }}>Sciences Mathématiques (SM)</h3>
            <p style={{ fontSize:'13px', color:'#94A3B8', lineHeight:'1.5' }}>Analyse, Complexes, Géométrie spatiale, Mécanique newtonienne et Électricité RLC.</p>
          </div>

          <div style={{ background:'#0F172A', border:'1px solid rgba(16,185,129,0.15)', borderRadius:'12px', padding:'24px' }}>
            <div style={{ fontSize:'28px', marginBottom:'10px' }}>🧬</div>
            <h3 style={{ fontSize:'16px', fontWeight:'700', color:'#FFFFFF', marginBottom:'6px' }}>Sciences Expérimentales (SE)</h3>
            <p style={{ fontSize:'13px', color:'#94A3B8', lineHeight:'1.5' }}>Génétique mendélienne, Immunologie, Chimie organique (Esters) et Cinétique.</p>
          </div>

          <div style={{ background:'#0F172A', border:'1px solid rgba(16,185,129,0.15)', borderRadius:'12px', padding:'24px' }}>
            <div style={{ fontSize:'28px', marginBottom:'10px' }}>📜</div>
            <h3 style={{ fontSize:'16px', fontWeight:'700', color:'#FFFFFF', marginBottom:'6px' }}>Sciences Sociales (SS)</h3>
            <p style={{ fontSize:'13px', color:'#94A3B8', lineHeight:'1.5' }}>Dissertation philosophique, Histoire de l'indépendance de la Guinée et Économie.</p>
          </div>

          <div style={{ background:'#0F172A', border:'1px solid rgba(16,185,129,0.15)', borderRadius:'12px', padding:'24px' }}>
            <div style={{ fontSize:'28px', marginBottom:'10px' }}>🎓</div>
            <h3 style={{ fontSize:'16px', fontWeight:'700', color:'#FFFFFF', marginBottom:'6px' }}>Collège (10ème - BEPC)</h3>
            <p style={{ fontSize:'13px', color:'#94A3B8', lineHeight:'1.5' }}>Mathématiques fondamentales (Thalès, Pythagore) et Dictée-Questions de Français.</p>
          </div>
        </div>

        {/* FOOTER INFO */}
        <div style={{ marginTop:'60px', borderTop:'1px solid rgba(255,255,255,0.06)', paddingTop:'30px', fontSize:'12px', color:'#64748B' }}>
          Une solution d'ingénierie éducative développée par <strong>MT MULTISERVICES LLC</strong> (USA – CAGE: 9P1S2, UEI: Y9V5ZYELH4Q8)<br/>
          Direction : Moussa TOURÉ (Diplômé Université Général Lansana Conté de Sonfonia, Conakry).
        </div>
      </main>
    </div>
  )
}
