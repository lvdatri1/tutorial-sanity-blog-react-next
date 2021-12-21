const sanityClient = require('@sanity/client')

const client = sanityClient({
  projectId: "xm9rhw6h",
  dataset: "production",
  apiVersion: "2021-08-31", // use a UTC date string
  token: "", // or leave blank for unauthenticated usage
  useCdn: false, // `false` if you want to ensure fresh data
});

module.exports = client;