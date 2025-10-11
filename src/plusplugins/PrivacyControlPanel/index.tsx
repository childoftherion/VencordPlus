/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { Devs } from "@utils/constants";
import definePlugin from "@utils/types";
import { SettingsRouter } from "@webpack/common";

import { privacySettings as settings } from "./settings";

export default definePlugin({
    name: "Privacy Control Panel",
    description: "A central control panel for VencordPlus privacy and security settings.",
    authors: [Devs.childoftherion],
    settings,
    toolboxActions: {
        "Open Privacy Settings": () => {
            SettingsRouter.open("PrivacyControlPanel");
        },
    },
    start() {
        const customSettingsSections = (
            Vencord.Plugins.plugins.Settings as any as {
                customSections: ((ID: Record<string, unknown>) => any)[];
            }
        ).customSections;

        const PrivacyControlPanelSection = () => ({
            section: "PrivacyControlPanel",
            label: "Privacy Control Panel",
            searchableTitles: ["Privacy Control Panel"],
            element: require("./settings").default,
            id: "PrivacyControlPanelSection",
        });

        customSettingsSections.push(PrivacyControlPanelSection);
    },
    stop() {
        const customSettingsSections = (
            Vencord.Plugins.plugins.Settings as any as {
                customSections: ((ID: Record<string, unknown>) => any)[];
            }
        ).customSections;

        const i = customSettingsSections.findIndex(
            section => section({}).id === "PrivacyControlPanelSection"
        );

        if (i !== -1) customSettingsSections.splice(i, 1);
    },
});
