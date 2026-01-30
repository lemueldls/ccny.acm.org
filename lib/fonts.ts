import { Chakra_Petch, Lato, Raleway } from "next/font/google";

export const lato = Lato({
  display: "swap",
  subsets: ["latin"],
  variable: "--tk-lato",
  weight: ["400", "700"],
});

export const brand = Chakra_Petch({
  display: "swap",
  subsets: ["latin"],
  variable: "--tk-chakra-petch",
  weight: ["700"],
});
