const { SectionHeading, Input, Textarea, Select, Checkbox, RadioGroup, Button, Notice, Dialog, InfoRow, Rule } = window.LaRatatouilleDesignSystem_9f9119;

function ReserveScreen() {
  const [area, setArea] = React.useState('Terrasse');
  const [pax, setPax] = React.useState('2 Personen');
  const [time, setTime] = React.useState('20:00');
  const [news, setNews] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [done, setDone] = React.useState(false);

  return (
    <>
      <Section tone="card" style={{ paddingBottom: 'var(--space-40)' }}>
        <SectionHeading align="center" eyebrow="Reservierung" title="Einen Tisch für Sie"
          intro="Wir bestätigen jede Anfrage persönlich, meist innerhalb von zwei Stunden." />
      </Section>

      <Section style={{ paddingTop: 'var(--space-32)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.35fr 1fr', gap: 'clamp(32px,6vw,72px)', alignItems: 'start' }}>
          <form
            onSubmit={(e) => { e.preventDefault(); setOpen(true); }}
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-24)' }}
          >
            {done && (
              <div style={{ gridColumn: '1 / -1' }}>
                <Notice tone="success" title="Tisch notiert" onDismiss={() => setDone(false)}>
                  Wir schicken Ihnen die Bestätigung per E-Mail. Bis Freitag um {time}.
                </Notice>
              </div>
            )}
            <Input id="r-name" label="Name" placeholder="Ihr Name" required />
            <Input id="r-mail" label="E-Mail" type="email" hint="für die Bestätigung" placeholder="name@beispiel.de" required />
            <Input id="r-date" label="Datum" type="date" defaultValue="2026-09-04" />
            <Select id="r-time" label="Uhrzeit" value={time} onChange={(e) => setTime(e.target.value)}
              options={['19:00', '19:30', '20:00', '20:30', '21:00', '21:30']} />
            <Select id="r-pax" label="Personen" value={pax} onChange={(e) => setPax(e.target.value)}
              options={['1 Person', '2 Personen', '3 Personen', '4 Personen', '5 Personen', '6 Personen']} />
            <Input id="r-phone" label="Telefon" hint="optional" type="tel" placeholder="+34 …" />
            <RadioGroup label="Bereich" value={area} onChange={setArea}
              options={['Innen', 'Terrasse', "Chef's Table"]} style={{ gridColumn: '1 / -1' }} />
            <Textarea id="r-notes" label="Anmerkungen" hint="optional" rows={4}
              placeholder="Allergien, Anlass, Kinderstuhl …" style={{ gridColumn: '1 / -1' }} />
            <div style={{ gridColumn: '1 / -1' }}>
              <Checkbox id="r-news" checked={news} onChange={setNews} label="Newsletter"
                description="Alle vier Wochen, neue Karte und Weinabende." />
            </div>
            <div style={{ gridColumn: '1 / -1', display: 'flex', gap: 'var(--space-16)', alignItems: 'center' }}>
              <Button type="submit" size="lg">Anfrage senden</Button>
              <span style={{ font: 'var(--type-caption)', color: 'var(--text-faint)' }}>
                Für Gruppen ab sechs Personen rufen Sie uns bitte an.
              </span>
            </div>
          </form>

          <aside style={{ background: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)', padding: 'var(--space-32)' }}>
            <h3 style={{ font: 'var(--type-subhead)', color: 'var(--text-heading)', margin: '0 0 var(--space-16)' }}>Gut zu wissen</h3>
            <InfoRow icon="clock" label="Öffnungszeiten">Mi – So, 19:00 – 23:30</InfoRow>
            <Rule />
            <InfoRow icon="hourglass" label="Wartezeit">Wir halten Tische 20 Minuten frei.</InfoRow>
            <Rule />
            <InfoRow icon="baby" label="Kinder">Kinderstuhl und kleine Portionen, gern.</InfoRow>
            <Rule />
            <InfoRow icon="dog" label="Hunde">Auf der Terrasse willkommen.</InfoRow>
            <div style={{ marginTop: 'var(--space-24)' }}>
              <Notice tone="notice">Vom 6. bis 20. Januar haben wir Betriebsferien.</Notice>
            </div>
          </aside>
        </div>
      </Section>

      <Dialog
        open={open} onClose={() => setOpen(false)} eyebrow="Reservierung prüfen"
        title={`Tisch für ${pax.split(' ')[0]}, Freitag ${time}`}
        footer={<>
          <Button variant="ghost" onClick={() => setOpen(false)}>Ändern</Button>
          <Button onClick={() => { setOpen(false); setDone(true); }}>Bestätigen</Button>
        </>}
      >
        Bereich: {area}. Wir halten den Tisch 20 Minuten für Sie frei und melden uns per E-Mail.
      </Dialog>
    </>
  );
}

Object.assign(window, { ReserveScreen });
