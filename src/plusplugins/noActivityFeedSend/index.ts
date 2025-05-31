/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { definePluginSettings } from "@api/Settings";
import { Devs } from "@utils/constants";
import definePlugin, { OptionType } from "@utils/types";

const settings = definePluginSettings({
    disableSpotify: {
        default: true,
        type: OptionType.BOOLEAN,
        description: "Do not send Spotify track history to Discord"
    },
    disableGames: {
        default: true,
        type: OptionType.BOOLEAN,
        description: "Do not send game activity to Discord"
    }
});

export default definePlugin({
    name: "NoActivityFeedSend",
    description: "Disables sending game activity / Spotify track history to Discord, effectively hiding it from activity history",
    authors: [Devs.nin0dev],
    enabledByDefault: false,
    settings,
    patches: [
        {
            find: "for_game_profile",
            replacement: {
                match: /await \i.\i.post\({url:\i.\i.MY_SPOTIFY_CONTENT_INVENTORY.{0,100}}\)/,
                replace: "(()=>{})()"
            },
            predicate: () => settings.store.disableSpotify
        },
        {
            find: "MY_CONTENT_INVENTORY_APPLICATION(",
            replacement: {
                match: /await \i.\i.post\({url:\i.\i.MY_CONTENT_INVENTORY_APPLICATION.{0,100}}\)/,
                replace: "(()=>{})()"
            },
            predicate: () => settings.store.disableGames
        }
    ]
});
