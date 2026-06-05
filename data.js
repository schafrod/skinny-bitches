/* ============================================================================
   SKINNY BITCHES — die einzige Datei, die du anfassen musst.
   ============================================================================

   WÖCHENTLICHES UPDATE (jeden Donnerstag):
   ---------------------------------------------------------------------------
   1. Trag bei "lastUpdate" das heutige Datum ein (Format: "JJJJ-MM-TT").
   2. Häng bei JEDER Person im "history"-Array UNTEN EINEN neuen Eintrag an:
            { date: "2026-06-04", weightKg: 163.1, km: 5.58 }
        - date     = Datum der Messung
        - weightKg = aktuelles Gewicht in kg (Komma als PUNKT: 163.1 nicht 163,1)
        - km       = TOTAL gelaufene Kilometer bis und mit heute (kumuliert!)
   3. Speichern, committen, pushen. Fertig. Der Rest rechnet sich von selbst:
        - BMI                -> aus Grösse + neuestem Gewicht
        - Fortschritt        -> neuestes Gewicht minus Startgewicht
        - Kurven & Ranking   -> aus der ganzen history

   KILOMETER-LOGIK: alle laufen dieselbe Runde (2,79 km). Eine Runde = +2.79.
   (Severin lief am 1.6. ausnahmsweise 1,5 Runden = 4.18 km.)

   LOGBUCH: Nach jedem Lauf (Mo) und jeder Wägung (Do) unten im "log"-Array EINEN
   Eintrag anhängen: { date: "JJJJ-MM-TT", typ: "lauf" | "waage", text: "Kommentar" }.
   Der neueste Eintrag erscheint auf der Seite zuoberst.

   STAND DER ZAHLEN: Echte Werte, Stand 4.6.2026 (erste Wägung).
   ============================================================================ */

window.SKINNY = {

  // Datum des letzten Updates (erscheint als "Stand: ...")
  lastUpdate: "2026-06-04",

  // Die Teststrecke. Quelle: SchweizMobil-Track 372593981 ("Skinny-Bitch-Track").
  route: {
    name: "Ogi-Weg",          // lokaler Name; offiziell "Skinny-Bitch-Track"
    laenge_km: 2.79,          // eine Runde (2787 m)
    hoehenmeter: 159,         // Höhenmeter Aufstieg pro Runde
    hoehe_max: 855,           // höchster Punkt (m ü. M.)
    orte: ["Schinti", "Boltigen", "Schinti"],  // Rundkurs: Start = Ziel = Schinti, via Boltigen
    url: "https://schweizmobil.ch/de/tour/372593981"   // Strecke auf SchweizMobil
  },

  // Die vier. role: "trainee" (die Dicken) | "coach" (die Schlanken).
  // weightTrend: "down" = abnehmen | "up" = zunehmen (Mikas Kilo-Erbe).
  people: [

    /* ----- DIE DICKEN (Trainees) ----- */
    {
      id: "christian",
      photo: "assets/christian.jpg",
      name: "Chrigu",
      nick: "El Gordo",
      role: "trainee",
      weightTrend: "down",
      heightCm: 187,
      birthYear: 1983,
      bio: "El Gordo tippt schneller, als er rennt. Sein BMI hat mehr Hubraum als das halbe Tal — noch.",
      // history: ältester Eintrag zuoberst, neuester zuunterst.
      history: [
        { date: "2026-06-01", weightKg: 165.3, km: 2.79 },
        { date: "2026-06-04", weightKg: 164.1, km: 2.79 }
      ]
    },
    {
      id: "severin",
      photo: "assets/severin.jpg",
      name: "Severin",
      nick: "Rocket-Man",
      role: "trainee",
      weightTrend: "down",
      heightCm: 185,
      birthYear: 1998,
      bio: "Nennt sich Rocket-Man und lief am ersten Montag gleich anderthalb Runden. Die Zündstufe ist gestartet.",
      history: [
        // 1,5 Runden am 1.6. -> 2.79 × 1.5 = 4.18 km
        { date: "2026-06-01", weightKg: 149.0, km: 4.18 },
        { date: "2026-06-04", weightKg: 148.5, km: 4.18 }
      ]
    },

    /* ----- DIE COACHES ----- */
    {
      id: "lars",
      photo: "assets/lars.jpg",
      name: "Lars",
      nick: "Mr. Sexybless",
      role: "coach",
      weightTrend: "down",
      heightCm: 176,
      birthYear: 1999,
      bio: "Zweitletzter Sohn eines Bergbauern. Hat das Formhalten im steilen Gelände gelernt, lang bevor es Fitness-Apps gab. Allseits begehrt, selten zu fassen.",
      history: [
        { date: "2026-06-01", weightKg: 84.5, km: 2.79 },
        { date: "2026-06-04", weightKg: 84.1, km: 2.79 }
      ]
    },
    {
      id: "mika",
      photo: "assets/mika.jpg",
      name: "Mika",
      nick: "Mother²-Mikl",
      role: "coach",
      weightTrend: "up",   // erbt die Kilos der anderen — seine Kurve darf steigen
      heightCm: 182,
      birthYear: 1997,
      bio: "Boltigens berüchtigtster Bruder. Erbt die Kilos der anderen, statt selber welche zu lassen — und hat endlich ein Zweithobby. Beim Auftakt fehlte er; die Kilometer holt er nach.",
      // am 1.6. gewogen, aber nicht mitgelaufen -> 0 km
      history: [
        { date: "2026-06-01", weightKg: 81.0, km: 0 },
        { date: "2026-06-04", weightKg: 81.2, km: 0 }
      ]
    }

  ],

  // ===== LOGBUCH ===== neuester Eintrag erscheint auf der Seite zuoberst.
  // typ: "lauf" (Montag) | "waage" (Donnerstag). text = dein Kommentar.
  log: [
    {
      date: "2026-06-01",
      typ: "lauf",
      text: "Auftakt. Erste Runde Ogi-Weg, der Schinti hoch — Severin gibt gleich anderthalb Runden, der Rest schnauft wie alte Lokomotiven. Mika fehlt (natürlich), die Kilometer bleibt er schuldig. Startgewichte sind im Kasten, die Waage hat gelacht."
    },
    {
      date: "2026-06-04",
      typ: "waage",
      text: "Erste Wägung, erste Wahrheit. Chrigu lässt 1,2 Kilo im Tal — sauber. Severin ein halbes. Lars meldet 84.1, frisch nach dem Stuhlgang gemessen, jedes Gramm zählt. Und Mika? Erbt brav: +0,2. Es läuft. Im wahrsten Sinn noch nicht, aber es läuft."
    }
  ]
};
