interface IConfig {
    host: string
    port: number|string
    origin: string
}

const config : IConfig = {
    host: process.env.DB_HOST || '',
    port: process.env.PORT || 5001,
    origin: process.env.APP_CORS || ''
}

export default config