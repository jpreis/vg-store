/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/shop/1",
        permanent: true,
      },
      {
        source: "/shop",
        destination: "/shop/1",
        permanent: true,
      },
    ];
  },
};
