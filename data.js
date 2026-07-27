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
   Eintrag anhängen:
     { date: "JJJJ-MM-TT", typ: "lauf" | "waage", title: "Knappe Überschrift", text: "Kommentar" }.
   Der neueste Eintrag erscheint auf der Seite zuoberst UND ist als Einziger
   aufgeklappt; die älteren sind zugeklappt (man sieht Datum + Tag + title).
   Darum bei JEDEM Eintrag einen kurzen, knackigen "title" setzen (3–6 Wörter).

   STAND DER ZAHLEN: Echte Werte, Stand 4.6.2026 (erste Wägung).
   ============================================================================ */

window.SKINNY = {

  // Datum des letzten Updates (erscheint als "Stand: ...")
  lastUpdate: "2026-07-27",

  // Die Teststrecke. Quelle: SchweizMobil-Track 372593981 ("Skinny-Bitch-Track").
  route: {
    name: "Ogi-Weg",          // lokaler Name; offiziell "Skinny-Bitch-Track"
    laenge_km: 2.79,          // eine Runde (2787 m)
    hoehenmeter: 159,         // Höhenmeter Aufstieg pro Runde
    hoehe_max: 855,           // höchster Punkt (m ü. M.)
    orte: ["Schinti", "Boltigen", "Schinti"],  // Rundkurs: Start = Ziel = Schinti, via Boltigen
    url: "https://schweizmobil.ch/de/tour/372593981",  // Strecke auf SchweizMobil
    // Erweiterte Runde: Ogi-Weg + Helsana-Trails der Simme entlang ("Anaconda-Loop")
    anaconda: {
      laenge_km: 3.41,
      hoehenmeter: 200,        // aus SchweizMobil-API (totalup 199.9)
      url: "https://schweizmobil.ch/de/tour/1341889130"
    }
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
      bio: "El Gordo tippt schneller, als er rennt. Sein BMI hat mehr Hubraum als der Damen-Turnverein zusammen und JouJoux-Chips frisst er samt Spielzeug.",
      // history: ältester Eintrag zuoberst, neuester zuunterst.
      history: [
        { date: "2026-06-01", weightKg: 165.3, km: 2.79 },
        { date: "2026-06-04", weightKg: 164.1, km: 2.79 },
        // 8.6. Skinny Bitch Monday: Anaconda-Loop (3.41 km) solo gelaufen, keine Wägung -> nur km
        { date: "2026-06-08", km: 6.20 },
        // 9.6. Skinny Bitch Tuesday: Ogi + Anaconda-Loop (+3.41 km)
        { date: "2026-06-09", km: 9.61 },
        // 11.6. Wägung (kein Lauf -> km gleich)
        { date: "2026-06-11", weightKg: 164.7, km: 9.61 },
        // 15.6. Skinny Bitch Monday: nur Ogi-Weg (kein Anaconda) -> +2.79, ohne Lars/Mika
        { date: "2026-06-15", km: 12.40 },
        // 17.6. Cheat-Day-Lauf: Chrigu solo, Ogi-Weg -> +2.79
        { date: "2026-06-17", km: 15.19 },
        // 18.6. Wägung (kein Lauf -> km gleich): grosser Sprung dank Schleichlauf
        { date: "2026-06-18", weightKg: 160.8, km: 15.19 },
        // 22.6. Skinny Bitch Monday: Ogi-Weg mit Severin -> +2.79
        { date: "2026-06-22", km: 17.98 },
        // 23.6. Ogi-Weg (Anaconda-Treppe one-way zum Einstieg, kein Loop) -> +2.79
        { date: "2026-06-23", km: 20.77 },
        // 25.6. Wägung + Lauf am selben Tag: durchbricht die 160er-Marke, Ogi-Weg (+2.79)
        { date: "2026-06-25", weightKg: 159.6, km: 23.56 },
        // 29.6. Skinny Bitch Monday: Ogi-Weg -> +2.79
        { date: "2026-06-29", km: 26.35 },
        // 30.6. Chrigu solo, Ogi-Weg -> +2.79
        { date: "2026-06-30", km: 29.14 },
        // 1.7. Chrigu solo, Anaconda-Loop -> +3.41
        { date: "2026-07-01", km: 32.55 },
        // 2.7. Wägung: trotz Strebern wieder auf 160,0 (+0.4)
        { date: "2026-07-02", weightKg: 160.0, km: 32.55 },
        // 6.7. Skinny Bitch Monday: grosse Runde inkl. Anaconda-Loop -> +3.41
        { date: "2026-07-06", km: 35.96 },
        // 8.7. Chrigu solo, grosse Runde (Ogi + Anaconda-Loop) -> +3.41 (Header bleibt auf 6.7.)
        { date: "2026-07-08", km: 39.37 },
        // 9.7. Wägung: arschknapp wieder unter 160
        { date: "2026-07-09", weightKg: 159.8, km: 39.37 },
        // 13.7. Skinny Bitch Monday: grosse Runde inkl. Anaconda-Loop -> +3.41
        { date: "2026-07-13", km: 42.78 },
        // 15.7. Chrigu solo, grosse Runde (Ogi + Anaconda-Loop) -> +3.41 (Header bleibt auf 13.7.)
        { date: "2026-07-15", km: 46.19 },
        // 16.7. Wägung: wieder über der Schallmauer (+0.7)
        { date: "2026-07-16", weightKg: 160.5, km: 46.19 },
        // 20.7. Skinny Bitch Monday: volle Hütte, grosse Runde inkl. Anaconda-Loop -> +3.41
        { date: "2026-07-20", km: 49.60 },
        // 23.7. Wägung: wieder unter der Schallmauer, Bestwert seit Start
        { date: "2026-07-23", weightKg: 159.5, km: 49.60 },
        // 27.7. Skinny Bitch Monday: Trail mit Anaconda-Loop -> +3.41
        { date: "2026-07-27", km: 53.01 }
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
      bio: "Wird Rocket-Man genannt ohne Grund. Streift wie Balu durch den Dschungel, ist nicht aus dem Tritt zu bringen und seine Augenfarbe – hat noch kein Mensch gesehen.",
      history: [
        // 1,5 Runden am 1.6. -> 2.79 × 1.5 = 4.18 km
        { date: "2026-06-01", weightKg: 149.0, km: 4.18 },
        { date: "2026-06-04", weightKg: 148.5, km: 4.18 },
        // 9.6. Ogi + Anaconda-Loop (+3.41 km)
        { date: "2026-06-09", km: 7.59 },
        { date: "2026-06-11", weightKg: 148.5, km: 7.59 },
        // 15.6. nur Ogi-Weg -> +2.79
        { date: "2026-06-15", km: 10.38 },
        // 18.6. Wägung (kein Lauf -> km gleich)
        { date: "2026-06-18", weightKg: 147.5, km: 10.38 },
        // 22.6. Skinny Bitch Monday: Ogi-Weg mit Chrigu -> +2.79
        { date: "2026-06-22", km: 13.17 },
        // 23.6. Ogi-Weg -> +2.79
        { date: "2026-06-23", km: 15.96 },
        // 25.6. Wägung
        { date: "2026-06-25", weightKg: 147.3, km: 15.96 },
        // 29.6. Ogi-Weg -> +2.79
        { date: "2026-06-29", km: 18.75 },
        // 2.7. Wägung
        { date: "2026-07-02", weightKg: 147.2, km: 18.75 },
        // 6.7. grosse Runde inkl. Anaconda-Loop -> +3.41
        { date: "2026-07-06", km: 22.16 },
        // 9.7. Wägung: +0.3 — die Ferien-Ausrede zieht Speck an
        { date: "2026-07-09", weightKg: 147.5, km: 22.16 },
        // 13.7. grosse Runde inkl. Anaconda-Loop -> +3.41
        { date: "2026-07-13", km: 25.57 },
        // 16.7. Wägung: nochmals +0.1
        { date: "2026-07-16", weightKg: 147.6, km: 25.57 },
        // 20.7. grosse Runde inkl. Anaconda-Loop -> +3.41
        { date: "2026-07-20", km: 28.98 },
        // 23.7. Wägung: aufs Gramm wie letzte Woche
        { date: "2026-07-23", weightKg: 147.6, km: 28.98 },
        // 27.7. ordinäre Runde (bei Kräften bleiben für München) -> +2.79
        { date: "2026-07-27", km: 31.77 }
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
        { date: "2026-06-09", km: 6.20 },
        { date: "2026-06-11", weightKg: 83.7, km: 6.20 },
        // 18.6. Wägung: tritt weiter auf der Stelle (erbt nichts)
        { date: "2026-06-18", weightKg: 83.7, km: 6.20 },
        // 23.6. erster Lauf seit dem 9.6. (Montag immer Theater) -> +2.79
        { date: "2026-06-23", km: 8.99 },
        // 25.6. Wägung: schrumpft weiter (Erben misslingt)
        { date: "2026-06-25", weightKg: 83.5, km: 8.99 },
        // 29.6. Ogi-Weg -> +2.79
        { date: "2026-06-29", km: 11.78 },
        // 2.7. Wägung
        { date: "2026-07-02", weightKg: 83.4, km: 11.78 },
        // 9.7. Wägung: erstes Halbmödeli geerbt (+0.1)
        { date: "2026-07-09", weightKg: 83.5, km: 11.78 },
        // 16.7. Wägung: erbt im Rückwärtsgang (-0.7), neuer Tiefststand
        { date: "2026-07-16", weightKg: 82.8, km: 11.78 },
        // 20.7. grosse Runde inkl. Anaconda-Loop -> +3.41
        { date: "2026-07-20", km: 15.19 },
        // 23.7. Wägung: verdunstet weiter (-0.4)
        { date: "2026-07-23", weightKg: 82.4, km: 15.19 }
      ]
    },
    /* ----- MISSED IN ACTION seit 20.7.2026 (Nachruf im Logbuch) -----
       memorial: true = Gedenk-Karte: erscheint in der Crew (s/w, Badge "Vermisst",
       Bilanz eingefroren), zählt aber NICHT in Kurven/Hall of Shame/Legende.
       Kommt Mika zurück: memorial entfernen, history normal weiterführen. */
    {
      id: "mika",
      photo: "assets/mika.jpg",
      name: "Mika",
      nick: "Mother²-Mikl",
      role: "coach",
      weightTrend: "up",
      heightCm: 182,
      birthYear: 1997,
      estimated: true,
      memorial: true,
      bio: "Boltigens berüchtigtster Bruder. Erbt die Kilos der anderen, statt selber welche zu lassen — und hat endlich ein Zweithobby. Beim Auftakt fehlte er; die Kilometer holt er nach.",
      history: [
        { date: "2026-06-01", weightKg: 81.0, km: 0 },
        { date: "2026-06-04", weightKg: 81.2, km: 0 },
        { date: "2026-06-09", km: 3.41 },
        { date: "2026-06-11", weightKg: 81.2, km: 3.41 },
        { date: "2026-06-18", weightKg: 81.2, km: 3.41 },
        { date: "2026-06-25", weightKg: 81.2, km: 3.41 },
        { date: "2026-07-02", weightKg: 81.2, km: 3.41 },
        { date: "2026-07-09", weightKg: 81.2, km: 3.41 },
        { date: "2026-07-16", weightKg: 81.2, km: 3.41 }
      ]
    }

  ],

  // ===== LOGBUCH ===== neuester Eintrag erscheint auf der Seite zuoberst.
  // typ: "lauf" (Montag) | "waage" (Donnerstag). text = dein Kommentar.
  log: [
    {
      date: "2026-06-01",
      typ: "lauf",
      title: "Auftakt am Ogi-Weg",
      text: "Auftakt. Erste Runde Ogi-Weg. Severin legt gleich anderthalb Runden vor - dieses Tier! Coach Lars kennt keine Gnade, lässt die Dicken hinter sich und kümmert sich nebenbei um den Weg-Unterhalt. Zudem missbraucht er seine Hinterherläufer zur statischen Kontrolle der Brüggleni. Sie halten dem Gewicht stand (zumindest besser als die Kniescheiben der Herzbuben). Mika fehlt natürlich, die Kilometer bleibt er schuldig (in Flüssigeinheiten). Startgewichte sind im Kasten, die Waage weint bittere Tränen."
    },
    {
      date: "2026-06-04",
      typ: "waage",
      title: "Erste Wägung, erste Wahrheit",
      text: "Erste Wägung, erste Wahrheit. Chrigu lässt 1,2 Kilo im Tal. Severin ein halbes. Lars meldet 84.1, frisch nach dem Stuhlgang gemessen. Und Mika? Erbt brav: +0,2. Wobei er sein Gewicht nur schätzen kann. Er hat noch keine Waage. Es läuft. Im wahrsten Sinn noch nicht, aber es läuft."
    },
    {
      date: "2026-06-08",
      typ: "lauf",
      title: "El Gordo solo im Anaconda-Loop",
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
      title: "Die Crüe komplett — Mikls Debüt",
      text: "Skinny Bitch Tuesday: Mikl war das erste Mal dabei und erschien im olympischen Trainingsjäggli, das er in Bormio beim Jassen gewonnen hat - wenn's was nützt. Lars „die Lücke“ Klossner — die Zahnlücke versucht er auf dem Foto zu vereiteln — kassierte von Fat Chris eine Abreibung für die Unterhaltsbüetz von gestern: Bäume quer über der Strecke, das Sägemehl einfach liegen gelassen. Diesmal behob er die Mängel im Vorbeigang, notabene ausserhalb der Arbeitszeit (Vorschlag zur Ehrung verdienter Gemeindebürger ist raus).\n\nEingeschüchtert vom Gepruste des Ältesten fassten die Coaches einen Plan: den Defibrillator vor dem Volg klauen und auf halber Strecke beim Bänkli montieren. In der Bahnhofstrasse braucht's ihn eh nicht — der offenen Feierabend-Szene dort fehlt nichts ausser Stühle und ein Stammtisch.\n\nAbschnitt des Tages: die „Riviera“, vom Dicken angepriesen, als plane er ein Trump-Resort. In Wahrheit sind's rund 50 Meter direkt an der Simme — ideal zum Fische füttern oder karisieren.\n\nSportlich teilte sich Rocket-Man die Kräfte ein und überrollte Gordo nach Punkten. Der war so unendlich blöd, den anderen ausgerechnet den Anaconda-Loop als Extra anzudrehen — den Friedhof der Kuscheltiere, den er tags zuvor schon solo gemacht hatte. Nach dieser Tortur hätte das 3,5-Tönnerli einen Regenerationstag verdient gehabt; prompt ging ihm im steilen Treppen-Aufstieg zurück in die Todeszone die Puste aus. Er jammerte, die wässerigen Beine seien viel zu schwer. Mikl bemerkte, das seien auch Ueli Stecks letzte Worte gewesen — und die einzige Todeszone sei das Viszeralfett zwischen den Innereien des adipösen Lappens.\n\nDafür wusste der Ernährungsberater, was das Duo-Herzinfarkt nach dem Drill braucht: 8 Dosen White Claw Hard Seltzer auf seinen Nacken. Damit wäre der Gesöff-Partner aufgeboten (ruft an, wir brauchen euch). Low-Carb-Alkohol ist das Einzige, was er uns noch durchgehen lässt — Bier hat uns schliesslich dick gemacht. Und Cheeseburger. Verdammte Cheeseburger. Am Donnerstag sagt die Waage, ob's ein Fehler war. Möge uns Ronald MaDonald beistehen.",
      photoDir: "assets/runs/2026-06-09",
      photos: [
        { file: "die-cruee-komplett", caption: "Die Crüe — ausnahmsweise komplett." },
        { file: "white-claw-ruft-uns-an", caption: "White Claw, ruft uns an!" }
      ]
    },
    {
      date: "2026-06-11",
      typ: "waage",
      title: "Der Donnerstag verrät alles",
      text: "Donnerstag und die Waage kennt keine Gnade. Er der vorgestern noch White Claw proklamiert hat, legt prompt 600 Gramm zu: 164,7. Wir sagten ja, der Donnerstag verrät alles. Bald müssen wir ihn zur Viehwaage am Bahnhof fahren. Severin hält stoisch sein Gewicht (148,5), Rocket-Man im Standby. Lars scheitert derweil weiter am Erben — 83,7, schon wieder leichter; wer so hager bleibt, hat die Skinny-Bitch-Physik nicht begriffen. Und Mika? Schätzt sich unverändert, eine Waage hat er immer noch keine. In Kilo Veritas — sofern man eine besitzt."
    },
    {
      date: "2026-06-15",
      typ: "lauf",
      title: "Zwei Brummer ohne Aufsicht",
      text: "Mika hatte Geburtstag, Lars ging mal wieder mit seiner Theatergruppe fremd — dort gibt er offenbar den grossen Richard Gere und ist allseits begehrt. So zottelten die zwei Brummer wie Baby-Elefanten, ausgesetzt in der Savanne, ganz allein los.\n\nDiesmal gab's nur den ordinären Ogi-Weg, auf den Anaconda-Loop wurde grosszügig verzichtet — wenn sie schon mal nicht unter Aufsicht stehen, wählt man den leichtesten Weg. Kurz und schmerzlos. Wobei der Alte ab Camp IV wieder ziemlich zu Pfeiffen anfing. Die Todeszone fängt bei ihm halt schon auf 855 Metern an. Je +2,8 km im Sack, die Coaches schulden uns einen Snack.\n\nGenau wie die Klatschtanten der Boltig-Metzg, die immer noch kein Protein kredenzt haben. Hans jun. Kronprinz von Längacker scheint im Verwursten von Informationen schneller zu sein als im Liefern. Er schiebt den Link-Leak der Skinny-Bitches auf seinen ehemaligen Lebenspartner (Coach) Lars, welcher sich nach 3 Jahren im Simmenegger-Exil getrennt hat und mit einer Katholikin in die Oberbäuert durchgebrannt ist. Im Rosenkrieg weiss man nie auf welcher Seite der Wahrheit man steht. Janu, so müssen die Chubby-Buddies sich ihr Eiweiss weiterhin mit gestohlenen Eiern aus der Nachbarschaft besorgen oder in die Prostitution zwingen lassen. Aber das kommt schon wieder gut. Ganz gemäss dem alten Sprichwort: „Wenn zwei sich streiten, freut sich der Dicke“"
    },
    {
      date: "2026-06-17",
      typ: "lauf",
      title: "Cheat-Day rückwärts",
      text: "Halt, heute ist doch Mittwoch!? Stimmt, verdammt — was soll der Scheiss? Der egoistische Fetteran hatte heute Cheat-Day. Unter Skinny Bitches bedeutet das genau das Gegenteil: Er hievte seinen Kadaver alleine durch den Wald, um sich einen Vorteil zu verschaffen. Sollte man auch, wenn man Fettreserven für 3 Jahre mit sich rumträgt.\n\nDer unterernährte Coach Mikl hat diese Woche zudem eine strenge Low-Carb-Diät mit Proteinen aus Eierlikör und Baileys angeordnet. Wir werden bald wissen, ob sich das in Kilo auszahlt."
    },
    {
      date: "2026-06-18",
      typ: "waage",
      title: "20 Mödeli Anke leichter",
      text: "Heute waren die Bitches nervös, man musste die Waagzahlen förmlich aus ihnen rauspressen. Mikls Gewicht bleibt weiterhin ein Mysterium und deshalb wie letzte Woche. Auch Mr. Sexybless tritt auf der Stelle. Die Fülligen wittern Betrug noch besser als Frittieröl. Entweder sind die beiden leichter als ein 3. Klässler oder haben Angst, das schmutzige Erbe anzutreten.\n\nDafür verlieren unsere Moppel gemeinsam soviel Gewicht, wie rund 20 Mödeli Anke (20x250g). Chrigus Schleichlauf zahlt prompt aufs Konto ein: 160,8 Kilo, satte 3,9 weg in 7 Tagen. Severin hält stoisch mit und schmeisst ein weiteres Kilo raus (147,5).\n\nDes Hausfrauenschwarms eiweissreiche Schnaps-Offensive scheint voll aufzugehen. Darauf erstmal einen Eierlikör. Proust!"
    },
    {
      date: "2026-06-23",
      typ: "lauf",
      title: "Wurst-Tuesday",
      text: "Endlich wieder fast vollzählig: Mr. Sexybless hat Montag gecancelt (huerä Theater!). Also wurde die Tortur scho ummi auf Dienstag verschoben. Mika ghostet uns seit letzter Woche. Coach Lars liess sich dafür nicht lumpen: Er brachte Protein-Riegel mit, die mehr Kalorien als ein Big Mac haben (was soll der Scheiss?). Statt den Anaconda-Stich wie letztes Mal hinten als Extra-Loop dranzuhängen, jagte er uns die steile Treppe diesmal one-way gleich zum Einstieg hoch — von der ersten Minute an die Folter. Angeblich sei dort letzte Woche noch ein Adipöser auf der Strecke geblieben, von der Bestie geholt. Aber nicht heute. Die Festen pfiffen wie zwei Murmel den Stutz hoch in Sicherheit.\n\nDas echte Drama folgte wie immer an derselben Stelle, und die Affenhitze fordert ihren Tribut. Der junge Schwere gerät schon auf dem Hinweg in Rücklage. Gordo wähnt sich im Vorteil — er teile bloss die Kraft ein, um oben in der Todeszone zum Überholen anzusetzen. Doch es kommt anders: Severin fällt zurück, klönt, dass er ins Schwitzen gerät, und überhaupt habe er doch eigentlich Ferien. Es gibt verrückte Leute die frei nehmen ausschliesslich dafür, um Sport zu treiben. Etwas was die zwei All-Inklusive-Riesenbabys nicht verstehen können.\n\nZurück in der Schinti dann die Überraschung. Nach einem kleinen Standort-Missverständnis findet uns der Boltig-Metzger an der Brücke und überreicht den Schlampen wie ein Money-Girl einen exklusiven Cervelat-Koffer. Damit badet er die Wettschulden seiner Mitwurster aus. Der Protein-Engpass ist vom Tisch, unser erster Sponsor hielt Wort. Merci vielmal! Wir sind auf dem Weg ins Tal der Dünnen mit Hilfe von etwas, das mit viel Liebe in einen Darm gepresst wurde.",
      photoDir: "assets/runs/2026-06-23",
      photos: [
        { file: "wurst-on-the-rocks", caption: "Wurst on the rocks. Sponsor Urs Wittwer flankiert von den zarten Fichten." }
      ]
    },
    {
      date: "2026-06-25",
      typ: "waage",
      title: "Die Wurst-Kur wirkt",
      text: "Gordo durchbricht die Schallmauer und steht bei 159,6 — minus 1,2 in 7 Tagen, minus 5,7 seit Start. Sevl zottelt brav mit (147,3). Lars erbt weiterhin nichts und schrumpft sogar auf 83,5. Er sagt, er habe die Zehennägel wiedermal geschnitten. Mikl bleibt das Phantom ohne Waage und ohne Rückmeldung. Wir glauben, er will nicht mehr mit den dicken Kindern spielen. Doch wir geben ihn noch nicht auf."
    },
    {
      date: "2026-06-29",
      typ: "lauf",
      title: "Feindkontakt mit der Anaconda",
      text: "Trotz Gewitterwarnung zogen wir los — aber versetzt. Coach Lars verkündete um 19:00, seine Landi-Wetter-App orakle ab 20:00 Regen. Chrigu hingegen mästete sich um diese Zeit noch und kam erst später auf den Track. Man traf sich auf halber Strecke und klatschte im Vorbeilaufen ab — so wie Volleyballspielerinnen das halt so tun. Und Mika? Bleibt unser Sorgenkind, hängt nur noch mit der offenen Feierabendszene rum. Er will einfach nicht feisser werden. Aber wir geben ihn noch nicht auf.\n\nDann, zum ersten Mal: Feindkontakt mit der Anaconda! Das Biest hatte es auf den schmalen Coach abgesehen und wollte ihn in einem Happen verschlingen. Doch das Schlangenvieh hat die Rechnung ohne Rocket-Man gemacht. Er stellte sich dem eingeschleppten Untier, kämpfte verbissen und schimpfte, dass er es häuten und sich daraus ein Meerjungfrauenkostüm basteln werde. Die Anaconda — auf dem Helsana-Trail bisher nur leichte Kost (magere Jogger) gewohnt und noch nie einem entschlossenen Dicken begegnet — zog nach heftigem Kampf niedergeschlagen in den Dschungel zurück.\n\nSeverin ist der lebende Beweis: Superhelden müssen nicht fliegen können, um anderen zu helfen. Zur Verteidigung reicht es, einfach mehr Appetit als der Angreifer zu haben.",
      photoDir: "assets/runs/2026-06-29",
      photos: [
        { file: "rocketman-vs-anaconda", caption: "Rocketman kämpft entschlossen gegen die Anaconda, die seinen kümmerlichen Freund Coach Lars verspeisen wollte." },
        { file: "stinkefinger-fuers-biest", caption: "Rocketman zeigt dem Biest den Stinkefinger." }
      ]
    },
    {
      date: "2026-07-02",
      typ: "waage",
      title: "Der Mähdrescher isst zurück",
      text: "Waagtag, und diesmal beisst die Wahrheit wieder zu. Gordo der plütterige Streber — 3 statt 1 mal Ogi-Weg, gestern sogar mit Anaconda-Loop, alles reingesteckt —, doch die Waage zeigt 160,0: plus 0,4. Der menschliche Mähdrescher hat nebst der Lauferei auch die Fress- und Sauferei nicht vernachlässigt. Rocket-Man und Sexybless tun derweil, was sie am besten können: fast nichts (147,2 und 83,4, je minus 0,1). Und Mikl? Du weisst schon."
    },
    {
      date: "2026-07-06",
      typ: "lauf",
      title: "Fans, Rindler, schwere- und Reichen-Jungs",
      text: "Lauftag, und diesmal mit reichlich Publikum: Ein Skinny-Bitch-Fangirl (Name der Redaktion bekannt) dackelte den Babyelefanten hinterher. Die Klossnerei hingegen enttäuschten auf ganzer Linie und blieben beide fern — Lars wie Mika. Die Wichsos wollen uns platzen sehen oder wehrlos den Weight Watchers überlassen. Man wollte sich vor dem Fan nicht die Blösse geben und wählte extra die grosse Runde inklusive Anaconda-Loop und 3-fachem Tubeli-Chehr. Es dampfte noch ordentlich im warmen Wald. Der Alt-Ranzige dampfte am meisten.\n\nKurz vor dem Ziel noch mehr Aufmerksamkeit: Rindlispigger und die Reichen-Jungs mähten die Wiese entlang des Wegs hinauf in die Todeszone und meinten, der pflätschnasse Dicke war wohl eher in der Simme baden gegangen statt zu stampfen. Mulaffe, die konnten sich ja auch vom Motormäher bergauf ziehen lassen. Wenn diese Teile erstmal im Mainstream ankommen, werden alle E-Bike-Senioren damit künftig auch die Wanderwege verstopfen und sich im Longevity-Wahn mit 95-jährig noch auf die Mittagsfluh hinterherschleifen lassen.\n\nDie Wurstfeen waren aber heute auch im Namen der Gehweg-Sicherheit unterwegs. Dabei haben sie verschiedene Hochrisiko-Passagen ausgemacht, wo der abwesende Coach und Wegmeister Lars nachbessern muss. Es gibt diverse vermeidbare Stolperfallen auf dem Skinny-Bitch-Trail, die einfach zu entschärfen wären. Schliesslich wäre ein Sturz bei diesem Kaliber fatal und unsere beiden Topmoppel unfähig, auch nur 3m zum Kühlschrank an Krücken zu gehen.\n\nMan erzählt sich im Tal, ein Oberschenkelhalsbruch sei der Anfang vom Ende — der direkte Zubringer ins Altersheim. Wobei diese Akku-Velos wohl auch ihren Teil dazu beitragen. Wir bleiben wohl besser bei der Tschalpperei."
    },
    {
      date: "2026-07-09",
      typ: "waage",
      title: "Lars erbt sein 1. Halbmödeli!",
      text: "Die Wägungen kamen pünktlich. Der Protokollant hat's verpennt — die Zahlen sind trotzdem schonungslos. El Gordo drückt sich mit 159,8 nur arschknapp unter die Schallmauer: minus 0,2. Bei dem Laufpensum eher ein Almosen der Physik als eine Leistung, aber wir nehmen's so.\n\nRocket-Man dagegen legt 0,3 drauf (147,5) — die Ferien-Ausrede zieht langsam Speck an. Und dann das Wunder von Boltigen: Lars erbt tatsächlich! Plus 0,1 auf 83,5. Nach fünf Wochen Abmagern endlich hundert Gramm in die richtige Richtung — vermutlich sind es nur die langen Zehennägel, aber nu. Mikl? Schätzungsweise unverändert. Wie alles an ihm zurzeit."
    },
    {
      date: "2026-07-13",
      typ: "lauf",
      title: "Nächste Runde ohne Oberbäuerter-Beteiligung",
      text: "Skinny Bitch Monday ist nicht die Fussball-WM: Bei uns gelten dieselben Regeln für alle, es gibt kein VAR und egal wie mächtig die Person ist die dich anruft um eine Gefälligkeit von dir zu fordern - du sagst ab und läufst mit. Der polyvalente Coach Lars sah das anders und ging seinem grossen Bruder \"Hombre\" beim Heuen helfen. Obschon es seit Tagen schön ist, das Gras kaum höher ist als vor 2 Wochen und es scheiss Heu bei Knutti's Jürg in der Landi in handlichen 2kg-Ballen zu kaufen gibt. Der andere Oberbäuerter Mother²-Mikl ghostet uns auch weiterhin. Wir hoffen, es geht ihm gut und er besiegt seine Essstörung. Irgendwann.\n\nDer skandalöse Montag geht weiter: Unser Parkplatz — besetzt! Ein Camper aus der Grande Nation (die, welche Schnecken fressen). Offenbar hat sich die Schinti in der instagram-geschwängerten Van-Life-Community rumgesprochen. An Bord nicht nur ein Hund, sondern auch eine Katze. Da kannst du gleich die Schwiegermutter mit in den Bus nehmen — die ist auch stubenrein, mit dem Unterschied, dass man Schwiegertiger das Kistchen nicht neu einstreuen muss.\n\nGelaufen sind also nur die zwei Dampfwalzen, dafür die grosse Runde inklusive Anaconda-Loop und 3-fachem Tubeli-Chehr. Die Hitzewelle steht im Wald wie eine Wand — doch die pflätschnassen Speckschwarten tränkten den furztrockenen Waldboden derart mit Schweiss, dass der Kanton das Feuerverbot für Boltigen umgehend wieder aufhob. Rocket-Man feierte das standesgemäss mit einer milden Parisienne und vier Zügen in die offenen Lungenflügel. Rauchen hat schliesslich keine Kalorien und hält uns an der Simme die Brämi vom Leib. Die saugen uns seit Wochen den Lebenssaft aus den dicken Pfösten. Bei dieser Masse an überzuckertem Blut wundert das keinen."
    },
    {
      date: "2026-07-16",
      typ: "waage",
      title: "Der Coach zweifelt am Geschäftsmodell",
      text: "Wägetag, und die Waage spuckt nur schlechte Nachrichten. Gordo stemmt sich mit 160,5 wieder über die Schallmauer (+0,7) — die lange Runde vom Vortag war offenbar nur der Appetizer fürs Abendessen. Rocket-Man legt nochmals 0,1 drauf (147,6). Die Wonneproppen laufen und laufen und werden dabei schwerer — ein physikalisches Wunder, das die Wissenschaft noch beschäftigen wird.\n\nCoach Lars zieht daraus den einzig logischen Schluss und stellt die Lauferei grundsätzlich in Frage: Ob wir nicht besser mit zum Heuen gekommen wären? Der Mann hat leicht reden — er selbst ist mit 82,8 nochmals 0,7 Kilo losgeworden und erbt inzwischen im Rückwärtsgang. Bei den Skinny Bitches läuft aktuell schlicht alles in die falsche Richtung: Die Dicken werden schwerer, die Dünnen dünner. Nur Mikl bleibt als einzige Konstante und sagt dazu wie immer - nichts."
    },
    {
      // Nachruf bewusst VOR dem Lauf-Eintrag vom selben Tag: bei gleichem Datum
      // zeigt die (stabile) Sortierung den früher stehenden Eintrag zuoberst.
      date: "2026-07-20",
      typ: "nachruf",
      title: "Missed in Action: Mother²-Mikl",
      text: "Die Skinny Bitches nehmen Abschied von ihrem Gründungsmitglied Mother²-Mikl, Coach, Ernährungsberater und Boltigens berüchtigtstem Bruder. Zuletzt gesehen am 9. Juni 2026 auf dem Ogi-Weg, im olympischen Trainingsjäggli aus Bormio. Seither: Funkstille. Sieben Wägungen, kein Lebenszeichen, keine Waage — er blieb sich bis zum Schluss treu.\n\nSeine Bilanz bleibt unerreicht: 3,41 Kilometer in zwei Monaten, geschätzte 81,2 Kilo (nie verifiziert), plus 0,2 geerbte Kilo und eine selbst verordnete Low-Carb-Diät aus Eierlikör und Baileys, deren Wirkung die Wissenschaft nie überprüfen konnte. Er verblasste wie ein Hundehaufen am Simme-Port. Heute nehmen wir Abschied und ihn vom Netz. Die offene Feierabendszene vor dem Volg hat gewonnen. Boltigens Letten hat einen weiteren guten Mann verschluckt.\n\nAber: Bei den Skinny Bitches gibt es kein Vergessen, nur Vermisste. Sollte Mikl eines Montags wieder in der Schinti auftauchen, kriegt er Karte, Kurve und Schätzgewicht zurück — und eine Doppelrunde als Busse. Bis dahin: Machs gut, Mikl. Und iss auch zwischen den Geburtstagen mal was.",
      photoDir: "assets/runs/2026-07-20",
      photos: [
        { file: "mikl-nachruf", caption: "Vermisst seit 9.6.26: Mother²-Mikl. Zuletzt gesehen vor dem Volg Boltigen." }
      ]
    },
    {
      date: "2026-07-20",
      typ: "lauf",
      title: "Helium, Himalaya und Liebe",
      text: "Volle Hütte am Skinny Bitch Monday! Nebst den drei Stammkräften Gordo, Rocket-Man und Coach Sexybless liefen im Rahmen des Ferienpass Obersimmental auch Gordos Kinder mit — und als wäre das nicht genug, gesellten sich die Gebrüder «Los Kropfos» als Mitläufer dazu. Die beiden Halb-Thais waren heute auf Schnupperkurs und gelobten ihre baldige Rückkehr bei unserer Montagabend-Routine. Der Ogi-Weg hat Hochsaison, gelaufen wurde standesgemäss die grosse Runde inklusive Anaconda-Loop. Nach nun bald 100 gemeinsamen Kilometer, werden die ersten \"Strassenschäden\" sichtbar. Viele Baumwurzeln auf dem Pfad sind mittlerweile freigelegt, weil die Verdrängung und der Hufen der Dicken einsetzt. Das macht den Spass zum Hindernisparcours wo man seine Augen stets auf dem Boden haben muss, damit man sich nicht auf die Fresse legt.\n\nBeim heutigen Andrang kam es am Treppenaufstieg zu Wartezeiten wie am Hillary Step im Himalaya. Coach Lars nutzte den Stau für etwas Bergsteiger-Folklore: Gemäss Überlieferung müsse jeder 12. Dicke beim Anaconda-Treppenaufstieg sein Leben lassen — und als Letzter in der Schlange könnte es rechnerisch Severin treffen. Passiert ist gar nichts. Nomal Schwein gha gopfertelli.\n\nIm Gegenteil: Rocket-Man schwitzt nicht mal richtig. Die Expedition kam einstimmig zum Schluss, dass er nur aus Helium und Liebe besteht — anders ist sein gemütliches, schwereloses Wanken nicht zu erklären."
    },
    {
      date: "2026-07-23",
      typ: "waage",
      title: "Einer fehlt, einer schwindet",
      text: "Erster Waagtag ohne Mikl — und die Lücke füllt sich auf unheimliche Art: Coach Lars schrumpft schon wieder. 82,4, nochmals 0,4 weniger. Wer erben soll und stattdessen verdunstet, hat das Konzept nicht begriffen oder aber - die zwei Mähdrescher fressen dem Kommunal-Sprenzel alles weg.\n\nBei den Dicken läuft's einigermassen rund (wie sollte es auch anders): Gordo drückt sich mit 159,5 wieder unter die Schallmauer — mit minus 1,0 zumindest mal ein Lebenszeichen. Die Wurst-Kur, das Laufpensum, irgendwas wirkt. Rocket-Man hält derweil stoisch an seinen 147,6 fest — auf das Gramm genau wie letzte Woche. Wie ein zuverlässiges Uhrwerk. Nur die Richtung müsste noch justiert werden."
    },
    {
      date: "2026-07-27",
      typ: "lauf",
      title: "Kinder-Coaches und Temu-Herzbuben",
      text: "Skinny Bitch Monday mit halber Belegschaft: Coach Lars flickte im Auftrag des Pöbels noch Wasserleitungen, und auch Los Kropfos liessen sich nach ihrem vollmundigen Schnupperkurs-Gelübde nicht blicken. So blieben die Temu-Variante der Wildecker Herzbuben ganz unter sich — motiviert und angetrieben von Gordos Kindern, die kurzerhand das Coaching übernahmen. Kinder-Coaches sind völlig vertretbar, solange wir mit ihnen keinen Waffenmarsch machen. Nicht durchdrehen ihr politisch Korrekten. Ist ja nur der Schattseitenwald, nicht der kongolesische Dschungel.\n\nSportlich trennten sich die Wege: Gordo nahm den Skinny-Bitch-Trail mit Anaconda-Loop unter die Hufe, Rocket-Man entschied sich für die ordinäre Runde. Er wolle bei Kräften bleiben — morgen um drei Uhr früh fährt er mit Ariel für irgendein Ersatzteil nach München. Die Redaktion vermutet allerdings, dass er sich in Schland bloss ein paar McRib's hinter den Fressbalken schieben will. Welcher Simmentaler fährt schon ausserhalb von Wiesn oder Baumaschinen-Messe dorthin? Ja, ja, janu. Der Spass sei dem Brummer gegönnt. In Kilo Veritas."
    }
  ]
};
