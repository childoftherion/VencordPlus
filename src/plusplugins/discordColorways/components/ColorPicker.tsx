/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { ColorPicker as VencordColorPicker, useRef } from "@webpack/common";

import { Popout } from "..";

export default function ({ onChange, onClose, color, suggestedColors, showEyeDropper, children }: {
    children: (props: {
        "aria-controls": string;
        "aria-expanded": boolean;
        onClick(event: React.MouseEvent<HTMLElement>): void;
        onKeyDown(event: React.KeyboardEvent<HTMLElement>): void;
        onMouseDown(event: React.MouseEvent<HTMLElement>): void;
    }) => React.ReactElement;
    onClose: () => void;
    color: number;
    showEyeDropper: boolean;
    suggestedColors: string[];
    onChange(color: number): void;
}) {
    const targetRef = useRef<HTMLElement>(null);

    return <Popout
        positionKey={crypto.randomUUID()}
        targetElementRef={targetRef}
        renderPopout={e => <VencordColorPicker
            color={color}
            onChange={onChange}
            suggestedColors={suggestedColors}
            showEyeDropper={showEyeDropper}
        />}
        onRequestClose={onClose}
    >
        {({ ...n }) => {
            return children({ ...n });
        }}
    </Popout>;
}
