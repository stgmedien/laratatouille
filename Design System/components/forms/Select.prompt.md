Dropdown for bounded choices: party size, time slot, room.

```jsx
<Select id="pax" label="Personen" options={["2 Personen","3 Personen","4 Personen"]} />
<Select id="time" label="Uhrzeit" options={[{value:"19",label:"19:00"},{value:"21",label:"21:00"}]} />
```

Six or more options is the threshold for a select over radios.
