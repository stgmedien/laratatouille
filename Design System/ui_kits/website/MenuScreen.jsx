const { SectionHeading, MenuItem, Tabs, Notice, Rule, Button, Tag } = window.LaRatatouilleDesignSystem_9f9119;

const CARD = {
  'Vorspeisen': [
    { name: 'Sardinen vom Grill', price: '14 €', description: 'Mit Zitrone, Meersalz und geröstetem Brot.', origin: 'Fisch aus der Lonja de Dénia' },
    { name: 'Gebratene Auberginen', price: '16 €', description: 'Ras el Hanout, Joghurt, Granatapfel.', tags: ['Vegetarisch'] },
    { name: 'Tomaten vom Feld, Anchovis', price: '13 €', description: 'Nur im Sommer, und nur wenn sie gut sind.' },
    { name: 'Brot, Olivenöl, Oliven', price: '5 €', description: 'Sauerteig aus eigener Führung.', tags: ['Vegan'], origin: 'Olivenöl aus Baena' }
  ],
  'Hauptgänge': [
    { name: 'Seehecht in Fenchelbutter', price: '26 €', description: 'Kartoffeln aus Galicien, Zitronenthymian.' },
    { name: 'Lammschulter, 6 Stunden', price: '29 €', description: 'Auberginenpüree, Minze, Granatapfelsud.', tags: ['Signature'] },
    { name: 'Ratatouille, wie bei uns', price: '21 €', description: 'Langsam geschmort, mit Ei und Estragon.', tags: ['Vegetarisch'] },
    { name: 'Reis mit Artischocken', price: '24 €', description: 'Zwei Personen, 40 Minuten Wartezeit.', tags: ['Vegan'] }
  ],
  'Desserts': [
    { name: 'Crema catalana, gebrannt', price: '8 €', description: 'Mit Orangenschale und Zimt.' },
    { name: 'Feigen in Rotwein', price: '9 €', description: 'Dazu Schafsjoghurt.', tags: ['Vegetarisch'] },
    { name: 'Schokolade & Olivenöl', price: '9 €', description: 'Mit Meersalz.' }
  ],
  'Weine': [
    { name: 'Moscatell Sec, Marina Alta', price: '5,50 € / 28 €', description: 'Trocken ausgebaut, unser Hauswein aus dem Nachbardorf.' },
    { name: 'Monastrell, Alicante', price: '7 € / 36 €', description: 'Dunkel, warm, mit Kräuternote.' },
    { name: 'Cava Brut Nature', price: '6 € / 32 €', description: 'Ohne Dosage, drei Jahre auf der Hefe.' }
  ]
};

function MenuScreen() {
  const [course, setCourse] = React.useState('Vorspeisen');
  return (
    <>
      <Section tone="card" style={{ paddingBottom: 'var(--space-40)' }}>
        <SectionHeading align="center" eyebrow="Die Karte · September" title="Was heute auf den Tisch kommt"
          intro="Alle zwei Wochen neu. Was wir nicht auf dem Markt bekommen, steht nicht auf der Karte." />
      </Section>

      <Section style={{ paddingTop: 'var(--space-32)' }}>
        <Tabs value={course} onChange={setCourse} align="center" items={Object.keys(CARD)} style={{ marginBottom: 'var(--space-40)' }} />
        <div style={{ maxWidth: 820, margin: '0 auto' }}>
          {CARD[course].map((d) => <MenuItem key={d.name} {...d} />)}
        </div>
        <div style={{ maxWidth: 820, margin: 'var(--space-40) auto 0', display: 'flex', flexDirection: 'column', gap: 'var(--space-20)' }}>
          <Notice tone="info">
            Alle Preise inkl. IVA. Allergene und Zusatzstoffe nennen wir Ihnen gern am Tisch — sagen Sie uns
            bitte vor der Bestellung, was Sie nicht essen können.
          </Notice>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-12)', flexWrap: 'wrap' }}>
            <Tag tone="sage">Vegetarisch</Tag><Tag tone="sage">Vegan</Tag><Tag tone="gold">Signature</Tag>
            <span style={{ font: 'var(--type-caption)', color: 'var(--text-faint)' }}>Kennzeichnungen auf der Karte</span>
          </div>
        </div>
      </Section>

      <Section tone="sunken">
        <div style={{ maxWidth: 820, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-24)' }}>
          <SectionHeading eyebrow="Menü" title="Mittelmeer-Menü, 6 Gänge" rule={false}
            intro="Donnerstags um 19:30, für den ganzen Tisch. 68 € pro Person, mit Weinbegleitung 104 €." />
          <Rule variant="ornament" />
          <div><Button>Menüabend reservieren</Button></div>
        </div>
      </Section>
    </>
  );
}

Object.assign(window, { MenuScreen });
