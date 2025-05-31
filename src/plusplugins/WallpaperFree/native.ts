/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { RendererSettings } from "@main/settings";
// @ts-ignore
import domains from "./csp_domains.txt";
import { IpcMainInvokeEvent } from "electron";

// @ts-ignore
import("@main/csp").then(({ CspPolicies }) => {
    const settings = RendererSettings.store.plugins?.WallpaperFree;
    if (settings?.enabled) {
        for (const domain of domains.split("\n").filter((l: string) => !l.startsWith("#"))) {
            CspPolicies[domain.trim()] = ["img-src"];
        }
    }
}).catch(() => { });



export function dummy(e: IpcMainInvokeEvent) { }
