import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

/** Subscribe to postgres_changes and invalidate a React Query key. */
export function useRealtimeTable(table: string, queryKey: string[]) {
  const qc = useQueryClient();

  useEffect(() => {
    const channel = supabase
      .channel(`rt-${table}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table },
        () => {
          void qc.invalidateQueries({ queryKey });
        },
      )
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [table, qc, queryKey.join("|")]);
}
