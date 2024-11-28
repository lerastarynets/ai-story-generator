/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        DATABASE_URL: process.env.DATABASE_URL ?? "",
        SALT_ROUNDS: process.env.SALT_ROUNDS ?? "",
        OPENAI_API_KEY: process.env.OPENAI_API_KEY ?? "",
        RESEND_API_KEY: process.env.RESEND_API_KEY ?? "",
        AUTH_SECRET: process.env.AUTH_SECRET ?? "",
        NEXTAUTH_URL: process.env.NEXTAUTH_URL ?? "",
    },
    reactStrictMode: false,
};

export default nextConfig;
