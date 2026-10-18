export default async function middleware(request) {
  const url = new URL(request.url);
  const [, sub, ...rest] = url.pathname.split("/");
  if (!["avatar", "catalog", "users"].includes(sub)) {
    return new Response("Not allowed", { status: 400 });
  }
  const target = `https://${sub}.roblox.com/${rest.join("/")}${url.search}`;
  const res = await fetch(target, { headers: { "User-Agent": "Mozilla/5.0" } });
  return new Response(await res.text(), { status: res.status, headers: { "content-type": "application/json" } });
}
export const config = { matcher: "/:path*" };
