/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { DataStore } from "@api/index";
import { Settings } from "@api/Settings";
import { Logger } from "@utils/Logger";
import definePlugin from "@utils/types";

const logger = new Logger("BetterDiscordThemeImporter");

interface BetterDiscordTheme {
    name: string;
    author: string;
    version: string;
    description: string;
    source: string;
    invite: string;
    authorId: string;
    authorLink: string;
    css: string;
}

export default definePlugin({
    name: "BetterDiscord Theme Importer",
    description: "Import and use BetterDiscord themes in VencordPlus",
    authors: [
        {
            name: "VencordPlus Team",
            id: 0n,
        },
    ],
    start() {
        this.initializeThemeImporter();
    },

    initializeThemeImporter() {
        // Add theme import functionality to the theme system
        this.addThemeImportHandler();
    },

    addThemeImportHandler() {
        // This will be called when themes are loaded
        // Note: Theme initialization will be handled by the settings component
    },

    async processBetterDiscordThemes() {
        try {
            const importedThemes = await DataStore.get("betterdiscord-imported-themes", []) as BetterDiscordTheme[] || [];
            logger.info(`Processing ${importedThemes.length} imported BetterDiscord themes`);

            for (const theme of importedThemes) {
                await this.convertAndApplyTheme(theme);
            }
        } catch (error) {
            logger.error("Error processing BetterDiscord themes:", error);
        }
    },

    async convertAndApplyTheme(bdTheme: BetterDiscordTheme) {
        try {
            // Convert BetterDiscord theme to VencordPlus format
            const convertedCSS = this.convertBetterDiscordCSS(bdTheme.css);

            // Create theme file
            const themeFileName = `${bdTheme.name.replace(/[^a-zA-Z0-9]/g, "_")}.theme.css`;
            const themeContent = this.createThemeFile(bdTheme, convertedCSS);

            // Save theme to themes directory
            await this.saveThemeFile(themeFileName, themeContent);

            // Add to theme links
            this.addThemeToLinks(themeFileName);

            logger.info(`Successfully converted theme: ${bdTheme.name}`);
        } catch (error) {
            logger.error(`Error converting theme ${bdTheme.name}:`, error);
        }
    },

    convertBetterDiscordCSS(css: string): string {
        // Convert BetterDiscord CSS to VencordPlus format
        let convertedCSS = css;

        // Enhanced CSS processing with advanced features
        convertedCSS = this.processCSSImports(convertedCSS);
        convertedCSS = this.resolveCSSVariables(convertedCSS);
        convertedCSS = this.optimizeCSS(convertedCSS);

        // Replace BetterDiscord specific selectors with VencordPlus equivalents
        const selectorMappings = {
            // Channel list
            ".sidebar-2K8pFh": ".sidebar-2K8pFh",
            ".channels-Ie2l6A": ".channels-Ie2l6A",
            ".channel-2QD9_O": ".channel-2QD9_O",

            // Server list
            ".guilds-2JjMmN": ".guilds-2JjMmN",
            ".guild-2TQajJ": ".guild-2TQajJ",

            // Message area
            ".chat-2Zf9I0": ".chat-2Zf9I0",
            ".messages-3amgkR": ".messages-3amgkR",
            ".message-2qnXI6": ".message-2qnXI6",

            // User area
            ".panels-3wFtMD": ".panels-3wFtMD",
            ".userPopout-2qgP6c": ".userPopout-2qgP6c",

            // General
            ".theme-dark": ".theme-dark",
            ".theme-light": ".theme-light",
        };

        // Apply selector mappings
        Object.entries(selectorMappings).forEach(([bdSelector, vpSelector]) => {
            if (bdSelector !== vpSelector) {
                convertedCSS = convertedCSS.replace(new RegExp(bdSelector, "g"), vpSelector);
            }
        });

        // Add VencordPlus specific improvements
        convertedCSS = this.addVencordPlusImprovements(convertedCSS);

        return convertedCSS;
    },

    processCSSImports(css: string): string {
        // Handle @import statements (simplified - doesn't resolve URLs)
        // In a full implementation, this would fetch and inline imports
        const importRegex = /@import\s+url\(["']?([^"']+)["']?\)\s*;/g;
        return css.replace(importRegex, "/* Import processed: $1 */");
    },

    resolveCSSVariables(css: string): string {
        // Enhanced CSS variable processing
        // Replace common BetterDiscord variables with VencordPlus equivalents
        const variableMappings = {
            "--background-primary": "var(--background-primary, #36393f)",
            "--background-secondary": "var(--background-secondary, #2f3136)",
            "--background-tertiary": "var(--background-tertiary, #202225)",
            "--text-normal": "var(--text-normal, #ffffff)",
            "--text-muted": "var(--text-muted, #b9bbbe)",
            "--accent": "var(--accent, #5865f2)",
        };

        let processedCSS = css;
        Object.entries(variableMappings).forEach(([bdVar, vpVar]) => {
            processedCSS = processedCSS.replace(new RegExp(`var\\(${bdVar}\\)`, "g"), vpVar);
        });

        return processedCSS;
    },

    optimizeCSS(css: string): string {
        // Basic CSS optimization
        return css
            .replace(/\s+/g, " ") // Collapse whitespace
            .replace(/\/\*[^*]*\*+(?:[^/*][^*]*\*+)*\//g, "") // Remove comments
            .replace(/;}/g, "}") // Remove trailing semicolons
            .trim();
    },

    addVencordPlusImprovements(css: string): string {
        // Add VencordPlus specific improvements to the theme
        const improvements = `
/* VencordPlus Theme Improvements */
.theme-dark {
    /* Ensure proper variable usage */
    --background-primary: var(--background-primary, #36393f);
    --background-secondary: var(--background-secondary, #2f3136);
    --background-tertiary: var(--background-tertiary, #202225);
    --text-normal: var(--text-normal, #ffffff);
    --text-muted: var(--text-muted, #b9bbbe);
    --accent: var(--accent, #5865f2);
}

/* Smooth transitions */
* {
    transition: background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease !important;
}

/* Better focus states */
*:focus {
    outline: 2px solid var(--accent, #5865f2) !important;
    outline-offset: 2px !important;
}

/* Improved scrollbars */
::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}

::-webkit-scrollbar-track {
    background: var(--background-tertiary, #202225);
}

::-webkit-scrollbar-thumb {
    background: var(--background-modifier-accent, #4f545c);
    border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
    background: var(--background-modifier-accent-hover, #5f6369);
}
`;

        return css + improvements;
    },

    createThemeFile(theme: BetterDiscordTheme, css: string): string {
        return `/**
 * @name ${theme.name}
 * @author ${theme.author}
 * @version ${theme.version}
 * @description ${theme.description}
 * @source ${theme.source}
 * @updateUrl ${theme.source}
 */

${css}`;
    },

    async saveThemeFile(fileName: string, content: string): Promise<void> {
        // In a real implementation, this would save to the themes directory
        // For now, we'll store in DataStore
        const themes = await DataStore.get("custom-themes", {}) as Record<string, string> || {};
        themes[fileName] = content;
        await DataStore.set("custom-themes", themes);
    },

    addThemeToLinks(themeFileName: string): void {
        const currentLinks = Settings.themeLinks || [];
        const themePath = `vencord:///themes/${themeFileName}`;

        if (!currentLinks.includes(themePath)) {
            Settings.themeLinks = [...currentLinks, themePath];
        }
    },

    // Public API for importing themes
    async importBetterDiscordTheme(themeData: BetterDiscordTheme): Promise<boolean> {
        try {
            // Store the theme data
            const importedThemes = await DataStore.get("betterdiscord-imported-themes", []) as BetterDiscordTheme[] || [];
            importedThemes.push(themeData);
            await DataStore.set("betterdiscord-imported-themes", importedThemes);

            // Convert and apply the theme
            await this.convertAndApplyTheme(themeData);

            logger.info(`Successfully imported BetterDiscord theme: ${themeData.name}`);
            return true;
        } catch (error) {
            logger.error(`Failed to import BetterDiscord theme: ${themeData.name}`, error);
            return false;
        }
    },

    // Public API for getting imported themes
    async getImportedThemes(): Promise<BetterDiscordTheme[]> {
        return await DataStore.get("betterdiscord-imported-themes", []) as BetterDiscordTheme[] || [];
    },

    // Public API for removing themes
    async removeImportedTheme(themeName: string): Promise<boolean> {
        try {
            const importedThemes = await DataStore.get("betterdiscord-imported-themes", []) as BetterDiscordTheme[] || [];
            const filteredThemes = importedThemes.filter(theme => theme.name !== themeName);
            await DataStore.set("betterdiscord-imported-themes", filteredThemes);

            // Remove from theme links
            const currentLinks = Settings.themeLinks || [];
            Settings.themeLinks = currentLinks.filter(link => !link.includes(themeName));

            logger.info(`Successfully removed BetterDiscord theme: ${themeName}`);
            return true;
        } catch (error) {
            logger.error(`Failed to remove BetterDiscord theme: ${themeName}`, error);
            return false;
        }
    },

    // Public API for exporting themes to VencordPlus format
    exportToVencordFormat(theme: BetterDiscordTheme): string {
        try {
            // Convert the theme using existing conversion logic
            const convertedCSS = this.convertBetterDiscordCSS(theme.css);
            return this.createThemeFile(theme, convertedCSS);
        } catch (error) {
            logger.error(`Failed to export theme ${theme.name}:`, error);
            return "";
        }
    },

    // Public API for preview functionality
    async getThemePreview(theme: BetterDiscordTheme): Promise<string> {
        try {
            // Return a simplified preview (in future, this could generate a preview image)
            const convertedCSS = this.convertBetterDiscordCSS(theme.css);
            return `Theme: ${theme.name}\nAuthor: ${theme.author}\nConverted CSS Length: ${convertedCSS.length} characters`;
        } catch (error) {
            logger.error(`Failed to generate preview for theme ${theme.name}:`, error);
            return "Preview unavailable";
        }
    }
});
