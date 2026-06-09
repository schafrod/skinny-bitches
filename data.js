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

   MONTAG (Lauf) vs. DONNERSTAG (Wägung): An einem reinen Lauftag (Mo) wird NICHT
   gewogen — dann nur einen Eintrag MIT km, OHNE weightKg machen, z.B.
   { date: "2026-06-08", km: 6.20 }. So entsteht ein km-Punkt, aber kein falscher
   Wäge-Punkt in der Gewichtskurve. Am Donnerstag normal weightKg + km.

   LOGBUCH: Nach jedem Lauf (Mo) und jeder Wägung (Do) unten im "log"-Array EINEN
   Eintrag anhängen: { date: "JJJJ-MM-TT", typ: "lauf" | "waage", text: "Kommentar" }.
   Der neueste Eintrag erscheint auf der Seite zuoberst.

   STAND DER ZAHLEN: Echte Werte, Stand 4.6.2026 (erste Wägung).
   ============================================================================ */

window.SKINNY = {

  // Datum des letzten Updates (erscheint als "Stand: ...")
  lastUpdate: "2026-06-09",

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
        { date: "2026-06-04", weightKg: 164.1, km: 2.79 },
        // 8.6. Skinny Bitch Monday: Anaconda-Loop (3.41 km) solo gelaufen, keine Wägung -> nur km
        { date: "2026-06-08", km: 6.20 },
        // 9.6. Skinny Bitch Tuesday: Ogi + Anaconda-Loop (+3.41 km)
        { date: "2026-06-09", km: 9.61 }
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
        { date: "2026-06-04", weightKg: 148.5, km: 4.18 },
        // 9.6. Ogi + Anaconda-Loop (+3.41 km)
        { date: "2026-06-09", km: 7.59 }
      ]
    },

    /* ----- DIE COACHES ----- */
    {
      id: "lars",
      photo: "assets/lars.jpg",
      name: "Lars",
      nick: "Mr. Sexybless",
      role: "coach",
      weightTrend: "up",   // erbt jetzt auch Kilos von Chrigu & Severin
      heightCm: 176,
      birthYear: 1999,
      bio: "Zweitletzter Sohn eines Bergbauern. Hat das Formhalten im steilen Gelände gelernt, lang bevor es Fitness-Apps gab. Allseits begehrt, selten zu fassen.",
      history: [
        { date: "2026-06-01", weightKg: 84.5, km: 2.79 },
        { date: "2026-06-04", weightKg: 84.1, km: 2.79 },
        // 9.6. Ogi + Anaconda-Loop (+3.41 km)
        { date: "2026-06-09", km: 6.20 }
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
      estimated: true,   // keine Waage — Gewicht geschätzt
      bio: "Boltigens berüchtigtster Bruder. Erbt die Kilos der anderen, statt selber welche zu lassen — und hat endlich ein Zweithobby. Beim Auftakt fehlte er; die Kilometer holt er nach.",
      // am 1.6. gewogen, aber nicht mitgelaufen -> 0 km
      history: [
        { date: "2026-06-01", weightKg: 81.0, km: 0 },
        { date: "2026-06-04", weightKg: 81.2, km: 0 },
        // 9.6. erster Lauf (Mikls Debüt): Ogi + Anaconda-Loop (+3.41 km)
        { date: "2026-06-09", km: 3.41 }
      ]
    }

  ],

  // ===== LOGBUCH ===== neuester Eintrag erscheint auf der Seite zuoberst.
  // typ: "lauf" (Montag) | "waage" (Donnerstag). text = dein Kommentar.
  log: [
    {
      date: "2026-06-01",
      typ: "lauf",
      text: "Auftakt. Erste Runde Ogi-Weg. Severin legt gleich anderthalb Runden vor - dieses Tier! Coach Lars kennt keine Gnade, lässt die Dicken hinter sich und kümmert sich nebenbei um den Weg-Unterhalt. Zudem missbraucht er seine Hinterherläufer zur statischen Kontrolle der Brüggleni. Sie halten dem Gewicht stand (zumindest besser als die Kniescheiben der Herzbuben). Mika fehlt natürlich, die Kilometer bleibt er schuldig (in Flüssigeinheiten). Startgewichte sind im Kasten, die Waage weint bittere Tränen."
    },
    {
      date: "2026-06-04",
      typ: "waage",
      text: "Erste Wägung, erste Wahrheit. Chrigu lässt 1,2 Kilo im Tal. Severin ein halbes. Lars meldet 84.1, frisch nach dem Stuhlgang gemessen. Und Mika? Erbt brav: +0,2. Wobei er sein Gewicht nur schätzen kann. Er hat noch keine Waage. Es läuft. Im wahrsten Sinn noch nicht, aber es läuft."
    },
    {
      date: "2026-06-08",
      typ: "lauf",
      text: "War ja klar. Nach einem guten Start, knallte die Unverbindlichkeit der Generation Z bereits voll rein. Rocket-Man musste in die Feuerwehr, obschon nichts brannte. Lars musste zur Theaterprobe, obschon sein ganzes Leben bereits ein verdammtes Theater ist. Mikl war irritiert ab der Unstetigkeit und vertagte das Training auf Dienstag.\n\nSo stand die pummelige Waldfee ganz allein in der Schinti als es anfing zu Nieseln. Da Fett wasserabweisend und der Kessel bereits eingefeuert war, begab sich El Loco-Gordo heute alleine auf den Pfad der Pein. Vielleicht auch besser so. Dann blieb genug Zeit um sich den Unterhaltsarbeiten von Coach Lars zu widmen. Wie zu erwarten war sein Tagwerk mangelhaft. Überall Bäume auf der Strecke und das Sägemehl hat man auch einfach liegen lassen (pfui, und das im Wald!). Der eigentliche Upfuck kam aber später.\n\nDer Dickste entschied sich nämlich zu Strebern, um das KM-Defizit auf Severin zu verringern und hat dazu eine Side-Quest freigeschaltet. Auf dem Rückweg bog er dazu auf den kaum belaufenen Helsana-Trails im Volksmund auch Anaconda-Loop genannt, ab. Hier sind die Schlangen XXL, alles ist überwuchert wie am Amazonas und es geht vorerst pfyffegredi der Simme entlang. Das hier eine Bestie sein Unwesen treibt ist unbestritten. Bereits nach ein paar Schritten stolperte der Plattfuss über eine verhützte Krähe, ein paar Meter weiter lag eine tote Maus auf der Piste. Schlechtes Omen und zwar zurecht. Denn es folgte noch der steile Treppen-Aufstieg zurück auf den Hauptpfad oben in der Todeszone. Die Luft scheint wahrlich dünn, wenn man dort oben ankommst. Gordo verfluchte Brügger's Max, der der Helsana damals half, diesen Weg im Namen der Volksgesundheit in den Waldboden zu Pickeln. Das fühlte sich nicht gesund, sondern nach dem 1. Herzinfarkt an. Das mag für 60kg MOB-Lokführer gehen, aber nicht wenn du 160kg Büro-Polster den Stutz hochschieben musst. Ein leichtes Opfer für eine 5-Meter-Anaconda. Aber sie liess sich heute nicht blicken. Hatte bestimmt bereits einen magersüchtigen Ultraläufer verzehrt. Die Proteinriegel in deren Rucksack halten schliesslich auch ein paar Tage satt.",
      photoDir: "assets/runs/2026-06-08",
      photos: [
        { file: "baum-auf-strecke-1", caption: "Baum auf der Strecke — Coach Lars' Tagwerk, mangelhaft." },
        { file: "baum-auf-strecke-2", caption: "Und gleich der nächste Baum." },
        { file: "saegemehl", caption: "Sägemehl, einfach liegen gelassen. Pfui, und das im Wald!" },
        { file: "die-idylle-truegt", caption: "Die Idylle trügt: pfyffegredi der Simme entlang, überwuchert wie am Amazonas." },
        { file: "tote-kraehe", caption: "Verhützte Krähe. Schlechtes Omen — und zwar zurecht." },
        { file: "tote-maus", caption: "Tote Maus auf der Piste. Omen Nummer zwei." },
        { file: "treppenaufstieg", caption: "Der steile Treppen-Aufstieg in die Todeszone." },
        { file: "red-bull-meldet-euch", caption: "Red Bull, meldet euch!" }
      ]
    },
    {
      date: "2026-06-09",
      typ: "lauf",
      text: "Skinny Bitch Tuesday: Mikl war das erste Mal dabei und erschien im olympischen Trainingsjäggli, das er in Bormio beim Jassen gewonnen hat - wenn's was nützt. Lars „die Lücke“ Klossner — die Zahnlücke versucht er auf dem Foto zu vereiteln — kassierte von Fat Chris eine Abreibung für die Unterhaltsbüetz von gestern: Bäume quer über der Strecke, das Sägemehl einfach liegen gelassen. Diesmal behob er die Mängel im Vorbeigang, notabene ausserhalb der Arbeitszeit (Vorschlag zur Ehrung verdienter Gemeindebürger ist raus).\n\nEingeschüchtert vom Gepruste des Ältesten fassten die Coaches einen Plan: den Defibrillator vor dem Volg klauen und auf halber Strecke beim Bänkli montieren. In der Bahnhofstrasse braucht's ihn eh nicht — der offenen Feierabend-Szene dort fehlt nichts ausser Stühle und ein Stammtisch.\n\nAbschnitt des Tages: die „Riviera“, vom Dicken angepriesen, als plane er ein Trump-Resort. In Wahrheit sind's rund 50 Meter direkt an der Simme — ideal zum Fische füttern oder karisieren.\n\nSportlich teilte sich Rocket-Man die Kräfte ein und überrollte Gordo nach Punkten. Der war so unendlich blöd, den anderen ausgerechnet den Anaconda-Loop als Extra anzudrehen — den Friedhof der Kuscheltiere, den er tags zuvor schon solo gemacht hatte. Nach dieser Tortur hätte das 3,5-Tönnerli einen Regenerationstag verdient gehabt; prompt ging ihm im steilen Treppen-Aufstieg zurück in die Todeszone die Puste aus. Er jammerte, die wässerigen Beine seien viel zu schwer. Mikl bemerkte, das seien auch Ueli Stecks letzte Worte gewesen — und die einzige Todeszone sei das Viszeralfett zwischen den Innereien des adipösen Lappens.\n\nDafür wusste der Ernährungsberater, was das Duo-Herzinfarkt nach dem Drill braucht: 8 Dosen White Claw Hard Seltzer auf seinen Nacken. Damit wäre der Gesöff-Partner aufgeboten (ruft an, wir brauchen euch). Low-Carb-Alkohol ist das Einzige, was er uns noch durchgehen lässt — Bier hat uns schliesslich dick gemacht. Und Cheeseburger. Verdammte Cheeseburger. Am Donnerstag sagt die Waage, ob's ein Fehler war. Möge uns Ronald MaDonald beistehen.",
      photoDir: "assets/runs/2026-06-09",
      photos: [
        { file: "die-cruee-komplett", caption: "Die Crüe — ausnahmsweise komplett." },
        { file: "white-claw-ruft-uns-an", caption: "White Claw, ruft uns an!" }
      ]
    }
  ]
};
