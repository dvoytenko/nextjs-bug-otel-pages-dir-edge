import type { NextFetchEvent, NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

export default async function handler(req: NextRequest, _ev: NextFetchEvent) {
  const originalUrl = new URL(req.url);
  const origin = originalUrl.searchParams.get("origin");
  console.log("log 0");
  if (!origin) return new Response("?origin not provided", { status: 400 });
  console.log("log 1");
  const url = new URL(originalUrl.pathname.slice(4), origin);
  url.search = originalUrl.search;
  console.log("log 2", url.href);
  // const forwardReq = new Request(url, {
  //   method: "POST",
  //   body: JSON.stringify({ message: "g'day mate!" }),
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });
  console.log("log 3");
  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify({ message: "g'day mate!" }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log("log 4");
  res.headers.set("x-forwarded-url", url.href);
  res.headers.set("x-original-url", originalUrl.href);
  console.log("log 5");
  return res;
}
