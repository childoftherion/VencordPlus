/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { React } from "@webpack/common";

export function StockPluginsCard({ totalStockPlugins, enabledStockPlugins }: { totalStockPlugins: number; enabledStockPlugins: number; }) {
    return (
        <div className="vc-plugin-stats vc-stockplugins-stats-card">
            <div className="vc-plugin-stats-card-container">
                <div className="vc-plugin-stats-card-section">
                    <div className="vc-text-md vc-text-semibold">Enabled Plugins</div>
                    <div className="vc-text-xl vc-text-bold">{enabledStockPlugins}</div>
                </div>
                <div className="vc-plugin-stats-card-divider"></div>
                <div className="vc-plugin-stats-card-section">
                    <div className="vc-text-md vc-text-semibold">Total Plugins</div>
                    <div className="vc-text-xl vc-text-bold">{totalStockPlugins}</div>
                </div>
            </div>
        </div>
    );
}

export function UserPluginsCard({ totalUserPlugins, enabledUserPlugins }: { totalUserPlugins: number; enabledUserPlugins: number; }) {
    return (
        <div className="vc-plugin-stats vc-stockplugins-stats-card">
            <div className="vc-plugin-stats-card-container">
                <div className="vc-plugin-stats-card-section">
                    <div className="vc-text-md vc-text-semibold">Enabled Userplugins</div>
                    <div className="vc-text-xl vc-text-bold">{enabledUserPlugins}</div>
                </div>
                <div className="vc-plugin-stats-card-divider"></div>
                <div className="vc-plugin-stats-card-section">
                    <div className="vc-text-md vc-text-semibold">Total Userplugins</div>
                    <div className="vc-text-xl vc-text-bold">{totalUserPlugins}</div>
                </div>
            </div>
        </div>
    );
}


