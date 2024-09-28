import localFont from "next/font/local";
import {
  Inter,
  Lora,
  Work_Sans,
  Lato,
  Major_Mono_Display,
} from "next/font/google";

export const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});
export const cal = localFont({
  src: "./CalSans-SemiBold.otf",
  variable: "--font-cal",
  weight: "600",
  display: "swap",
});

export const calTitle = localFont({
  src: "./CalSans-SemiBold.otf",
  variable: "--font-title",
  weight: "600",
  display: "swap",
});

export const lora = Lora({
  variable: "--font-title",
  subsets: ["latin"],
  weight: "600",
  display: "swap",
});
export const work = Work_Sans({
  variable: "--font-title",
  subsets: ["latin"],
  weight: "600",
  display: "swap",
});

export const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});
export const majorMonoDisplay = Major_Mono_Display({
  variable: "--font-major-mono-display",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const ppNeueMachinaInktrack = localFont({
  src: [
    {
      path: "./fonts/PPNeueMachina/PPNeueMachina-InktrapLight.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/PPNeueMachina/PPNeueMachina-InktrapLightItalic.otf",
      weight: "300",
      style: "italic",
    },
    {
      path: "./fonts/PPNeueMachina/PPNeueMachina-InktrapRegular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/PPNeueMachina/PPNeueMachina-InktrapRegularItalic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "./fonts/PPNeueMachina/PPNeueMachina-InktrapUltrabold.otf",
      weight: "800",
      style: "normal",
    },
    {
      path: "./fonts/PPNeueMachina/PPNeueMachina-InktrapUltraboldItalic.otf",
      weight: "800",
      style: "italic",
    },
  ],
  variable: "--font-pp-neue-machina-inktrack",
  display: "swap",
});

export const ppNeueMachinaPlain = localFont({
  src: [
    {
      path: "./fonts/PPNeueMachina/PPNeueMachina-PlainLight.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/PPNeueMachina/PPNeueMachina-PlainLightItalic.otf",
      weight: "300",
      style: "italic",
    },
    {
      path: "./fonts/PPNeueMachina/PPNeueMachina-PlainRegular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/PPNeueMachina/PPNeueMachina-PlainRegularItalic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "./fonts/PPNeueMachina/PPNeueMachina-PlainUltrabold.otf",
      weight: "800",
      style: "normal",
    },
    {
      path: "./fonts/PPNeueMachina/PPNeueMachina-PlainUltraboldItalic.otf",
      weight: "800",
      style: "italic",
    },
  ],
  variable: "--font-pp-neue-machina-plain",
  display: "swap",
});

export const fontMapper = {
  "font-cal": calTitle.variable,
  "font-lora": lora.variable,
  "font-work": work.variable,
  "font-lato": lato.variable,
  "font-major-mono-display": majorMonoDisplay.variable,
  "font-pp-neue-machina-inktrack": ppNeueMachinaInktrack.variable,
  "font-pp-neue-machina-plain": ppNeueMachinaPlain.variable,
} as Record<string, string>;
