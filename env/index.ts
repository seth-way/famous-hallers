export const ENV = {
  CRYPTO_SECRET: process.env.CRYPTO_SECRET || "",
  AUTH_SECRET: process.env.AUTH_SECRET || "",
  POSTGRES_DATABASE: process.env.POSTGRES_DATABASE || "",
  POSTGRES_HOST: process.env.POSTGRES_HOST || "",
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD || "",
  POSTGRES_PRISMA_URL: process.env.POSTGRES_PRISMA_URL || "",
  POSTGRES_URL: process.env.POSTGRES_URL || "",
  POSTGRES_URL_NON_POOLING: process.env.POSTGRES_URL_NON_POOLING || "",
  POSTGRES_URL_NO_SSL: process.env.POSTGRES_URL_NO_SSL || "",
  POSTGRES_USER: process.env.POSTGRES_USER || "",
};
