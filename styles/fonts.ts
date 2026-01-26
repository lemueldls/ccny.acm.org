import { Chakra_Petch, Lato } from "next/font/google";

export const lato = Lato({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-lato",
  weight: ["400", "700"],
});

export const brand = Chakra_Petch({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-brand",
  weight: ["700"],
});
