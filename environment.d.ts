declare global {
  namespace NodeJS {
    interface ProcessEnv {
      COOKIE_NAME: string
      COOKIE_PASSWORD: string
      DATABASE_URL: string
      SALT_ROUNDS: string
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}
