/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { IS_MAC } from "@utils/constants";
import { findStoreLazy } from "@webpack";
import { FluxDispatcher, useStateFromStores } from "@webpack/common";

const MobileWebSidebarStore = findStoreLazy("MobileWebSidebarStore");

export function openSidebar() {
    FluxDispatcher.dispatch({
        type: "MOBILE_WEB_SIDEBAR_OPEN",
        force: true
    });
}

export function closeSidebar() {
    FluxDispatcher.dispatch({
        type: "MOBILE_WEB_SIDEBAR_CLOSE",
        force: true
    });
}

export function toggleSidebar() {
    MobileWebSidebarStore.getIsOpen() ? closeSidebar() : openSidebar();
}

export function useSidebar() {
    return useStateFromStores([MobileWebSidebarStore], () => MobileWebSidebarStore.getIsOpen());
}

export function keybindHandler(e: KeyboardEvent) {
    const hasMod = IS_MAC ? e.metaKey : e.ctrlKey;
    const hasMeta = IS_MAC ? e.ctrlKey : e.metaKey;
    if (hasMod && !hasMeta && !e.shiftKey && !e.altKey && ["\\", "ContextMenu"].includes(e.key)) {
        e.preventDefault();
        e.stopPropagation();
        toggleSidebar();
    }
}
