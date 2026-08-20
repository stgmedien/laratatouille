The site header. Sticky, translucent (backdrop blur over linen or pine), 84px tall.

```jsx
<NavBar activeHref="/karte" links={[{href:'/karte',label:'Karte'},{href:'/haus',label:'Das Haus'}]}
  cta={{label:'Reservieren', href:'/reservieren'}} />
```

`tone="dark"` when it sits over a hero image. Exactly one CTA; the phone IconButton is always last.
