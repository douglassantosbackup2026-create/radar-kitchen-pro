import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/lp")({
  beforeLoad: () => {
    throw redirect({ to: "/" });
  },
  component: () => null,
});
