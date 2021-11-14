declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGODB_CNN: string,
      PORT?: string;
      SECRET: string;
    }
  }
}

export { }