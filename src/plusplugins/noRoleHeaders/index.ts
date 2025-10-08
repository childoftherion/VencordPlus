/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { Devs } from "@utils/constants";
import definePlugin from "@utils/types";

export default definePlugin({
    name: "NoRoleHeaders",
    description: "We are all equal!!",
    authors: [Devs.Samwich],
    patches: [
        {
            find: "._areActivitiesExperimentallyHidden=(",
            replacement: {
                match: /\i.memo\(function\(\i\){/,
                replace: "$&return null;"
            }
        }
    ]
});
