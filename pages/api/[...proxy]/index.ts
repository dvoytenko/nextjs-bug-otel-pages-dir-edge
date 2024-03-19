import type { NextFetchEvent, NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

export default async function handler(req: NextRequest, _ev: NextFetchEvent) {
  const originalUrl = new URL(req.url);
  const origin = originalUrl.searchParams.get("origin");
  if (!origin) return new Response("?origin not provided", { status: 400 });
  const url = new URL(originalUrl.pathname.slice(4), origin);
  url.search = originalUrl.search;
  const newReq = new Request(url, req);
  const res = await fetch(newReq);
  res.headers.set("x-forwarded-url", url.href);
  res.headers.set("x-original-url", originalUrl.href);
  return res;
}
