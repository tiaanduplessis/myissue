module.exports = {
  async redirects() {
    return [
      {
        source: "/new",
        destination: "/issues/create",
        permanent: true,
      },
      {
        source: "/create",
        destination: "/issues/create",
        permanent: true,
      },
      {
        source: "/add",
        destination: "/issues/create",
        permanent: true,
      },
    ]
  },
}
