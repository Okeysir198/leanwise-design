const cx = (...a) => a.filter(Boolean).join(" ");


/** 2-4 mutually exclusive views. Above four, use Select — a segmented control
 *  that scrolls has stopped being a segmented control. */
export function Segmented({ options = [], value, onChange, label, className, ...rest }) {
  return (
    <div className={cx("lw-segmented", className)} role="group" aria-label={label} {...rest}>
      {options.map(o => {
        const v = typeof o === "string" ? o : o.value;
        const l = typeof o === "string" ? o : o.label;
        return (
          <button key={v} type="button" aria-pressed={value === v} onClick={() => onChange && onChange(v)}>{l}</button>
        );
      })}
    </div>
  );
}
