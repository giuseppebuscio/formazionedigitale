import React, { useState, useMemo, useEffect } from 'react'

const App = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSubject, setSelectedSubject] = useState('')
  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'
  const [isMobile, setIsMobile] = useState(false)

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const educationalTools = [
    // AR e Realtà Aumentata
    { name: "QuiverVision", url: "https://quivervision.com/", description: "AR coloring experiences e lesson plans", subjects: ["Intrattenimento"], platform: "Web", pricing: "Freemium", tags: ["AR", "Coloring", "Creatività"] },
    { name: "Microsoft 3D Generations", url: "https://copilot.microsoft.com/labs/experiments/3d-generations/my-creations", description: "Generazione 3D con AI", subjects: ["Arte"], platform: "Web", pricing: "Gratuito", tags: ["3D", "AI", "Creatività"] },
    { name: "Spatial", url: "https://www.spatial.io/", description: "Spazi virtuali 3D per collaborazione", subjects: ["Informatica"], platform: "Web", pricing: "Freemium", tags: ["3D", "Collaborazione", "VR"] },

    // Quiz e Giochi Educativi
    { name: "Kahoot!", url: "https://kahoot.com", description: "Quiz interattivi e giochi educativi", subjects: ["Arte", "Tecnologia", "Italiano", "Matematica", "Scienze", "Geografia", "Storia", "Intrattenimento", "Informatica", "Musica", "Chimica", "Fisica", "Biologia", "Lingue"], platform: "Web/App", pricing: "Freemium", tags: ["Quiz", "Giochi", "Interattivo"] },
    { name: "Wheel of Names", url: "https://wheelofnames.com/", description: "Ruota della fortuna per selezioni casuali", subjects: ["Altro"], platform: "Web", pricing: "Gratuito", tags: ["Casuale", "Selezione", "Giochi"] },
    { name: "Wordwall", url: "https://wordwall.net/it-IT/community/giochi-per-bambini", description: "Giochi educativi personalizzabili", subjects: ["Italiano", "Matematica", "Scienze", "Geografia", "Storia"], platform: "Web", pricing: "Freemium", tags: ["Giochi", "Italiano", "Personalizzabile", "Multidisciplinare"] },
    { name: "LearningApps", url: "https://learningapps.org", description: "Creazione di esercizi interattivi", subjects: ["Italiano", "Altro"], platform: "Web", pricing: "Gratuito", tags: ["Esercizi", "Interattivo", "Creazione"] },
    { name: "ZaplyCode", url: "https://www.zaplycode.it/play/", description: "Pixel art visuale per bambini", subjects: ["Informatica", "Intrattenimento", "Arte"], platform: "Web", pricing: "Gratuito", tags: ["Programmazione", "Visuale", "Bambini"] },
    { name: "PanQuiz", url: "https://www.panquiz.com/", description: "Piattaforma italiana per quiz e questionari con AI integrata", subjects: ["Arte", "Tecnologia", "Italiano", "Matematica", "Scienze", "Geografia", "Storia", "Informatica", "Musica", "Chimica", "Fisica", "Biologia", "Lingue"], platform: "Web", pricing: "Freemium", tags: ["Quiz", "AI", "Valutazione", "Italiano", "Gamification"] },

    // Puzzle e Giochi
    { name: "Puzzle Kids IOS", url: "https://apps.apple.com/us/app/puzzle-games-for-kids-3-years/id1244400052", description: "Puzzle per bambini 3+ anni", subjects: ["Intrattenimento"], platform: "iOS", pricing: "Gratuito", tags: ["Puzzle", "Bambini", "Intrattenimento"] },
    { name: "Puzzle Kids Android", url: "https://play.google.com/store/apps/details?id=com.rvappstudios.jigsaw.puzzles.kids", description: "Puzzle per bambini Android", subjects: ["Intrattenimento"], platform: "Android", pricing: "Gratuito", tags: ["Puzzle", "Bambini", "Android"] },
    { name: "Puzzle Factory", url: "https://puzzlefactory.com/it/puzzle-per-bambini", description: "Puzzle online per bambini", subjects: ["Intrattenimento"], platform: "Web", pricing: "Gratuito", tags: ["Puzzle", "Online", "Bambini"] },
    { name: "Memory SolItalian", url: "https://www.solitalian.it/memory", description: "Memory game per imparare l'italiano", subjects: ["Intrattenimento"], platform: "Web", pricing: "Gratuito", tags: ["Memory", "Italiano", "Giochi"] },

    // Colorazione e Arte
    { name: "Pixel Art", url: "https://play.google.com/store/apps/details?id=com.europosit.pixelcoloring&utm_source=chatgpt.com", description: "Colorazione pixel art", subjects: ["Arte"], platform: "Android", pricing: "Gratuito", tags: ["Coloring", "Pixel Art", "Creatività"] },
    { name: "Happy Color", url: "https://play.google.com/store/apps/details?id=com.pixel.art.coloring.color.number", description: "Colorazione per numeri", subjects: ["Arte", "Intrattenimento"], platform: "Android", pricing: "Gratuito", tags: ["Coloring", "Numeri", "Relax"] },

    // Programmazione e Coding
    { name: "Scratch", url: "https://scratch.mit.edu/", description: "Programmazione visuale per bambini", subjects: ["Informatica"], platform: "Web", pricing: "Gratuito", tags: ["Programmazione", "Visuale", "Bambini"] },
    { name: "Open Roberta Lab", url: "https://lab.open-roberta.org/", description: "Programmazione robotica", subjects: ["Informatica"], platform: "Web", pricing: "Gratuito", tags: ["Robotica", "Programmazione", "STEM"] },

    // Musica
    { name: "MuseScore", url: "https://musescore.com/", description: "Composizione e notazione musicale", subjects: ["Musica"], platform: "Web/Desktop", pricing: "Freemium", tags: ["Musica", "Composizione", "Notazione"] },
    { name: "GuitarTuna", url: "https://guitartuna.com/online-guitar-tuner", description: "Accordatore di chitarra online", subjects: ["Musica"], platform: "Web/App", pricing: "Freemium", tags: ["Musica", "Chitarra", "Accordatore"] },
    { name: "Solfeg.io", url: "https://web.solfeg.io/", description: "Teoria musicale e solfeggio", subjects: ["Musica"], platform: "Web", pricing: "Freemium", tags: ["Musica", "Teoria", "Solfeggio"] },
    { name: "EaseUS Vocal Remover", url: "https://vocalremover.easeus.com", description: "Rimuovi vocali e crea karaoke con AI", subjects: ["Musica"], platform: "Web", pricing: "Freemium", tags: ["Musica", "AI", "Karaoke", "Audio Editing"] },

    // Grafica e Design
    { name: "Photopea", url: "https://www.photopea.com/", description: "Editor di immagini online (simile a Photoshop)", subjects: ["Arte"], platform: "Web", pricing: "Gratuito", tags: ["Grafica", "Foto", "Design"] },
    { name: "Canva", url: "https://canva.com", description: "Design grafico semplificato", subjects: ["Arte"], platform: "Web/App", pricing: "Freemium", tags: ["Design", "Grafica", "Presentazioni"] },
    { name: "Gamma", url: "https://gamma.app/", description: "Creazione presentazioni con AI", subjects: ["Altro"], platform: "Web", pricing: "Freemium", tags: ["Presentazioni", "AI", "Design"] },

    // AI e Strumenti Intelligenti
    { name: "ExplainPaper", url: "https://www.explainpaper.com/dashboard", description: "Spiegazione di articoli scientifici con AI", subjects: ["Scienze", "Chimica", "Fisica"], platform: "Web", pricing: "Freemium", tags: ["AI", "Scienze", "Ricerca"] },
    { name: "NerdAI", url: "https://nerdai.app/chat?src=Chat&launch=false", description: "Assistente AI per studenti", subjects: ["Altro"], platform: "Web", pricing: "Freemium", tags: ["AI", "Assistente", "Studio"] },
    { name: "ChatGPT", url: "https://chat.openai.com", description: "Assistente conversazionale AI", subjects: ["Altro"], platform: "Web/App", pricing: "Freemium", tags: ["AI", "Conversazione", "Assistente"] },
    { name: "Gemini", url: "https://gemini.google.com", description: "AI di Google per assistenza", subjects: ["Altro"], platform: "Web", pricing: "Gratuito", tags: ["AI", "Google", "Assistente"] },

    // Mappe Mentali e Organizzazione
    { name: "MindMeister", url: "https://www.mindmeister.com/", description: "Creazione mappe mentali collaborative", subjects: ["Altro"], platform: "Web/App", pricing: "Freemium", tags: ["Mappe Mentali", "Organizzazione", "Collaborazione"] },

    // Strumenti per la Classe
    { name: "ClassroomScreen", url: "https://classroomscreen.com/", description: "Strumenti digitali per la classe", subjects: ["Altro"], platform: "Web", pricing: "Freemium", tags: ["Classe", "Strumenti", "Gestione"] },
    { name: "ILovePDF", url: "https://www.ilovepdf.com/", description: "Strumenti per manipolare PDF", subjects: ["Altro"], platform: "Web", pricing: "Freemium", tags: ["PDF", "Strumenti", "Documenti"] },

    // Matematica e Scienze
    { name: "Desmos Calculator", url: "https://www.desmos.com/calculator?lang=it", description: "Calcolatrice grafica avanzata", subjects: ["Matematica"], platform: "Web", pricing: "Gratuito", tags: ["Matematica", "Calcolatrice", "Grafici"] },
    { name: "PhET Simulations", url: "https://phet.colorado.edu/it/", description: "Simulazioni scientifiche interattive", subjects: ["Scienze"], platform: "Web", pricing: "Gratuito", tags: ["Scienze", "Simulazioni", "Interattivo"] },
    { name: "MolView", url: "https://app.molview.org/", description: "Visualizzatore di molecole 3D", subjects: ["Chimica"], platform: "Web", pricing: "Gratuito", tags: ["Chimica", "Molecole", "3D"] },
    { name: "Elementium", url: "https://apps.apple.com/us/app/elementium/id892123825", description: "Tavola periodica interattiva", subjects: ["Chimica"], platform: "iOS", pricing: "Gratuito", tags: ["Chimica", "Tavola Periodica", "Interattivo"] },
    { name: "Brilliant", url: "https://brilliant.org/home/", description: "Corsi interattivi di matematica e scienze", subjects: ["Matematica", "Scienze"], platform: "Web/App", pricing: "Freemium", tags: ["Matematica", "Scienze", "Corsi"] },
    { name: "GeoGebra", url: "https://www.geogebra.org/", description: "Matematica dinamica e geometria", subjects: ["Matematica", "Fisica"], platform: "Web/App", pricing: "Gratuito", tags: ["Matematica", "Geometria", "Dinamico", "Fisica"] },

    // Astronomia e Spazio
    { name: "Stellarium Web", url: "https://stellarium-web.org/", description: "Planetario online", subjects: ["Scienze", "Geografia"], platform: "Web", pricing: "Gratuito", tags: ["Astronomia", "Stelle", "Planetario", "Geografia"] },
    { name: "Virtual Vacation", url: "https://virtualvacation.us/guess", description: "Gioco di geografia con immagini", subjects: ["Geografia"], platform: "Web", pricing: "Gratuito", tags: ["Geografia", "Giochi", "Immagini"] },

    // Strumenti di Sviluppo
    { name: "Ultimaker Cura", url: "https://ultimaker.com/software/ultimaker-cura/", description: "Software per stampa 3D", subjects: ["Arte", "Scienze"], platform: "Desktop", pricing: "Gratuito", tags: ["3D Printing", "Tecnologia", "Design", "Arte", "Scienze"] },
    { name: "Delightex", url: "https://www.delightex.com/", description: "Piattaforma per creare esperienze immersive", subjects: ["Informatica"], platform: "Web", pricing: "Freemium", tags: ["Immersivo", "3D", "Realtà Virtuale", "Creatività"] },

    // Strumenti Esistenti Aggiornati
    { name: "Khan Academy", url: "https://www.khanacademy.org/math", description: "Lezioni gratuite di matematica e scienze", subjects: ["Matematica", "Scienze", "Fisica", "Chimica", "Biologia"], platform: "Web/App", pricing: "Gratuito", tags: ["Matematica", "Scienze", "Lezioni", "Video", "Multidisciplinare"] },
    { name: "NASA Kids", url: "https://www.nasa.gov/kidsclub/", description: "Esplora lo spazio con la NASA", subjects: ["Scienze"], platform: "Web", pricing: "Gratuito", tags: ["Spazio", "NASA", "Scienze"] },
    { name: "Duolingo", url: "https://www.duolingo.com/", description: "Impara le lingue gratuitamente", subjects: ["Lingue"], platform: "Web/App", pricing: "Freemium", tags: ["Lingue", "Giochi", "Gratuito"] },
    { name: "Google Earth", url: "https://earth.google.com/", description: "Esplora il mondo in 3D", subjects: ["Geografia"], platform: "Web/App", pricing: "Gratuito", tags: ["Geografia", "3D", "Mappe"] },
    { name: "Google Arts & Culture", url: "https://artsandculture.google.com/", description: "Musei e opere d'arte virtuali", subjects: ["Arte"], platform: "Web/App", pricing: "Gratuito", tags: ["Arte", "Musei", "Cultura"] },
    { name: "Musei Vaticani", url: "https://www.museivaticani.va/content/museivaticani/en/collezioni/musei/tour-virtuali-elenco.html", description: "Tour virtuali dei Musei Vaticani e Cappella Sistina", subjects: ["Arte", "Geografia", "Storia"], platform: "Web", pricing: "Gratuito", tags: ["Musei", "Arte", "Storia", "Religione", "Tour Virtuali"] },
    { name: "Musei di Roma", url: "https://www.romeing.it/online-museum-tours-rome/", description: "Tour virtuali 360° dei musei civici di Roma", subjects: ["Arte", "Geografia", "Storia"], platform: "Web", pricing: "Gratuito", tags: ["Musei", "Arte", "Storia", "Roma", "Tour Virtuali", "360°"] },
    { name: "Duomo di Milano VT", url: "https://www.360visio.com/wp-content/uploads/2019/01/VTDuomo/index.html", description: "Tour virtuale 360° del Duomo di Milano", subjects: ["Arte", "Geografia"], platform: "Web", pricing: "Gratuito", tags: ["Duomo", "Milano", "Arte", "Architettura", "Tour Virtuali", "360°"] },
    { name: "Tour Virtuale Pompei", url: "https://www.youtube.com/watch?v=d4flx14q5OE", description: "Tour virtuale dell'antica città di Pompei", subjects: ["Arte", "Storia", "Geografia"], platform: "Web", pricing: "Gratuito", tags: ["Pompei", "Storia", "Arte", "Archeologia", "Tour Virtuali", "YouTube"] },
    { name: "Museo degli Uffizi VT", url: "https://www.uffizi.it/en/online-exhibitions", description: "Mostre virtuali e tour online delle Gallerie degli Uffizi", subjects: ["Arte"], platform: "Web", pricing: "Gratuito", tags: ["Uffizi", "Firenze", "Arte", "Rinascimento", "Mostre Virtuali", "Galleria"] },
    { name: "Museo del Louvre", url: "https://www.louvre.fr/en/online-tours", description: "Tour virtuali e mostre online del Museo del Louvre", subjects: ["Arte"], platform: "Web", pricing: "Gratuito", tags: ["Louvre", "Parigi", "Arte", "Museo", "Tour Virtuali", "Mostre"] },

    // Lingue
    { name: "Babbel", url: "https://www.babbel.com/", description: "App per imparare le lingue straniere", subjects: ["Lingue"], platform: "Web/App", pricing: "Freemium", tags: ["Lingue", "Apprendimento", "Conversazione", "Grammatica"] },
    { name: "Tandem", url: "https://www.tandem.net/", description: "Scambio linguistico con madrelingua", subjects: ["Lingue"], platform: "Web/App", pricing: "Freemium", tags: ["Lingue", "Conversazione", "Scambio", "Madrelingua"] },
    { name: "MozaWeb", url: "https://www.mozaweb.com/", description: "Piattaforma educativa multimediale", subjects: ["Arte", "Tecnologia", "Italiano", "Matematica", "Scienze", "Geografia", "Storia", "Intrattenimento", "Informatica", "Musica", "Chimica", "Fisica", "Biologia", "Lingue"], platform: "Web", pricing: "Freemium", tags: ["Multimediale", "Educativo", "Contenuti"] },
    
    // Giochi Educativi per Bambini
    { name: "Toy Theater", url: "https://toytheater.com/", description: "Giochi educativi online per bambini", subjects: ["Altro"], platform: "Web", pricing: "Gratuito", tags: ["Giochi", "Bambini", "Educativo"] },
    { name: "AutoDraw", url: "https://www.autodraw.com/", description: "Disegno assistito con AI di Google", subjects: ["Arte", "Intrattenimento"], platform: "Web", pricing: "Gratuito", tags: ["Disegno", "AI", "Google", "Creatività"] },

    // Strumenti per Collaborazione e Inclusione
    { name: "Padlet", url: "https://padlet.com/", description: "Bacheca virtuale per collaborazione e condivisione", subjects: ["Altro"], platform: "Web/App", pricing: "Freemium", tags: ["Collaborazione", "Bacheca", "Condivisione", "Multimediale"] },
    { name: "LeggiXme", url: "https://sd2.itd.cnr.it/index.php?r=site/scheda&id=5626", description: "Programma per facilitare la lettura e scrittura attraverso sintesi vocale", subjects: ["Altro"], platform: "Windows", pricing: "Gratuito", tags: ["Sintesi Vocale", "Accessibilità", "Lettura", "Scrittura", "DSA"] }
  ]

  const subjects = [...new Set(educationalTools.flatMap(tool => tool.subjects))].sort()

  const filteredTools = useMemo(() => {
    return educationalTools.filter(tool => {
      const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           tool.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      const matchesSubject = !selectedSubject || tool.subjects.includes(selectedSubject)
      return matchesSearch && matchesSubject
    }).sort((a, b) => a.name.localeCompare(b.name))
  }, [searchTerm, selectedSubject])

  const getFaviconUrl = (url) => {
    try {
      const domain = new URL(url).hostname
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=32`
    } catch {
      return '/default-favicon.png'
    }
  }

  const renderSubjects = (subjects) => {
    return subjects.map((subject, index) => (
      <span
        key={index}
        className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full mr-1 mb-1"
      >
        {subject}
      </span>
    ))
  }

  return (
    <div>
      {/* Header */}
      <div className="py-6 sm:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center py-4 sm:py-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-2 sm:mb-3 tracking-tight">
              Formazione <span className="text-blue-600">Digitale</span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-500 max-w-2xl mx-auto px-4">
              Scopri le migliori risorse educative digitali per la formazione
            </p>
          </div>
        </div>
        {/* ChatGPT-style Search Bar */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-2 sm:-mt-4">
          <div className="relative bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl sm:rounded-[2rem] shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center">
              {/* Search Input */}
              <div className="flex-1 flex items-center">
                <div className="pl-3 sm:pl-4 pr-2">
                  <svg className="h-4 sm:h-5 w-4 sm:w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Cerca strumenti..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 py-3 sm:py-4 px-2 text-sm bg-transparent border-0 focus:outline-none focus:ring-0 placeholder-gray-500"
                />
              </div>
              
              {/* Mobile: Filters button */}
              <div className="sm:hidden border-t border-gray-200 p-3">
                <div className="flex items-center justify-center">
                  <select
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                    className="bg-transparent border-0 text-sm text-gray-700 focus:outline-none focus:ring-0 cursor-pointer w-full text-center"
                  >
                    <option value="">Tutte le materie</option>
                    {subjects.map(subject => (
                      <option key={subject} value={subject}>{subject}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              {/* Desktop: Horizontal layout */}
              <div className="hidden sm:flex items-center">
                {/* Divider */}
                <div className="h-8 w-px bg-gray-200"></div>
                
                {/* Subject Filter */}
                <div className="px-3">
                  <select
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                    className="bg-transparent border-0 text-sm text-gray-700 focus:outline-none focus:ring-0 cursor-pointer"
                  >
                    <option value="">Tutte le materie</option>
                    {subjects.map(subject => (
                      <option key={subject} value={subject}>{subject}</option>
                    ))}
                  </select>
                </div>
                
                {/* Divider */}
                <div className="h-8 w-px bg-gray-200"></div>
                
                {/* View Mode Toggle */}
                <div className="flex items-center px-3">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-xl transition-all duration-200 ${
                      viewMode === 'grid' ? 'bg-gray-100 text-gray-900' : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-xl transition-all duration-200 ${
                      viewMode === 'list' ? 'bg-gray-100 text-gray-900' : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Results Count */}
        <div className="max-w-4xl mx-auto px-6 mt-4">
          <div className="text-sm text-gray-500 font-medium text-center">
            {filteredTools.length} strumenti trovati
          </div>
        </div>

        {/* Tools Display */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        {viewMode === 'grid' && !isMobile ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool, index) => (
              <div key={index} className="group h-full">
                <a
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-white/60 backdrop-blur-sm rounded-3xl border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300 p-6 h-full group-hover:-translate-y-1 flex flex-col"
                >
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                        <img
                          src={getFaviconUrl(tool.url)}
                          alt={`${tool.name} icon`}
                          className="w-7 h-7"
                          onError={(e) => {
                            e.target.src = '/default-favicon.png'
                          }}
                        />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {tool.name}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed h-16">
                        {tool.description}
                      </p>
                    </div>
                  </div>
                </a>
              </div>
                  ))}
                </div>
        ) : (
          <div className="space-y-3">
            {filteredTools.map((tool, index) => (
              <div key={index} className="group">
                <a
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200 p-4 group-hover:-translate-y-0.5"
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-2xl bg-gray-50 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                        <img
                          src={getFaviconUrl(tool.url)}
                          alt={`${tool.name} icon`}
                          className="w-6 h-6"
                          onError={(e) => {
                            e.target.src = '/default-favicon.png'
                          }}
                        />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                        <span className="font-semibold">{tool.name}</span> • <span className="font-normal text-gray-500">{tool.description}</span>
                      </h3>
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
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-2xl flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nessun risultato trovato</h3>
            <p className="text-gray-500 text-sm max-w-md mx-auto">
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
