/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { Devs } from "@utils/constants";
import definePlugin from "@utils/types";

export default definePlugin({
    name: "Onward",
    description: "Allows forwarding messages to the same channel",
    authors: [Devs.Kyuuhachi],

    patches: [
        {
            find: ".DM?{type:\"user\",id:",
            replacement: {
                match: /:(\i)\((\i),\i\)(?=\.slice\(0,15\))/,
                replace: ":$1($2)"
            },
        },
        {
            find: 'this,"parseUserResults",',
            replacement: {
                match: /return 1e3\*/,
                replace: "return 250*"
            },
        },
    ],
});
