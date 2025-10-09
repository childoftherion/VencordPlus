/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { definePluginSettings } from "@api/Settings";
import { SettingsTab, wrapTab } from "@components/settings/tabs/BaseTab";
import { Logger } from "@utils/Logger";
import { OptionType } from "@utils/types";
import { Forms, React, Switch } from "@webpack/common";

const logger = new Logger("PrivacyControlPanel");

const privacySettings = definePluginSettings({
    blockAnalytics: {
        type: OptionType.BOOLEAN,
        description: "Block Discord's analytics and tracking.",
        default: true,
        restartNeeded: true,
    },
    blockCrashReporting: {
        type: OptionType.BOOLEAN,
        description: "Prevent Discord from sending crash reports.",
        default: true,
        restartNeeded: true,
    },
    hideActivityStatus: {
        type: OptionType.BOOLEAN,
        description: "Hide your activity status (playing games, Spotify, etc.) from others.",
        default: false,
    },
    disableTypingIndicator: {
        type: OptionType.BOOLEAN,
        description: "Disable sending typing indicators.",
        default: false,
    },
    blockReadReceipts: {
        type: OptionType.BOOLEAN,
        description: "Block read receipts from being sent.",
        default: false,
    },
    hideOnlineStatus: {
        type: OptionType.BOOLEAN,
        description: "Hide your online status from others.",
        default: false,
    },
    blockFriendRequests: {
        type: OptionType.BOOLEAN,
        description: "Block incoming friend requests.",
        default: false,
    },
    disableMessagePreviews: {
        type: OptionType.BOOLEAN,
        description: "Disable message previews in notifications.",
        default: false,
    },
    blockLocationSharing: {
        type: OptionType.BOOLEAN,
        description: "Block location sharing features.",
        default: true,
    },
    disableScreenShare: {
        type: OptionType.BOOLEAN,
        description: "Disable screen sharing capabilities.",
        default: false,
    },
    blockVoiceActivity: {
        type: OptionType.BOOLEAN,
        description: "Block voice activity detection.",
        default: false,
    },
    disableCamera: {
        type: OptionType.BOOLEAN,
        description: "Disable camera access.",
        default: false,
    },
});

function PrivacyControlPanelSettings() {
    const [currentSettings, setCurrentSettings] = React.useState(privacySettings.store);

    React.useEffect(() => {
        // Calculate privacy score based on enabled settings
        let score = 0;
        if (currentSettings.blockAnalytics) score += 15;
        if (currentSettings.blockCrashReporting) score += 15;
        if (currentSettings.hideActivityStatus) score += 10;
        if (currentSettings.disableTypingIndicator) score += 10;
        if (currentSettings.blockReadReceipts) score += 10;
        if (currentSettings.hideOnlineStatus) score += 10;
        if (currentSettings.blockFriendRequests) score += 5;
        if (currentSettings.disableMessagePreviews) score += 5;
        if (currentSettings.blockLocationSharing) score += 10;
        if (currentSettings.disableScreenShare) score += 5;
        if (currentSettings.blockVoiceActivity) score += 5;
        if (currentSettings.disableCamera) score += 5;

        setCurrentSettings({ ...currentSettings, privacyScore: score });
    }, [
        currentSettings.blockAnalytics,
        currentSettings.blockCrashReporting,
        currentSettings.hideActivityStatus,
        currentSettings.disableTypingIndicator,
        currentSettings.blockReadReceipts,
        currentSettings.hideOnlineStatus,
        currentSettings.blockFriendRequests,
        currentSettings.disableMessagePreviews,
        currentSettings.blockLocationSharing,
        currentSettings.disableScreenShare,
        currentSettings.blockVoiceActivity,
        currentSettings.disableCamera,
    ]);

    const handleSettingChange = (key: keyof typeof privacySettings.store, value: boolean) => {
        privacySettings.store[key] = value;
        setCurrentSettings({ ...currentSettings, [key]: value });
        logger.info(`Setting "${key}" changed to: ${value}`);
    };

    const privacyScore = (currentSettings as any).privacyScore || 0;

    return (
        <SettingsTab title="Privacy Control Panel">
            <Forms.FormTitle tag="h2">Privacy & Security Settings</Forms.FormTitle>
            <Forms.FormText>
                Manage your privacy and security preferences within VencordPlus.
            </Forms.FormText>

            <Forms.FormSection>
                <Switch
                    value={currentSettings.blockAnalytics}
                    onChange={v => handleSettingChange("blockAnalytics", v)}
                    note="Blocks Discord's analytics and tracking mechanisms. (Requires restart)"
                >
                    Block Analytics
                </Switch>
                <Switch
                    value={currentSettings.blockCrashReporting}
                    onChange={v => handleSettingChange("blockCrashReporting", v)}
                    note="Prevents Discord from sending crash reports to Sentry. (Requires restart)"
                >
                    Block Crash Reporting
                </Switch>
                <Switch
                    value={currentSettings.hideActivityStatus}
                    onChange={v => handleSettingChange("hideActivityStatus", v)}
                    note="Hides your current activity (e.g., playing a game, listening to Spotify) from others."
                >
                    Hide Activity Status
                </Switch>
                <Switch
                    value={currentSettings.disableTypingIndicator}
                    onChange={v => handleSettingChange("disableTypingIndicator", v)}
                    note="Prevents Discord from showing when you are typing in channels or DMs."
                >
                    Disable Typing Indicator
                </Switch>
                <Switch
                    value={currentSettings.blockReadReceipts}
                    onChange={v => handleSettingChange("blockReadReceipts", v)}
                    note="Prevents Discord from sending read receipts for your messages."
                >
                    Block Read Receipts
                </Switch>
                <Switch
                    value={currentSettings.hideOnlineStatus}
                    onChange={v => handleSettingChange("hideOnlineStatus", v)}
                    note="Hides your online status from other users."
                >
                    Hide Online Status
                </Switch>
                <Switch
                    value={currentSettings.blockFriendRequests}
                    onChange={v => handleSettingChange("blockFriendRequests", v)}
                    note="Blocks incoming friend requests from other users."
                >
                    Block Friend Requests
                </Switch>
                <Switch
                    value={currentSettings.disableMessagePreviews}
                    onChange={v => handleSettingChange("disableMessagePreviews", v)}
                    note="Disables message previews in desktop notifications."
                >
                    Disable Message Previews
                </Switch>
                <Switch
                    value={currentSettings.blockLocationSharing}
                    onChange={v => handleSettingChange("blockLocationSharing", v)}
                    note="Blocks location sharing features in Discord."
                >
                    Block Location Sharing
                </Switch>
                <Switch
                    value={currentSettings.disableScreenShare}
                    onChange={v => handleSettingChange("disableScreenShare", v)}
                    note="Disables screen sharing capabilities."
                >
                    Disable Screen Share
                </Switch>
                <Switch
                    value={currentSettings.blockVoiceActivity}
                    onChange={v => handleSettingChange("blockVoiceActivity", v)}
                    note="Blocks voice activity detection in voice channels."
                >
                    Block Voice Activity
                </Switch>
                <Switch
                    value={currentSettings.disableCamera}
                    onChange={v => handleSettingChange("disableCamera", v)}
                    note="Disables camera access for video calls."
                >
                    Disable Camera
                </Switch>
            </Forms.FormSection>

            <Forms.FormDivider />

            <Forms.FormTitle tag="h3">Your Privacy Score: {privacyScore}/100</Forms.FormTitle>
            <Forms.FormText>
                This score reflects how many privacy-enhancing settings you have enabled. Higher is better!
            </Forms.FormText>

            <div style={{
                marginTop: "16px",
                padding: "12px",
                backgroundColor: "var(--background-modifier-accent)",
                borderRadius: "8px",
                border: `2px solid ${privacyScore >= 80 ? "var(--green-360)" : privacyScore >= 60 ? "var(--yellow-360)" : "var(--red-360)"}`
            }}>
                <div style={{ fontWeight: "600", marginBottom: "8px" }}>
                    Privacy Level: {privacyScore >= 80 ? "Excellent" : privacyScore >= 60 ? "Good" : "Needs Improvement"}
                </div>
                <div style={{ fontSize: "14px", color: "var(--text-muted)" }}>
                    {privacyScore >= 80
                        ? "You have excellent privacy protection enabled!"
                        : privacyScore >= 60
                            ? "Your privacy is well protected, but there's room for improvement."
                            : "Consider enabling more privacy settings to better protect your data."
                    }
                </div>
            </div>
        </SettingsTab>
    );
}

export { privacySettings };
export default wrapTab(PrivacyControlPanelSettings, "Privacy Control Panel");
