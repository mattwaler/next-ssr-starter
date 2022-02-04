export {}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      COOKIE_NAME: string
      COOKIE_PASSWORD: string
      DATABASE: string
      SALT_ROUNDS: string
    }
  }
}
