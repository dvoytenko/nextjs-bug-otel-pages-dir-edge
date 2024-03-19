import { registerOTel } from "@vercel/otel";

export function register() {
  registerOTel({
    serviceName: "core-hub-nextjs",
    instrumentationConfig: {
      fetch: {
        propagateContextUrls: ["*"],
      },
    },
  });
}
