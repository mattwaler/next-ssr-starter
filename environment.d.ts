declare global {
  namespace NodeJS {

    interface ProcessEnv {
      COOKIE_NAME: string
      COOKIE_PASSWORD: string
      DATABASE: string
      DO_BUCKET: string
      DO_ENDPOINT: string
      DO_KEY: string
      DO_SECRET: string
      SALT_ROUNDS: string
    }

  }
}

export {}
