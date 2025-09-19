/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { EquicordDevs } from "@utils/constants";
import definePlugin from "@utils/types";

export default definePlugin({
    name: "UnlimitedAccounts",
    description: "Removes the maximum accounts limit",
    authors: [EquicordDevs.Balaclava, EquicordDevs.thororen],
    patches: [
        {
            find: "multiaccount_cta_tooltip_seen",
            replacement: {
                match: /(let \i=)\d+(,\i="switch-accounts-modal")/,
                replace: "$1Infinity$2",
            },
        },
    ],
});
