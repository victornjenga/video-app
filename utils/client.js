import sanityClient from "@sanity/client";

export const client = sanityClient({
  projectId: "l9oyxntu",
  dataset: "production",
  apiVersion: "2022-10-19",
  useCdn: true,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});
