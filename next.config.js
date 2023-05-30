/** @type {import('next').NextConfig} */
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
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'Content-Security-Policy',
                        value: "connect-src 'self' vitals.vercel-insights.com http://localhost:3001 https://react4movies.vercel.app"
                    }
                ]
            }
        ];
    },
}

module.exports = nextConfig
