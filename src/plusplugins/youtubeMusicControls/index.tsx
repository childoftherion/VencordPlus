/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { definePluginSettings, Settings } from "@api/Settings";
import { disableStyle, enableStyle } from "@api/Styles";
import ErrorBoundary from "@components/ErrorBoundary";
import { Devs } from "@utils/constants";
import definePlugin, { OptionType } from "@utils/types";
import { Player as SpotifyPlayer } from "plugins/spotifyControls/PlayerComponent";

import { Lyrics } from "../SpotifyLyrics/components/lyrics";
import hoverOnlyStyle from "./hoverOnly.css?managed";
import { Player } from "./PlayerComponent";

function toggleHoverControls(value: boolean) {
    (value ? enableStyle : disableStyle)(hoverOnlyStyle);
}

function isUrlValid(value: string) {
    try {
        const url = new URL(value);
        return url.protocol !== "" && url.host !== "";
    } catch (e) {
        return false;
    }
}

const settings = definePluginSettings({
    installYtmWithWebsocket: {
        type: OptionType.COMPONENT,
        component: () => <InstallIstructions></InstallIstructions>
    },
    hoverControls: {
        description: "Show controls on hover",
        type: OptionType.BOOLEAN,
        default: false,
        onChange: v => toggleHoverControls(v)
    },
    websocketUrl: {
        description: "The API Websocket URL",
        type: OptionType.STRING,
        placeholder: "ws://localhost:26539",
        default: "ws://localhost:26539",
        isValid: isUrlValid,
    },
    apiServerUrl: {
        description: "The API Server URL",
        type: OptionType.STRING,
        placeholder: "http://localhost:26538",
        default: "http://localhost:26538",
        isValid: isUrlValid,
    }
});

export default definePlugin({
    name: "YouTubeMusicControls",
    description: "Adds a YouTube Music player above the account panel. Requires `https://github.com/th-ch/youtube-music` with the API Websocket plugin, which is not yet part of th-ch's YouTube Music, enabled",
    authors: [Devs.Ven, Devs.afn, Devs.KraXen72, Devs.Av32000, Devs.Johannes7k75],
    settings,
    patches: [
        {
            find: "this.isCopiedStreakGodlike",
            replacement: [
                {
                    match: /(?<=\i\.jsxs?\)\()(\i),{(?=[^}]*?userTag:\i,hidePrivateData:)/,
                    replace: "$self.PanelWrapper,{VencordOriginal:$1,",
                    predicate: () => !Settings.plugins.SpotifyControls.enabled,
                    noWarn: true,
                },
                {
                    match: /Vencord\.Plugins\.plugins\["SpotifyLyrics"\]\.FakePanelWrapper/,
                    replace: "$self.PanelWrapper",
                    predicate: () => Settings.plugins.SpotifyLyrics.enabled,
                    noWarn: true,
                },
                {
                    match: /Vencord\.Plugins\.plugins\["SpotifyControls"\]\.PanelWrapper/,
                    replace: "$self.PanelWrapper",
                    predicate: () => Settings.plugins.SpotifyControls.enabled && !Settings.plugins.SpotifyLyrics.enabled,
                    noWarn: true,
                }
            ],
        },
    ],

    start: () => toggleHoverControls(Settings.plugins.YouTubeMusicControls.hoverControls),

    PanelWrapper({ VencordOriginal, ...props }) {
        const showSpotifyControls = Settings.plugins.SpotifyControls.enabled;
        const showSpotifyLyrics = Settings.plugins.SpotifyLyrics.enabled;
        const LyricsPosition = showSpotifyLyrics ? Settings.plugins.SpotifyLyrics.LyricsPosition : null;

        return (
            <>
                <ErrorBoundary
                    fallback={() => (
                        <div className="vc-ytmusic-fallback">
                            <p>Failed to render YouTube Music Modal :(</p>
                            <p>Check the console for errors</p>
                        </div>
                    )}
                >
                    <Player />

                    {showSpotifyLyrics && LyricsPosition === "above" && <Lyrics />}
                    {showSpotifyControls && <SpotifyPlayer />}
                    {showSpotifyLyrics && LyricsPosition === "below" && <Lyrics />}
                </ErrorBoundary>

                <VencordOriginal {...props} />
            </>
        );
    }
});
