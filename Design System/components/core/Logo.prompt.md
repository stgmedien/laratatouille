The compact roundel for tight spots — footer, favicon, menu-card corner, stamps. The typographic `Wordmark` remains the primary lockup; never set both side by side at the same size.

```jsx
<Logo size={56} />
<Logo size={56} tone="inverse" />   {/* on pine or photography */}
```

The SVG original lives at `assets/logo.svg` (uses webfont text — embed via `<img>` falls back to a system serif; prefer this component inside pages).
