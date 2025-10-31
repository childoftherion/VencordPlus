/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import "./styles.css";

import { useSettings } from "@api/Settings";
import { classNameFactory } from "@api/Styles";
import { Divider } from "@components/Divider";
import ErrorBoundary from "@components/ErrorBoundary";
import { HeadingTertiary } from "@components/Heading";
import { Paragraph } from "@components/Paragraph";
import { SettingsTab, wrapTab } from "@components/settings/tabs/BaseTab";
import { debounce } from "@shared/debounce";
import { ChangeList } from "@utils/ChangeList";
import { Logger } from "@utils/Logger";
import { Margins } from "@utils/margins";
import { classes } from "@utils/misc";
import { useIntersection } from "@utils/react";
import { Alerts, React, Select, TextInput, useMemo, useState } from "@webpack/common";
import { JSX } from "react";

import Plugins, { ExcludedPlugins, PluginMeta } from "~plugins";

import { StockPluginsCard, UserPluginsCard } from "./EquicordStatCards";
import { PluginCard } from "./PluginCard";

export const cl = classNameFactory("vc-plugins-");
export const logger = new Logger("PluginSettingsEQ", "#a6d189");

const enum SearchStatus {
    ALL,
    ENABLED,
    DISABLED,
    USERPLUGINS
}

function ExcludedPluginsList({ search }: { search: string; }) {
    const matchingExcludedPlugins = Object.entries(ExcludedPlugins)
        .filter(([name]) => name.toLowerCase().includes(search));

    const ExcludedReasons: Record<"web" | "discordDesktop" | "vesktop" | "desktop" | "dev", string> = {
        desktop: "Discord Desktop app or Vesktop",
        discordDesktop: "Discord Desktop app",
        vesktop: "Vesktop app",
        web: "Vesktop app and the Web version of Discord",
        dev: "Developer version of Vencord"
    };

    return (
        <Paragraph className={Margins.top16}>
            {matchingExcludedPlugins.length
                ? <>
                    <Paragraph>Are you looking for:</Paragraph>
                    <ul>
                        {matchingExcludedPlugins.map(([name, reason]) => (
                            <li key={name}>
                                <b>{name}</b>: Only available on the {ExcludedReasons[reason]}
                            </li>
                        ))}
                    </ul>
                </>
                : "No plugins meet the search criteria."
            }
        </Paragraph>
    );
}

function isApiPlugin(pluginId: string) {
    const plugin = Plugins[pluginId];
    return pluginId.endsWith("API") || plugin?.required;
}

function isUserPlugin(pluginId: string) {
    const meta = PluginMeta[pluginId];
    return !!meta?.folderName?.startsWith("userplugins/");
}

export default function EquicordPluginsTab() {
    const settings = useSettings();
    const changes = useMemo(() => new ChangeList<string>(), []);

    React.useEffect(() => () => {
        if (!changes.hasChanges) return;
        Alerts.show({
            title: "Restart required",
            body: (
                <div>
                    {changes.map((s, i) => (
                        <span key={i}>{i > 0 && ", "}{s}</span>
                    ))}
                </div>
            ),
            confirmText: "Restart now",
            cancelText: "Later!",
            onConfirm: () => location.reload()
        });
    }, []);

    const sortedPlugins = useMemo(() => Object.values(Plugins)
        .filter(p => p && p.name)
        .sort((a, b) => a.name.localeCompare(b.name)), []);

    // restore persisted search/filter
    const [searchValue, setSearchValue] = useState(() => {
        try {
            const savedQuery = localStorage.getItem("Plus_PluginsSearch") ?? "";
            const savedStatus = Number(localStorage.getItem("Plus_PluginsFilterStatus") ?? SearchStatus.ALL) as SearchStatus;
            return { value: savedQuery, status: savedStatus };
        } catch {
            return { value: "", status: SearchStatus.ALL };
        }
    });
    const search = searchValue.value.toLowerCase();
    const onSearch = (query: string) => {
        setSearchValue(prev => ({ ...prev, value: query }));
        try { localStorage.setItem("Plus_PluginsSearch", query); } catch { }
    };
    const onStatusChange = (status: SearchStatus) => {
        setSearchValue(prev => ({ ...prev, status }));
        try { localStorage.setItem("Plus_PluginsFilterStatus", String(status)); } catch { }
    };

    const pluginFilter = (plugin: typeof Plugins[keyof typeof Plugins]) => {
        const enabled = Vencord.Plugins.isPluginEnabled(plugin.name);
        switch (searchValue.status) {
            case SearchStatus.ENABLED:
                if (!enabled) return false;
                break;
            case SearchStatus.DISABLED:
                if (enabled) return false;
                break;
            case SearchStatus.USERPLUGINS:
                if (!isUserPlugin(plugin.name)) return false;
                break;
        }
        if (!search.length) return true;
        return (
            plugin.name.toLowerCase().includes(search) ||
            plugin.description.toLowerCase().includes(search) ||
            plugin.tags?.some(t => t.toLowerCase().includes(search))
        );
    };

    // Build cards/counters
    const totalPluginIds = Object.keys(Plugins).filter(p => !isApiPlugin(p));
    const enabledPluginIds = totalPluginIds.filter(p => Vencord.Plugins.isPluginEnabled(p));

    const totalUserPlugins = totalPluginIds.filter(isUserPlugin).length;
    const enabledUserPlugins = enabledPluginIds.filter(isUserPlugin).length;
    const totalStockPlugins = totalPluginIds.filter(p => !isUserPlugin(p) && !Plugins[p]?.hidden).length;
    const enabledStockPlugins = enabledPluginIds.filter(p => !isUserPlugin(p)).length;

    const plugins: JSX.Element[] = [];
    const requiredPlugins: JSX.Element[] = [];
    for (const p of sortedPlugins) {
        if (p.hidden || (!p.options && p.name.endsWith("API"))) continue;
        if (!pluginFilter(p)) continue;

        const isRequired = p.required || p.isDependency;
        if (isRequired) {
            requiredPlugins.push(
                <PluginCard
                    onRestartNeeded={(name, key) => changes.handleChange(`${name}.${key}`)}
                    disabled={true}
                    plugin={p}
                    key={p.name}
                />
            );
        } else {
            plugins.push(
                <PluginCard
                    onRestartNeeded={(name, key) => changes.handleChange(`${name}.${key}`)}
                    disabled={false}
                    plugin={p}
                    key={p.name}
                />
            );
        }
    }

    // Incremental rendering (lazy load more rows as you scroll)
    const pluginsToLoad = Math.min(36, plugins.length);
    const [visibleCount, setVisibleCount] = React.useState(pluginsToLoad);
    const loadMore = React.useCallback(() => {
        setVisibleCount(v => Math.min(v + pluginsToLoad, plugins.length));
    }, [plugins.length]);

    const dLoadMore = useMemo(() => debounce(loadMore, 100), [loadMore]);
    const [sentinelRef, isSentinelVisible] = useIntersection();
    React.useEffect(() => {
        if (isSentinelVisible && visibleCount < plugins.length) dLoadMore();
    }, [isSentinelVisible, visibleCount, plugins.length, dLoadMore]);

    const visiblePlugins = plugins.slice(0, visibleCount);

    return (
        <SettingsTab title="Plugins">
            <div style={{ marginTop: 16, gap: 16, display: "flex", flexDirection: "row", width: "100%" }}>
                <StockPluginsCard totalStockPlugins={totalStockPlugins} enabledStockPlugins={enabledStockPlugins} />
                <UserPluginsCard totalUserPlugins={totalUserPlugins} enabledUserPlugins={enabledUserPlugins} />
            </div>

            <HeadingTertiary className={classes(Margins.top20, Margins.bottom8)}>
                Filters
            </HeadingTertiary>

            <div className={classes(Margins.bottom20, cl("filter-controls"))}>
                <ErrorBoundary noop>
                    <TextInput autoFocus value={searchValue.value} placeholder="Search for a plugin..." onChange={onSearch} />
                </ErrorBoundary>
                <div>
                    <ErrorBoundary noop>
                        <Select
                            options={[
                                { label: "Show All", value: SearchStatus.ALL, default: true },
                                { label: "Show Enabled", value: SearchStatus.ENABLED },
                                { label: "Show Disabled", value: SearchStatus.DISABLED },
                                { label: "Show Userplugins", value: SearchStatus.USERPLUGINS }
                            ]}
                            serialize={String}
                            select={onStatusChange}
                            isSelected={v => v === searchValue.status}
                            closeOnSelect={true}
                        />
                    </ErrorBoundary>
                </div>
            </div>

            <HeadingTertiary className={Margins.top20}>Plugins</HeadingTertiary>

            {plugins.length || requiredPlugins.length
                ? (
                    <>
                        <div className={cl("grid")}>
                            {visiblePlugins.length
                                ? visiblePlugins
                                : <Paragraph>No plugins meet the search criteria.</Paragraph>
                            }
                        </div>
                        {visibleCount < plugins.length && (
                            <div ref={sentinelRef as any} style={{ height: 32 }} />
                        )}
                    </>
                )
                : <ExcludedPluginsList search={search} />
            }

            <Divider className={Margins.top20} />

            <HeadingTertiary className={classes(Margins.top20, Margins.bottom8)}>
                Required Plugins
            </HeadingTertiary>
            <div className={cl("grid")}>
                {requiredPlugins.length
                    ? requiredPlugins
                    : <Paragraph>No plugins meet the search criteria.</Paragraph>
                }
            </div>
        </SettingsTab>
    );
}

export const ConditionalEquicordPluginsTab = wrapTab(EquicordPluginsTab, "Plugins");


