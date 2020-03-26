/**
 *
 */
module.exports = {
  city: {
    in: ['query'],
    optional: {
      options: { nullable: true }
    },
    isAlphanumeric: true
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
    isInt: {
      options: {
        isInt: true,
        min: 1
      }
    },
    toInt: true
  },
  orderBy: {
    in: ['query'],
    optional: {
      options: { nullable: true }
    },
    isIn: {
      options: [[
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
    custom: {
      errorMessage: 'Limit parameter is required',
      options: (value, { req }) => !!req.query.limit
    }
  }
}
