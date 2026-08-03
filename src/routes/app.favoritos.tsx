import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/app/favoritos")({
  beforeLoad: () => {
    throw redirect({ to: "/app/oportunidades", search: { fav: true } });
  },
  component: () => null,
});
