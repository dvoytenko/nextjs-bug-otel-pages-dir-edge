import {
  ConsoleSpanExporter,
  SimpleSpanProcessor,
} from "@opentelemetry/sdk-trace-base";
import { registerOTel } from "@vercel/otel";

export function register() {
  registerOTel({
    serviceName: "core-hub-nextjs",
    instrumentationConfig: {
      fetch: {
        propagateContextUrls: ["*"],
        ignoreUrls: ["*"],
      },
    },
    // spanProcessors: [new SimpleSpanProcessor(new ConsoleSpanExporter())],
  });
}
