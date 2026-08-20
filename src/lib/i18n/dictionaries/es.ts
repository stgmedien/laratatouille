import type { Dictionary } from './de';

export const es: Dictionary = {
  meta: {
    siteName: 'La Ratatouille',
    home: {
      title: 'La Ratatouille — Restaurante mediterráneo en Sanet y Negrals',
      description:
        'Cocina mediterránea de oficio clásico en la Marina Alta. Timo Kaiser y Gesine Janasik, Calle Mayor 14, Sanet y Negrals. De martes a sábado, se recomienda reservar.',
    },
    menu: {
      title: 'Carta',
      description: 'Entradas y Carne & Pescado: bullabesa, foie gras, saltimbocca de ternera lechal, solomillo. La carta cambia con la temporada.',
    },
    house: {
      title: 'La casa',
      description: 'Timo Kaiser y Gesine Janasik, formados en la Selva Negra, antes al frente del Ikarus en Dénia. Cómo trabajamos y dónde encontrarnos.',
    },
    reserve: {
      title: 'Reservar',
      description: 'Solicite una mesa. Pocas plazas; confirmamos cada solicitud personalmente.',
    },
    legal: { title: 'Aviso legal', description: 'Datos del titular y contacto.' },
    privacy: { title: 'Privacidad', description: 'Cómo tratamos sus datos.' },
  },

  nav: {
    menu: 'Carta',
    house: 'La casa',
    reserve: 'Reservar',
    cta: 'Reservar',
    open: 'Abrir menú',
    close: 'Cerrar menú',
    call: 'Llamar',
    language: 'Idioma',
    skip: 'Ir al contenido',
    home: 'Inicio',
  },

  home: {
    hero: {
      eyebrow: 'Sanet y Negrals · Marina Alta',
      title: 'Cocina mediterránea sobre una base clásica',
      sub: 'Una casa de pueblo en la Calle Mayor, pocas mesas y una cocina que trabaja desde la base.',
      primary: 'Reservar mesa',
      secondary: 'Ver la carta',
      imageAlt: 'Clientes con vino y conversación en el comedor de La Ratatouille',
    },
    house: {
      eyebrow: 'La casa',
      title: 'Formados en la Selva Negra, cocinando en el Mediterráneo',
      intro: 'Timo Kaiser y Gesine Janasik llevan la casa de la Calle Mayor.',
      body: 'Ambos se formaron en establecimientos de prestigio de la Selva Negra y siguieron puliendo el oficio en Alemania, Austria y España. Antes de La Ratatouille estuvieron al frente del Ikarus en Dénia.',
      cta: 'Sobre nosotros',
      imageAlt: 'Solomillo de ternera en la sartén, en el pase de la cocina',
    },
    menu: {
      eyebrow: 'Desde la cocina',
      title: 'Cuatro platos de la carta',
      intro: 'Un extracto. La carta completa está en la página de la carta.',
      cta: 'Ver la carta completa',
      empty: 'Estamos revisando la carta. Llámenos y le contamos qué hay hoy.',
    },
    reviews: {
      eyebrow: 'Opiniones',
      title: 'Lo que escriben nuestros clientes',
      intro: 'Extractos de las valoraciones de nuestros clientes.',
      cta: 'Todas las opiniones en Google',
    },
    info: {
      eyebrow: 'En la casa',
      title: 'Horario y reservas',
      rows: {
        kitchen: { label: 'Cocina', value: 'Ma – Ju 19:00 – 21:30\nVi & Sá 13:00 – 14:30 y 19:00 – 21:30' },
        closed: { label: 'Días de cierre', value: 'Domingo y lunes' },
        booking: { label: 'Reservas', value: 'La casa tiene pocas mesas. Los fines de semana conviene reservar con algunos días de antelación.' },
        languages: { label: 'En el comedor', value: 'Alemán, español, inglés y francés' },
      },
    },
    reserve: {
      eyebrow: 'Reservas',
      title: 'Una mesa para su velada',
      body: 'Escríbanos o llámenos. Confirmamos cada solicitud personalmente.',
      cta: 'Solicitar mesa',
      call: 'Llamar',
      imageAlt: 'Carne estofada con su jugo, gratén de patata y verduras en el plato',
    },
  },

  menu: {
    eyebrow: 'Carta',
    title: 'Cocina clásica, producto mediterráneo',
    intro: 'Una carta que recorre el Mediterráneo y cambia con la temporada. Todos los precios incluyen IVA.',
    imageAlt: 'Carpaccio de ternera con rúcula, parmesano y piñones',
    allergens:
      'Le informamos con gusto sobre alérgenos y aditivos en la mesa. Díganos antes de pedir qué no puede comer.',
    legend: 'Indicaciones de la carta',
    print: 'Imprimir la carta',
    empty: 'De momento no hay ninguna carta publicada.',
    emptyCategory: 'En esta categoría no hay nada en la carta ahora mismo.',
    reserveCta: 'Reservar mesa',
  },

  house: {
    hero: {
      eyebrow: 'La casa',
      title: 'Dos anfitriones, una escuela clásica',
      sub: 'Una casa de pueblo en la Calle Mayor, una cocina entre la bullabesa y el ibérico.',
      imageAlt: 'El pase de la cocina de La Ratatouille durante el servicio',
    },
    story: {
      eyebrow: 'Los anfitriones',
      title: 'Timo Kaiser y Gesine Janasik',
      body1:
        'Ambos se formaron en establecimientos de prestigio de la Selva Negra y después profundizaron en su oficio en Alemania, Austria y España.',
      body2:
        'Antes de La Ratatouille estuvieron al frente del Ikarus en Dénia. Hoy Timo Kaiser está en los fogones y Gesine Janasik lleva el comedor — en alemán, español, inglés y francés.',
      imageAlt: 'Clientes cenando en el comedor',
    },
    principles: {
      kitchen: {
        eyebrow: 'Cocina',
        title: 'Oficio clásico',
        body: 'Fondos, salsas y marinadas se elaboran en casa. Bullabesa con rouille, confitados, saltimbocca — elaboraciones que necesitan su tiempo.',
      },
      produce: {
        eyebrow: 'Producto',
        title: 'Del Mediterráneo',
        body: 'Pescado de la costa, verdura y aceite de oliva de la Marina Alta, y vinos de la comarca.',
      },
      evening: {
        eyebrow: 'La velada',
        title: 'Pocas mesas',
        body: 'La mesa es suya toda la velada. Servimos con calma y en un orden que lo acompaña.',
      },
    },
    contact: {
      eyebrow: 'Contacto',
      title: 'Venga a vernos',
      address: 'Dirección',
      hours: 'Cocina',
      hoursValue: 'Ma – Ju 19:00 – 21:30\nVi & Sá 13:00 – 14:30 y 19:00 – 21:30\nDomingo y lunes cerrado',
      phone: 'Teléfono',
      email: 'Correo electrónico',
      directions: 'Cómo llegar en Google Maps',
      cta: 'Reservar mesa',
    },
  },

  reserve: {
    eyebrow: 'Reservas',
    title: 'Una mesa para usted',
    intro: 'La casa tiene pocas mesas — los fines de semana conviene reservar con algunos días de antelación. Confirmamos cada solicitud personalmente.',
    form: {
      name: 'Nombre',
      namePlaceholder: 'Su nombre',
      email: 'Correo electrónico',
      emailHint: 'para la confirmación',
      emailPlaceholder: 'nombre@ejemplo.es',
      phone: 'Teléfono',
      phoneHint: 'opcional',
      date: 'Fecha',
      time: 'Hora',
      timeHint: 'mediodía solo vi & sá',
      guests: 'Personas',
      guestsOne: 'persona',
      guestsMany: 'personas',
      notes: 'Comentarios',
      notesHint: 'opcional',
      notesPlaceholder: 'Alergias, ocasión, trona …',
      privacy: 'He leído la política de privacidad y acepto que mis datos se usen para gestionar la solicitud.',
      submit: 'Enviar solicitud',
      sending: 'Enviando …',
      groupsHint: 'A partir de seis personas, por teléfono.',
    },
    success: {
      title: 'Solicitud recibida',
      body: 'Le responderemos, por lo general el mismo día. Por favor, considere la mesa reservada solo después de nuestra respuesta.',
    },
    errors: {
      generic: 'No se ha podido enviar la solicitud. Por favor, llámenos.',
      name: 'Por favor, indique su nombre.',
      email: 'Por favor, revise la dirección de correo.',
      date: 'Por favor, elija una fecha.',
      dateInPast: 'La fecha está en el pasado.',
      privacy: 'Por favor, acepte la política de privacidad.',
      closed: 'Domingo y lunes cerramos. Por favor, elija otro día.',
      lunchClosed: 'Al mediodía solo abrimos viernes y sábado. Por favor, elija una hora de noche.',
      rateLimit: 'Se han enviado demasiadas solicitudes. Inténtelo más tarde o llámenos.',
    },
    aside: {
      title: 'Conviene saber',
      hours: { label: 'Cocina', value: 'Ma – Ju 19:00 – 21:30\nVi & Sá 13:00 – 14:30 y 19:00 – 21:30' },
      closed: { label: 'Días de cierre', value: 'Domingo y lunes' },
      booking: { label: 'Antelación', value: 'Los fines de semana la casa suele estar completa.' },
      languages: { label: 'En el comedor', value: 'Alemán, español, inglés y francés' },
      phoneLabel: 'Mejor por teléfono',
    },
  },

  tags: {
    vegetarian: 'Vegetariano',
    vegan: 'Vegano',
    signature: 'Signature',
  },

  footer: {
    blurb: 'Cocina mediterránea de oficio clásico en una casa de pueblo de la Marina Alta.',
    hours: 'Cocina',
    hoursValue: 'Ma – Ju 19:00 – 21:30\nVi & Sá 13:00 – 14:30, 19:00 – 21:30\nDomingo y lunes cerrado',
    address: 'Dirección',
    reservations: 'Reservas',
    email: 'Correo electrónico',
    legal: 'Aviso legal',
    privacy: 'Privacidad',
    rights: 'Todos los derechos reservados.',
  },

  legal: {
    title: 'Aviso legal',
    intro: 'Datos facilitados en cumplimiento de la Ley 34/2002 de servicios de la sociedad de la información (LSSI-CE).',
    operatorHeading: 'Titular',
    operatorNote: 'Complete aquí la denominación completa y el NIF/CIF.',
    contactHeading: 'Contacto',
    responsibleHeading: 'Responsable de contenidos',
    disputeHeading: 'Resolución de litigios',
    disputeBody:
      'La Comisión Europea ofrece una plataforma de resolución de litigios en línea. No estamos obligados ni dispuestos a participar en un procedimiento de arbitraje ante una junta de consumo.',
    liabilityHeading: 'Responsabilidad sobre los contenidos',
    liabilityBody:
      'Los contenidos de estas páginas se han elaborado con cuidado. No podemos garantizar su exactitud, integridad ni actualidad. De los contenidos de los enlaces externos responden exclusivamente sus titulares.',
    imagesHeading: 'Créditos fotográficos y citas',
    imagesBody:
      'Todas las fotografías: La Ratatouille. Las personas que aparecen han dado su consentimiento para la publicación. Las opiniones son extractos abreviados de valoraciones públicas; los derechos corresponden a sus autores.',
  },

  privacy: {
    title: 'Privacidad',
    intro:
      'Tratamos los datos personales conforme al Reglamento General de Protección de Datos (RGPD) y a la LOPDGDD española. Esta página explica qué significa en concreto.',
    controllerHeading: 'Responsable del tratamiento',
    reservationHeading: 'Solicitudes de reserva',
    reservationBody:
      'Si utiliza el formulario de reserva, su nombre, su correo electrónico, opcionalmente su teléfono, así como la fecha, la hora, el número de personas y sus comentarios se nos envían por correo electrónico. La base jurídica es el art. 6.1 b) RGPD (medidas precontractuales). No guardamos la solicitud en ninguna base de datos de esta web; queda únicamente en nuestro buzón de correo y se elimina en cuanto deja de ser necesaria para la gestión, como máximo a los seis meses.',
    hostingHeading: 'Alojamiento y registros del servidor',
    hostingBody:
      'Esta web está alojada en Vercel Inc. Al consultar las páginas, el servidor trata datos técnicamente necesarios como la dirección IP, la hora, la página solicitada y el user agent. La base jurídica es el art. 6.1 f) RGPD (funcionamiento seguro y sin incidencias). Para la transferencia a EE. UU. existen cláusulas contractuales tipo.',
    cookiesHeading: 'Cookies y seguimiento',
    cookiesBody:
      'Esta web no utiliza cookies de análisis ni de marketing. Solo se emplea una cookie técnica en el área de administración protegida, irrelevante para quien visita las páginas públicas. Su elección de idioma se refleja en la dirección de la página, no en una cookie.',
    fontsHeading: 'Tipografías y mapa',
    fontsBody:
      'Las tipografías se sirven desde nuestro propio servidor; no se transmiten datos a Google. El plano de la página «La casa» se carga desde OpenStreetMap, lo que comunica su dirección IP a OpenStreetMap.',
    rightsHeading: 'Sus derechos',
    rightsBody:
      'Tiene derecho de acceso, rectificación, supresión, limitación del tratamiento, portabilidad y oposición. Diríjase para ello a la dirección indicada arriba. Además puede presentar una reclamación ante una autoridad de control, en España la Agencia Española de Protección de Datos (aepd.es).',
  },

  notFound: {
    title: 'Esta página no existe',
    body: 'Puede que la dirección haya cambiado. Desde el inicio encontrará todo.',
    cta: 'Ir al inicio',
  },
};
