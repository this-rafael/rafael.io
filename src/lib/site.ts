export const SITE_URL = new URL("https://rafael-io.vercel.app");

export function siteUrl(path = "/"): string {
  return new URL(path, SITE_URL).toString();
}
