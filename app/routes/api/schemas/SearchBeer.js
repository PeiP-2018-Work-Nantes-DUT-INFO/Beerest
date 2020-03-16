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
      },
    }
  }