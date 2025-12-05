export type NonEmptyString = string & { readonly __brand: 'NonEmptyString' };

export function requireEnv(name: string): NonEmptyString {
  const value = process.env[name];
  if (!value || value.trim() === '')
    throw new Error(`Missing required environment variable: ${name}`);
  return value as NonEmptyString;
}
