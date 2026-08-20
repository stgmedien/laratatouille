The primary call to action — uppercase, letterspaced label in pine; use exactly one `primary` per view and `secondary` for everything else.

```jsx
<Button variant="primary" size="lg" href="#reservieren">Tisch reservieren</Button>
<Button variant="secondary">Speisekarte ansehen</Button>
```

Variants: `primary` (pine fill), `secondary` (hairline outline), `ghost` (text only), `inverse` / `inverse-outline` for pine sections. Sizes `sm | md | lg`. Hover darkens the fill; press shifts down 1px — never scales.
