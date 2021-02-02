module.exports = {
    async redirects() {
      return [
        {
          source: '/new',
          destination: '/issues/add',
          permanent: true,
        },
        {
            source: '/add',
            destination: '/issues/add',
            permanent: true,
        },
      ]
    },
  }