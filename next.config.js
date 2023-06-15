// /** @type {import('next').NextConfig} */

const withPWA = require("next-pwa")({
    dest: "public",
    disable:
        process.env.NODE_ENV === "development"
    // disable is help to disable PWA in deployment mode
});


const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['image.tmdb.org'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'image.tmdb.org',
                port: '',
                pathname: '/t/p/*/*',

            },
        ],
    },
}

module.exports = withPWA(nextConfig)
