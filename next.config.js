/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
            {
                hostname:"utfs.io"
            },
            {
                hostname:"lh3.googleusercontent.com"
            },
            {
                hostname:"avatars.githubusercontent.com"
            }
        ]
    },
    typescript: {
        ignoreBuildErrors: true,
      },
}

module.exports = nextConfig
