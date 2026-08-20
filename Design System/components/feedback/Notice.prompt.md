An inline message: confirmation, seasonal closure, form error. Never a floating toast.

```jsx
<Notice tone="success" title="Tisch notiert">
  Wir schicken Ihnen die Bestätigung per E-Mail.
</Notice>
<Notice tone="notice">Vom 6. bis 20. Januar haben wir Betriebsferien.</Notice>
```

Tones: `info` (linen), `success` (sage), `notice` (gilt), `danger`. Add `onDismiss` only where dismissing is meaningful.
