/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { useSettings } from "@api/Settings";
import ErrorBoundary from "@components/ErrorBoundary";
import { NoEntrySignIcon } from "@components/Icons";
import { AddonCard } from "@components/settings";
import { PluginCard } from "@components/settings/tabs/plugins/PluginCard";
import { Message } from "@vencord/discord-types";
import { showToast, TooltipContainer } from "@webpack/common";
import { JSX } from "react";

import plugins from "~plugins";

export function ChatPluginCard({ url, description }: { url: string, description: string; }) {
    const pluginNameFromUrl = new URL(url).pathname.split("/")[2];

    const actualPluginName = Object.keys(plugins).find(name =>
        name.toLowerCase() === pluginNameFromUrl?.toLowerCase()
    );

    const pluginName = actualPluginName || pluginNameFromUrl;

    useSettings([`plugins.${pluginName ?? ""}.enabled`]);

    if (!pluginName) return null;

    const p = plugins[pluginName];

    if (!p) {
        const toolTipText = "This plugin is not available in VencordPlus. Try updating!";

        const card = (
            <AddonCard
                name={pluginName}
                description={description || toolTipText}
                enabled={false}
                setEnabled={() => { }}
                disabled={true}
                infoButton={<NoEntrySignIcon />}
            />
        );

        return description
            ? <TooltipContainer text={toolTipText}>{card}</TooltipContainer>
            : card;
    }

    const onRestartNeeded = () => showToast("A restart is required for the change to take effect!");

    return (
        <PluginCard
            key={p.name}
            onRestartNeeded={onRestartNeeded}
            plugin={p}
            disabled={false}
        />
    );
}

export const PluginCards = ErrorBoundary.wrap(function PluginCards({ message }: { message: Message; }) {
    const seenPlugins = new Set<string>();
    const pluginCards: JSX.Element[] = [];

    // Process embeds
    message.embeds?.forEach(embed => {
        if (!embed.url?.startsWith("https://vencord.dev/plugins/")) return;

        const pluginNameFromUrl = new URL(embed.url).pathname.split("/")[2];
        const actualPluginName = Object.keys(plugins).find(name =>
            name.toLowerCase() === pluginNameFromUrl?.toLowerCase()
        );
        const pluginName = actualPluginName || pluginNameFromUrl;

        if (!pluginName || seenPlugins.has(pluginName)) return;
        seenPlugins.add(pluginName);

        pluginCards.push(
            <ChatPluginCard
                key={embed.url}
                url={embed.url}
                description={embed.rawDescription}
            />
        );
    });

    // Process components for VencordPlus plugin links
    const components = (message.components?.[0] as any)?.components;
    if (components?.length >= 4) {
        const description = components[1]?.content;
        const pluginUrl = components.find((c: any) => c?.components)?.components[0]?.url;
        if (pluginUrl?.startsWith("https://vencord.dev/plugins/")) {
            const pluginNameFromUrl = new URL(pluginUrl).pathname.split("/")[2];
            const actualPluginName = Object.keys(plugins).find(name =>
                name.toLowerCase() === pluginNameFromUrl?.toLowerCase()
            );
            const pluginName = actualPluginName || pluginNameFromUrl;

            if (pluginName && !seenPlugins.has(pluginName)) {
                seenPlugins.add(pluginName);
                pluginCards.push(
                    <ChatPluginCard
                        key={pluginUrl}
                        url={pluginUrl}
                        description={description}
                    />
                );
            }
        }
    }

    if (pluginCards.length === 0) return null;

    return (
        <div className="vc-plugins-management-cards vc-plugins-grid" style={{ marginTop: "0px" }}>
            {pluginCards}
        </div>
    );
}, { noop: true });
