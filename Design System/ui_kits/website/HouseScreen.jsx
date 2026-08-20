const { SectionHeading, Quote, Rule, InfoRow, Card, Button } = window.LaRatatouilleDesignSystem_9f9119;

function HouseScreen({ onNavigate }) {
  return (
    <>
      <Hero slot="hero-haus" label="Hero — das Haus" height={480} eyebrow="Das Haus" title="Zwei Deutsche, eine spanische Küche"
        sub="Eine offene Küche, vierundzwanzig Plätze, mitten in der Calle Mayor von Sanet y Negrals." />

      <Section>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(32px,6vw,88px)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-20)' }}>
            <SectionHeading eyebrow="Wie es anfing" title="Aus Deutschland in die Marina Alta" />
            <p style={{ font: 'var(--type-body)', color: 'var(--text-body)', margin: 0 }}>
              Wir sind gekommen, um ein halbes Jahr zu bleiben. Dann stand das Haus in der Calle Mayor leer —
              vierundzwanzig Plätze, eine Terrasse zur Straße, ein Dorf, das uns gelassen aufgenommen hat.
            </p>
            <p style={{ font: 'var(--type-body)', color: 'var(--text-body)', margin: 0 }}>
              Was wir aus Deutschland mitgebracht haben, ist die Genauigkeit. Was wir hier gelernt haben, ist der
              lange Abend: dass Gäste bleiben dürfen, bis die Küche längst geputzt ist.
            </p>
            <div style={{ paddingTop: 'var(--space-8)' }}><Rule variant="short" /></div>
          </div>
          <Placeholder slot="haus-portraet" height={420} label="Porträt — die Gastgeber" rounded />
        </div>
      </Section>

      <Section tone="card">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 'var(--grid-gap)' }}>
          <Card variant="plain" eyebrow="Markt" title="Jeden Morgen um sieben">
            Fisch aus der Lonja de Dénia, Gemüse vom Wochenmarkt in Ondara. Was nicht gut aussieht, kaufen wir nicht.
          </Card>
          <Card variant="plain" eyebrow="Küche" title="Offen zum Gastraum">
            Sie sehen, was mit Ihrem Essen passiert. Und wir sehen, wie es Ihnen schmeckt.
          </Card>
          <Card variant="plain" eyebrow="Haltung" title="Keine Show">
            Kein Schaum, keine Pinzette. Dafür Fenchelbutter, die drei Tage gezogen hat.
          </Card>
        </div>
      </Section>

      <Section tone="inverse">
        <Quote tone="inverse" align="center" attribution="Guía de restaurantes" source="Alicante">
          Eine der wenigen Küchen an der Küste, die man nach dem ersten Bissen wiedererkennt.
        </Quote>
      </Section>

      <Section>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(32px,6vw,88px)', alignItems: 'start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-24)' }}>
            <SectionHeading eyebrow="Kontakt" title="Kommen Sie vorbei" />
            <div>
              <InfoRow icon="map-pin" label="Adresse">Calle Mayor 14, 03769 Sanet y Negrals</InfoRow>
              <Rule />
              <InfoRow icon="clock" label="Öffnungszeiten">Mi – So, 19:00 – 23:30<br />Montag & Dienstag Ruhetag</InfoRow>
              <Rule />
              <InfoRow icon="phone" label="Telefon">+34 966 408 326</InfoRow>
              <Rule />
              <InfoRow icon="mail" label="E-Mail">info@laratatouille.es</InfoRow>
            </div>
            <div><Button onClick={() => onNavigate('/reservieren')}>Tisch reservieren</Button></div>
          </div>
          <Placeholder slot="haus-lageplan" height={380} label="Karte / Lageplan" rounded />
        </div>
      </Section>
    </>
  );
}

Object.assign(window, { HouseScreen });
