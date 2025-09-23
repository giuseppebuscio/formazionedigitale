import React, { useState, useMemo } from 'react'

const App = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSubject, setSelectedSubject] = useState('')
  const [selectedGrade, setSelectedGrade] = useState('')
  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'

  const educationalTools = [
    // AR e Realtà Aumentata
    { name: "QuiverVision", url: "https://quivervision.com/", description: "AR coloring experiences e lesson plans", subject: "Arte", grade: "Infanzia", platform: "Web", pricing: "Freemium", tags: ["AR", "Coloring", "Creatività"] },
    { name: "Microsoft 3D Generations", url: "https://copilot.microsoft.com/labs/experiments/3d-generations/my-creations", description: "Generazione 3D con AI", subject: "Tecnologia", grade: "Secondaria di secondo grado", platform: "Web", pricing: "Gratuito", tags: ["3D", "AI", "Creatività"] },
    { name: "Spatial", url: "https://www.spatial.io/", description: "Spazi virtuali 3D per collaborazione", subject: "Tecnologia", grade: "Università", platform: "Web", pricing: "Freemium", tags: ["3D", "Collaborazione", "VR"] },

    // Quiz e Giochi Educativi
    { name: "Kahoot!", url: "https://kahoot.com", description: "Quiz interattivi e giochi educativi", subject: "Universale", grade: "Tutti", platform: "Web/App", pricing: "Freemium", tags: ["Quiz", "Giochi", "Interattivo"] },
    { name: "Wheel of Names", url: "https://wheelofnames.com/", description: "Ruota della fortuna per selezioni casuali", subject: "Universale", grade: "Tutti", platform: "Web", pricing: "Gratuito", tags: ["Casuale", "Selezione", "Giochi"] },
    { name: "Wordwall", url: "https://wordwall.net/it-IT/community/giochi-per-bambini", description: "Giochi educativi personalizzabili", subject: "Italiano", grade: "Primaria", platform: "Web", pricing: "Freemium", tags: ["Giochi", "Italiano", "Personalizzabile"] },
    { name: "LearningApps", url: "https://learningapps.org", description: "Creazione di esercizi interattivi", subject: "Universale", grade: "Tutti", platform: "Web", pricing: "Gratuito", tags: ["Esercizi", "Interattivo", "Creazione"] },
    { name: "ZaplyCode", url: "https://www.zaplycode.it/play/", description: "Programmazione visuale per bambini", subject: "Informatica", grade: "Primaria", platform: "Web", pricing: "Gratuito", tags: ["Programmazione", "Visuale", "Bambini"] },
    { name: "PanQuiz", url: "https://www.panquiz.com/", description: "Piattaforma italiana per quiz e questionari con AI integrata", subject: "Universale", grade: "Tutti", platform: "Web", pricing: "Freemium", tags: ["Quiz", "AI", "Valutazione", "Italiano", "Gamification"] },

    // Puzzle e Giochi
    { name: "Puzzle Games for Kids", url: "https://apps.apple.com/us/app/puzzle-games-for-kids-3-years/id1244400052", description: "Puzzle per bambini 3+ anni", subject: "Logica", grade: "Infanzia", platform: "iOS", pricing: "Gratuito", tags: ["Puzzle", "Bambini", "Logica"] },
    { name: "Jigsaw Puzzles Kids", url: "https://play.google.com/store/apps/details?id=com.rvappstudios.jigsaw.puzzles.kids", description: "Puzzle per bambini Android", subject: "Logica", grade: "Infanzia", platform: "Android", pricing: "Gratuito", tags: ["Puzzle", "Bambini", "Android"] },
    { name: "Puzzle Factory", url: "https://puzzlefactory.com/it/puzzle-per-bambini", description: "Puzzle online per bambini", subject: "Logica", grade: "Infanzia", platform: "Web", pricing: "Gratuito", tags: ["Puzzle", "Online", "Bambini"] },
    { name: "Memory SolItalian", url: "https://www.solitalian.it/memory", description: "Memory game per imparare l'italiano", subject: "Italiano", grade: "Primaria", platform: "Web", pricing: "Gratuito", tags: ["Memory", "Italiano", "Giochi"] },

    // Colorazione e Arte
    { name: "Pixel Coloring", url: "https://play.google.com/store/apps/details?id=com.europosit.pixelcoloring&utm_source=chatgpt.com", description: "Colorazione pixel art", subject: "Arte", grade: "Primaria", platform: "Android", pricing: "Gratuito", tags: ["Coloring", "Pixel Art", "Creatività"] },
    { name: "Color by Number", url: "https://play.google.com/store/apps/details?id=com.pixel.art.coloring.color.number", description: "Colorazione per numeri", subject: "Arte", grade: "Primaria", platform: "Android", pricing: "Gratuito", tags: ["Coloring", "Numeri", "Relax"] },

    // Programmazione e Coding
    { name: "Scratch", url: "https://scratch.mit.edu/", description: "Programmazione visuale per bambini", subject: "Informatica", grade: "Primaria", platform: "Web", pricing: "Gratuito", tags: ["Programmazione", "Visuale", "Bambini"] },
    { name: "Open Roberta Lab", url: "https://lab.open-roberta.org/", description: "Programmazione robotica", subject: "Informatica", grade: "Secondaria di primo grado", platform: "Web", pricing: "Gratuito", tags: ["Robotica", "Programmazione", "STEM"] },

    // Musica
    { name: "MuseScore", url: "https://musescore.com/", description: "Composizione e notazione musicale", subject: "Musica", grade: "Secondaria di secondo grado", platform: "Web/Desktop", pricing: "Freemium", tags: ["Musica", "Composizione", "Notazione"] },
    { name: "GuitarTuna", url: "https://guitartuna.com/online-guitar-tuner", description: "Accordatore di chitarra online", subject: "Musica", grade: "Tutti", platform: "Web/App", pricing: "Freemium", tags: ["Musica", "Chitarra", "Accordatore"] },
    { name: "Solfeg.io", url: "https://web.solfeg.io/library#library", description: "Teoria musicale e solfeggio", subject: "Musica", grade: "Secondaria di primo grado", platform: "Web", pricing: "Freemium", tags: ["Musica", "Teoria", "Solfeggio"] },
    { name: "EaseUS Vocal Remover", url: "https://vocalremover.easeus.com", description: "Rimuovi vocali e crea karaoke con AI", subject: "Musica", grade: "Secondaria di secondo grado", platform: "Web", pricing: "Freemium", tags: ["Musica", "AI", "Karaoke", "Audio Editing"] },

    // Grafica e Design
    { name: "Photopea", url: "https://www.photopea.com/", description: "Editor di immagini online (simile a Photoshop)", subject: "Arte", grade: "Secondaria di secondo grado", platform: "Web", pricing: "Gratuito", tags: ["Grafica", "Foto", "Design"] },
    { name: "Canva", url: "https://canva.com", description: "Design grafico semplificato", subject: "Arte", grade: "Tutti", platform: "Web/App", pricing: "Freemium", tags: ["Design", "Grafica", "Presentazioni"] },
    { name: "Gamma", url: "https://gamma.app/", description: "Creazione presentazioni con AI", subject: "Universale", grade: "Secondaria di secondo grado", platform: "Web", pricing: "Freemium", tags: ["Presentazioni", "AI", "Design"] },

    // AI e Strumenti Intelligenti
    { name: "ExplainPaper", url: "https://www.explainpaper.com/dashboard", description: "Spiegazione di articoli scientifici con AI", subject: "Scienze", grade: "Università", platform: "Web", pricing: "Freemium", tags: ["AI", "Scienze", "Ricerca"] },
    { name: "NerdAI", url: "https://nerdai.app/chat?src=Chat&launch=false", description: "Assistente AI per studenti", subject: "Universale", grade: "Secondaria di secondo grado", platform: "Web", pricing: "Freemium", tags: ["AI", "Assistente", "Studio"] },
    { name: "ChatGPT", url: "https://chat.openai.com", description: "Assistente conversazionale AI", subject: "Universale", grade: "Secondaria di secondo grado", platform: "Web/App", pricing: "Freemium", tags: ["AI", "Conversazione", "Assistente"] },
    { name: "Gemini", url: "https://gemini.google.com", description: "AI di Google per assistenza", subject: "Universale", grade: "Secondaria di secondo grado", platform: "Web", pricing: "Gratuito", tags: ["AI", "Google", "Assistente"] },

    // Mappe Mentali e Organizzazione
    { name: "MindMeister", url: "https://www.mindmeister.com/", description: "Creazione mappe mentali collaborative", subject: "Universale", grade: "Tutti", platform: "Web/App", pricing: "Freemium", tags: ["Mappe Mentali", "Organizzazione", "Collaborazione"] },

    // Strumenti per la Classe
    { name: "ClassroomScreen", url: "https://classroomscreen.com/", description: "Strumenti digitali per la classe", subject: "Universale", grade: "Tutti", platform: "Web", pricing: "Freemium", tags: ["Classe", "Strumenti", "Gestione"] },
    { name: "ILovePDF", url: "https://www.ilovepdf.com/", description: "Strumenti per manipolare PDF", subject: "Universale", grade: "Tutti", platform: "Web", pricing: "Freemium", tags: ["PDF", "Strumenti", "Documenti"] },

    // Matematica e Scienze
    { name: "Desmos Calculator", url: "https://www.desmos.com/calculator?lang=it", description: "Calcolatrice grafica avanzata", subject: "Matematica", grade: "Secondaria di secondo grado", platform: "Web", pricing: "Gratuito", tags: ["Matematica", "Calcolatrice", "Grafici"] },
    { name: "PhET Simulations", url: "https://phet.colorado.edu/it/", description: "Simulazioni scientifiche interattive", subject: "Scienze", grade: "Tutti", platform: "Web", pricing: "Gratuito", tags: ["Scienze", "Simulazioni", "Interattivo"] },
    { name: "MolView", url: "https://app.molview.org/", description: "Visualizzatore di molecole 3D", subject: "Chimica", grade: "Secondaria di secondo grado", platform: "Web", pricing: "Gratuito", tags: ["Chimica", "Molecole", "3D"] },
    { name: "Elementium", url: "https://apps.apple.com/us/app/elementium/id892123825", description: "Tavola periodica interattiva", subject: "Chimica", grade: "Secondaria di primo grado", platform: "iOS", pricing: "Gratuito", tags: ["Chimica", "Tavola Periodica", "Interattivo"] },
    { name: "Brilliant", url: "https://brilliant.org/home/", description: "Corsi interattivi di matematica e scienze", subject: "Matematica", grade: "Secondaria di secondo grado", platform: "Web/App", pricing: "Freemium", tags: ["Matematica", "Scienze", "Corsi"] },
    { name: "GeoGebra", url: "https://www.geogebra.org/", description: "Matematica dinamica e geometria", subject: "Matematica", grade: "Tutti", platform: "Web/App", pricing: "Gratuito", tags: ["Matematica", "Geometria", "Dinamico"] },

    // Astronomia e Spazio
    { name: "Stellarium Web", url: "https://stellarium-web.org/", description: "Planetario online", subject: "Scienze", grade: "Tutti", platform: "Web", pricing: "Gratuito", tags: ["Astronomia", "Stelle", "Planetario"] },
    { name: "Virtual Vacation", url: "https://virtualvacation.us/guess", description: "Gioco di geografia con immagini", subject: "Geografia", grade: "Primaria", platform: "Web", pricing: "Gratuito", tags: ["Geografia", "Giochi", "Immagini"] },

    // Strumenti di Sviluppo
    { name: "Ultimaker Cura", url: "https://ultimaker.com/software/ultimaker-cura/", description: "Software per stampa 3D", subject: "Tecnologia", grade: "Secondaria di secondo grado", platform: "Desktop", pricing: "Gratuito", tags: ["3D Printing", "Tecnologia", "Design"] },
    { name: "Delightex", url: "https://www.delightex.com/", description: "Piattaforma per creare esperienze immersive", subject: "Tecnologia", grade: "Secondaria di secondo grado", platform: "Web", pricing: "Freemium", tags: ["Immersivo", "3D", "Realtà Virtuale", "Creatività"] },

    // Strumenti Esistenti Aggiornati
    { name: "Khan Academy", url: "https://www.khanacademy.org/math", description: "Lezioni gratuite di matematica", subject: "Matematica", grade: "Tutti", platform: "Web/App", pricing: "Gratuito", tags: ["Matematica", "Lezioni", "Video"] },
    { name: "NASA Kids", url: "https://www.nasa.gov/kidsclub/", description: "Esplora lo spazio con la NASA", subject: "Scienze", grade: "Primaria", platform: "Web", pricing: "Gratuito", tags: ["Spazio", "NASA", "Scienze"] },
    { name: "Duolingo", url: "https://www.duolingo.com/", description: "Impara le lingue gratuitamente", subject: "Lingue", grade: "Tutti", platform: "Web/App", pricing: "Freemium", tags: ["Lingue", "Giochi", "Gratuito"] },
    { name: "Google Earth", url: "https://earth.google.com/", description: "Esplora il mondo in 3D", subject: "Geografia", grade: "Tutti", platform: "Web/App", pricing: "Gratuito", tags: ["Geografia", "3D", "Mappe"] },
    { name: "Google Arts & Culture", url: "https://artsandculture.google.com/", description: "Musei e opere d'arte virtuali", subject: "Arte", grade: "Tutti", platform: "Web/App", pricing: "Gratuito", tags: ["Arte", "Musei", "Cultura"] },
    { name: "MozaWeb", url: "https://www.mozaweb.com/", description: "Piattaforma educativa multimediale", subject: "Universale", grade: "Tutti", platform: "Web", pricing: "Freemium", tags: ["Multimediale", "Educativo", "Contenuti"] },
    
    // Giochi Educativi per Bambini
    { name: "Toy Theater", url: "https://toytheater.com/", description: "Giochi educativi online per bambini", subject: "Universale", grade: "Infanzia", platform: "Web", pricing: "Gratuito", tags: ["Giochi", "Bambini", "Educativo"] },
    { name: "AutoDraw", url: "https://www.autodraw.com/", description: "Disegno assistito con AI di Google", subject: "Arte", grade: "Tutti", platform: "Web", pricing: "Gratuito", tags: ["Disegno", "AI", "Google", "Creatività"] }
  ]

  const subjects = [...new Set(educationalTools.map(tool => tool.subject))].sort()
  const grades = [...new Set(educationalTools.map(tool => tool.grade))].sort()

  const filteredTools = useMemo(() => {
    return educationalTools.filter(tool => {
      const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           tool.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      const matchesSubject = !selectedSubject || tool.subject === selectedSubject
      const matchesGrade = !selectedGrade || tool.grade === selectedGrade

      return matchesSearch && matchesSubject && matchesGrade
    })
  }, [searchTerm, selectedSubject, selectedGrade])

  const getFaviconUrl = (url) => {
    try {
      const domain = new URL(url).hostname
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=32`
    } catch {
      return '/default-favicon.png'
    }
  }

  return (
    <div className="min-h-screen pattern-bg">
      {/* Header */}
      <div className="header-light relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/50"></div>
        <div className="relative container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-6xl font-bold text-gradient mb-6 tracking-tight">
              Formazione Digitale
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Scopri e organizza le migliori risorse educative digitali
            </p>
          </div>
        </div>
        {/* Search and Filters - Positioned between header and content */}
        <div className="container mx-auto px-4 -mt-12 relative z-20">
          <div className="glass-light rounded-3xl p-8 mb-8 shadow-lg">
          {/* Search Bar and Filters */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8">
            {/* Search Bar */}
            <div className="lg:col-span-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Cerca strumenti, materie, descrizioni o tag..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input w-full px-8 py-4 pl-16 rounded-2xl text-lg font-medium focus:outline-none"
                />
                <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                  <svg className="h-6 w-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Filters */}
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="filter-select px-6 py-4 rounded-2xl text-gray-700 font-medium focus:outline-none"
            >
              <option value="">Tutte le materie</option>
              {subjects.map(subject => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>

            <select
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
              className="filter-select px-6 py-4 rounded-2xl text-gray-700 font-medium focus:outline-none"
            >
              <option value="">Tutte le annualità</option>
              {grades.map(grade => (
                <option key={grade} value={grade}>{grade}</option>
              ))}
            </select>

            <button
              onClick={() => {
                setSearchTerm('')
                setSelectedSubject('')
                setSelectedGrade('')
              }}
              className="btn-secondary px-6 py-4 rounded-2xl font-medium focus:outline-none flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Reset
            </button>
          </div>

          {/* View Mode Toggle */}
          <div className="flex justify-between items-center">
            <div className="text-lg text-gray-600 font-medium">
              Trovati {filteredTools.length} strumenti
            </div>
            <div className="flex space-x-2 bg-gray-100 p-1 rounded-2xl">
              <button
                onClick={() => setViewMode('grid')}
                className={`view-btn p-3 rounded-xl transition-all duration-200 ${
                  viewMode === 'grid' ? 'active' : 'text-gray-500'
                }`}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`view-btn p-3 rounded-xl transition-all duration-200 ${
                  viewMode === 'list' ? 'active' : 'text-gray-500'
                }`}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
          </div>
        </div>

        {/* Tools Display */}
        <div className="container mx-auto px-4 py-8">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTools.map((tool, index) => (
              <div key={index} className="tool-card rounded-2xl overflow-hidden group">
                <a
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-6 h-full"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="icon-container w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <img
                          src={getFaviconUrl(tool.url)}
                          alt={`${tool.name} icon`}
                          className="w-8 h-8"
                          onError={(e) => {
                            e.target.src = '/default-favicon.png'
                          }}
                        />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors link-hover">
                        {tool.name}
                      </h3>
                      <p className="text-gray-600 line-clamp-3 leading-relaxed text-sm">
                        {tool.description}
                      </p>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredTools.map((tool, index) => (
              <div key={index} className="tool-card rounded-2xl group">
                <a
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-6"
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className="icon-container w-14 h-14 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                        <img
                          src={getFaviconUrl(tool.url)}
                          alt={`${tool.name} icon`}
                          className="w-10 h-10"
                          onError={(e) => {
                            e.target.src = '/default-favicon.png'
                          }}
                        />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {tool.name}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {tool.description}
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        )}

        {filteredTools.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.709M15 6.75a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Nessun risultato trovato</h3>
            <p className="text-gray-600 max-w-md mx-auto leading-relaxed">
              Prova a modificare i filtri o la ricerca per trovare più strumenti educativi.
            </p>
          </div>
        )}
        </div>
      </div>
    </div>
  )
}

export default App
