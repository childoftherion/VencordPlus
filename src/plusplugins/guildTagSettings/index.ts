/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 Vendicated and Megumin
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import "@equicordplugins/_misc/styles.css";

import { definePluginSettings } from "@api/Settings";
import { disableStyle, enableStyle } from "@api/Styles";
import { EquicordDevs } from "@utils/constants";
import definePlugin, { OptionType } from "@utils/types";

import clanBadges from "../_misc/clanBadges.css?managed";

const settings = definePluginSettings({
    hideTags: {
        type: OptionType.BOOLEAN,
        description: "Hide server tags",
        default: false,
        onChange: value => {
            if (value) enableStyle(clanBadges);
            else disableStyle(clanBadges);
        }
    },
    disableAdoptTagPrompt: {
        type: OptionType.BOOLEAN,
        description: "Disable the prompt to adopt server tags",
        default: true,
        restartNeeded: true
    }
});

export default definePlugin({
    name: "GuildTagSettings",
    description: "Settings for server tags",
    authors: [EquicordDevs.thororen],
    settings,
    patches: [
        {
            find: "GuildTagCoachmark",
            replacement: {
                match: /return.{0,100}spacing/g,
                replace: "return null;$&"
            },
            predicate: () => settings.store.disableAdoptTagPrompt
        }
    ],
    start() {
        if (settings.store.hideTags) enableStyle(clanBadges);
    },
    stop() {
        if (settings.store.hideTags) disableStyle(clanBadges);
    }
});
