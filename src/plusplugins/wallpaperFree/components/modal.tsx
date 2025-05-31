/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { CheckedTextInput } from "@components/CheckedTextInput";
import { ModalContent, ModalHeader, ModalProps, ModalRoot, ModalSize } from "@utils/modal";
import { Button, Text, TextInput, useState } from "@webpack/common";

// @ts-ignore
import domains from "../csp_domains.txt";

const allWhitelistedDomains: string[] = domains.split("\n").filter((l: string) => !l.startsWith("#")).concat([
    ".github.io",
    "raw.githubusercontent.com",
    ".gitlab.io",
    "gitlab.com",
    ".codeberg.page",
    "codeberg.org",
    ".githack.com",
    "i.imgur.com",
    "i.ibb.co",
    "cdn.discordapp.com",
    "media.discordapp.net",
    "i.pximg.net"
]);

interface Props {
    props: ModalProps;
    onSelect: (url: string) => void;
}

export function SetCustomWallpaperModal({ props, onSelect }: Props) {
    const [url, setUrl] = useState("");

    return (
        <ModalRoot {...props} size={ModalSize.SMALL}>
            <ModalHeader>
                <Text variant="heading-lg/normal" style={{ marginBottom: 8 }}>
                    Set a custom wallpaper
                </Text>
            </ModalHeader>
            <ModalContent>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    {IS_WEB ? (<TextInput
                        placeholder="Image URL"
                        value={url}
                        onChange={setUrl}
                        autoFocus
                    />) :
                        <CheckedTextInput
                            value={url}
                            onChange={setUrl}
                            validate={u => allWhitelistedDomains.some(d => u.includes(d)) ? true : `Image must be hosted on one of: ${allWhitelistedDomains.join(", ")}`}
                        />
                    }
                    {url && (
                        <img
                            src={url}
                            alt="Wallpaper Preview"
                            style={{
                                display: "block",
                                width: "100%",
                                height: "auto",
                                objectFit: "cover",
                                border: "1px solid var(--background-modifier-accent)",
                                borderRadius: 8
                            }}
                        />
                    )}
                    <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
                        <Button onClick={props.onClose}>Cancel</Button>
                        <Button
                            color={Button.Colors.BRAND}
                            onClick={() => {
                                onSelect(url);
                                props.onClose();
                            }}
                            disabled={!url}
                        >Apply</Button>
                    </div>
                </div>
            </ModalContent>
        </ModalRoot>
    );
}
