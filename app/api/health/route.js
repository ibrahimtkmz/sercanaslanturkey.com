export const dynamic = "force-static";

export async function GET() {
  const payload = {
    status: "ok",
    timestamp: new Date().toISOString(),
    environment: process.env.VERCEL_ENV || process.env.NODE_ENV || "unknown",
    commit: process.env.VERCEL_GIT_COMMIT_SHA || null,
  };

  return Response.json(payload, {
    headers: {
      "Cache-Control": "no-store, s-maxage=0",
    },
  });
}
