A square control wrapping one Lucide glyph — mobile nav toggle, phone link, gallery arrows.

```jsx
<IconButton name="phone" label="Anrufen" variant="outline" />
<IconButton name="arrow-right" label="Weiter" size="lg" variant="filled" />
```

Variants `ghost | outline | filled | inverse`; sizes map to 36 / 44 / 52px so it always clears the 44px touch target at `md`.
