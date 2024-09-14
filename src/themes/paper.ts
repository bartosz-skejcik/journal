import { extend } from "@/lib/themes";
import base from "./base";

const paper = extend(base, {
    background: "36 68% 85%",
    foreground: "120 4% 11%",
    primary: "120 4% 11%",
    primaryForeground: "36 68% 85%",
    secondary: "36 48% 76%",
    secondaryForeground: "120 4% 11%",
    muted: "36 48% 76%",
    mutedForeground: "120 4% 40%",
    accent: "36 48% 76%",
    accentForeground: "120 4% 11%",
    popover: "36 68% 85%",
    popoverForeground: "120 4% 11%",
    card: "36 48% 76%",
    cardForeground: "120 4% 11%",
    border: "36 48% 76%",
    input: "36 48% 76%",
    ring: "120 4% 11%",
});

export default paper;
