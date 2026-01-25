import {
  Chakra_Petch,
  Inter,
  Lato,
  Lora,
  Major_Mono_Display,
  Play,
  Tomorrow,
  Work_Sans,
} from "next/font/google";
import localFont from "next/font/local";

// Export const inter = Inter({
//   Variable: "--font-inter",
//   Subsets: ["latin"],
// });
// Export const cal = localFont({
//   Src: "./CalSans-SemiBold.otf",
//   Variable: "--font-cal",
//   Weight: "600",
//   Display: "swap",
// });

// Export const calTitle = localFont({
//   Src: "./CalSans-SemiBold.otf",
//   Variable: "--font-title",
//   Weight: "600",
//   Display: "swap",
// });

// Export const lora = Lora({
//   Variable: "--font-lora",
//   Subsets: ["latin"],
//   Weight: "600",
//   Display: "swap",
// });

// Export const work = Work_Sans({
//   Variable: "--font-work",
//   Subsets: ["latin"],
//   Weight: "600",
//   Display: "swap",
// });

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
  weight: ["400", "700"],
});

// Export const majorMonoDisplay = Major_Mono_Display({
//   Variable: "--font-major-mono-display",
//   Subsets: ["latin"],
//   Weight: "400",
//   Display: "swap",
// });

// Export const ppNeueMachinaInktrack = localFont({
//   Src: [
//     {
//       Path: "./fonts/PPNeueMachina/PPNeueMachina-InktrapLight.otf",
//       Weight: "300",
//       Style: "normal",
//     },
//     {
//       Path: "./fonts/PPNeueMachina/PPNeueMachina-InktrapLightItalic.otf",
//       Weight: "300",
//       Style: "italic",
//     },
//     {
//       Path: "./fonts/PPNeueMachina/PPNeueMachina-InktrapRegular.otf",
//       Weight: "400",
//       Style: "normal",
//     },
//     {
//       Path: "./fonts/PPNeueMachina/PPNeueMachina-InktrapRegularItalic.otf",
//       Weight: "400",
//       Style: "italic",
//     },
//     {
//       Path: "./fonts/PPNeueMachina/PPNeueMachina-InktrapUltrabold.otf",
//       Weight: "800",
//       Style: "normal",
//     },
//     {
//       Path: "./fonts/PPNeueMachina/PPNeueMachina-InktrapUltraboldItalic.otf",
//       Weight: "800",
//       Style: "italic",
//     },
//   ],
//   Variable: "--font-pp-neue-machina-inktrack",
//   Display: "swap",
// });

export const ppNeueMachinaPlain = localFont({
  display: "swap",
  src: [
    // {
    //   path: "./fonts/PPNeueMachina/PPNeueMachina-PlainLight.otf",
    //   weight: "300",
    //   style: "normal",
    // },
    // {
    //   path: "./fonts/PPNeueMachina/PPNeueMachina-PlainLightItalic.otf",
    //   weight: "300",
    //   style: "italic",
    // },
    // {
    //   path: "./fonts/PPNeueMachina/PPNeueMachina-PlainRegular.otf",
    //   weight: "400",
    //   style: "normal",
    // },
    // {
    //   path: "./fonts/PPNeueMachina/PPNeueMachina-PlainRegularItalic.otf",
    //   weight: "400",
    //   style: "italic",
    // },
    {
      path: "./fonts/PPNeueMachina/PPNeueMachina-PlainUltrabold.otf",
      weight: "800",
      style: "normal",
    },
    // {
    //   path: "./fonts/PPNeueMachina/PPNeueMachina-PlainUltraboldItalic.otf",
    //   weight: "800",
    //   style: "italic",
    // },
  ],
  variable: "--font-brand",
});

// Export const fontMapper = {
//   "font-cal": calTitle.variable,
//   "font-lora": lora.variable,
//   "font-work": work.variable,
//   "font-lato": lato.variable,
//   "font-major-mono-display": majorMonoDisplay.variable,
//   "font-pp-neue-machina-inktrack": ppNeueMachinaInktrack.variable,
//   "font-pp-neue-machina-plain": ppNeueMachinaPlain.variable,
// } as Record<string, string>;
