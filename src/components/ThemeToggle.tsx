import { Moon, Sun } from "lucide-react";
import { useTema } from "@/lib/theme";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { tema, alternar } = useTema();
  const escuro = tema === "dark";

  return (
    <button
      type="button"
      onClick={alternar}
      aria-label={escuro ? "Ativar modo claro" : "Ativar modo escuro"}
      title={escuro ? "Modo claro" : "Modo escuro"}
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-card text-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
        className,
      )}
    >
      {escuro ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
