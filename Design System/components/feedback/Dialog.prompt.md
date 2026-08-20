A modal for confirmations and short detail views. Closes on backdrop click.

```jsx
<Dialog open={open} onClose={close} eyebrow="Reservierung" title="Tisch für zwei, Freitag 20:00"
  footer={<><Button variant="ghost" onClick={close}>Ändern</Button><Button onClick={confirm}>Bestätigen</Button></>}>
  Wir halten den Tisch 20 Minuten für Sie frei.
</Dialog>
```

Backdrop is the pine veil with 3px blur; content fades in, does not scale or slide.
