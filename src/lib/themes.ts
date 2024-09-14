export interface ITheme {
    [key: string]: string;
}

export interface IThemes {
    [key: string]: ITheme;
}

export interface IMappedTheme {
    [key: string]: string;
}

export const mapTheme = (variables: ITheme): IMappedTheme => {
    return {
        "--brand": variables.brand || "",
        "--border": variables.border || "",
        "--input": variables.input || "",
        "--ring": variables.ring || "",
        "--background": variables.background || "",
        "--foreground": variables.foreground || "",
        "--primary": variables.primary || "",
        "--primary-foreground": variables.primaryForeground || "",
        "--secondary": variables.secondary || "",
        "--secondary-foreground": variables.secondaryForeground || "",
        "--destructive": variables.destructive || "",
        "--destructive-foreground": variables.destructiveForeground || "",
        "--muted": variables.muted || "",
        "--muted-foreground": variables.mutedForeground || "",
        "--accent": variables.accent || "",
        "--accent-foreground": variables.accentForeground || "",
        "--popover": variables.popover || "",
        "--popover-foreground": variables.popoverForeground || "",
        "--card": variables.card || "",
        "--card-foreground": variables.cardForeground || "",
    };
};

export const applyTheme = (theme: ITheme): void => {
    const themeObject: IMappedTheme = mapTheme(theme);

    if (typeof document === "undefined") {
        return;
    }
    const root = document.documentElement;

    Object.keys(themeObject).forEach((property) => {
        if (property === "name") {
            return;
        }
        root.style.setProperty(property, themeObject[property]);
    });
};

export const extend = (
    extending: ITheme,
    newTheme: Partial<ITheme>
): ITheme => {
    // @ts-expect-error asd
    return { ...extending, ...newTheme };
};
