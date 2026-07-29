const VERIFICATION_BODY =
  "google-site-verification: google9660bfe224132967.html";

export const dynamic = "force-static";

export function GET() {
  return new Response(VERIFICATION_BODY, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
