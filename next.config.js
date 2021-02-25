const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
})

const config = {
  pageExtensions: ["js", "jsx", "mdx"],
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
      {
        source: "/feature/new",
        destination: "/feature/create",
        permanent: true,
      },
      {
        source: "/feature/add",
        destination: "/feature/create",
        permanent: true,
      },
    ]
  },
}

module.exports = withMDX(config)
