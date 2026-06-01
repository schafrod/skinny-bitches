/* ============================================================================
   SKINNY BITCHES — die einzige Datei, die du anfassen musst.
   ============================================================================

   WÖCHENTLICHES UPDATE (jeden Donnerstag):
   ---------------------------------------------------------------------------
   1. Trag bei "lastUpdate" das heutige Datum ein (Format: "JJJJ-MM-TT").
   2. Häng bei JEDER Person im "history"-Array EINEN neuen Eintrag UNTEN an:
            { "date": "2026-06-04", "weightKg": 103.4, "km": 5.2 }
        - date     = Datum der Messung
        - weightKg = aktuelles Gewicht in kg (Komma als PUNKT: 103.4 nicht 103,4)
        - km       = total gelaufene Kilometer bis und mit heute (kumuliert!)
   3. Speichern, committen, pushen. Fertig. Der Rest rechnet sich von selbst:
        - BMI                -> aus Grösse + neuestem Gewicht
        - Fortschritt        -> neuestes Gewicht minus Startgewicht
        - Kurven & Ranking   -> aus der ganzen history

   NICHT anfassen musst du: BMI, Differenzen, Charts, Hall of Shame.
   Die Maschine im Hintergrund frisst die Zahlen und kotzt die Wahrheit aus.

   ⚠️  ACHTUNG: Alle Zahlen unten sind PLATZHALTER (frei erfunden, plausibel).
        Ersetz sie durch die echten Werte, sobald du sie hast.
   ============================================================================ */

window.SKINNY = {

  // Datum des letzten Updates (erscheint im Footer als "Stand: ...")
  lastUpdate: "2026-06-01",

  // Die Teststrecke. ⚠️ km & Höhenmeter sind Platzhalter — echte Werte eintragen.
  route: {
    name: "Ogi-Weg",
    laenge_km: 5.2,        // ⚠️ PLATZHALTER: Länge einer Runde in km
    hoehenmeter: 180,      // ⚠️ PLATZHALTER: Höhenmeter pro Runde
    start: "Boltigen"
  },

  // Die vier. role: "trainee" (die Dicken) | "coach" (die Schlanken).
  // weightTrend: "down" = Ziel abnehmen | "up" = soll zunehmen (Mikas Kilo-Erbe).
  people: [

    /* ----- DIE DICKEN (Trainees) ----- */
    {
      id: "christian",
      name: "Christian Schafroth",          // ⚠️ Name korrekt?
      nick: "Der Copywriter mit Hubraum",   // ⚠️ Spitzname frei wählbar
      role: "trainee",
      weightTrend: "down",
      heightCm: 178,                         // ⚠️ PLATZHALTER
      birthYear: 1985,                       // ⚠️ PLATZHALTER (Jahrgang)
      bio: "Tippt schneller, als er rennt. Sein BMI hatte mehr Hubraum als der Rest des Tals — bis zu diesem Montag.",
      // history: ältester Eintrag zuoberst, neuester zuunterst.
      history: [
        { date: "2026-06-01", weightKg: 104.0, km: 5.2 }   // ⚠️ PLATZHALTER (1. Lauf)
      ]
    },
    {
      id: "severin",
      name: "Severin Nachname",              // ⚠️ Nachname fehlt mir
      nick: "Die zweite Hälfte des Herzinfarkt-Duos",  // ⚠️ Spitzname frei wählbar
      role: "trainee",
      weightTrend: "down",
      heightCm: 183,                         // ⚠️ PLATZHALTER
      birthYear: 1988,                       // ⚠️ PLATZHALTER
      bio: "Trägt mehr Gewicht mit sich rum als ein Bergbauer Heu im August. Will da runter. Wir helfen nach.",
      history: [
        { date: "2026-06-01", weightKg: 112.0, km: 5.2 }   // ⚠️ PLATZHALTER
      ]
    },

    /* ----- DIE COACHES ----- */
    {
      id: "lars",
      name: "Lars Klossner",
      nick: "Mr. Sexybless",
      role: "coach",
      weightTrend: "down",
      heightCm: 181,                         // ⚠️ PLATZHALTER
      birthYear: 1992,                       // ⚠️ PLATZHALTER
      bio: "Zweitletzter Sohn eines Bergbauern. Hat das Formhalten im steilen Gelände gelernt, lang bevor es Fitness-Apps gab. Allseits begehrt, selten zu fassen.",
      history: [
        { date: "2026-06-01", weightKg: 74.0, km: 5.2 }    // ⚠️ PLATZHALTER
      ]
    },
    {
      id: "mika",
      name: "Mika Klossner",
      nick: "Milf-Hunter No. 1",
      role: "coach",
      weightTrend: "up",   // erbt die Kilos der anderen — seine Kurve darf steigen
      heightCm: 179,                         // ⚠️ PLATZHALTER
      birthYear: 1995,                       // ⚠️ PLATZHALTER
      bio: "Boltigens berüchtigtster Bruder. Ist dabei, um die verlorenen Kilos der anderen zu erben und endlich ein zweites Hobby neben der Trinkerei zu haben.",
      history: [
        { date: "2026-06-01", weightKg: 70.0, km: 5.2 }    // ⚠️ PLATZHALTER
      ]
    }

  ]
};
