/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import "./tooltip.css";

import { definePluginSettings } from "@api/Settings";
import { classNameFactory } from "@api/Styles";
import { Devs } from "@utils/constants";
import definePlugin, { OptionType } from "@utils/types";
import { Tooltip } from "@webpack/common";
import { React } from "webpack/common/react";

import { ToneListChatBarIcon } from "./ToneListIcon";

function toneIndicator(short: string[], long: string) {
    return {
        short: short,
        long: long,
    };
}
export interface ToneIndicator {
    short: string[],
    long: string,
}

const ti = toneIndicator;

export const toneIndicators = [
    ti(["j"], "joking"),
    ti(["hj"], "half-joking"),
    ti(["sj"], "slightly joking"),
    ti(["mj"], "mostly joking"),
    ti(["s", "sarc"], "sarcastic"),
    ti(["gen", "g"], "genuine"),
    ti(["srs"], "serious"),
    ti(["nsrs"], "non-serious"),
    ti(["pos", "pc"], "positive connotation"),
    ti(["neu"], "neutral connotation"),
    ti(["neg", "nc", "ng"], "negative connotation"),
    ti(["p"], "platonic"),
    ti(["r"], "romantic"),
    ti(["c"], "copypasta"),
    ti(["l", "ly", "lyr"], "lyrics"),
    ti(["lh"], "light-hearted"),
    ti(["nm"], "not mad"),
    ti(["lu"], "a little upset"),
    ti(["nbh"], "vagueposting/venting directed at nobody here"),
    ti(["nsb"], "not subtweeting"),
    ti(["sx", "x"], "sexual intent"), // brother ew
    ti(["nsx", "nx"], "non-sexual intent"),
    ti(["rh", "rt"], "rhetorical question"),
    ti(["t"], "teasing"),
    ti(["ij"], "inside joke"),
    ti(["m"], "metaphorically"),
    ti(["li"], "literally"),
    ti(["hyp"], "hyperbole"),
    ti(["f"], "fake"),
    ti(["th"], "threat"),
    ti(["cb"], "clickbait"),
    ti(["nf"], "not forced"),
    ti(["nay"], "not at you"),
    ti(["ref"], "reference"),
    ti(["npa"], "not passive aggressive"),
    ti(["pa"], "passive aggressive"),
    ti(["genq"], "genuine question"),
    ti(["q"], "quote"),
    ti(["nav"], "not a vent"),
    ti(["a"], "affectionate"),
    ti(["nr"], "not rushing")
];
const f = toneIndicators.reduce((ret, cur) => {
    return {
        ...ret,
        ...cur.short.reduce((ret, cur_s) => {
            return {
                ...ret,
                [cur_s]: cur
            };
        }, {})
    };
}, {});

interface ReactProps {
    tag: ToneIndicator;
    text: string;
    type: "tonetag";
}

type ParseReturn = ReactProps | { type: "text", content: string; };

export const cl = classNameFactory("nx-tone-");

export const settings = definePluginSettings({
    showToneList: {
        type: OptionType.BOOLEAN,
        description: "When disabled, hides the tone list in the chat box",
        default: true
    }
});

export default definePlugin({
    name: "ToneIndicators",
    description: "Adds descriptions when hovering over tone indicators",
    authors: [{ name: "Jaegerwald", id: 711944262173982822n }, { name: "Zoid", id: 854819626969333771n }, Devs.sadan],
    settings,

    renderChatBarButton: ToneListChatBarIcon,

    patches: [
        {
            find: "roleMention:{order:",
            replacement: {
                match: /emoticon:\{order:(\i\.\i\.order)/,
                replace: "tonetag:$self.makeRule($1),$&"
            },
        },
        {
            find: "Unknown markdown rule:",
            replacement: [
                {
                    match: /roleMention:\{type:/,
                    replace: "tonetag:{type: 'inlineObject'},$&"
                },
            ]
        }
    ],
    makeRule(order: number) {
        const TONE_REGEXP = /^\/(\w+)/;
        return {
            order,
            requiredFirstCharacters: ["/"],
            match: text => {
                return TONE_REGEXP.exec(text);
            },
            parse: (matchedContent: RegExpExecArray, _, parseProps: Record<string, any>): ParseReturn => {
                try {
                    if (f[matchedContent[1]] !== undefined && parseProps.messageId) {
                        return {
                            type: "tonetag",
                            text: matchedContent[0],
                            tag: f[matchedContent[1]]
                        };
                    }
                } catch (e) {
                    console.error(e);
                }
                return {
                    type: "text",
                    content: matchedContent[0]
                };
            },

            react: ({ text, tag }: ReactProps) => {
                return (<Tooltip text={tag.long} tooltipClassName="toneIndicator">
                    {props => <span
                        {...props}
                        className="inChatText"
                    >
                        {text}
                    </span>}
                </Tooltip>);
            }
        };
    },


});
