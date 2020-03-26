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
  degAbove: {
    in: ['query'],
    optional: {
      options: { nullable: true }
    },
    isFloat: { // Est un float compris entre 0 et 100
      options: {
        isFloat: true,
        min: 0,
        max: 100
      }
    },
    toFloat: true // Conversion de string a float
  },
  degBelow: {
    in: ['query'],
    optional: {
      options: { nullable: true }
    },
    isFloat: {
      options: {
        isFloat: true,
        min: 0,
        max: 100
      }
    },
    toFloat: true
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
    isIn: { // Doit appartenir au tableau suivant
      options: [[
        'name',
        'id',
        'brewery_id',
        'cat_id',
        'style_id',
        'alcohol_by_volume',
        'international_bitterness_units ',
        'standard_reference_method',
        'universal_product_code',
        'filepath',
        'description',
        'add_user',
        'last_mod',
        'style',
        'category',
        'brewer',
        'address',
        'city',
        'state',
        'country',
        'coordinates',
        'website'
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
