/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { DataStore } from "@api/index";
import { SettingsTab, wrapTab } from "@components/settings/tabs/BaseTab";
import { Logger } from "@utils/Logger";
import { Button, Forms, React, TextInput, useEffect, useState } from "@webpack/common";

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

function BetterDiscordThemeImporterSettings() {
    const [importedThemes, setImportedThemes] = useState<BetterDiscordTheme[]>([]);
    const [importUrl, setImportUrl] = useState("");
    const [importing, setImporting] = useState(false);
    const [importStatus, setImportStatus] = useState("");

    useEffect(() => {
        loadImportedThemes();
    }, []);

    const loadImportedThemes = async () => {
        try {
            const themes = await DataStore.get("betterdiscord-imported-themes", []) as BetterDiscordTheme[] || [];
            setImportedThemes(themes);
        } catch (error) {
            logger.error("Error loading imported themes:", error);
        }
    };

    const importThemeFromUrl = async () => {
        if (!importUrl.trim()) {
            setImportStatus("Please enter a theme URL");
            return;
        }

        setImporting(true);
        setImportStatus("Importing theme...");

        try {
            // Parse BetterDiscord theme URL
            const themeData = await parseBetterDiscordTheme(importUrl);

            if (themeData) {
                // Import the theme using the plugin's API
                const success = await window.Vencord?.Plugins?.plugins?.["BetterDiscord Theme Importer"]?.importBetterDiscordTheme?.(themeData);

                if (success) {
                    setImportStatus("Theme imported successfully!");
                    setImportUrl("");
                    await loadImportedThemes();
                } else {
                    setImportStatus("Failed to import theme");
                }
            } else {
                setImportStatus("Invalid theme URL or format");
            }
        } catch (error) {
            logger.error("Error importing theme:", error);
            setImportStatus("Error importing theme: " + error.message);
        } finally {
            setImporting(false);
        }
    };

    const parseBetterDiscordTheme = async (url: string): Promise<BetterDiscordTheme | null> => {
        try {
            // This is a simplified parser - in reality, you'd need to handle various BetterDiscord theme formats
            const response = await fetch(url);
            const css = await response.text();

            // Extract theme metadata from CSS comments
            const nameMatch = css.match(/@name\s+(.+)/);
            const authorMatch = css.match(/@author\s+(.+)/);
            const versionMatch = css.match(/@version\s+(.+)/);
            const descriptionMatch = css.match(/@description\s+(.+)/);
            const sourceMatch = css.match(/@source\s+(.+)/);

            return {
                name: nameMatch?.[1]?.trim() || "Imported Theme",
                author: authorMatch?.[1]?.trim() || "Unknown",
                version: versionMatch?.[1]?.trim() || "1.0.0",
                description: descriptionMatch?.[1]?.trim() || "Imported from BetterDiscord",
                source: sourceMatch?.[1]?.trim() || url,
                invite: "",
                authorId: "",
                authorLink: "",
                css: css
            };
        } catch (error) {
            logger.error("Error parsing theme:", error);
            return null;
        }
    };

    const removeTheme = async (themeName: string) => {
        try {
            const success = await window.Vencord?.Plugins?.plugins?.["BetterDiscord Theme Importer"]?.removeImportedTheme?.(themeName);

            if (success) {
                setImportStatus(`Theme "${themeName}" removed successfully`);
                await loadImportedThemes();
            } else {
                setImportStatus(`Failed to remove theme "${themeName}"`);
            }
        } catch (error) {
            logger.error("Error removing theme:", error);
            setImportStatus("Error removing theme: " + error.message);
        }
    };

    return (
        <SettingsTab title="BetterDiscord Theme Importer">
            <Forms.FormTitle tag="h2">Import BetterDiscord Themes</Forms.FormTitle>
            <Forms.FormText>
                Import and use BetterDiscord themes in VencordPlus. Paste a theme URL below to get started.
            </Forms.FormText>

            <div style={{ marginTop: "16px" }}>
                <TextInput
                    value={importUrl}
                    onChange={setImportUrl}
                    placeholder="Paste BetterDiscord theme URL here..."
                    style={{ marginBottom: "8px" }}
                />
                <Button
                    onClick={importThemeFromUrl}
                    disabled={importing || !importUrl.trim()}
                    size={Button.Sizes.SMALL}
                >
                    {importing ? "Importing..." : "Import Theme"}
                </Button>
            </div>

            {importStatus && (
                <div style={{
                    marginTop: "8px",
                    padding: "8px",
                    backgroundColor: "var(--background-modifier-accent)",
                    borderRadius: "4px",
                    fontSize: "14px"
                }}>
                    {importStatus}
                </div>
            )}

            {importedThemes.length > 0 && (
                <div style={{ marginTop: "24px" }}>
                    <Forms.FormTitle tag="h3">Imported Themes</Forms.FormTitle>
                    <Forms.FormText>
                        {importedThemes.length} theme(s) imported from BetterDiscord
                    </Forms.FormText>

                    <div style={{ marginTop: "12px" }}>
                        {importedThemes.map((theme, index) => (
                            <div
                                key={index}
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    padding: "12px",
                                    backgroundColor: "var(--background-modifier-accent)",
                                    borderRadius: "8px",
                                    marginBottom: "8px"
                                }}
                            >
                                <div>
                                    <div style={{ fontWeight: "600", fontSize: "16px" }}>
                                        {theme.name}
                                    </div>
                                    <div style={{ fontSize: "14px", color: "var(--text-muted)" }}>
                                        by {theme.author} • v{theme.version}
                                    </div>
                                    {theme.description && (
                                        <div style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "4px" }}>
                                            {theme.description}
                                        </div>
                                    )}
                                </div>
                                <Button
                                    onClick={() => removeTheme(theme.name)}
                                    size={Button.Sizes.SMALL}
                                    color={Button.Colors.RED}
                                    look={Button.Looks.OUTLINED}
                                >
                                    Remove
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div style={{ marginTop: "24px" }}>
                <Forms.FormTitle tag="h3">How to Use</Forms.FormTitle>
                <Forms.FormText>
                    1. Find a BetterDiscord theme you like<br />
                    2. Copy the theme's CSS URL (usually ends with .theme.css)<br />
                    3. Paste the URL in the input field above<br />
                    4. Click "Import Theme" to add it to VencordPlus<br />
                    5. The theme will be automatically converted and applied
                </Forms.FormText>
            </div>

            <div style={{ marginTop: "16px" }}>
                <Forms.FormTitle tag="h3">Popular Theme Sources</Forms.FormTitle>
                <Forms.FormText>
                    • <a href="https://betterdiscord.app/themes" target="_blank" rel="noopener noreferrer">BetterDiscord Themes</a><br />
                    • <a href="https://github.com/topics/betterdiscord-theme" target="_blank" rel="noopener noreferrer">GitHub BetterDiscord Themes</a><br />
                    • <a href="https://discord.gg/betterdiscord" target="_blank" rel="noopener noreferrer">BetterDiscord Discord Server</a>
                </Forms.FormText>
            </div>
        </SettingsTab>
    );
}

export default wrapTab(BetterDiscordThemeImporterSettings, "BetterDiscord Theme Importer");
