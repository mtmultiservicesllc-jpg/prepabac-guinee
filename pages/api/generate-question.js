import fs from 'fs'
import path from 'path'

function shuffleArray(array) {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  const { filiere } = req.body

  try {
    const filePath = path.join(process.cwd(), 'data', 'questions-bac.json')
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'Banque d\'épreuves introuvable' })
    }

    const fileContent = fs.readFileSync(filePath, 'utf8')
    const questions = JSON.parse(fileContent)

    let filtered = questions
    if (filiere && filiere !== 'Toutes') {
      const match = questions.filter(q => q.filiere.toLowerCase().includes(filiere.toLowerCase()))
      if (match.length > 0) filtered = match
    }

    const randomIndex = Math.floor(Math.random() * filtered.length)
    const selected = filtered[randomIndex]

    // Brassage dynamique Fisher-Yates
    const letters = ['A', 'B', 'C', 'D']
    const originalKeys = Object.keys(selected.options)
    const shuffledKeys = shuffleArray(originalKeys)

    const newOptions = {}
    const newRationale = { correct: selected.rationale.correct }
    let newCorrectAnswer = 'A'

    shuffledKeys.forEach((oldKey, idx) => {
      const newLetter = letters[idx]
      newOptions[newLetter] = selected.options[oldKey]
      newRationale[newLetter] = selected.rationale[oldKey]
      
      if (oldKey === selected.correct_answer) {
        newCorrectAnswer = newLetter
      }
    })

    const responseData = {
      stem: selected.stem,
      options: newOptions,
      correct_answer: newCorrectAnswer,
      filiere: selected.filiere,
      matiere: selected.matiere,
      topic: selected.topic,
      rationale: newRationale,
      conseil_bac: selected.conseil_bac || "Relisez attentivement votre copie et appliquez la démarche méthodologique officielle du MEPU-A."
    }

    return res.status(200).json({
      success: true,
      data: responseData
    })
  } catch (error) {
    console.error('Erreur lecture questions:', error)
    return res.status(500).json({ error: 'Erreur serveur', details: error.message })
  }
}
