export interface LessonSection {
  type: 'text' | 'chords' | 'strumming' | 'exercise' | 'song' | 'tip' | 'challenge'
  title?: string
  content: string
  chordIds?: string[]
  strummingPattern?: string[]
  songId?: string
}

export interface Lesson {
  id: number
  day: number
  week: number
  title: string
  subtitle: string
  icon: string
  duration: string
  isRestDay: boolean
  goals: string[]
  sections: LessonSection[]
}

export const lessons: Lesson[] = [
  // ===== WEEK 1: "Riprendiamo in mano la chitarra" =====
  {
    id: 1, day: 1, week: 1,
    title: 'Bentornato!',
    subtitle: 'Riprendiamo confidenza con la chitarra',
    icon: '👋',
    duration: '30 min',
    isRestDay: false,
    goals: [
      'Ripassare i 4 accordi base: La, La-, Mi, Mi-',
      'Imparare i nomi degli accordi in italiano',
      'Suonare ogni accordo con un suono pulito',
    ],
    sections: [
      {
        type: 'text',
        title: 'Benvenuto nel tuo percorso!',
        content: 'Oggi riprendiamo in mano la chitarra con calma. Niente fretta, niente pressione. Il nostro obiettivo è semplice: ritrovare il feeling con lo strumento e suonare 4 accordi in modo pulito. Ricorda: la qualità del suono conta più della velocità.',
      },
      {
        type: 'chords',
        title: 'I tuoi primi 4 accordi — ripassiamoli',
        content: 'Suona ogni accordo lentamente. Pizzica ogni corda singolarmente per verificare che suonino tutte bene. Se una corda "buzza" o è muta, aggiusta la posizione delle dita.',
        chordIds: ['A', 'Am', 'E', 'Em'],
      },
      {
        type: 'exercise',
        title: 'Esercizio 1: Suono pulito (5 min)',
        content: 'Per ogni accordo: posiziona le dita → pizzica ogni corda una alla volta dalla 6ª alla 1ª → ascolta se ogni nota suona chiara. Se no, aggiusta. Ripeti 3 volte per accordo.',
      },
      {
        type: 'exercise',
        title: 'Esercizio 2: Memoria muscolare (5 min)',
        content: 'Per ogni accordo:\n1. Posiziona le dita sull\'accordo\n2. Guarda bene la posizione delle dita\n3. Togli tutte le dita dalla tastiera\n4. Chiudi gli occhi e riposiziona le dita\n5. Apri gli occhi e verifica\n\nRipeti 5 volte per accordo. Questo allena la "memoria" delle tue dita.',
      },
      {
        type: 'exercise',
        title: 'Esercizio 3: Pennata singola (5 min)',
        content: 'Con il plettro, fai UNA SOLA pennata giù per ogni accordo. Ascolta il suono.\n\n• La (A) — pennata giù — ASCOLTA — 3 secondi di pausa\n• La- (Am) — pennata giù — ASCOLTA — 3 secondi di pausa\n• Mi (E) — pennata giù — ASCOLTA — 3 secondi di pausa\n• Mi- (Em) — pennata giù — ASCOLTA — 3 secondi di pausa\n\nNota la differenza tra maggiore e minore: il maggiore suona "luminoso", il minore suona "malinconico".',
      },
      {
        type: 'exercise',
        title: 'Esercizio 4: Posiziona e via! (5 min)',
        content: 'Cronometrati: quanto tempo ci metti a posizionare ogni accordo partendo da zero?\n\n• Mani giù (rilassate) → posiziona La (A) → pennata giù\n• Mani giù → posiziona La- (Am) → pennata giù\n• Mani giù → posiziona Mi (E) → pennata giù\n• Mani giù → posiziona Mi- (Em) → pennata giù\n\nRipeti 3 giri. Cerca di essere un po\' più veloce ogni giro, ma senza sacrificare il suono pulito.',
      },
      {
        type: 'tip',
        content: 'Premi le corde con la punta delle dita, non con il polpastrello piatto. Le dita devono essere "ad arco" per non toccare le corde vicine.',
      },
    ],
  },
  {
    id: 2, day: 2, week: 1,
    title: 'Gli altri amici',
    subtitle: 'Re, Re-, Do e Sol entrano in scena',
    icon: '🎵',
    duration: '30 min',
    isRestDay: false,
    goals: [
      'Ripassare Re, Re-, Do e Sol',
      'Avere a disposizione 8 accordi base',
      'Verificare il suono pulito di tutti',
    ],
    sections: [
      {
        type: 'text',
        content: 'Oggi aggiungiamo altri 4 accordi al nostro arsenale. Con quelli di ieri, avrai 8 accordi a disposizione — sufficienti per suonare centinaia di canzoni!',
      },
      {
        type: 'chords',
        title: 'Accordi del giorno',
        content: 'Stessa procedura di ieri: posiziona, pizzica ogni corda, verifica il suono. Il Do (C) e il Sol (G) richiedono un po\' più di stretching delle dita.',
        chordIds: ['D', 'Dm', 'C', 'G'],
      },
      {
        type: 'exercise',
        title: 'Esercizio 1: Controllo corda per corda (5 min)',
        content: 'Per ogni nuovo accordo (Re, Re-, Do, Sol):\nPosiziona l\'accordo → pizzica OGNI corda dalla più grave alla più acuta → se una corda buzza, aggiusta la posizione del dito → ripizza.\n\nAttenzione particolare:\n• Re (D): le corde 6 e 5 NON si suonano (sono mute)\n• Do (C): la corda 6 NON si suona\n• Sol (G): tutte le 6 corde si suonano!',
      },
      {
        type: 'exercise',
        title: 'Esercizio 2: La parata degli accordi (5 min)',
        content: 'Suona tutti gli 8 accordi in fila:\nLa → La- → Mi → Mi- → Re → Re- → Do → Sol\n\nFai una pennata verso il basso per ciascuno, poi aspetta 2 secondi, e vai al successivo. Ripeti 3 volte.',
      },
      {
        type: 'exercise',
        title: 'Esercizio 3: Riconoscere il suono (5 min)',
        content: 'Suona ogni accordo e prova a "sentirne il carattere":\n• La (A) — solare, aperto\n• La- (Am) — triste, profondo\n• Mi (E) — potente, pieno\n• Mi- (Em) — dolce, malinconico\n• Re (D) — brillante, allegro\n• Re- (Dm) — drammatico\n• Do (C) — caldo, rotondo\n• Sol (G) — grande, epico\n\nSuonali ad occhi chiusi e ascolta le differenze.',
      },
      {
        type: 'exercise',
        title: 'Esercizio 4: Quiz accordi (5 min)',
        content: 'Metti alla prova la memoria! Prova a suonare gli accordi chiamandoli per nome ITALIANO senza guardare i diagrammi:\n\n"Do!" → posiziona Do → pennata → verifica\n"Mi minore!" → posiziona Mi- → pennata → verifica\n"Sol!" → posiziona Sol → pennata → verifica\n"Re minore!" → posiziona Re- → pennata → verifica\n\nMescola l\'ordine ogni volta.',
      },
      {
        type: 'tip',
        content: 'Per il Sol (G), usa il mignolo sulla 1ª corda al 3° tasto. Sembra difficile all\'inizio, ma diventerà naturale con la pratica.',
      },
    ],
  },
  {
    id: 3, day: 3, week: 1,
    title: 'Il gioco dei cambi (parte 1)',
    subtitle: 'Iniziamo a muoverci tra gli accordi',
    icon: '🔄',
    duration: '30 min',
    isRestDay: false,
    goals: [
      'Praticare cambi tra coppie di accordi facili',
      'Imparare la tecnica del dito-perno',
      'Fare il "test del minuto"',
    ],
    sections: [
      {
        type: 'text',
        content: 'Sapere gli accordi è una cosa, cambiarli in tempo è un\'altra! Oggi lavoriamo sui cambi, partendo dalle coppie più facili. Il segreto? Il dito-perno: un dito che resta fermo mentre le altre si muovono.',
      },
      {
        type: 'chords',
        title: 'Coppie facili',
        content: 'Queste coppie condividono dita in comune, rendendo il cambio più fluido.',
        chordIds: ['Am', 'Em', 'E', 'A'],
      },
      {
        type: 'exercise',
        title: 'Esercizio 1: Il dito-perno (5 min)',
        content: 'Tra La- (Am) e Mi- (Em) nota che il dito 1 (indice) resta quasi nella stessa zona:\n\n1. Posiziona La- (Am)\n2. Senza sollevare l\'indice, sposta le altre dita per fare Mi- (Em)\n3. Torna a La- tenendo l\'indice come "àncora"\n4. Ripeti lentamente 10 volte\n\nIl dito-perno è il tuo migliore amico per cambi veloci!',
      },
      {
        type: 'exercise',
        title: 'Esercizio 2: Test del minuto (3 min)',
        content: 'Imposta un timer di 1 minuto. Alterna tra La- e Mi- il più velocemente possibile (ma con suono pulito!). Conta quanti cambi riesci a fare.\n\nSegna il numero: _____ cambi\n\nQuesto è il tuo punto di partenza — lo rifaremo a fine mese per vedere i progressi!',
      },
      {
        type: 'exercise',
        title: 'Esercizio 3: Coppie a tempo (10 min)',
        content: 'Pratica queste coppie, 2 minuti ciascuna:\n\n• La- (Am) ↔ Mi- (Em) — dito-perno: indice\n• Mi (E) ↔ La (A) — dito-perno: indice resta al 1° tasto\n• La- (Am) ↔ Mi (E) — nessun perno, ma forma simile\n• Mi- (Em) ↔ Mi (E) — cambia solo un dito!\n• La (A) ↔ La- (Am) — cambia solo un dito!\n\nFai una pennata giù ad ogni cambio e ascolta il suono.',
      },
      {
        type: 'exercise',
        title: 'Esercizio 4: Il pendolo (5 min)',
        content: 'Scegli la coppia che trovi più difficile.\n\n1. Fai il cambio MOLTO lentamente — 5 secondi per cambio\n2. Dopo 1 minuto, accelera leggermente — 4 secondi\n3. Dopo 1 minuto, 3 secondi\n4. Dopo 1 minuto, 2 secondi\n5. Riesci ad arrivare a 1 secondo per cambio?\n\nSe il suono diventa sporco, torna al livello precedente.',
      },
      {
        type: 'tip',
        content: 'Non guardare la mano destra. Gli occhi devono stare sulla mano sinistra durante i cambi. Con il tempo, non dovrai guardare nemmeno quella!',
      },
    ],
  },
  {
    id: 4, day: 4, week: 1,
    title: 'Il gioco dei cambi (parte 2)',
    subtitle: 'Cambi un po\' più impegnativi',
    icon: '🔄',
    duration: '30 min',
    isRestDay: false,
    goals: [
      'Praticare cambi più difficili: Do↔Sol, Re↔La-',
      'Migliorare la fluidità',
      'Muovere tutte le dita insieme',
    ],
    sections: [
      {
        type: 'text',
        content: 'Oggi affrontiamo i cambi più impegnativi. Do↔Sol e Re↔La- richiedono di muovere tutte le dita contemporaneamente. Il trucco: solleva tutte le dita insieme e "atterra" sulla nuova forma dell\'accordo come un blocco unico.',
      },
      {
        type: 'chords',
        title: 'Coppie del giorno',
        content: 'Pratica queste coppie con la stessa tecnica del "test del minuto".',
        chordIds: ['C', 'G', 'D', 'Am'],
      },
      {
        type: 'exercise',
        title: 'Esercizio 1: Atterraggio simultaneo (5 min)',
        content: 'Per il cambio Do (C) → Sol (G):\n1. Posiziona Do (C)\n2. Solleva TUTTE le dita insieme (non una alla volta!)\n3. "Atterra" su Sol (G) cercando di posizionare tutte le dita nello stesso istante\n4. Pennata giù → verifica il suono\n5. Ripeti 10 volte\n\nFai la stessa cosa per Sol → Do.',
      },
      {
        type: 'exercise',
        title: 'Esercizio 2: Coppie a rotazione (10 min)',
        content: 'Pratica queste coppie, 2 minuti ciascuna:\n\n• Do (C) ↔ Sol (G)\n• Re (D) ↔ La- (Am)\n• Do (C) ↔ La- (Am)\n• Sol (G) ↔ Mi- (Em)\n• Do (C) ↔ Mi- (Em)\n\nFai una pennata giù ad ogni cambio. Concentrati sulla pulizia del suono.',
      },
      {
        type: 'exercise',
        title: 'Esercizio 3: La catena (5 min)',
        content: 'Prova questa sequenza: La- → Re- → Mi → La-\n\nFai una pennata giù per ogni accordo, cambia, pennata giù, cambia...\nRipeti la catena 5 volte senza fermarti.\n\nQuando riesci, prova anche:\nDo → Sol → La- → Mi- → Do',
      },
      {
        type: 'exercise',
        title: 'Esercizio 4: Il cerchio degli 8 (5 min)',
        content: 'Suona tutti gli 8 accordi in cerchio con una pennata ciascuno, cercando di NON fermarti tra uno e l\'altro:\n\nLa → Mi → La- → Mi- → Re → Sol → Do → Re- → (ricomincia)\n\nVai lentissimo. L\'obiettivo è la continuità, non la velocità.',
      },
      {
        type: 'tip',
        content: 'Se un cambio è troppo difficile, rallenta ancora di più. È meglio fare un cambio perfetto in 5 secondi che un cambio sporco in 1 secondo. La velocità verrà con il tempo.',
      },
    ],
  },
  {
    id: 5, day: 5, week: 1,
    title: 'Il primo ritmo',
    subtitle: 'Pattern di strumming base',
    icon: '🥁',
    duration: '30 min',
    isRestDay: false,
    goals: [
      'Imparare il pattern di strumming #1 (4 colpi giù)',
      'Applicarlo su una sequenza di accordi',
      'Mantenere il tempo costante',
    ],
    sections: [
      {
        type: 'text',
        content: 'Finora abbiamo suonato gli accordi uno alla volta. Oggi aggiungiamo il RITMO! Iniziamo con il pattern più semplice: 4 colpi verso il basso, costanti come un orologio.',
      },
      {
        type: 'strumming',
        title: 'Pattern #1 — Quarti',
        content: 'Quattro colpi verso il basso, tutti uguali. Conta "1 - 2 - 3 - 4" e fai un colpo giù su ogni numero. Mantieni un tempo costante.',
        strummingPattern: ['down', 'down', 'down', 'down'],
      },
      {
        type: 'exercise',
        title: 'Esercizio 1: Solo ritmo (3 min)',
        content: 'SENZA accordi — appoggia la mano sinistra sulle corde per mutarle.\nFai il pattern #1 (4 giù) contando ad alta voce: "1 - 2 - 3 - 4"\n\nConcentrati SOLO sulla mano destra. Il ritmo deve essere costante come un orologio.\nFai 1 minuto lento, 1 minuto medio, 1 minuto un po\' più veloce.',
      },
      {
        type: 'exercise',
        title: 'Esercizio 2: Un accordo alla volta (10 min)',
        content: 'Ora aggiungi gli accordi, uno alla volta:\n\n• 2 min: Pattern #1 solo su Mi- (Em) — 4 colpi giù, ripeti senza fermarti\n• 2 min: Solo su La- (Am)\n• 2 min: Solo su Re (D)\n• 2 min: Solo su Sol (G)\n• 2 min: Solo su Do (C)\n\nL\'obiettivo: la mano destra non si ferma MAI.',
      },
      {
        type: 'exercise',
        title: 'Esercizio 3: Due accordi con ritmo (7 min)',
        content: 'Ora combiniamo ritmo + cambio accordi:\n\nMi- (4 colpi) → La- (4 colpi) → ripeti per 2 minuti\nRe (4 colpi) → Sol (4 colpi) → ripeti per 2 minuti\nDo (4 colpi) → La- (4 colpi) → ripeti per 2 minuti\n\nRicorda: se non riesci a cambiare in tempo, la mano destra continua comunque!',
      },
      {
        type: 'exercise',
        title: 'Esercizio 4: La prima progressione (5 min)',
        content: 'Suona questa sequenza completa con il pattern #1:\n\nMi- (4 colpi) → La- (4 colpi) → Re (4 colpi) → Mi- (4 colpi)\n\nRipeti il giro 4 volte senza fermarti.\nSe riesci, prova anche: Sol (4) → Do (4) → Re (4) → Sol (4)',
      },
      {
        type: 'tip',
        content: 'Il movimento della pennata parte dal polso, non dal braccio! Il braccio resta fermo, il polso fa il lavoro. Immagina di scuotere dell\'acqua dalla mano.',
      },
    ],
  },
  {
    id: 6, day: 6, week: 1,
    title: 'Pratica libera',
    subtitle: 'Consolida quello che hai imparato',
    icon: '🧘',
    duration: '30 min',
    isRestDay: true,
    goals: [
      'Ripassare tutti gli esercizi della settimana',
      'Nessun concetto nuovo — solo pratica',
      'Divertirsi!',
    ],
    sections: [
      {
        type: 'text',
        content: 'Oggi niente di nuovo! Il cervello ha bisogno di tempo per assimilare. Ripeti gli esercizi che trovi più difficili, o semplicemente divertiti a suonare gli accordi che sai con il ritmo che hai imparato.',
      },
      {
        type: 'exercise',
        title: 'Riscaldamento (5 min)',
        content: 'Suona tutti gli 8 accordi lentamente, con una pennata ciascuno.\nPoi fai il "cerchio degli 8" (esercizio del giorno 4) 3 volte.',
      },
      {
        type: 'exercise',
        title: 'Drill cambi (10 min)',
        content: 'Fai il "test del minuto" sulle 3 coppie che trovi PIÙ difficili.\nSegna quanti cambi fai per ogni coppia:\n\n• Coppia 1: _____ → _____ = _____ cambi/min\n• Coppia 2: _____ → _____ = _____ cambi/min\n• Coppia 3: _____ → _____ = _____ cambi/min',
      },
      {
        type: 'exercise',
        title: 'Ritmo e accordi (10 min)',
        content: 'Pattern #1 su queste progressioni:\n\n• Mi- → La- → Re → Mi- (rock minore)\n• Sol → Do → Re → Sol (pop)\n• La- → Re- → Mi → La- (flamenco)\n\nSuona ogni progressione per 3 minuti circa. Scegli quella che ti piace di più!',
      },
      {
        type: 'exercise',
        title: 'Sperimenta! (5 min)',
        content: 'Inventa una TUA progressione di 3-4 accordi. Qualsiasi combinazione va bene! Non esiste "sbagliato" nella musica.\n\nProva: cosa succede se metti Mi- dopo Do? E se metti Re- dopo Sol?\nTrova una combinazione che ti piace.',
      },
      {
        type: 'tip',
        content: 'I giorni di pratica libera sono importantissimi. È qui che il tuo cervello "connette i punti". Non saltarli!',
      },
    ],
  },
  {
    id: 7, day: 7, week: 1,
    title: 'Mini-traguardo',
    subtitle: 'Verifica di fine settimana',
    icon: '🏆',
    duration: '30 min',
    isRestDay: false,
    goals: [
      'Suonare Sol→Do→Re→Sol con il pattern #1',
      'Verificare i progressi della settimana',
      'Celebrare il completamento della settimana 1!',
    ],
    sections: [
      {
        type: 'text',
        content: 'Fine della prima settimana! Oggi facciamo un piccolo "test" amichevole. Niente panico — è solo per vedere dove sei e quanto sei migliorato.',
      },
      {
        type: 'exercise',
        title: 'Riscaldamento (5 min)',
        content: 'La parata degli 8 accordi, 3 volte.\nPoi "test del minuto" sulla coppia La- ↔ Mi- per scaldarti.',
      },
      {
        type: 'challenge',
        title: 'Sfida della settimana',
        content: 'Suona questa progressione con il Pattern #1:\nSol (G) → Do (C) → Re (D) → Sol (G)\n4 colpi giù per ogni accordo. Riesci a fare 4 giri completi senza fermarti? Se sì, la settimana 1 è un successo!',
        chordIds: ['G', 'C', 'D', 'G'],
      },
      {
        type: 'exercise',
        title: 'Auto-valutazione',
        content: 'Rispondi mentalmente:\n• Riesco a suonare tutti gli 8 accordi con suono pulito? ✓/✗\n• Riesco a cambiare tra La- e Mi- in meno di 2 secondi? ✓/✗\n• Riesco a mantenere il ritmo costante per 4 giri? ✓/✗\nSe hai anche solo 2 ✓ su 3, stai andando alla grande!',
      },
      {
        type: 'exercise',
        title: 'Bonus: Sfida avanzata',
        content: 'Se ti senti coraggioso, prova la progressione più lunga:\n\nLa- (4 colpi) → Do (4) → Sol (4) → Mi- (4) → La- (4) → Re (4) → Sol (4) → Mi (4)\n\n8 accordi diversi con ritmo! Riesci a fare 2 giri?',
      },
      {
        type: 'exercise',
        title: 'Esercizio divertente: Orecchio musicale',
        content: 'Suona questi due giri e decidi quale ti sembra più "felice" e quale più "triste":\n\n• Giro A: Sol → Do → Re → Sol\n• Giro B: La- → Re- → Mi- → La-\n\nNotato la differenza? Gli accordi maggiori suonano "luminosi", i minori "scuri".\nOra prova a mischiare: La- → Do → Sol → Mi-. Cosa ne pensi?',
      },
      {
        type: 'tip',
        content: 'Non essere troppo duro con te stesso. Stai imparando uno strumento musicale — ci vuole tempo. Ogni minuto di pratica conta!',
      },
    ],
  },

  // ===== WEEK 2: "Trova il ritmo" =====
  {
    id: 8, day: 8, week: 2,
    title: 'Su e giù',
    subtitle: 'Il pattern alternato',
    icon: '↕️',
    duration: '30 min',
    isRestDay: false,
    goals: [
      'Imparare il pattern #2: giù-su-giù-su',
      'Praticare prima a corde mute, poi su Mi-',
      'Mantenere un ritmo costante',
    ],
    sections: [
      {
        type: 'text',
        content: 'Questa settimana impariamo nuovi ritmi e la nostra prima canzone! Oggi introduciamo il pattern alternato: giù-su. Sembra semplice, ma la pennata verso l\'alto richiede un po\' di pratica.',
      },
      {
        type: 'strumming',
        title: 'Pattern #2 — Alternato',
        content: 'Giù-Su-Giù-Su in modo costante. Prima prova a corde mute (appoggia la mano sinistra sulle corde senza premere) per concentrarti solo sul ritmo della mano destra.',
        strummingPattern: ['down', 'up', 'down', 'up'],
      },
      {
        type: 'exercise',
        title: 'Esercizio 1: Solo mano destra (5 min)',
        content: 'Corde mute (mano sinistra appoggiata sulle corde senza premere):\n\n• 1 min: Giù-Su-Giù-Su — LENTO, conta "1-e-2-e-3-e-4-e"\n• 1 min: Aumenta un pochino la velocità\n• 1 min: Prova a chiudere gli occhi e sentire solo il ritmo\n• 2 min: Fai accenti (colpi più forti) sui "giù" — GIÙ-su-GIÙ-su',
      },
      {
        type: 'exercise',
        title: 'Esercizio 2: Un accordo alla volta (8 min)',
        content: 'Aggiungi un accordo per volta:\n\n• 2 min: Pattern #2 su Mi- (Em) — la mano destra non si ferma!\n• 2 min: Pattern #2 su La- (Am)\n• 2 min: Pattern #2 su Do (C)\n• 2 min: Pattern #2 su Sol (G)\n\nConcentrati: la pennata "su" deve colpire solo le 3-4 corde più sottili.',
      },
      {
        type: 'exercise',
        title: 'Esercizio 3: Confronto pattern (5 min)',
        content: 'Suona Mi- (Em) per 8 battute con pattern #1 (solo giù)\nPoi SUBITO 8 battute con pattern #2 (giù-su)\n\nSenti la differenza? Il pattern #2 ha più "movimento" e energia.\n\nRipeti lo switch tra i 2 pattern 4 volte.',
      },
      {
        type: 'exercise',
        title: 'Esercizio 4: Due accordi (5 min)',
        content: 'Pattern #2 con cambio accordi:\n\n• Mi- (4 battute giù-su) → La- (4 battute) → ripeti 4 volte\n• La- (4 battute) → Re (4 battute) → ripeti 4 volte\n\nIl cambio accordo avviene sempre DOPO una pennata "su", prima del nuovo "giù".',
      },
      {
        type: 'tip',
        content: 'Nella pennata verso l\'alto, non devi colpire tutte e 6 le corde. Basta "spazzolare" le prime 3-4 corde più sottili. Il suono sarà più naturale.',
      },
    ],
  },
  {
    id: 9, day: 9, week: 2,
    title: 'Su e giù + accordi',
    subtitle: 'Combinare pattern e cambi',
    icon: '🎶',
    duration: '35 min',
    isRestDay: false,
    goals: [
      'Applicare il pattern #2 su una progressione di 4 accordi',
      'Cambiare accordo mantenendo il ritmo',
      'Non fermarsi durante i cambi!',
    ],
    sections: [
      {
        type: 'text',
        content: 'Oggi la vera sfida: cambiare accordo SENZA fermare il ritmo. Il segreto? Se sbagli il cambio, continua a fare strumming comunque. Il ritmo non si ferma mai!',
      },
      {
        type: 'exercise',
        title: 'Esercizio 1: La regola d\'oro',
        content: 'Se non riesci a cambiare accordo in tempo, continua lo strumming a corde mute per un colpo, poi posiziona l\'accordo. È meglio un suono "vuoto" che fermarsi completamente.\n\nPratica: suona Mi- con pattern #2 e dopo 4 battute cambia a Sol.\nSe non riesci in tempo, fai un colpo "muto" e poi posiziona Sol.\n\nRipeti 10 volte il cambio Mi- → Sol.',
      },
      {
        type: 'chords',
        title: 'Progressione del giorno',
        content: 'Mi- → Sol → Do → Re. Ogni accordo dura 4 battute (giù-su-giù-su), poi cambi.',
        chordIds: ['Em', 'G', 'C', 'D'],
      },
      {
        type: 'exercise',
        title: 'Esercizio 2: Progressione a blocchi (10 min)',
        content: 'Costruisci la progressione un pezzo alla volta:\n\n• 3 min: Solo Mi- → Sol (2 accordi con pattern #2)\n• 3 min: Aggiungi Do → Mi- → Sol → Do (3 accordi)\n• 4 min: Progressione completa Mi- → Sol → Do → Re → ripeti\n\nVai MOLTO piano. Se perdi il ritmo, rallenta ancora.',
      },
      {
        type: 'exercise',
        title: 'Esercizio 3: Anticipa il cambio (5 min)',
        content: 'Trucco avanzato: inizia a muovere le dita verso l\'accordo successivo durante l\'ultima pennata "su" dell\'accordo corrente.\n\nPratica: suona Do con pattern #2. Sull\'ultimo "su", stacca le dita e inizia a muoverle verso Sol. Il primo "giù" del nuovo ciclo è su Sol.\n\nQuesto rende i cambi molto più fluidi!',
      },
      {
        type: 'exercise',
        title: 'Esercizio 4: Progressioni alternative (5 min)',
        content: 'Prova queste altre progressioni con pattern #2:\n\n• La- → Mi- → Sol → Re (malinconica)\n• Do → Sol → La- → Mi- (pop)\n• Re → La- → Mi- → Sol (drammatica)\n\nQuale ti piace di più? Segnala mentalmente, ci torneremo!',
      },
      {
        type: 'strumming',
        title: 'Pattern da usare',
        content: 'Usa il pattern #2 (alternato) su tutte le progressioni.',
        strummingPattern: ['down', 'up', 'down', 'up'],
      },
      {
        type: 'tip',
        content: 'Vai piano! Non c\'è fretta. Puoi anche contare ad alta voce "1-e-2-e-3-e-4-e" per tenere il tempo.',
      },
    ],
  },
  {
    id: 10, day: 10, week: 2,
    title: 'Pratica ritmica',
    subtitle: 'Consolida i due pattern',
    icon: '🧘',
    duration: '30 min',
    isRestDay: true,
    goals: [
      'Alternare tra pattern #1 e #2',
      'Consolidare i cambi con il ritmo',
      'Nessun concetto nuovo',
    ],
    sections: [
      {
        type: 'text',
        content: 'Giorno di consolidamento! Ripassa i due pattern che conosci e pratica i cambi degli accordi. Puoi inventare le tue sequenze di accordi e sperimentare.',
      },
      {
        type: 'exercise',
        title: 'Riscaldamento (5 min)',
        content: 'Corde mute, pattern #2 per 1 minuto.\nPoi il "cerchio degli 8 accordi" con pattern #1 — 2 giri lenti.\nPoi pattern #2 su Mi- per 1 minuto.',
      },
      {
        type: 'exercise',
        title: 'Switch pattern (8 min)',
        content: 'Su Mi- (Em):\n• 4 battute con pattern #1 → 4 battute con pattern #2 → ripeti 4 volte\n\nSu La- → Mi-:\n• 4 battute pattern #1 su La- → 4 battute pattern #2 su Mi- → ripeti 4 volte\n\nIl passaggio tra pattern deve essere fluido, senza fermarsi!',
      },
      {
        type: 'exercise',
        title: 'Progressioni libere (10 min)',
        content: '• 5 min: Pattern #2 sulla progressione Mi-→Sol→Do→Re\n• 5 min: Inventa una tua progressione e prova ENTRAMBI i pattern\n\nSfida: riesci a fare 4 giri completi su una progressione a tua scelta senza fermarti?',
      },
      {
        type: 'exercise',
        title: 'Drill velocità cambi (7 min)',
        content: '"Test del minuto" sulle 3 coppie più deboli:\n\nCoppia 1: 1 minuto → segna: _____ cambi\nCoppia 2: 1 minuto → segna: _____ cambi\nCoppia 3: 1 minuto → segna: _____ cambi\n\nConfronta con i numeri del giorno 3. Sei migliorato?',
      },
    ],
  },
  {
    id: 11, day: 11, week: 2,
    title: 'La prima canzone!',
    subtitle: 'Knockin\' on Heaven\'s Door',
    icon: '🚪',
    duration: '35 min',
    isRestDay: false,
    goals: [
      'Imparare la struttura di "Knockin\' on Heaven\'s Door"',
      'Suonare la canzone con il pattern #1',
      'Divertirsi a suonare una vera canzone!',
    ],
    sections: [
      {
        type: 'text',
        content: 'Il grande momento è arrivato: la tua prima canzone vera! "Knockin\' on Heaven\'s Door" di Bob Dylan (resa famosa anche dai Guns N\' Roses) usa solo 4 accordi che già conosci.',
      },
      {
        type: 'song',
        title: 'Knockin\' on Heaven\'s Door',
        content: 'Struttura:\n\nRiga 1: Sol (G) → Re (D) → La- (Am)\nRiga 2: Sol (G) → Re (D) → Do (C)\n\nRipeti questa struttura per tutta la canzone. Ogni accordo dura 4 battute.',
        songId: 'knockin',
        chordIds: ['G', 'D', 'Am', 'C'],
      },
      {
        type: 'exercise',
        title: 'Esercizio 1: I cambi della canzone (5 min)',
        content: 'Prima di suonare la canzone, prepara i cambi specifici:\n\n• Sol → Re: pratica 10 volte (pennata giù ad ogni cambio)\n• Re → La-: pratica 10 volte\n• La- → Sol: pratica 10 volte (serve per tornare all\'inizio)\n• Re → Do: pratica 10 volte\n• Do → Sol: pratica 10 volte',
      },
      {
        type: 'exercise',
        title: 'Esercizio 2: Solo la riga 1 (5 min)',
        content: 'Suona solo la prima riga con pattern #1:\nSol (4 colpi) → Re (4 colpi) → La- (4 colpi)\n\nRipeti 5 volte senza fermarti.\nOgni volta cerca di essere un po\' più fluido nei cambi.',
      },
      {
        type: 'exercise',
        title: 'Esercizio 3: Solo la riga 2 (5 min)',
        content: 'Ora la seconda riga:\nSol (4 colpi) → Re (4 colpi) → Do (4 colpi)\n\nRipeti 5 volte. L\'unica differenza con la riga 1 è Do al posto di La-.',
      },
      {
        type: 'exercise',
        title: 'Esercizio 4: Canzone completa! (10 min)',
        content: 'Unisci le due righe:\nSol → Re → La- → Sol → Re → Do → (ricomincia)\n\nSuona con pattern #1. Ripeti per 10 minuti continui.\nSe sbagli un cambio, non fermarti! Continua a suonare.',
      },
      {
        type: 'strumming',
        title: 'Inizia semplice',
        content: 'Usa il pattern #1 (4 giù). Quando ti senti sicuro, prova il pattern #2.',
        strummingPattern: ['down', 'down', 'down', 'down'],
      },
      {
        type: 'tip',
        content: 'Non cercare di cantare subito! Prima assicurati che gli accordi e il ritmo funzionino. Quando le mani vanno in "automatico", aggiungi la voce.',
      },
    ],
  },
  {
    id: 12, day: 12, week: 2,
    title: 'Knockin\' — pratica',
    subtitle: 'Migliora la tua prima canzone',
    icon: '🔁',
    duration: '30 min',
    isRestDay: false,
    goals: [
      'Suonare la canzone dall\'inizio alla fine',
      'Provare ad aggiungere la voce',
      'Rendere i cambi più fluidi',
    ],
    sections: [
      {
        type: 'text',
        content: 'Oggi dedichiamo tutta la sessione a migliorare Knockin\' on Heaven\'s Door. L\'obiettivo è suonarla dall\'inizio alla fine senza fermarsi.',
      },
      {
        type: 'exercise',
        title: 'Riscaldamento (5 min)',
        content: 'Pratica solo i cambi della canzone (senza ritmo):\nSol→Re→La-→Sol→Re→Do — pennata singola per ogni accordo.\nRipeti 5 volte, accelerando gradualmente.',
      },
      {
        type: 'exercise',
        title: 'Esercizio 1: Pattern #1, 3 volte (8 min)',
        content: 'Suona la canzone intera 3 volte con pattern #1:\n\n1° volta: vai lentissimo, concentrati sui cambi\n2° volta: un po\' più veloce\n3° volta: prova il tempo della canzone originale',
      },
      {
        type: 'exercise',
        title: 'Esercizio 2: Pattern #2 (7 min)',
        content: 'Ora prova con il pattern #2 (giù-su).\n\nSuona la canzone 2 volte con pattern #2.\nL\'energia cambia completamente, vero? Il pattern #2 dà più movimento.',
      },
      {
        type: 'exercise',
        title: 'Esercizio 3: Aggiungi la voce (5 min)',
        content: 'Se ti senti pronto, prova a canticchiare:\n\n"Mama, take this badge off of me"\nSol → Re → La-\n\n"I can\'t use it anymore"\nSol → Re → Do\n\n"Knock knock knockin\' on heaven\'s door"\n\nVai MOLTO piano. Se perdi gli accordi cantando, torna solo agli accordi.',
      },
      {
        type: 'exercise',
        title: 'Esercizio 4: Suona con l\'originale (5 min)',
        content: 'Cerca "Knockin\' on Heaven\'s Door" su YouTube o Spotify.\nMetti la canzone a volume basso e prova a suonare insieme!\n\nNon importa se non sei perfettamente a tempo — è per "sentire" il groove della canzone vera.',
      },
      {
        type: 'tip',
        content: 'Puoi trovare la canzone su YouTube e provare a suonare insieme alla registrazione. È un ottimo modo per tenere il tempo!',
      },
    ],
  },
  {
    id: 13, day: 13, week: 2,
    title: 'Accordi di settima',
    subtitle: 'La7 e Mi7 — il suono blues',
    icon: '🎷',
    duration: '30 min',
    isRestDay: false,
    goals: [
      'Imparare La7 (A7) e Mi7 (E7)',
      'Capire quando si usano',
      'Aggiungerli al nostro vocabolario',
    ],
    sections: [
      {
        type: 'text',
        content: 'Gli accordi di settima hanno un suono "aperto", un po\' bluesy, un po\' sospeso. Sono facilissimi da fare e danno un colore speciale alla musica.',
      },
      {
        type: 'chords',
        title: 'Nuovi accordi',
        content: 'La7 è come La maggiore ma con un dito in meno! Mi7 è come Mi maggiore ma senza un dito. Sono più facili degli accordi base!',
        chordIds: ['A7', 'E7'],
      },
      {
        type: 'exercise',
        title: 'Esercizio 1: Sentire la differenza (5 min)',
        content: 'Suona questi confronti e ascolta la differenza:\n\n• La (A) → pennata → La7 (A7) → pennata → senti la "tensione"?\n• Mi (E) → pennata → Mi7 (E7) → pennata → senti come vuole "risolvere"?\n\nRipeti ogni confronto 5 volte, concentrandoti sull\'orecchio.',
      },
      {
        type: 'exercise',
        title: 'Esercizio 2: Tensione e risoluzione (5 min)',
        content: 'Gli accordi di settima creano "tensione" che vuole "risolvere":\n\n• La7 → Re (D) — senti come La7 "porta" verso Re? (risoluzione!)\n• Mi7 → La (A) — senti come Mi7 "porta" verso La?\n• Mi7 → La- (Am) — funziona anche verso il minore!\n\nSuona ogni coppia 5 volte con pattern #1.',
      },
      {
        type: 'exercise',
        title: 'Esercizio 3: Progressione blues! (10 min)',
        content: 'Il giro di blues base usa solo accordi di settima:\n\nLa7 (4 battute) → Re7 (4 battute) → Mi7 (4 battute) → La7 (4 battute)\n\nSuonalo con pattern #1 per 5 minuti, poi con pattern #2 per 5 minuti.\nNota come suona "diverso" da tutto quello che hai suonato finora!',
        chordIds: ['A7', 'D7', 'E7'],
      },
      {
        type: 'exercise',
        title: 'Esercizio 4: Mescola vecchi e nuovi (5 min)',
        content: 'Prova queste progressioni che mescolano accordi normali e di settima:\n\n• Sol → Do → Re → Mi7 → La- (inizia luminosa, finisce malinconica)\n• La7 → Re → La7 → Mi (blues rock)\n\nSuona con pattern #2.',
      },
      {
        type: 'tip',
        content: 'Gli accordi di settima sono molto usati nel blues e nel rock classico. Li troverai in tantissime canzoni!',
      },
    ],
  },
  {
    id: 14, day: 14, week: 2,
    title: 'Ripasso & soddisfazione',
    subtitle: 'Celebra la fine della settimana 2!',
    icon: '🎉',
    duration: '30 min',
    isRestDay: false,
    goals: [
      'Suonare Knockin\' on Heaven\'s Door dall\'inizio alla fine',
      'Ripassare La7 e Mi7',
      'Celebrare i progressi!',
    ],
    sections: [
      {
        type: 'text',
        content: 'Due settimane complete! Sai già suonare una canzone intera — questo è un traguardo enorme. Oggi ripassa tutto con calma e goditi il suono della tua chitarra.',
      },
      {
        type: 'exercise',
        title: 'Riscaldamento completo (5 min)',
        content: 'La parata di TUTTI gli accordi che conosci (inclusi La7, Mi7, Re7):\nLa → La- → La7 → Mi → Mi- → Mi7 → Re → Re- → Re7 → Do → Sol\n\nUna pennata ciascuno, 2 giri.',
      },
      {
        type: 'challenge',
        title: 'Performance!',
        content: 'Suona Knockin\' on Heaven\'s Door dall\'inizio alla fine, 3 volte di fila:\n1. Prima volta: pattern #1 (solo giù)\n2. Seconda volta: pattern #2 (giù-su)\n3. Terza volta: prova a cantare!',
      },
      {
        type: 'exercise',
        title: 'Giro di blues (5 min)',
        content: 'Suona la progressione blues dal giorno 13:\nLa7 → Re7 → Mi7 → La7\n\nCon pattern #2. Prova a "sentire il groove" — dondola la testa a tempo!',
      },
      {
        type: 'exercise',
        title: 'Test di metà percorso (5 min)',
        content: 'Quanto sei veloce adesso? "Test del minuto" su:\n\n• La- ↔ Mi-: _____ cambi (confronta con giorno 3: _____)\n• Do ↔ Sol: _____ cambi\n• Re ↔ La-: _____ cambi\n\nSe hai migliorato anche solo di 3-4 cambi, sei sulla strada giusta!',
      },
      {
        type: 'exercise',
        title: 'Jam libera (5 min)',
        content: 'Suona quello che vuoi! Qualsiasi combinazione di accordi e pattern.\nSperimenta, divertiti, sorridi. Stai suonando la chitarra!',
      },
    ],
  },

  // ===== WEEK 3: "Verso Wish You Were Here" =====
  {
    id: 15, day: 15, week: 3,
    title: 'Il pattern rock',
    subtitle: 'Lo strumming che cambia tutto',
    icon: '🤘',
    duration: '30 min',
    isRestDay: false,
    goals: [
      'Imparare il pattern #3: il classico del rock',
      'Praticarlo a corde mute',
      'Sentirsi come una rockstar!',
    ],
    sections: [
      {
        type: 'text',
        content: 'Benvenuto alla settimana 3! Oggi impariamo IL pattern di strumming per eccellenza: quello che senti in migliaia di canzoni rock e pop. Una volta che lo padroneggi, puoi suonare praticamente tutto.',
      },
      {
        type: 'strumming',
        title: 'Pattern #3 — Rock',
        content: 'GIÙ - GIÙ - SU - (pausa) - SU - GIÙ - SU\n\nLa pausa è il segreto: la mano continua a muoversi giù-su, ma "manca" le corde sulla pennata giù del terzo colpo. È come se il braccio non si fermasse mai.',
        strummingPattern: ['down', 'down', 'up', 'miss', 'up', 'down', 'up'],
      },
      {
        type: 'exercise',
        title: 'Esercizio 1: Decostruzione del pattern (5 min)',
        content: 'Impariamo il pattern un pezzo alla volta (corde mute):\n\n• Prima: GIÙ - GIÙ — solo i primi 2 colpi. Ripeti 20 volte.\n• Poi: GIÙ - GIÙ - SU — aggiungi il su. Ripeti 20 volte.\n• Poi: GIÙ - GIÙ - SU - (pausa) — la mano va giù ma NON tocca le corde. Ripeti 20 volte.\n• Infine: GIÙ - GIÙ - SU - (pausa) - SU - GIÙ - SU — il pattern completo!',
      },
      {
        type: 'exercise',
        title: 'Esercizio 2: Corde mute, 3 velocità (5 min)',
        content: 'Il pattern completo a corde mute:\n\n• 1 min: Velocità LENTA — conta "GIÙ... GIÙ... SU... aria... SU... GIÙ... SU"\n• 1 min: Velocità MEDIA\n• 1 min: Velocità NORMALE (come in una canzone)\n• 2 min: La mano non si ferma MAI. Fai 2 minuti continui senza pause.',
      },
      {
        type: 'exercise',
        title: 'Esercizio 3: Su un accordo (8 min)',
        content: 'Ora con gli accordi, uno alla volta:\n\n• 2 min: Pattern #3 su Mi- (Em)\n• 2 min: Pattern #3 su La- (Am)\n• 2 min: Pattern #3 su Sol (G)\n• 2 min: Pattern #3 su Do (C)\n\nSe perdi il ritmo, torna alle corde mute per 10 secondi, poi riprova.',
      },
      {
        type: 'exercise',
        title: 'Esercizio 4: Due accordi (5 min)',
        content: 'Primo test di cambio con pattern #3:\n\n• Mi- (1 pattern completo) → La- (1 pattern completo) → ripeti\n\nVai piano! Il cambio avviene dopo il "SU" finale.\nSe riesci, prova anche: La- → Re → ripeti.',
      },
      {
        type: 'tip',
        content: 'Il trucco della "pausa": la mano destra fa sempre il movimento giù-su come un pendolo. Nella pausa, semplicemente non tocca le corde. Il braccio non si ferma!',
      },
    ],
  },
  {
    id: 16, day: 16, week: 3,
    title: 'Pattern rock + accordi',
    subtitle: 'Mettiamo il groove sugli accordi',
    icon: '🎸',
    duration: '35 min',
    isRestDay: false,
    goals: [
      'Applicare il pattern #3 su una progressione rock',
      'Mantenere il groove anche durante i cambi',
      'Suonare Mi-→Sol→Do→Re con il feeling rock',
    ],
    sections: [
      {
        type: 'text',
        content: 'Ieri hai imparato il pattern, oggi lo mettiamo sugli accordi. Questa è la progressione che suonerai in tantissime canzoni rock!',
      },
      {
        type: 'chords',
        title: 'La progressione rock',
        content: 'Mi- (Em) → Sol (G) → Do (C) → Re (D). Ogni accordo dura 1 battuta completa (1 pattern intero).',
        chordIds: ['Em', 'G', 'C', 'D'],
      },
      {
        type: 'strumming',
        title: 'Pattern da usare',
        content: 'Usa il pattern #3 rock. Vai MOLTO piano all\'inizio.',
        strummingPattern: ['down', 'down', 'up', 'miss', 'up', 'down', 'up'],
      },
      {
        type: 'exercise',
        title: 'Esercizio 1: Costruzione progressiva (12 min)',
        content: '• 3 min: Pattern #3 solo su Mi-\n• 3 min: Mi- → Sol (2 accordi, un pattern ciascuno)\n• 3 min: Mi- → Sol → Do (3 accordi)\n• 3 min: Progressione completa Mi- → Sol → Do → Re',
      },
      {
        type: 'exercise',
        title: 'Esercizio 2: Ripetizione senza sosta (8 min)',
        content: 'La progressione completa Mi- → Sol → Do → Re in loop.\n\n8 minuti NON-STOP. Se sbagli un cambio, continua.\nSe perdi il ritmo, riprendi al prossimo accordo.\nNon fermarti MAI.\n\nL\'obiettivo non è la perfezione, è la continuità.',
      },
      {
        type: 'exercise',
        title: 'Esercizio 3: Dinamiche (5 min)',
        content: 'Suona la progressione ma varia il volume:\n\n• 1° giro: PIANO (suona delicato, con poca forza)\n• 2° giro: MEDIO\n• 3° giro: FORTE (suona con energia!)\n• 4° giro: PIANO di nuovo\n\nLe dinamiche sono ciò che rende la musica emozionante!',
      },
      {
        type: 'exercise',
        title: 'Esercizio 4: Confronto 3 pattern (5 min)',
        content: 'La stessa progressione Mi- → Sol → Do → Re con tutti e 3 i pattern:\n\n• 1 giro con pattern #1 (solo giù)\n• 1 giro con pattern #2 (giù-su)\n• 1 giro con pattern #3 (rock)\n\nNota come lo stesso giro di accordi suona completamente diverso con pattern diversi!',
      },
    ],
  },
  {
    id: 17, day: 17, week: 3,
    title: 'Pratica pattern',
    subtitle: 'Consolida i 3 pattern di strumming',
    icon: '🧘',
    duration: '30 min',
    isRestDay: true,
    goals: [
      'Consolidare i 3 pattern di strumming',
      'Provare tutti i pattern sulle sequenze che conosci',
      'Nessun concetto nuovo',
    ],
    sections: [
      {
        type: 'text',
        content: 'Giorno di consolidamento! Hai 3 pattern di strumming a disposizione. Oggi li usi tutti sulle progressioni che preferisci.',
      },
      {
        type: 'strumming',
        title: 'Riepilogo pattern',
        content: 'Pattern #1: GIÙ - GIÙ - GIÙ - GIÙ (semplice)\nPattern #2: GIÙ - SU - GIÙ - SU (alternato)\nPattern #3: GIÙ - GIÙ - SU - (pausa) - SU - GIÙ - SU (rock)',
        strummingPattern: ['down', 'down', 'up', 'miss', 'up', 'down', 'up'],
      },
      {
        type: 'exercise',
        title: 'Esercizio 1: Knockin\' multi-pattern (10 min)',
        content: 'Suona Knockin\' on Heaven\'s Door con tutti e 3 i pattern:\n\n• 3 min: Con pattern #1\n• 3 min: Con pattern #2\n• 4 min: Con pattern #3\n\nQuale versione ti piace di più?',
      },
      {
        type: 'exercise',
        title: 'Esercizio 2: Progressione rock (10 min)',
        content: 'La progressione Mi- → Sol → Do → Re con pattern #3 in loop.\n10 minuti senza fermarsi. Se perdi il ritmo, riprendi senza panico.',
      },
      {
        type: 'exercise',
        title: 'Esercizio 3: Crea la tua canzone (10 min)',
        content: 'Inventa una progressione di 4 accordi e suonala con il pattern che preferisci.\n\nIdee:\n• La- → Do → Sol → Mi- (malinconica)\n• Sol → Mi- → Do → Re (epica)\n• Re → La- → Mi → Sol (drammatica)\n\nScegli quella che ti emoziona di più e suonala per 10 minuti. Se vuoi, canticchia una melodia sopra!',
      },
    ],
  },
  {
    id: 18, day: 18, week: 3,
    title: 'Horse With No Name',
    subtitle: 'Due accordi, tanto feeling',
    icon: '🐴',
    duration: '30 min',
    isRestDay: false,
    goals: [
      'Imparare "Horse With No Name"',
      'Praticare lo strumming su una canzone con 2 soli accordi',
      'Rilassarsi e godersi la musica',
    ],
    sections: [
      {
        type: 'text',
        content: 'Una canzone perfetta per il falò! "A Horse With No Name" degli America usa praticamente solo 2 accordi per tutta la canzone. L\'ideale per concentrarsi sul ritmo e sul feeling.',
      },
      {
        type: 'song',
        title: 'A Horse With No Name',
        content: 'Tutta la canzone alterna tra:\nMi- (Em) e Re6add9*\n\n*Re6add9 si fa come un Re (D) ma con le prime due corde a vuoto. È semplicissimo!\n\nAlterna ogni 2 battute: Mi- (2 battute) → Re6add9 (2 battute) → ripeti.',
        songId: 'horse',
        chordIds: ['Em'],
      },
      {
        type: 'exercise',
        title: 'Esercizio 1: Impara il Re6add9 (3 min)',
        content: 'Il Re6add9 è una variante semplicissima del Re:\n• Posiziona un Re (D) normale\n• Togli il dito dalla 1ª corda (lasciala a vuoto)\n• Togli il dito dalla 2ª corda (lasciala a vuoto)\n• Tieni solo il dito al 2° tasto della 3ª corda\n\nProva il suono — è "aperto" e sognante, perfetto per questa canzone.',
      },
      {
        type: 'exercise',
        title: 'Esercizio 2: Cambio Mi- ↔ Re6add9 (5 min)',
        content: 'Pratica il cambio tra Mi- e Re6add9 con pattern #2:\n\n• Mi- (4 battute giù-su) → Re6add9 (4 battute) → ripeti\n\nÈ un cambio facilissimo perché sono forme molto simili.\nRipeti per 5 minuti senza fermarti.',
      },
      {
        type: 'exercise',
        title: 'Esercizio 3: Prova con i pattern (10 min)',
        content: 'Suona la canzone con diversi pattern:\n\n• 3 min: Con pattern #2 (giù-su) — il classico\n• 3 min: Con pattern #3 (rock) — più energico\n• 4 min: Scegli il tuo preferito e suona rilassato\n\nQuale ti piace di più?',
      },
      {
        type: 'exercise',
        title: 'Esercizio 4: Canta! (7 min)',
        content: 'Questa canzone è perfetta per iniziare a cantare, perché gli accordi sono semplicissimi:\n\n"On the first part of the journey\nI was looking at all the life"\n(Mi- → Re6add9 → Mi- → Re6add9)\n\n"A horse with no name\nIt felt good to be out of the rain"\n\nIl testo è su internet. Suona e canta per 7 minuti!',
      },
      {
        type: 'tip',
        content: 'Questa canzone è perfetta per il falò. Solo 2 accordi, facile da cantare, e tutti la conoscono!',
      },
    ],
  },
  {
    id: 19, day: 19, week: 3,
    title: 'Wish You Were Here — primo contatto',
    subtitle: 'La canzone dei tuoi sogni!',
    icon: '💫',
    duration: '35 min',
    isRestDay: false,
    goals: [
      'Scoprire gli accordi di Wish You Were Here',
      'Imparare la struttura della canzone',
      'Fare il primo giro di accordi',
    ],
    sections: [
      {
        type: 'text',
        content: 'Ci siamo! La canzone che sogni di suonare. La buona notizia? Gli accordi li conosci GIÀ tutti! Do, Re, La-, Sol — li suoni da 2 settimane. Oggi scopriamo come si incastrano nel capolavoro dei Pink Floyd.',
      },
      {
        type: 'chords',
        title: 'Gli accordi della canzone',
        content: 'Tutti accordi che già conosci! La canzone si basa su queste progressioni.',
        chordIds: ['C', 'D', 'Am', 'G'],
      },
      {
        type: 'song',
        title: 'Struttura — Wish You Were Here',
        content: 'Strofa:\nDo (C) → Re (D) → La- (Am) → Sol (G)\nDo (C) → Re (D) → La- (Am) → Sol (G)\n\nRitornello:\nDo (C) → Re (D) → La- (Am) → Sol (G)\n(ripetuto con enfasi diversa)\n\nÈ una struttura semplice che si ripete! La magia sta nel feeling.',
        songId: 'wish',
        chordIds: ['C', 'D', 'Am', 'G'],
      },
      {
        type: 'exercise',
        title: 'Esercizio 1: Prepara i cambi (5 min)',
        content: 'Pratica i cambi specifici della canzone:\n\n• Do → Re: 10 volte (pennata singola ad ogni cambio)\n• Re → La-: 10 volte\n• La- → Sol: 10 volte\n• Sol → Do: 10 volte (per ricominciare il giro)',
      },
      {
        type: 'exercise',
        title: 'Esercizio 2: Primo giro con pattern #1 (8 min)',
        content: 'Il giro della strofa con il pattern #1 (solo giù):\nDo (4 colpi) → Re (4 colpi) → La- (4 colpi) → Sol (4 colpi)\n\nRipeti 10 volte. Non pensare alla velocità, pensa al suono.\nÈ la stessa progressione che hai suonato in altre canzoni!',
      },
      {
        type: 'exercise',
        title: 'Esercizio 3: Giro con pattern #2 (7 min)',
        content: 'Quando il giro con pattern #1 è fluido, prova con pattern #2:\nDo (giù-su × 4) → Re (giù-su × 4) → La- (giù-su × 4) → Sol (giù-su × 4)\n\nRipeti 8 volte.',
      },
      {
        type: 'exercise',
        title: 'Esercizio 4: Ascolta l\'originale (5 min)',
        content: 'Cerca "Wish You Were Here" dei Pink Floyd su YouTube.\n\n• Prima ascolta tutta la canzone (occhi chiusi)\n• Poi riascoltala e prova a seguire gli accordi mentalmente\n• Senti dove cadono Do, Re, La-, Sol?\n\nQuesto ti aiuterà a "sentire" la canzone dentro di te.',
      },
      {
        type: 'tip',
        content: 'Non preoccuparti se non suona ancora come l\'originale. Ogni giorno migliorerai un po\'. Il feeling dei Pink Floyd è fatto di semplicità ed emozione — e tu hai gli strumenti per arrivarci!',
      },
    ],
  },
  {
    id: 20, day: 20, week: 3,
    title: 'Wish You Were Here — strofa',
    subtitle: 'Costruiamo la strofa',
    icon: '🎤',
    duration: '35 min',
    isRestDay: false,
    goals: [
      'Suonare la strofa con fluidità',
      'Provare con il pattern rock',
      'Iniziare a sentire il "groove" della canzone',
    ],
    sections: [
      {
        type: 'text',
        content: 'Oggi ci concentriamo solo sulla strofa. L\'obiettivo è che i cambi diventino naturali e che tu riesca a "sentire" la canzone mentre la suoni.',
      },
      {
        type: 'exercise',
        title: 'Riscaldamento (5 min)',
        content: 'Giro di accordi della canzone SENZA ritmo:\nDo → Re → La- → Sol → Do → Re → La- → Sol\n\nPennata singola per ogni accordo, il più fluido possibile.\nRipeti 5 volte, accelerando gradualmente.',
      },
      {
        type: 'exercise',
        title: 'Esercizio 1: Pattern #1, poi #3 (10 min)',
        content: '• 5 min: Giro di strofa con pattern #1 (giù) — vai lento e sicuro\n• 5 min: Giro di strofa con pattern #3 (rock) — vai piano!\n\nIl pattern #3 dà alla canzone il suo feeling rock acustico.',
      },
      {
        type: 'exercise',
        title: 'Esercizio 2: Ripetizione continua (10 min)',
        content: 'Pattern #3 sulla strofa, 10 minuti NON-STOP:\nDo → Re → La- → Sol → (ricomincia)\n\nSe sbagli, non fermarti. Se perdi il ritmo, riprendi al prossimo Do.\n10 minuti possono sembrare tanti, ma è così che si costruisce la memoria muscolare.',
      },
      {
        type: 'exercise',
        title: 'Esercizio 3: Aggiungi la voce (5 min)',
        content: 'Mentre suoni il giro con pattern #3, prova a canticchiare:\n\n"So, so you think you can tell\nHeaven from hell..."\nDo → Re → La- → Sol\n\n"Blue skies from pain\nCan you tell a green field..."\nDo → Re → La- → Sol\n\nVai MOLTO piano. Perdi il ritmo? Ok, riprendi solo con gli accordi.',
      },
      {
        type: 'exercise',
        title: 'Esercizio 4: Ad occhi chiusi (5 min)',
        content: 'Suona il giro della strofa con pattern #3 AD OCCHI CHIUSI.\n\nSembra impossibile? Provaci! Le tue dita conoscono già la strada.\nSe sbagli, apri gli occhi, riposiziona, chiudi di nuovo.\n\nQuesto esercizio accelera enormemente l\'apprendimento.',
      },
      {
        type: 'tip',
        content: 'Se hai lo smartphone, metti la canzone originale a basso volume e prova a suonare insieme. Non importa se non sei perfettamente a tempo — è per "sentire" il feeling.',
      },
    ],
  },
  {
    id: 21, day: 21, week: 3,
    title: 'Wish You Were Here — pratica',
    subtitle: 'Solidifica la strofa',
    icon: '🔁',
    duration: '30 min',
    isRestDay: false,
    goals: [
      'Ripetere la strofa fino a renderla fluida',
      'Provare a cantare sopra',
      'Nessun concetto nuovo',
    ],
    sections: [
      {
        type: 'text',
        content: 'Oggi dedichiamo tutta la sessione alla strofa di Wish You Were Here. La ripetizione è la madre di tutte le abilità!',
      },
      {
        type: 'exercise',
        title: 'Riscaldamento (3 min)',
        content: '• 1 min: Pattern #3 a corde mute\n• 2 min: Pattern #3 su Mi- → La- → Do → Sol',
      },
      {
        type: 'exercise',
        title: 'Esercizio 1: 15 ripetizioni (12 min)',
        content: 'Suona il giro della strofa:\nDo → Re → La- → Sol\n\nRipetilo almeno 15 volte con il pattern #3 (rock).\n\n• Ripetizioni 1-5: solo accordi, concentrati sulla pulizia\n• Ripetizioni 6-10: canticchia la melodia sopra\n• Ripetizioni 11-15: prova a cantare il testo',
      },
      {
        type: 'exercise',
        title: 'Esercizio 2: Variazione di intensità (8 min)',
        content: 'Suona la strofa con queste variazioni:\n\n• 2 giri: SUSSURRATO — suona piano pianissimo\n• 2 giri: NORMALE — volume medio\n• 2 giri: FORTE — suona con passione!\n• 2 giri: Parti piano e CRESCI gradualmente fino a forte\n\nQuesta è la vera magia della musica: le dinamiche!',
      },
      {
        type: 'exercise',
        title: 'Esercizio 3: Suona con l\'originale (7 min)',
        content: 'Metti "Wish You Were Here" dei Pink Floyd a volume medio.\nSuona INSIEME alla registrazione.\n\nLa canzone inizia con un intro strumentale. Le strofe partono dopo circa 1 minuto.\nDo → Re → La- → Sol — segui gli accordi.\n\nNon importa se non sei perfettamente sincronizzato. L\'importante è sentire il groove insieme ai Pink Floyd!',
      },
      {
        type: 'tip',
        content: 'Fine della settimana 3! Hai già una canzone dei Pink Floyd nel tuo repertorio (quasi). Prenditi un momento per apprezzare quanta strada hai fatto.',
      },
    ],
  },

  // ===== WEEK 4: "Metti tutto insieme" =====
  {
    id: 22, day: 22, week: 4,
    title: 'Wish You Were Here — ritornello',
    subtitle: 'Completiamo la canzone',
    icon: '🎵',
    duration: '35 min',
    isRestDay: false,
    goals: [
      'Imparare il ritornello',
      'Unire strofa e ritornello',
      'Suonare la canzone completa!',
    ],
    sections: [
      {
        type: 'text',
        content: 'Settimana 4 — l\'ultima! Oggi completiamo Wish You Were Here aggiungendo il ritornello. Gli accordi sono gli stessi, cambia l\'intensità.',
      },
      {
        type: 'song',
        title: 'Struttura completa',
        content: 'Intro: Sol (G) — accordo lungo\n\nStrofa 1: Do → Re → La- → Sol (×2)\n"So, so you think you can tell..."\n\nStrofa 2: Do → Re → La- → Sol (×2)\n"Did they get you to trade..."\n\nRitornello: Do → Re → La- → Sol (×2)\n"How I wish, how I wish you were here..."\n(Suona il ritornello con più FORZA e ENERGIA rispetto alla strofa)\n\nStrofa 3: Do → Re → La- → Sol (×2)\n"We\'re just two lost souls..."',
        songId: 'wish',
        chordIds: ['C', 'D', 'Am', 'G'],
      },
      {
        type: 'exercise',
        title: 'Esercizio 1: Il contrasto dinamico (8 min)',
        content: 'Il segreto del ritornello è la DINAMICA:\n\n• 4 min: Suona la strofa PIANO (dolce, delicato)\n• Poi subito il ritornello FORTE (energia, passione!)\n\n"How I wish, how I wish you were here" — questa frase deve ESPLODERE.\n\nPratica il passaggio strofa→ritornello 4 volte.',
      },
      {
        type: 'exercise',
        title: 'Esercizio 2: Struttura completa lenta (10 min)',
        content: 'Suona la canzone intera seguendo la struttura:\n\n1. Intro: Sol (lungo, 8 colpi giù lenti)\n2. Strofa 1: Do→Re→La-→Sol (×2) — piano\n3. Strofa 2: Do→Re→La-→Sol (×2) — medio\n4. Ritornello: Do→Re→La-→Sol (×2) — FORTE\n5. Strofa 3: Do→Re→La-→Sol (×2) — piano di nuovo\n\nRipeti 2 volte. Vai lento.',
      },
      {
        type: 'exercise',
        title: 'Esercizio 3: Con il canto (7 min)',
        content: 'Prova a cantare tutta la canzone mentre suoni:\n\nStrofa: "So, so you think you can tell..."\nRitornello: "How I wish, how I wish you were here..."\nStrofa: "We\'re just two lost souls swimming in a fish bowl..."\n\nNon preoccuparti della perfezione. Goditi il momento!',
      },
      {
        type: 'exercise',
        title: 'Esercizio 4: Suona con la registrazione (5 min)',
        content: 'Metti l\'originale e suona insieme per tutta la canzone.\n\nProva a restare sincronizzato con David Gilmour.\nSe perdi il filo, aspetta l\'inizio della strofa/ritornello successivo e rientra.',
      },
    ],
  },
  {
    id: 23, day: 23, week: 4,
    title: 'Wish You Were Here — pratica completa',
    subtitle: 'Ripeti, ripeti, ripeti',
    icon: '🔄',
    duration: '35 min',
    isRestDay: false,
    goals: [
      'Suonare la canzone intera dall\'inizio alla fine',
      'Migliorare le dinamiche',
      'Provare a cantare e suonare insieme',
    ],
    sections: [
      {
        type: 'text',
        content: 'Oggi suoni Wish You Were Here dall\'inizio alla fine, più volte. Ogni volta cerchi di migliorare qualcosa: i cambi, il volume, il feeling, il canto.',
      },
      {
        type: 'exercise',
        title: 'Riscaldamento (5 min)',
        content: '• Pattern #3 a corde mute per 1 minuto\n• Il giro Do→Re→La-→Sol con pattern #3, 3 volte\n• Pratica il cambio più debole: ___→___ per 1 minuto',
      },
      {
        type: 'exercise',
        title: 'Esercizio 1: Le 3 ripetizioni (15 min)',
        content: '1° passata (5 min): Concentrati solo sugli accordi e il ritmo. Niente voce.\n\n2° passata (5 min): Aggiungi le dinamiche — piano nella strofa, forte nel ritornello. Senti l\'emozione crescere.\n\n3° passata (5 min): CANTA! Non importa se stoni, l\'importante è divertirsi.\n\nOgni passata migliora qualcosa.',
      },
      {
        type: 'exercise',
        title: 'Esercizio 2: Il "live" (5 min)',
        content: 'Suona la canzone come se fossi sul palco:\n\n• Stai in piedi (o seduto come al falò)\n• Inizia con l\'accordo di Sol lungo, guardando il "pubblico" immaginario\n• Suona tutta la canzone senza fermarti MAI\n• Se sbagli, vai avanti. I professionisti fanno lo stesso!\n• Finisci con un Sol lungo e lascia risuonare',
      },
      {
        type: 'exercise',
        title: 'Esercizio 3: Registrati (5 min)',
        content: 'Prendi il telefono e registra te stesso che suoni Wish You Were Here.\n\n1. Registra una esecuzione completa\n2. Riascoltala\n3. Nota 2 cose positive e 1 cosa da migliorare\n\nTra una settimana riascolterai questa registrazione e vedrai quanto sei migliorato!',
      },
      {
        type: 'exercise',
        title: 'Esercizio 4: Ad occhi chiusi (5 min)',
        content: 'L\'ultima sfida: suona Wish You Were Here ad occhi chiusi.\n\nChiudi gli occhi. Respira. Parti con Sol lungo.\nLascia che le dita trovino la strada.\n\nSe le tue dita conoscono il percorso senza guardare, la canzone è veramente "tua".',
      },
    ],
  },
  {
    id: 24, day: 24, week: 4,
    title: 'Intro al fingerpicking',
    subtitle: 'Le dita danzano sulle corde',
    icon: '🤌',
    duration: '30 min',
    isRestDay: false,
    goals: [
      'Scoprire il fingerpicking base',
      'Schema pollice-indice-medio-anulare',
      'Provarlo su La- e Mi-',
    ],
    sections: [
      {
        type: 'text',
        content: 'Fino ad ora hai usato il plettro. Oggi mettiamolo da parte e usiamo le dita! Il fingerpicking dà un suono intimo e caldo, perfetto per le ballad e per il falò.',
      },
      {
        type: 'exercise',
        title: 'Esercizio 1: Posizione della mano (3 min)',
        content: 'Posiziona la mano destra sopra la buca della chitarra:\n\n• Pollice (P): punta verso le corde basse (6, 5, 4)\n• Indice (I): riposa sulla corda 3\n• Medio (M): riposa sulla corda 2\n• Anulare (A): riposa sulla corda 1\n\nOgni dito ha la sua corda "casa". Il polso è leggermente arcuato. Le dita pizzicano verso il palmo.',
      },
      {
        type: 'exercise',
        title: 'Esercizio 2: P-I-M-A su La- (8 min)',
        content: 'Posiziona La- (Am) con la mano sinistra.\n\nSchema base:\nP (5ª corda) → I (3ª) → M (2ª) → A (1ª)\n\nVai MOLTO lento:\n• P... pausa... I... pausa... M... pausa... A... pausa...\n• Ripeti 10 volte lentissimo\n• Poi togli le pause: P-I-M-A-P-I-M-A-P-I-M-A...\n• 8 minuti su La-. Non cambiare accordo.',
      },
      {
        type: 'exercise',
        title: 'Esercizio 3: P-I-M-A su Mi- e Do (8 min)',
        content: '• 4 min: Schema P-I-M-A su Mi- (Em)\n  Il pollice va sulla 6ª corda (più grave del La-)\n\n• 4 min: Schema P-I-M-A su Do (C)\n  Il pollice va sulla 5ª corda\n\nOgni accordo ha un suono diverso con il fingerpicking. Ascolta le differenze!',
      },
      {
        type: 'exercise',
        title: 'Esercizio 4: Cambio con fingerpicking (6 min)',
        content: 'Ora il salto di qualità — fingerpicking CON cambio accordi:\n\n• 3 min: La- (P-I-M-A × 2) → Mi- (P-I-M-A × 2) → ripeti\n• 3 min: La- (P-I-M-A × 2) → Do (P-I-M-A × 2) → Sol (P-I-M-A × 2) → Mi- (P-I-M-A × 2)\n\nIl cambio avviene dopo 2 ripetizioni dello schema (8 note).',
      },
      {
        type: 'exercise',
        title: 'Esercizio 5: Variazione P-I-M-A-M-I (5 min)',
        content: 'Prova questa variazione "a specchio" su La-:\n\nP → I → M → A → M → I → P → I → M → A → M → I...\n\nIl pollice parte, le dita salgono (I-M-A), poi ridiscendono (M-I).\nÈ lo schema usato in moltissime ballad!',
      },
      {
        type: 'tip',
        content: 'Vai MOLTO piano. Il fingerpicking richiede pazienza. È normale che le dita si "confondano" all\'inizio. Con la pratica diventerà naturale.',
      },
    ],
  },
  {
    id: 25, day: 25, week: 4,
    title: 'Wish You Were Here — intro',
    subtitle: 'L\'arpeggio iconico (semplificato)',
    icon: '✨',
    duration: '35 min',
    isRestDay: false,
    goals: [
      'Provare l\'intro semplificato con fingerpicking',
      'Nessuna pressione — è un assaggio',
      'Esplorare un suono nuovo',
    ],
    sections: [
      {
        type: 'text',
        content: 'L\'intro di Wish You Were Here è uno dei più belli della storia del rock. Oggi proviamo una versione semplificata usando il fingerpicking che hai imparato ieri. Non deve essere perfetto — è un\'esplorazione.',
      },
      {
        type: 'exercise',
        title: 'Riscaldamento fingerpicking (5 min)',
        content: 'Schema P-I-M-A su:\n• La- per 1 minuto\n• Mi- per 1 minuto\n• Sol per 1 minuto\n• Do per 1 minuto\n• Lo schema P-I-M-A-M-I su Mi- per 1 minuto',
      },
      {
        type: 'exercise',
        title: 'Esercizio 1: Intro semplificato (10 min)',
        content: 'L\'intro originale è in Mi- → Sol → Mi- → Sol → La-\n\nVersione semplificata:\n1. Mi- (Em): fai P-I-M-A due volte (lento)\n2. Sol (G): fai P-I-M-A due volte\n3. Ripeti Mi- e Sol\n4. La- (Am): fai P-I-M-A due volte come conclusione\n\nIl suono sarà diverso dall\'originale ma cattura lo spirito.\nRipeti l\'intera sequenza 5 volte.',
        chordIds: ['Em', 'G', 'Am'],
      },
      {
        type: 'exercise',
        title: 'Esercizio 2: Intro con P-I-M-A-M-I (8 min)',
        content: 'Prova la stessa sequenza con lo schema "a specchio":\n\n• Mi-: P-I-M-A-M-I (una volta)\n• Sol: P-I-M-A-M-I (una volta)\n• Mi-: P-I-M-A-M-I\n• Sol: P-I-M-A-M-I\n• La-: P-I-M-A-M-I\n\nQuesto schema suona ancora più "fluido" e melodico.',
      },
      {
        type: 'exercise',
        title: 'Esercizio 3: Dall\'intro alla strofa (7 min)',
        content: 'Prova a collegare l\'intro al resto della canzone:\n\n1. Intro fingerpicking: Mi- → Sol → Mi- → Sol → La-\n2. Pausa di 2 secondi\n3. Strofa con strumming: Do → Re → La- → Sol (pattern #3)\n\nIl passaggio da fingerpicking a strumming è il momento più "wow"!\nRipeti 3 volte.',
      },
      {
        type: 'exercise',
        title: 'Esercizio 4: La canzone completa (5 min)',
        content: 'Prova tutta la canzone:\n1. Intro (fingerpicking)\n2. Strofa 1 (strumming piano)\n3. Strofa 2 (strumming medio)\n4. Ritornello (strumming forte!)\n5. Strofa 3 (piano)\n\nQuesta è la VERSIONE COMPLETA. Wow!',
      },
      {
        type: 'tip',
        content: 'Questo è un bonus! Se ti sembra troppo difficile, nessun problema. Sarà un obiettivo per il mese 2. L\'importante è che ti diverti a provare.',
      },
    ],
  },
  {
    id: 26, day: 26, week: 4,
    title: 'Accordi sospesi',
    subtitle: 'Lasus4 e Resus2 — suoni aperti',
    icon: '🌊',
    duration: '30 min',
    isRestDay: false,
    goals: [
      'Imparare Lasus4 (Asus4) e Resus2 (Dsus2)',
      'Capire il suono "sospeso"',
      'Usarli per dare colore alle canzoni',
    ],
    sections: [
      {
        type: 'text',
        content: 'Gli accordi sospesi hanno un suono che sembra "galleggiare". Non sono né maggiori né minori — sono in mezzo. Danno una sensazione di apertura e movimento. Li trovi in tantissime canzoni rock!',
      },
      {
        type: 'chords',
        title: 'Accordi del giorno',
        content: 'Lasus4 (Asus4): come La (A) ma con il mignolo aggiunto. Resus2 (Dsus2): come Re (D) ma più semplice!',
        chordIds: ['Asus4', 'Dsus2'],
      },
      {
        type: 'exercise',
        title: 'Esercizio 1: Suono pulito (5 min)',
        content: 'Posiziona ogni nuovo accordo e verifica il suono:\n\n• Lasus4 (Asus4): pizzica ogni corda — suono pulito?\n• Resus2 (Dsus2): pizzica ogni corda — suono pulito?\n\nPoi suona ciascuno con una pennata giù e ascolta il suono "aperto".',
      },
      {
        type: 'exercise',
        title: 'Esercizio 2: Il gioco del "sus" (8 min)',
        content: 'Prova queste sequenze e ascolta come suonano:\n\n• La (A) → Lasus4 (Asus4) → La (A) — senti il movimento?\n  (ripeti 5 volte con pattern #1)\n\n• Re (D) → Resus2 (Dsus2) → Re (D) — bello, vero?\n  (ripeti 5 volte)\n\n• La (A) → Lasus4 (Asus4) → La (A) → Lasus4 (Asus4)...\n  (continua per 2 minuti — è ipnotico!)',
      },
      {
        type: 'exercise',
        title: 'Esercizio 3: Progressione con i sus (7 min)',
        content: 'Prova queste progressioni che includono gli accordi sospesi:\n\n• Re → Resus2 → Re → La- → Mi- (malinconica e bella)\n• La → Lasus4 → La → Re → Mi (luminosa e aperta)\n• Mi- → Sol → Resus2 → La → Mi- (suona quasi come Wonderwall!)\n\nSuona con pattern #2 o #3.',
      },
      {
        type: 'exercise',
        title: 'Esercizio 4: Wish You Were Here "arricchita" (5 min)',
        content: 'In Wish You Were Here, prova a sostituire alcuni accordi con i sospesi:\n\n• Al posto del secondo La- nel giro, metti Lasus4\n  Do → Re → Lasus4 → Sol\n\n• Oppure alterna: Do → Resus2 → La- → Sol\n\nSenti come cambia il colore? I sospesi aggiungono una sfumatura bellissima.',
      },
      {
        type: 'exercise',
        title: 'Esercizio 5: Fingerpicking sui sus (5 min)',
        content: 'Prova il fingerpicking P-I-M-A sugli accordi sospesi:\n\n• 2 min: P-I-M-A su Lasus4 — ascolta il suono cristallino\n• 2 min: P-I-M-A su Resus2 — suona bellissimo!\n• 1 min: Alterna Lasus4 → Resus2 con fingerpicking',
      },
    ],
  },
  {
    id: 27, day: 27, week: 4,
    title: 'Canzone da falò bonus',
    subtitle: 'Wonderwall oppure Creep — scegli tu!',
    icon: '🔥',
    duration: '35 min',
    isRestDay: false,
    goals: [
      'Imparare una nuova canzone da falò',
      'Ampliare il repertorio',
      'Divertirsi!',
    ],
    sections: [
      {
        type: 'text',
        content: 'Oggi scegli tu! Ti propongo due classiche da falò. Entrambe usano accordi che conosci.',
      },
      {
        type: 'song',
        title: 'Opzione A: Wonderwall (Oasis)',
        content: 'Accordi: Mi- (Em) → Sol (G) → Re (D) → La7sus4*\n*Puoi usare Lasus4 che hai imparato ieri!\n\nStruttura: ripeti questa progressione per strofa e ritornello. Usa il pattern #3 (rock).',
        songId: 'wonderwall',
        chordIds: ['Em', 'G', 'D', 'Asus4'],
      },
      {
        type: 'song',
        title: 'Opzione B: Creep (Radiohead)',
        content: 'Accordi: Sol (G) → Si (B)* → Do (C) → Do- (Cm)*\n*Per Si e Do- usa le versioni semplificate o sostituisci con Sol e Do.\n\nVersione semplificata: Sol (G) → Sol (G) → Do (C) → Do (C)\nUsa il pattern #3 rock.',
        songId: 'creep',
        chordIds: ['G', 'C'],
      },
      {
        type: 'exercise',
        title: 'Esercizio 1: Prepara i cambi (5 min)',
        content: 'Per Wonderwall:\n• Mi- → Sol: 10 volte\n• Sol → Re: 10 volte\n• Re → Lasus4: 10 volte\n• Lasus4 → Mi-: 10 volte\n\nPer Creep:\n• Sol → Do: 10 volte\n• Do → Sol: 10 volte',
      },
      {
        type: 'exercise',
        title: 'Esercizio 2: Il giro base (10 min)',
        content: 'Suona il giro della canzone scelta con pattern #3:\n\nWonderwall: Mi- → Sol → Re → Lasus4 → ripeti\nCreep: Sol → Sol → Do → Do → ripeti\n\n10 minuti in loop. Se sbagli, vai avanti!',
      },
      {
        type: 'exercise',
        title: 'Esercizio 3: Con la voce (8 min)',
        content: 'Wonderwall:\n"Today is gonna be the day\nThat they\'re gonna throw it back to you"\nMi- → Sol → Re → Lasus4\n\nCreep:\n"When you were here before\nCouldn\'t look you in the eye"\nSol → Sol → Do → Do\n\nSuona e canta! Queste sono le canzoni da falò per eccellenza.',
      },
      {
        type: 'exercise',
        title: 'Esercizio 4: Con la registrazione (7 min)',
        content: 'Cerca la canzone scelta su YouTube e suona insieme!\n\nWonderwall è in 4/4 con un ritmo costante — perfetta per il pattern #3.\nCreep ha una dinamica piano/forte (piano nella strofa, forte nel ritornello).',
      },
      {
        type: 'tip',
        content: 'Scegli quella che ti piace di più! L\'importante è divertirsi. Se ne impari una velocemente, prova anche l\'altra!',
      },
    ],
  },
  {
    id: 28, day: 28, week: 4,
    title: 'Pratica repertorio',
    subtitle: 'Suona tutte le tue canzoni',
    icon: '📋',
    duration: '35 min',
    isRestDay: false,
    goals: [
      'Suonare tutte le canzoni imparate',
      'Creare una "scaletta" da falò',
      'Scegliere la tua preferita',
    ],
    sections: [
      {
        type: 'text',
        content: 'Hai un vero repertorio! Oggi suoni tutto quello che sai, come se fossi in concerto al falò. La scaletta è tua — scegli l\'ordine che preferisci.',
      },
      {
        type: 'exercise',
        title: 'Riscaldamento (5 min)',
        content: '• Parata degli accordi: tutti gli accordi che conosci, una pennata ciascuno\n• Pattern #3 a corde mute per 1 minuto\n• Fingerpicking P-I-M-A su La- per 1 minuto',
      },
      {
        type: 'exercise',
        title: 'Esercizio 1: La scaletta completa (20 min)',
        content: 'Suona in quest\'ordine (o cambialo come vuoi):\n\n1. Horse With No Name — per scaldarti (5 min, facile, 2 accordi)\n2. Knockin\' on Heaven\'s Door — un classico (5 min)\n3. Wonderwall / Creep — la tua scelta (5 min)\n4. Wish You Were Here — il gran finale! (5 min)\n\nTra una canzone e l\'altra, fai una pausa di 30 secondi.\nSe sbagli qualcosa, continua! Come in un vero concerto.',
      },
      {
        type: 'exercise',
        title: 'Esercizio 2: La canzone debole (5 min)',
        content: 'Qual è la canzone in cui ti senti meno sicuro?\n\nDedicale 5 minuti di pratica focalizzata:\n• Individua il cambio accordi più difficile\n• Praticalo 20 volte con pennata singola\n• Poi suona la canzone 2 volte intere',
      },
      {
        type: 'exercise',
        title: 'Esercizio 3: Mix di pattern (5 min)',
        content: 'Prova a suonare la stessa canzone con pattern diversi:\n\n• 1ª strofa: pattern #1\n• 2ª strofa: pattern #2\n• Ritornello: pattern #3\n\nCambiare pattern durante la canzone aggiunge varietà ed emozione!',
      },
      {
        type: 'tip',
        content: 'Immaginati davanti al fuoco, con gli amici intorno. Suona come se fossi lì. Non deve essere perfetto — deve essere sentito.',
      },
    ],
  },
  {
    id: 29, day: 29, week: 4,
    title: 'Il grande falò',
    subtitle: 'Simulazione concerto!',
    icon: '🔥',
    duration: '40 min',
    isRestDay: false,
    goals: [
      'Suonare tutte le canzoni di fila',
      'Cantare e suonare',
      'Divertirsi al massimo!',
    ],
    sections: [
      {
        type: 'text',
        content: 'Penultimo giorno! Oggi è il tuo concerto privato. Suona tutto quello che sai, canta, divertiti. Niente deve essere perfetto. L\'unica regola: DIVERTITI.',
      },
      {
        type: 'exercise',
        title: 'Riscaldamento da rockstar (5 min)',
        content: '• Pattern #3 a corde mute, 1 minuto — scalda la mano destra\n• Cerchio degli accordi (tutti!), 2 giri — scalda la mano sinistra\n• Fingerpicking su Mi-, 1 minuto — scalda le dita\n• Il giro Do→Re→La-→Sol con pattern #3, 3 volte',
      },
      {
        type: 'challenge',
        title: 'La sfida finale',
        content: 'Suona il tuo repertorio completo senza fermarti tra una canzone e l\'altra. Se sbagli un cambio, continua. Se perdi il ritmo, riprendi. Come in un vero concerto!\n\nBonus: registrati con il telefono! Tra un mese, riascoltati e vedrai quanti progressi avrai fatto.',
      },
      {
        type: 'exercise',
        title: 'Esercizio 1: Il concerto (20 min)',
        content: 'Scaletta suggerita (puoi cambiare l\'ordine):\n\n1. Horse With No Name (riscaldamento)\n   → pausa 10 sec\n2. Knockin\' on Heaven\'s Door (il classico)\n   → pausa 10 sec\n3. Wonderwall / Creep (il pezzo energico)\n   → pausa 10 sec\n4. Wish You Were Here CON INTRO fingerpicking (il gran finale)\n\nSuona tutto come se fossi al falò con gli amici. Canta!',
      },
      {
        type: 'exercise',
        title: 'Esercizio 2: Test del minuto — di nuovo!',
        content: 'Ricordi il test del minuto del giorno 3? Rifallo con le stesse coppie:\n\n• La- ↔ Mi-: _____ cambi (giorno 3: _____)\n• Do ↔ Sol: _____ cambi (giorno 3: _____)\n• Re ↔ La-: _____ cambi (giorno 3: _____)\n\nConfronta i numeri. Scommetto che sono MOLTO migliorati!',
      },
      {
        type: 'exercise',
        title: 'Esercizio 3: La tua canzone preferita, perfetta (5 min)',
        content: 'Scegli la canzone che ami di più tra quelle che sai.\n\nSuonala 3 volte:\n1° volta: concentrati sulla perfezione tecnica\n2° volta: concentrati sull\'emozione\n3° volta: registrati — questa è la tua miglior performance!\n\nQuesta registrazione sarà il tuo "prima" per il mese 2.',
      },
    ],
  },
  {
    id: 30, day: 30, week: 4,
    title: 'Celebrazione & futuro',
    subtitle: 'Ce l\'hai fatta! E adesso?',
    icon: '🎓',
    duration: '30 min',
    isRestDay: false,
    goals: [
      'Riepilogare tutto quello che hai imparato',
      'Celebrare i tuoi progressi',
      'Scoprire cosa ti aspetta nel mese 2',
    ],
    sections: [
      {
        type: 'text',
        title: 'Congratulazioni!',
        content: '30 giorni fa avevi qualche accordo incerto. Oggi hai un repertorio di 4 canzoni, sai 3 pattern di strumming, conosci il fingerpicking, e sai suonare Wish You Were Here dei Pink Floyd. Questo è un risultato ENORME. Sii fiero di te!',
      },
      {
        type: 'exercise',
        title: 'Esercizio 1: Il test finale (10 min)',
        content: 'Verifica finale — rispondi con sincerità:\n\n✓/✗ So suonare tutti gli accordi base con suono pulito\n✓/✗ So cambiare accordo mantenendo il ritmo\n✓/✗ Conosco 3 pattern di strumming\n✓/✗ So fare il fingerpicking base\n✓/✗ So suonare Knockin\' on Heaven\'s Door\n✓/✗ So suonare Wish You Were Here\n✓/✗ So suonare almeno un\'altra canzone\n✓/✗ Riesco a cantare e suonare allo stesso tempo\n\nSe hai almeno 5 ✓, il mese 1 è un successo clamoroso!',
      },
      {
        type: 'exercise',
        title: 'Esercizio 2: La tua miglior performance (10 min)',
        content: 'Suona Wish You Were Here dall\'inizio alla fine:\n\n1. Intro fingerpicking (Mi- → Sol → Mi- → Sol → La-)\n2. Strofa 1 — piano, con sentimento\n3. Strofa 2 — cresce\n4. Ritornello — FORTE, con passione!\n5. Strofa 3 — torna piano\n6. Sol finale lungo... lascia risuonare...\n\nRegistrati! Questa è la performance da confrontare con il mese 2.',
      },
      {
        type: 'exercise',
        title: 'Esercizio 3: Jam libera celebrativa (5 min)',
        content: 'Gli ultimi 5 minuti sono TUOI.\n\nSuona quello che vuoi. Gli accordi che preferisci. Il pattern che ami. La canzone del cuore.\n\nOppure inventa qualcosa di nuovo. Sperimenta. Divertiti.\n\nLa chitarra è il tuo strumento. Tu sei un chitarrista.',
      },
      {
        type: 'text',
        title: 'Cosa hai imparato in 30 giorni',
        content: '• 12+ accordi in italiano e inglese\n• 3 pattern di strumming (base, alternato, rock)\n• Fingerpicking base\n• Accordi di settima e sospesi\n• 4 canzoni complete\n• La tecnica del dito-perno\n• Come mantenere il ritmo durante i cambi\n• Dinamiche (piano/forte)\n• Come cantare e suonare insieme',
      },
      {
        type: 'text',
        title: 'Anteprima — Mese 2',
        content: 'Ecco cosa ti aspetta il prossimo mese:\n• Power chords — il suono del rock!\n• Palm muting — il "chugging" da headbanging\n• Accordi con barrè — Si-, Fa# e altri\n• Black Hole Sun dei Soundgarden — la tua prossima sfida\n• Smoke on the Water, Come As You Are, e altre canzoni rock\n• Lettura di tablature\n\nMa per ora... goditi il momento. Ce l\'hai fatta!',
      },
    ],
  },
]

export function getLesson(day: number): Lesson | undefined {
  return lessons.find((l) => l.day === day)
}

export function getLessonsByWeek(week: number): Lesson[] {
  return lessons.filter((l) => l.week === week)
}

export const weeks = [
  { id: 1, title: 'Riprendiamo in mano la chitarra', subtitle: 'Fondamenta solide', color: '#22c55e' },
  { id: 2, title: 'Trova il ritmo', subtitle: 'Strumming e prima canzone', color: '#3b82f6' },
  { id: 3, title: 'Verso Wish You Were Here', subtitle: 'Pattern rock e canzoni', color: '#a855f7' },
  { id: 4, title: 'Metti tutto insieme', subtitle: 'Repertorio da falò', color: '#e88a10' },
]
