The only sanctioned icon source: Lucide, loaded from CDN and masked so it takes `currentColor`. Never hand-draw an SVG or use emoji.

```jsx
<span style={{display:'flex',gap:8,alignItems:'center'}}>
  <Icon name="map-pin" size={16} /> Calle Mayor 14, Sanet y Negrals
</span>
```

Icons sit at 16–18px next to body text, 20–22px in isolation. Decorative by default (`aria-hidden`), so keep the meaning in adjacent text.
