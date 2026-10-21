const FALLBACK_BASE_URL = "https://localhost:8000"

export const getBaseURL = () => {
  const configuredBaseURL = process.env.NEXT_PUBLIC_BASE_URL?.trim()

  if (configuredBaseURL) {
    try {
      const parsedURL = new URL(configuredBaseURL)

      if (parsedURL.protocol === "https:" || parsedURL.protocol === "http:") {
        return parsedURL.toString()
      }
    } catch {
      // An invalid build/runtime URL must not prevent the Worker from starting.
    }

    console.warn("Invalid NEXT_PUBLIC_BASE_URL; using the default base URL")
  }

  return FALLBACK_BASE_URL
}
