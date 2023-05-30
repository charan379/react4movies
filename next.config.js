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
                        value: "connect-src 'self' vitals.vercel-insights.com localhost:3001 moviebunkers-api.onrender.com oxoziko43a.execute-api.ap-southeast-1.amazonaws.com"
                    }
                ]
            }
        ];
    },
}

module.exports = nextConfig
