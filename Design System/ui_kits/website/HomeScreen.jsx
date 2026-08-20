const { Button, SectionHeading, MenuItem, Card, Quote, Rule, Tag, InfoRow } = window.LaRatatouilleDesignSystem_9f9119;

function HomeScreen({ onNavigate }) {
  return (
    <>
      <Hero
        slot="hero-home" label="Hero — Terrasse am Abend"
        eyebrow="Sanet y Negrals · Marina Alta"
        title="Ehrliche, spezielle Mittelmeerküche"
        sub="Zwei Deutsche, eine offene Küche in Spanien und vierundzwanzig Plätze. Wir kochen, was der Markt am Morgen hergibt."
        actions={<>
          <Button size="lg" variant="inverse" onClick={() => onNavigate('/reservieren')}>Tisch reservieren</Button>
          <Button size="lg" variant="inverse-outline" onClick={() => onNavigate('/karte')}>Zur Karte</Button>
        </>}
      />

      <Section>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(32px,6vw,88px)', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-24)' }}>
            <SectionHeading eyebrow="Das Haus" title="Klein, warm, konsequent"
              intro="Wir haben in Deutschland gelernt zu kochen und in Spanien gelernt zu wirten." />
            <p style={{ font: 'var(--type-body)', color: 'var(--text-body)', margin: 0 }}>
              Die Karte wechselt alle zwei Wochen, weil sich der Markt alle zwei Wochen ändert. Was bleibt, sind die
              gegrillten Sardinen und die Aubergine — daran messen uns unsere Gäste, und das ist uns recht.
            </p>
            <div><Button variant="secondary" onClick={() => onNavigate('/haus')}>Über uns</Button></div>
          </div>
          <Placeholder slot="home-kueche" height={480} label="Foto — die offene Küche" rounded />
        </div>
      </Section>

      <Section tone="card">
        <SectionHeading align="center" eyebrow="Aus der Küche" title="Vier Gerichte, die immer bleiben"
          intro="Ein Auszug. Die vollständige Karte ändert sich alle zwei Wochen." style={{ marginBottom: 'var(--space-40)' }} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 clamp(32px,6vw,72px)' }}>
          <MenuItem name="Sardinen vom Grill" price="14 €" description="Mit Zitrone, Meersalz und geröstetem Brot." origin="Fisch aus der Lonja de Dénia" />
          <MenuItem name="Gebratene Auberginen" price="16 €" description="Ras el Hanout, Joghurt, Granatapfel." tags={["Vegetarisch"]} />
          <MenuItem name="Seehecht in Fenchelbutter" price="26 €" description="Kartoffeln aus Galicien, Zitronenthymian." />
          <MenuItem name="Lammschulter, 6 Stunden" price="29 €" description="Auberginenpüree, Minze, Granatapfelsud." tags={["Signature"]} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 'var(--space-40)' }}>
          <Button onClick={() => onNavigate('/karte')}>Ganze Karte ansehen</Button>
        </div>
      </Section>

      <Section tone="inverse">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(32px,6vw,88px)', alignItems: 'center' }}>
          <Quote tone="inverse" attribution="Marta R." source="Google">
            Man merkt in jedem Gang, dass hier zwei Leute kochen, die es ernst meinen.
          </Quote>
          <div>
            <InfoRow icon="calendar" label="Donnerstags" tone="inverse">Mittelmeer-Menü, 6 Gänge — 68 €</InfoRow>
            <Rule tone="inverse" />
            <InfoRow icon="wine" label="Letzter Freitag im Monat" tone="inverse">Weinabend mit Winzern aus Alicante und der Marina Alta</InfoRow>
            <Rule tone="inverse" />
            <InfoRow icon="users" label="Ganzes Haus" tone="inverse">Private Dinner ab 18 Personen, auf Anfrage</InfoRow>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="Abende" title="Was demnächst ansteht" style={{ marginBottom: 'var(--space-32)' }} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 'var(--grid-gap)' }}>
          <Card href="#" eyebrow="4. September" title="Mittelmeer-Menü, 6 Gänge"
            imageSrc={null} footer={<Tag tone="gold">Wenige Plätze</Tag>}>
            Sechs Gänge quer durchs Mittelmeer, mit Weinbegleitung auf Wunsch. 19:30.
          </Card>
          <Card href="#" eyebrow="26. September" title="Weinabend Marina Alta"
            footer={<Tag tone="sage">Plätze frei</Tag>}>
            Fünf Winzer, acht Weine, kleine Teller aus der Küche. 20:00.
          </Card>
          <Card href="#" eyebrow="12. Oktober" title="Markt & Kochen"
            footer={<Tag>Warteliste</Tag>}>
            Morgens auf den Markt in Ondara, mittags gemeinsam kochen und essen.
          </Card>
        </div>
      </Section>
    </>
  );
}

Object.assign(window, { HomeScreen });
