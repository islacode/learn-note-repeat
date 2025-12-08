import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { useTheme } from './ThemeProvider';
import rawSchemes from './themes.json';

export type SchemeKey = 'neonNights' | 'arcticAurora';

export type Scheme = {
  key: SchemeKey;
  label: string;
  swatches: string[];
};

export function useThemeSwitcher() {
  const { scheme, setScheme, mode, toggleMode } = useTheme();
  const colorSchemes = rawSchemes as unknown as Scheme[];

  const buttonId = useId();
  const listboxId = useId();
  const labelId = useId();

  const btnRef = useRef<HTMLButtonElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  const [listboxIsOpen, setListboxIsOpen] = useState(false);
  const selectedIndex = useMemo(
    () =>
      Math.max(
        0,
        colorSchemes.findIndex((s) => s.key === scheme),
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [scheme],
  );
  const [activeIndex, setActiveIndex] = useState<number>(selectedIndex);

  // Close on outside click
  useEffect(() => {
    if (!listboxIsOpen) return;
    const closeOnOutsidePointerDown = (e: MouseEvent) => {
      const t = e.target as Node;
      if (btnRef.current?.contains(t)) return;
      if (listRef.current?.contains(t)) return;
      setListboxIsOpen(false);
    };
    const closeOnDocumentScroll = () => setListboxIsOpen(false);
    document.addEventListener('mousedown', closeOnOutsidePointerDown);
    document.addEventListener('scroll', closeOnDocumentScroll, true);
    return () => {
      document.removeEventListener('mousedown', closeOnOutsidePointerDown);
      document.removeEventListener('scroll', closeOnDocumentScroll, true);
    };
  }, [listboxIsOpen]);

  function openListbox() {
    setActiveIndex(selectedIndex);
    setListboxIsOpen(true);
    // Focus the listbox container next tick (assistive tech & arrows)
    requestAnimationFrame(() => listRef.current?.focus());
  }

  function closeListbox() {
    setListboxIsOpen(false);
    btnRef.current?.focus();
  }

  function onButtonKeyDown(e: React.KeyboardEvent<HTMLButtonElement>) {
    // Why: quick keyboard access to open and focus listbox
    if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openListbox();
    }
  }

  function onListboxKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === 'Escape') {
      e.preventDefault();
      closeListbox();
      return;
    }
    if (e.key === 'Tab') {
      setListboxIsOpen(false);
      return;
    }
    if (e.key === 'Home') {
      e.preventDefault();
      setActiveIndex(0);
      return;
    }
    if (e.key === 'End') {
      e.preventDefault();
      setActiveIndex(colorSchemes.length - 1);
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % colorSchemes.length);
      return;
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => (i - 1 + colorSchemes.length) % colorSchemes.length);
      return;
    }
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      applySelection(activeIndex);
      return;
    }
  }

  function applySelection(index: number) {
    const s = colorSchemes[index] ?? colorSchemes[0];
    setScheme(s.key);
    setListboxIsOpen(false);
    btnRef.current?.focus();
  }

  const currentScheme = colorSchemes[selectedIndex] ?? colorSchemes[0];
  const activeId = `${listboxId}-opt-${activeIndex}`;

  return {
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
  };
}
