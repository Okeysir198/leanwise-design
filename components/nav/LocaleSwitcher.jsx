"use client";
import * as React from "react";
import { Icon } from "../primitives/Icon.jsx";
import { Menu } from "../overlays/Menu.jsx";
import { useRadioGroup } from "../_radio-group.js";
const cx = (...a) => a.filter(Boolean).join(" ");

/**
 * Which language the interface is in.
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * SHAPED ON `ThemeToggle`, WITH ONE DELIBERATE DIFFERENCE
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Same problem: a small persistent preference that belongs in the chrome, needs
 * a wide form and a narrow one, and must not be the thing that drags a 375px
 * bar sideways. So: `Segmented` when there is room, something small when there
 * is not, `value`/`onChange`, and display text as props.
 *
 * ⚠️ THE NARROW FORM IS A MENU, NOT A CYCLE. `ThemeToggle compact` cycles,
 * because the three themes are guessable and a wrong guess costs one more
 * press. A language is neither: a reader who does not read the CURRENT language
 * cannot predict what the next press gives them, and if they overshoot they
 * must cycle through languages they cannot read to get back. Every option has
 * to be visible before it is chosen — so the compact form opens a menu that
 * lists them, and the trigger names the current language rather than the next.
 *
 * ⚠️ OPTION LABELS ARE ENDONYMS, and are the consumer's. "Tiếng Việt", not
 * "Vietnamese" — a person looking for their own language looks for its name in
 * that language, which is the one string they can definitely read on a screen
 * they cannot otherwise navigate. This component ships no language names at
 * all: a design system that shipped a list of endonyms would be shipping a
 * political claim about which languages exist and how they are spelt.
 *
 * ⚠️ IT DOES NOT PERSIST, unlike `ThemeToggle`. A theme is a device preference
 * and localStorage is its home. A language usually belongs to the ACCOUNT — the
 * server has an opinion, it should win across devices, and writing it behind
 * the app's back would fight that. `value`/`onChange` only, and the app decides
 * where the answer lives.
 */
export function LocaleSwitcher({
  value,
  onChange,
  locales = [],
  localeLabels = {},
  label = "Language",
  compact = false,
  className,
  ...rest
}) {
  const codes = locales.length ? locales : Object.keys(localeLabels);
  const nameOf = (code) => localeLabels[code] || code;
  const apply = (code) => code !== value && onChange?.(code);

  if (compact) {
    return (
      <Menu
        label={label}
        placement="bottom-end"
        items={codes.map((code) => ({
          value: code,
          label: nameOf(code),
          /* `checked` makes each row a `menuitemcheckbox`, so the current
             language is announced as checked rather than merely styled. */
          checked: code === value,
          onSelect: () => apply(code),
        }))}
        trigger={
          <button
            type="button"
            className={cx("lw-icon-btn", "lw-hit", "lw-locale-compact", className)}
            /* Names the CURRENT language, not the next one. A control labelled
               with its destination reads as a label, and leaves a user unable
               to tell which language they are already in. */
            aria-label={label + ": " + nameOf(value)}
            title={label + ": " + nameOf(value)}
            data-testid="locale-compact"
            {...rest}
          >
            <Icon name="globe" size={18} />
          </button>
        }
      />
    );
  }

  const { ref, onKeyDown, tabIndexFor } = useRadioGroup(codes, value, apply);
  return (
    <div
      ref={ref}
      className={cx("lw-segmented", className)}
      role="radiogroup"
      aria-label={label}
      onKeyDown={onKeyDown}
      data-testid="locale-switcher"
      {...rest}
    >
      {codes.map((code, i) => (
        <button
          key={code}
          type="button"
          role="radio"
          aria-checked={value === code}
          tabIndex={tabIndexFor(i)}
          onClick={() => apply(code)}
          /* `lang` on the option, so a screen reader pronounces "Tiếng Việt"
             with Vietnamese phonetics rather than reading it as English. */
          lang={code}
        >
          {nameOf(code)}
        </button>
      ))}
    </div>
  );
}
