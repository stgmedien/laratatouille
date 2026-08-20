/**
 * House facts. Address, phone and e-mail come from the owner; the opening
 * hours, the owners' names and their background are taken from the
 * restaurant's own site (laratatouille.es) and should be re-checked with them
 * before anything here changes.
 *
 * Single source of truth — footer, contact rows, structured data, the
 * reservation form and the reservation e-mail all read from here.
 */
export const HOUSE = {
  name: 'La Ratatouille',
  tagline: 'Cocina mediterránea',
  street: 'Calle Mayor 14',
  postalCode: '03769',
  city: 'Sanet y Negrals',
  region: 'Alicante',
  country: 'ES',
  countryName: 'España',
  phone: '+34 966 408 326',
  phoneHref: '+34966408326',
  email: 'info@laratatouille.es',

  /** Chef and host. */
  chef: 'Timo Kaiser',
  host: 'Gesine Janasik',

  /**
   * Kitchen hours. Sunday and Monday are closed; lunch is served on Friday
   * and Saturday only. Also feeds the schema.org data and the form's
   * closed-day check, so these three stay in step.
   */
  openingHours: [
    { days: ['Tuesday', 'Wednesday', 'Thursday'], opens: '19:00', closes: '21:30' },
    { days: ['Friday', 'Saturday'], opens: '13:00', closes: '14:30' },
    { days: ['Friday', 'Saturday'], opens: '19:00', closes: '21:30' },
  ],

  /** Sunday = 0 … Saturday = 6, matching Date#getDay(). */
  closedWeekdays: [0, 1],
  /** Days on which lunch is served. */
  lunchWeekdays: [5, 6],

  lunchTimes: ['13:00', '13:30', '14:00'],
  dinnerTimes: ['19:00', '19:30', '20:00', '20:30', '21:00'],

  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=La+Ratatouille,+Calle+Mayor+14,+03769+Sanet+y+Negrals,+Alicante',
  /** Where the guest reviews quoted on the site come from. */
  reviewsUrl: 'https://www.google.com/maps/search/?api=1&query=La+Ratatouille+Sanet+y+Negrals',
} as const;

export const ADDRESS_LINES = [
  HOUSE.street,
  `${HOUSE.postalCode} ${HOUSE.city}, ${HOUSE.region}`,
];

export const RESERVATION_TIMES = [...HOUSE.lunchTimes, ...HOUSE.dinnerTimes];
