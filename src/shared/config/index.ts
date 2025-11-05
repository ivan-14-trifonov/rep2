// A record of all public environment variables the app needs
const publicEnvs = {
  NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
} as const;

// A type guard to check if a key is a valid public env key
type PublicEnvKey = keyof typeof publicEnvs;

/**
 * Safely retrieves a public environment variable.
 * Throws an error if the variable is not defined.
 * @param key The name of the environment variable.
 * @returns The value of the environment variable.
 */
export const getPublicEnv = (key: PublicEnvKey): string => {
  const value = publicEnvs[key];

  if (typeof value === 'undefined') {
    throw new Error(`[ENV] Missing public environment variable: ${key}. Make sure it's defined in your .env file and prefixed with NEXT_PUBLIC_.`);
  }

  return value;
};

// Export specific variables for direct use, benefiting from the safety check.
export const BACKEND_URL = getPublicEnv('NEXT_PUBLIC_BACKEND_URL');
