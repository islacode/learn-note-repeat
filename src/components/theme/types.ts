import rawSchemes from './themes';

export type Scheme = (typeof rawSchemes)[number]['key'];

const SCHEME_KEYS = rawSchemes.map((s) => s.key) as Scheme[];

export function isScheme(value: unknown): value is Scheme {
  return SCHEME_KEYS.includes(value as Scheme);
}

export const MODES = ['light', 'dark'] as const;

export type Mode = (typeof MODES)[number];

export function isMode(value: unknown): value is Mode {
  return MODES.includes(value as Mode);
}

export type ThemeCtx = {
  scheme: Scheme;
  mode: Mode;
  setScheme: (s: Scheme) => void;
  toggleMode: () => void;
};
