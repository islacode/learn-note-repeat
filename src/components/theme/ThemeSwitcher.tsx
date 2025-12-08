'use client';
import { useThemeSwitcher } from '@/components/theme/hooks';

export default function ThemeSwitcher() {
  const {
    activeId,
    activeIndex,
    applySelection,
    btnRef,
    buttonId,
    closeListbox,
    colorSchemes,
    currentScheme,
    labelId,
    listboxId,
    listboxIsOpen,
    listRef,
    mode,
    onButtonKeyDown,
    onListboxKeyDown,
    openListbox,
    selectedIndex,
    setActiveIndex,
    toggleMode,
  } = useThemeSwitcher();

  return (
    <div className="flex items-center gap-3">
      {/* Listbox label for a11y */}
      <span id={labelId} className="sr-only">
        Color scheme
      </span>

      {/* Button + popup wrapped so the popup can be absolutely positioned */}
      <div className="relative">
        {/* Trigger button shows current scheme label + swatches */}
        <button
          ref={btnRef}
          id={buttonId}
          type="button"
          aria-haspopup="listbox"
          aria-expanded={listboxIsOpen}
          aria-controls={listboxId}
          aria-labelledby={`${labelId} ${buttonId}`}
          onClick={() => (listboxIsOpen ? closeListbox() : openListbox())}
          onKeyDown={onButtonKeyDown}
          className="btn gap-2 cursor-pointer"
        >
          <span>{currentScheme.label}</span>
          <span className="inline-flex items-center gap-1" aria-hidden>
            {currentScheme.swatches.slice(0, 5).map((hex) => (
              <span
                key={hex}
                className="h-4 w-4 rounded border"
                style={{ background: hex, borderColor: 'var(--border)' }}
              />
            ))}
          </span>
        </button>

        {/* Popup listbox with swatch-rich options */}
        {listboxIsOpen && (
          <div
            ref={listRef}
            id={listboxId}
            role="listbox"
            tabIndex={-1}
            aria-labelledby={labelId}
            aria-activedescendant={activeId}
            className="z-50 max-h-64 w-72 overflow-auto rounded-lg border border-[var(--border)] absolute left-0 top-full mt-2 bg-[var(--surface)] p-1 shadow-lg focus:outline-none space-y-1"
            onKeyDown={onListboxKeyDown}
          >
            {colorSchemes.map((s, i) => {
              const optId = `${listboxId}-opt-${i}`;
              const selected = i === selectedIndex;
              const active = i === activeIndex;
              return (
                <div
                  key={s.key}
                  id={optId}
                  role="option"
                  aria-selected={selected}
                  onMouseEnter={() => setActiveIndex(i)}
                  onMouseDown={(e) => e.preventDefault()} // prevent blur before click
                  onClick={() => applySelection(i)}
                  className={[
                    'flex cursor-pointer items-center justify-between gap-2 rounded-md px-2 py-2',
                    selected ? 'ring-1 ring-[var(--border-strong)]' : '',
                    active ? 'bg-[var(--bg-alt)]' : 'hover:bg-[var(--surface)]',
                  ].join(' ')}
                >
                  <span className="text-sm text-[var(--text)]">{s.label}</span>
                  <span className="inline-flex items-center gap-1" aria-hidden>
                    {s.swatches.map((hex) => (
                      <span
                        key={hex}
                        className="h-4 w-4 rounded border"
                        style={{ background: hex, borderColor: 'var(--border)' }}
                        title={hex}
                      />
                    ))}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Light/Dark toggle (unchanged behavior) */}
      <button
        type="button"
        onClick={toggleMode}
        className="btn cursor-pointer"
        aria-pressed={mode === 'dark'}
        aria-label="Toggle dark mode"
      >
        {mode === 'dark' ? 'Dark' : 'Light'}
      </button>
    </div>
  );
}
