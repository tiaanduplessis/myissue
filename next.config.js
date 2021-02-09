module.exports = {
  async redirects() {
    return [
      {
        source: "/bugs/new",
        destination: "/bugs/create",
        permanent: true,
      },
      {
        source: "/bugs/add",
        destination: "/bugs/create",
        permanent: true,
      },
    ]
  },
}
