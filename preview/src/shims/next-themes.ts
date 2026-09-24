/* The preview has no ThemeProvider: the theme is the `.dark` class on an ancestor. */
export function useTheme() {
  const dark = typeof document !== "undefined" && !!document.querySelector(".dark")
  const theme = dark ? "dark" : "light"
  return { theme, resolvedTheme: theme, setTheme: () => {} }
}
