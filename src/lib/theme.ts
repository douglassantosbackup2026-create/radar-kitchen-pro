import { useEffect, useState } from "react";

export type Tema = "light" | "dark";

export const TEMA_KEY = "fv-theme";

export function aplicarTema(tema: Tema) {
  const root = document.documentElement;
  root.classList.toggle("dark", tema === "dark");
  root.style.colorScheme = tema;
}

export function lerTema(): Tema {
  if (typeof window === "undefined") return "dark";
  const salvo = window.localStorage.getItem(TEMA_KEY);
  return salvo === "light" || salvo === "dark" ? salvo : "dark";
}

/** Script inline aplicado antes da hidratação para evitar flash de tema. */
export const temaScript = `(function(){try{var t=localStorage.getItem("${TEMA_KEY}");if(t!=="light"){t="dark"}document.documentElement.classList.toggle("dark",t==="dark");document.documentElement.style.colorScheme=t}catch(e){document.documentElement.classList.add("dark")}})();`;

export function useTema() {
  const [tema, setTema] = useState<Tema>("dark");

  useEffect(() => {
    const inicial = lerTema();
    setTema(inicial);
    aplicarTema(inicial);
  }, []);

  const alternar = () => {
    setTema((atual) => {
      const proximo: Tema = atual === "dark" ? "light" : "dark";
      try {
        window.localStorage.setItem(TEMA_KEY, proximo);
      } catch {
        /* storage indisponível */
      }
      aplicarTema(proximo);
      return proximo;
    });
  };

  return { tema, alternar };
}
