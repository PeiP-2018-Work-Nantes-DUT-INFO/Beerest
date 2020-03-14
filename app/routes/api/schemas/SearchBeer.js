module.exports = {
    degAbove: {
      in: ['query'],
      optional: { 
        options: { nullable: true }
      },
      isFloat: {
        options: {
          isInt: true,
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
          isInt: true,
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
      toInt: true
    }
  }