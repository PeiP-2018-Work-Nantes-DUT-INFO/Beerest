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
  degAbove: {
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
    custom: {
      errorMessage: 'Limit parameter is required',
      options: (value, { req }) => !!req.query.limit
    }
  }
}
