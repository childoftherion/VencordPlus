/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

export default function ({
    items = [],
    container = ({ children }) => <>{children}</>,
    onChange,
    active = ""
}: {
    items: { name: string, component: () => React.JSX.Element; }[];
    container?: ({ children }) => React.JSX.Element;
    onChange: (tab: string) => void;
    active: string;
}) {
    return <>
        {container({
            children: <div className="dc-menu-tabs">
                {items.map(item => {
                    return <div key={item.name} className={`dc-menu-tab ${active === item.name ? "active" : ""}`} onClick={() => onChange(item.name)}>{item.name}</div>;
                })}
            </div>
        })}
        {items.map(item => active === item.name ? item.component() : null)}
    </>;
}
