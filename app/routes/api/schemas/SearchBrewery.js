/**
 * Schéma de validation des données
 */
module.exports = {
  city: {
    in: ['query'], // Doit appartenir à l'URL
    optional: {
      options: { nullable: true } // Peut ne pas être présent
    },
    isAlphanumeric: true // Est alphanumérique
  },
  country: {
    in: ['query'],
    optional: {
      options: { nullable: true }
    },
    isAlphanumeric: true
  },
  limit: {
    in: ['query'],
    optional: {
      options: { nullable: true }
    },
    isInt: { // Est un int supérieur à 0
      options: {
        isInt: true,
        min: 1
      }
    },
    toInt: true // Conversion de string a int
  },
  orderBy: {
    in: ['query'],
    optional: {
      options: { nullable: true }
    },
    isIn: {
      options: [[ // Doit appartenir au tableau suivant
        'breweries',
        'address1',
        'address2',
        'city',
        'state',
        'code',
        'country',
        'phone',
        'website',
        'filepath',
        'descript',
        'last_mod',
        'coordinates'
      ]]
    }
  },
  page: {
    in: ['query'],
    optional: {
      options: { nullable: true }
    },
    isInt: {
      options: {
        isInt: true,
        min: 0
      }
    },
    toInt: true,
    custom: { // Renvoi un message d'erreur personnalisé
      errorMessage: 'Limit parameter is required',
      options: (value, { req }) => !!req.query.limit
    }
  }
}
