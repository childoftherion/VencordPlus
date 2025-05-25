/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import "./style.css";
import "./NxCard.css";

import { Margins } from "@utils/margins";
import { classes } from "@utils/misc";
import { ModalCloseButton, ModalContent, ModalHeader, ModalProps, ModalRoot } from "@utils/modal";
import { Forms, React, TextInput } from "@webpack/common";
import { JSX } from "react";

import { cl, ToneIndicator, toneIndicators } from "./index";

function ToneItem({ indicators, description, ...props }) {
    return (
        <NxCard className={cl("list-card")} {...props}>
            <span className={cl("list-indicators")}>
                {indicators.map(indicator => (
                    <span key={indicator}>{indicator}</span>
                ))}
            </span>
            <span>{description}</span>
        </NxCard>
    );
}

export function ToneListModal({ rootProps }: { rootProps: ModalProps; }) {
    const [searchValue, setSearchValue] = React.useState({ value: "" });

    const search = searchValue.value.toLowerCase();
    const onSearch = (query: string) => setSearchValue(prev => ({ ...prev, value: query }));

    const toneFilter = (tone: ToneIndicator) => {
        if (!search.length) return true;

        return (
            tone.short.join(" ").includes(search) ||
            tone.long.toLowerCase().includes(search)
        );
    };

    const tones = [] as JSX.Element[];
    for (const tone of toneIndicators) {
        if (!toneFilter(tone)) continue;

        tones.push(<ToneItem indicators={tone.short} description={tone.long}></ToneItem>);
    }

    return (
        <ModalRoot {...rootProps}>
            <ModalHeader className={cl("modal-header")}>
                <Forms.FormTitle tag="h2" className={cl("modal-title")}>
                    Tone List
                </Forms.FormTitle>
                <ModalCloseButton onClick={rootProps.onClose} />
            </ModalHeader>

            <TextInput placeholder="Search..." value={searchValue.value} onChange={onSearch} className={Margins.all20}></TextInput>

            <ModalContent className={cl("modal-content")}>
                {tones.length
                    ? <div className={cl("list")}>
                        {tones}
                    </div>
                    : <Forms.FormText variant="text-md/normal" className={classes(Margins.top16, cl("noResults"))}>There's no indicator for that.</Forms.FormText>
                }
            </ModalContent>
        </ModalRoot>
    );
}
