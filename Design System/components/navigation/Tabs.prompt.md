Switches between sections of the same page — menu courses, lunch/dinner cards.

```jsx
<Tabs value={course} onChange={setCourse} align="center"
  items={["Vorspeisen","Hauptgänge","Desserts","Weine"]} />
```

Keep labels to one word where possible; the 2px pine underline is the only active affordance.
