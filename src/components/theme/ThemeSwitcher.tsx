'use client';
import { useTheme } from './ThemeProvider';

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const themes = [
    {
      key: 'neonNights',
      name: 'Neon Nights',
      swatches: ['#FDF4FF', '#FAE8FF', '#F5D0FE', '#F0ABFC', '#E879F9'],
    },
    {
      key: 'arcticAurora',
      name: 'Arctic Aurora',
      swatches: ['#f0fdfa', '#ccfbf1', '#99f6e4', '#5eead4', '#2dd4bf'],
    },
  ] as const;

  return (
    <div className="inline-flex items-center gap-2" role="group" aria-label="Theme switcher">
      {themes.map((t) => (
        <button
          key={t.key}
          type="button"
          onClick={() => setTheme(t.key as typeof theme)}
          aria-pressed={theme === t.key}
          className="inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm
                     border-[color:var(--border)] bg-[color:var(--bg-alt)] hover:bg-[color:var(--surface)]"
          title={`Switch to ${t.name}`}
        >
          <span className="inline-flex gap-1">
            {t.swatches.map((hex) => (
              <span
                key={hex}
                className="h-4 w-4 rounded border"
                style={{ background: hex, borderColor: 'var(--border-strong)' }}
                aria-hidden
              />
            ))}
          </span>
          <span className="sr-only">{t.name}</span>
          <span aria-hidden>{t.name}</span>
        </button>
      ))}
    </div>
  );
}
