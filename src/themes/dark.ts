import { extend } from "@/lib/themes";
import base from "./base";

const dark = extend(base, {
    background: "0 0% 9%",
    foreground: "0 0% 98%",
    primary: "0 0% 98%",
    primaryForeground: "0 0% 9%",
    secondary: "0 0% 14.9%",
    secondaryForeground: "0 0% 98%",
    muted: "0 0% 14.9%",
    mutedForeground: "0 0% 63.9%",
    accent: "0 0% 14.9%",
    accentForeground: "0 0% 98%",
    popover: "0 0% 9%",
    popoverForeground: "0 0% 98%",
    card: "0 0% 9%",
    cardForeground: "0 0% 98%",
    border: "0 0% 14.9%",
    input: "0 0% 14.9%",
    ring: "0 0% 83.1%",
});

export default dark;
