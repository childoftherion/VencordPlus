/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { IconProps } from "./Icons";

export default function ({ items, ...props }: { items: { Icon: (props: IconProps) => React.JSX.Element, title: string; }[]; } & React.HTMLAttributes<HTMLDivElement>) {
    return <div {...props} className="colorwaysFeaturePresent">
        {items.map(({ Icon }, index) => <div key={index} className="colorwaysFeatureIconContainer">
            <Icon width={48} height={48} />
        </div>)}
        {items.map(({ title }, index) => <span key={index} className="colorwaysFeatureIconLabel">{title}</span>)}
    </div>;
}
