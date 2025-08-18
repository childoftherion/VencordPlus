/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { definePluginSettings } from "@api/Settings";
import { OptionType } from "@utils/types";

export const settings = definePluginSettings({

    enableProfileEffects: {
        description: "Allows you to use profile effects",
        type: OptionType.BOOLEAN,
        default: true
    },
    enableNameplate: {
        description: "Allows you to use nameplates",
        type: OptionType.BOOLEAN,
        default: true
    },
    enableProfileThemes: {
        description: "Allows you to use profile themes",
        type: OptionType.BOOLEAN,
        default: true
    },
    enableCustomBadges: {
        description: "Allows you to use custom badges",
        type: OptionType.BOOLEAN,
        default: false,
        restartNeeded: true
    },
    enableAvatarDecorations: {
        description: "Allows you to use avatar decorations",
        type: OptionType.BOOLEAN,
        default: true
    },
    nitroFirst: {
        description: "Banner/avatar to use if both a Nitro and fakeProfile banner/avatar are present",
        type: OptionType.SELECT,
        options: [
            { label: "fakeProfile", value: true, default: true },
            { label: "Nitro", value: false },
        ]
    },
    voiceBackground: {
        description: "Use fakeProfile's banners as voice chat backgrounds",
        type: OptionType.BOOLEAN,
        default: true,
        restartNeeded: true
    }
});
