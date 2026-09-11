export const getDbConnectionString = () => {
  if (
    !process.env.POSTGRES_USER ||
    !process.env.POSTGRES_PASSWORD ||
    !process.env.POSTGRES_DB ||
    !process.env.POSTGRES_PORT
  ) {
    throw new Error(
      '🫙‼️ One or more required DB environment variables are not set'
    )
  }

  const url = `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@localhost:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`
  return url
}
