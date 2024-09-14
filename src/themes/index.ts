import base from "./base";
import dark from "./dark";
import paper from "./paper";
import type { IThemes } from "@/lib/themes";

export const DEFAULT_THEME: string = "base";

export const themes: IThemes = {
    base,
    dark,
    paper,
};
