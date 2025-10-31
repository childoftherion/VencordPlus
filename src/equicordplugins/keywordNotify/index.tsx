/*
 * Vencord, a Discord client mod
 * Copyright (c) 2023 Vendicated, camila314, and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { DataStore } from "@api/index";
import { definePluginSettings } from "@api/Settings";
import { Devs } from "@utils/constants";
import definePlugin, { OptionType } from "@utils/types";
import { Message } from "@vencord/discord-types";
import { FluxDispatcher, UserStore } from "@webpack/common";

type KeywordEntry = { regex: string, listIds: Array<string>, listType: ListType, ignoreCase: boolean; };

let keywordEntries: Array<KeywordEntry> = [];
let interceptor: (e: any) => void;

const KEYWORD_ENTRIES_KEY = "KeywordNotify_keywordEntries";

function safeMatchesRegex(str: string, regex: string, flags: string) {
    try {
        return str.match(new RegExp(regex, flags));
    } catch {
        return false;
    }
}

enum ListType {
    BlackList = "BlackList",
    Whitelist = "Whitelist"
}

const settings = definePluginSettings({
    ignoreBots: {
        type: OptionType.BOOLEAN,
        description: "Ignore messages from bots",
        default: true
    },
    keywords: {
        type: OptionType.STRING,
        description: "Comma-separated list of keywords to notify on",
        default: "ping,mention,urgent"
    }
});

export default definePlugin({
    name: "KeywordNotify",
    authors: [Devs.thororen],
    description: "Sends a notification if a message matches certain keywords",
    settings,

    async start() {
        keywordEntries = await DataStore.get(KEYWORD_ENTRIES_KEY) ?? [];
        await DataStore.set(KEYWORD_ENTRIES_KEY, keywordEntries);

        // Use flux event listener instead of interceptor
        FluxDispatcher.subscribe("MESSAGE_CREATE", this.handleMessage);
        FluxDispatcher.subscribe("MESSAGE_UPDATE", this.handleMessage);
    },

    stop() {
        FluxDispatcher.unsubscribe("MESSAGE_CREATE", this.handleMessage);
        FluxDispatcher.unsubscribe("MESSAGE_UPDATE", this.handleMessage);
    },

    handleMessage(e: any) {
        this.modify(e);
    },

    applyKeywordEntries(m: Message) {
        if (settings.store.ignoreBots && m.author.bot) {
            return;
        }

        const keywords = settings.store.keywords.split(",").map(k => k.trim().toLowerCase());
        const content = m.content.toLowerCase();

        for (const keyword of keywords) {
            if (keyword && content.includes(keyword)) {
                const id = UserStore.getCurrentUser()?.id;
                if (id !== null && m.author.id !== id) {
                    // @ts-ignore
                    m.mentions.push({ id: id });
                    this.showNotification(m, keyword);
                }
                break;
            }
        }
    },

    showNotification(message: Message, keyword: string) {
        // Simple notification - could be enhanced with proper notification API
        console.log(`Keyword notification: "${keyword}" found in message from ${message.author.username}`);
    },

    modify(e) {
        if (e.type === "MESSAGE_CREATE" || e.type === "MESSAGE_UPDATE") {
            this.applyKeywordEntries(e.message);
        } else if (e.type === "LOAD_MESSAGES_SUCCESS") {
            for (let msg = 0; msg < e.messages.length; ++msg) {
                this.applyKeywordEntries(e.messages[msg]);
            }
        }
    }
});
