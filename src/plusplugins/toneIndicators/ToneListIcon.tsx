/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { ChatBarButton, ChatBarButtonFactory } from "@api/ChatButtons";
import { classes } from "@utils/misc";
import { openModal } from "@utils/modal";

import { cl, settings } from "./index";
import { ToneListModal } from "./ToneListModal";


export function ToneListIcon({ height = 20, width = 20, className }: { height?: number; width?: number; className?: string; }) {
    return (
        <svg
            height={height}
            width={width}
            className={classes(cl("icon"), className)}
        >
            <path fill="currentColor" fillRule="evenodd" clipRule="evenodd" d="M21 21.93V2.07a1 1 0 0 0-1.27-.97l-2.5.7a3 3 0 0 1-1.46.04l-3.12-.7a3 3 0 0 0-1.3 0l-3.12.7a3 3 0 0 1-1.45-.04l-2.51-.7A1 1 0 0 0 3 2.07v19.86a1 1 0 0 0 1.27.97l2.5-.7a3 3 0 0 1 1.46-.04l3.12.7a3 3 0 0 0 1.3 0l3.12-.7a3 3 0 0 1 1.45.04l2.51.7a1 1 0 0 0 1.27-.97ZM7 8a1 1 0 0 1 1-1h8a1 1 0 1 1 0 2H8a1 1 0 0 1-1-1Zm1 3a1 1 0 0 0 0 2h8a1 1 0 1 0 0-2H8Zm-1 5a1 1 0 0 1 1-1h3a1 1 0 0 1 0 2H8a1 1 0 0 1-1-1Zm8-1a1 1 0 0 0 0 2h1a1 1 0 1 0 0-2h-1Z" />
        </svg>
    );
}

export const ToneListChatBarIcon: ChatBarButtonFactory = ({ isMainChat }) => {
    const { showToneList } = settings.use(["showToneList"]);

    if (!isMainChat || !showToneList) return null;

    const button = (
        <ChatBarButton
            tooltip="Tone List"
            onClick={() => {
                openModal(props => (
                    <ToneListModal rootProps={props} />
                ));
            }}
            buttonProps={{
                "aria-haspopup": "dialog"
            }}
        >
            <ToneListIcon />
        </ChatBarButton>
    );

    return button;
};
