import { Moon, Sun } from "lucide-react"
import { useTheme } from "./ThemeProvider"
import { Button } from "./ui/button"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      className="rounded-full w-9 h-9 border border-transparent hover:border-black/10 dark:hover:border-white/10 dark:text-zinc-300 text-zinc-600 hover:text-black dark:hover:text-white"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      title="Alternar Tema"
      aria-label="Alternar modo escuro ou claro"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Alternar tema</span>
    </Button>
  )
}
