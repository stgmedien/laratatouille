import type { Dictionary } from './de';

export const en: Dictionary = {
  meta: {
    siteName: 'La Ratatouille',
    home: {
      title: 'La Ratatouille — Mediterranean restaurant in Sanet y Negrals',
      description:
        'Mediterranean cooking on a classical footing in the Marina Alta. Timo Kaiser and Gesine Janasik, Calle Mayor 14, Sanet y Negrals. Tuesday to Saturday, booking advised.',
    },
    menu: {
      title: 'Menu',
      description: 'Entradas and Carne & Pescado: bouillabaisse, foie gras, saltimbocca of milk-fed veal, beef tenderloin. The menu changes with the season.',
    },
    house: {
      title: 'The house',
      description: 'Timo Kaiser and Gesine Janasik, a restaurateur couple with classical training. How we work and where to find us.',
    },
    reserve: {
      title: 'Book a table',
      description: 'Request a table. Few seats; every request is confirmed personally.',
    },
    legal: { title: 'Legal notice', description: 'Operator details and contact.' },
    privacy: { title: 'Privacy', description: 'How we handle your data.' },
  },

  nav: {
    menu: 'Menu',
    house: 'The house',
    reserve: 'Book',
    cta: 'Book a table',
    open: 'Open menu',
    close: 'Close menu',
    call: 'Call us',
    language: 'Language',
    skip: 'Skip to content',
    home: 'Home',
  },

  home: {
    hero: {
      eyebrow: 'Sanet y Negrals · Marina Alta',
      title: 'Mediterranean cooking on a classical footing',
      sub: 'A village house on Calle Mayor, a handful of tables and a kitchen that works from scratch.',
      primary: 'Book a table',
      secondary: 'See the menu',
      imageAlt: 'Guests over wine and conversation in the dining room of La Ratatouille',
    },
    house: {
      eyebrow: 'The house',
      title: 'A restaurateur couple on the Mediterranean',
      intro: 'Timo Kaiser and Gesine Janasik run the house on Calle Mayor together.',
      body: 'Both trained in respected establishments in the Black Forest and spent years deepening the craft in Germany, Austria and Spain. He is at the stove, she runs the dining room.',
      cta: 'About us',
      imageAlt: 'Beef fillet in the pan at the kitchen pass',
    },
    menu: {
      eyebrow: 'From the kitchen',
      title: 'Four dishes from the menu',
      intro: 'An extract. The full menu lives on the menu page.',
      cta: 'See the full menu',
      empty: 'We are reworking the menu. Give us a call and we will tell you what is on today.',
    },
    reviews: {
      eyebrow: 'Guest reviews',
      title: 'What our guests write',
      intro: 'Extracts from reviews left by our guests.',
      cta: 'All reviews on Google',
      translated: 'translated',
    },
    info: {
      eyebrow: 'In the house',
      title: 'Opening hours and booking',
      rows: {
        kitchen: { label: 'Kitchen', value: 'Tue – Thu 19:00 – 21:30\nFri & Sat 13:00 – 14:30 and 19:00 – 21:30' },
        closed: { label: 'Closed', value: 'Sunday and Monday' },
        booking: { label: 'Booking', value: 'The house has few tables. At weekends we suggest a few days’ notice.' },
        languages: { label: 'In the dining room', value: 'German, Spanish, English and French' },
      },
    },
    reserve: {
      eyebrow: 'Reservations',
      title: 'A table for your visit',
      body: 'Write to us or give us a call. We confirm every request personally.',
      cta: 'Request a table',
      call: 'Call us',
      imageAlt: 'Braised meat with its jus, potato gratin and vegetables on the plate',
    },
  },

  menu: {
    eyebrow: 'Menu',
    title: 'Classical cooking, Mediterranean produce',
    intro: 'A menu that travels the Mediterranean and changes with the season. All prices include IVA.',
    imageAlt: 'Cured salmon with leaf salad, sprouts and dill on a laid table',
    allergens:
      'We are glad to talk you through allergens and additives at the table. Please tell us before ordering what you cannot eat.',
    legend: 'Marks used on the menu',
    print: 'Print the menu',
    empty: 'No menu has been published yet.',
    emptyCategory: 'Nothing is on the menu in this category right now.',
    reserveCta: 'Book a table',
  },

  house: {
    hero: {
      eyebrow: 'The house',
      title: 'A married couple, one classical school',
      sub: 'A village house on Calle Mayor, open at midday and in the evening.',
      imageAlt: 'Guests over wine and conversation in the dining room of La Ratatouille',
    },
    story: {
      eyebrow: 'The hosts',
      title: 'Years in the same house',
      body1:
        'Timo Kaiser and Gesine Janasik are a restaurateur couple. Both trained in respected establishments in the Black Forest and then spent years deepening the craft in Germany, Austria and Spain.',
      body2:
        'That both are of the trade shows in the evening: what comes out of the kitchen and what happens in the dining room carry the same hand.',
      imageAlt: 'Guests having dinner in the dining room',
    },
    hosts: {
      eyebrow: 'Kitchen and dining room',
      title: 'Both of the trade',
      intro: 'A restaurateur couple who do not divide the work between them, but share it.',
      chef: {
        name: 'Timo Kaiser',
        role: 'Kitchen',
        body: 'Responsible for the menu and the buying, and at the stove himself every evening.',
      },
      host: {
        name: 'Gesine Janasik',
        role: 'Dining room',
        body: 'Welcomes the guests, advises on the wine and keeps an eye on the whole evening.',
      },
    },
    principles: {
      kitchen: {
        eyebrow: 'Kitchen',
        title: 'Classically worked',
        body: 'Stocks, sauces and marinades are made in house. What needs time gets it — a full dining room does not change that.',
      },
      produce: {
        eyebrow: 'Produce',
        title: 'From the Mediterranean',
        body: 'Fish from the coast, vegetables and olive oil from the Marina Alta, and wines from the region.',
      },
      evening: {
        eyebrow: 'At the table',
        title: 'A handful of tables',
        body: 'The table is yours for as long as you would like to stay. We serve calmly and in an order that suits it.',
      },
    },
    contact: {
      eyebrow: 'Contact',
      title: 'Come and see us',
      address: 'Address',
      hours: 'Kitchen',
      hoursValue: 'Tue – Thu 19:00 – 21:30\nFri & Sat 13:00 – 14:30 and 19:00 – 21:30\nClosed Sunday and Monday',
      phone: 'Phone',
      email: 'Email',
      directions: 'Directions in Google Maps',
      mapAlt: 'Map of Sanet y Negrals with La Ratatouille on Calle Mayor',
      cta: 'Book a table',
    },
  },

  reserve: {
    eyebrow: 'Reservations',
    title: 'A table for you',
    intro: 'The house has few tables — at weekends we suggest a few days’ notice. We confirm every request personally.',
    form: {
      name: 'Name',
      namePlaceholder: 'Your name',
      email: 'Email',
      emailHint: 'for the confirmation',
      emailPlaceholder: 'name@example.com',
      phone: 'Phone',
      phoneHint: 'optional',
      date: 'Date',
      time: 'Time',
      timeHint: 'lunch on Fri & Sat only',
      dateHint: 'closed Sun & Mon',
      guests: 'Guests',
      guestsOne: 'guest',
      guestsMany: 'guests',
      notes: 'Notes',
      notesHint: 'optional',
      notesPlaceholder: 'Allergies, occasion, high chair …',
      privacy: 'I have read the privacy notice and agree that my details may be used to handle this request.',
      submit: 'Send request',
      sending: 'Sending …',
      groupsHint: 'Six or more, please call.',
    },
    success: {
      title: 'Request received',
      body: 'We will get back to you, usually the same day. Please treat the table as booked only once we have replied.',
    },
    errors: {
      generic: 'The request could not be sent. Please give us a call.',
      name: 'Please enter your name.',
      email: 'Please check the email address.',
      date: 'Please choose a date.',
      dateInPast: 'That date is in the past.',
      privacy: 'Please accept the privacy notice.',
      closed: 'We are closed on Sunday and Monday. Please choose another day.',
      lunchClosed: 'We only serve lunch on Friday and Saturday. Please choose an evening time.',
      rateLimit: 'Too many requests have been sent. Please try again later or call us.',
    },
    aside: {
      title: 'Good to know',
      hours: { label: 'Kitchen', value: 'Tue – Thu 19:00 – 21:30\nFri & Sat 13:00 – 14:30 and 19:00 – 21:30' },
      closed: { label: 'Closed', value: 'Sunday and Monday' },
      booking: { label: 'Notice', value: 'At weekends the house is usually fully booked.' },
      languages: { label: 'In the dining room', value: 'German, Spanish, English and French' },
      phoneLabel: 'Rather by phone',
    },
  },

  tags: {
    vegetarian: 'Vegetarian',
    vegan: 'Vegan',
    signature: 'Signature',
  },

  footer: {
    blurb: 'Mediterranean cooking on a classical footing, in a village house in the Marina Alta.',
    hours: 'Kitchen',
    hoursValue: 'Tue – Thu 19:00 – 21:30\nFri & Sat 13:00 – 14:30, 19:00 – 21:30\nClosed Sunday and Monday',
    address: 'Address',
    reservations: 'Reservations',
    email: 'Email',
    legal: 'Legal notice',
    privacy: 'Privacy',
    rights: 'All rights reserved.',
  },

  legal: {
    title: 'Legal notice',
    intro: 'Information provided under the Spanish information society services act (Ley 34/2002, LSSI-CE).',
    operatorHeading: 'Operator',
    contactHeading: 'Contact',
    responsibleHeading: 'Responsible for content',
    disputeHeading: 'Dispute resolution',
    disputeBody:
      'The European Commission provides a platform for online dispute resolution. We are neither obliged nor willing to take part in dispute resolution proceedings before a consumer arbitration board.',
    liabilityHeading: 'Liability for content',
    liabilityBody:
      'The content of these pages was created with care. We cannot guarantee that it is accurate, complete or up to date. The operators of external sites are solely responsible for their content.',
    imagesHeading: 'Image credits and quotations',
    imagesBody:
      'All photography: La Ratatouille. The people shown have consented to publication. The guest reviews are shortened extracts from public reviews; the rights remain with their authors.',
  },

  privacy: {
    title: 'Privacy',
    intro:
      'We process personal data under the General Data Protection Regulation (GDPR) and the Spanish LOPDGDD. This page explains what that means in practice.',
    controllerHeading: 'Controller',
    reservationHeading: 'Booking requests',
    reservationBody:
      'If you use the booking form, your name, email address, optionally your phone number, plus the date, time, number of guests and your notes are sent to us by email. The legal basis is Art. 6(1)(b) GDPR (pre-contractual measures). We do not store the request in a database on this website; it lives only in our mailbox and is deleted as soon as it is no longer needed to handle the booking, and after six months at the latest.',
    hostingHeading: 'Hosting and server logs',
    hostingBody:
      'This website is hosted by Vercel Inc. When pages are requested, the server processes technically necessary data such as IP address, time, requested page and user agent. The legal basis is Art. 6(1)(f) GDPR (secure and reliable operation). Standard contractual clauses are in place for transfers to the USA.',
    cookiesHeading: 'Cookies and tracking',
    cookiesBody:
      'This website sets no analytics or marketing cookies. One technical cookie is used in the protected admin area only and is irrelevant to visitors of the public pages. Your language choice is carried in the page address, not in a cookie.',
    fontsHeading: 'Fonts and map',
    fontsBody:
      'The fonts used are served from our own server; no data is sent to Google. The map on “The house” page is an image from our own server rather than an embedded map — no connection to a third party is made there either. The map data comes from OpenStreetMap.',
    rightsHeading: 'Your rights',
    rightsBody:
      'You have the right to access, rectification, erasure, restriction of processing, data portability and objection. Please write to the address above. You may also lodge a complaint with a supervisory authority — in Spain the Agencia Española de Protección de Datos (aepd.es).',
  },

  notFound: {
    title: 'This page does not exist',
    body: 'The address may have changed. You will find everything from the home page.',
    cta: 'Go to the home page',
  },
};
