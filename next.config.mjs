/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        DATABASE_URL: process.env.DATABASE_URL ?? "",
        SALT_ROUNDS: process.env.SALT_ROUNDS ?? "",
        OPENAI_API_KEY: process.env.OPENAI_API_KEY ?? "",
        RESEND_API_KEY: process.env.RESEND_API_KEY ?? "",
        AUTH_SECRET: process.env.AUTH_SECRET ?? "",
        AUTH_URL: process.env.AUTH_URL ?? "",
        AUTH_GITHUB_ID: process.env.AUTH_GITHUB_ID ?? "",
        AUTH_GITHUB_SECRET: process.env.AUTH_GITHUB_SECRET ?? "",
        AUTH_GOOGLE_ID: process.env.AUTH_GOOGLE_ID ?? "",
        AUTH_GOOGLE_SECRET: process.env.AUTH_GOOGLE_SECRET ?? "",
        AUTH_TRUST_HOST: process.env.AUTH_TRUST_HOST ?? "",
    },
    reactStrictMode: false,
};

export default nextConfig;
