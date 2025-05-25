/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { findOption, RequiredMessageOption } from "@api/Commands";
import { Devs } from "@utils/constants";
import definePlugin from "@utils/types";

const ABC = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const abc = "abcdefghijklmnopqrstuvwxyz";
const num = "0123456789";

function font(from: string, to: string[]) {
    return {
        from: from,
        to: to
    };
}
interface Font {
    from: string,
    to: string[],
}

const fonts = {
    // Debug
    invert: font(ABC + abc, (abc + ABC).split("")),
    none: font("", [""]),

    // Main
    upsideDown: font(ABC + abc + ",!?&_;.", "Ɐ ꓭ Ɔ ꓷ Ǝ Ⅎ ꓨ H I ſ ꓘ ꓶ W N O Ԁ Ꝺ ꓤ S ꓕ ꓵ ꓥ M X ⅄ Z ɐ q ɔ p ǝ ɟ ƃ ɥ ı̣ ɾ̣ ʞ ן ɯ u o d b ɹ s ʇ n ʌ ʍ x ʎ z ' ¡ ¿ ⅋ ‾ ؛ ˙".split(" ")),
    cursive: font(ABC + abc, "𝒜 ℬ 𝒞 𝒟 ℰ ℱ 𝒢 ℋ ℐ 𝒥 𝒦 ℒ ℳ 𝒩 𝒪 𝒫 𝒬 ℛ 𝒮 𝒯 𝒰 𝒱 𝒲 𝒳 𝒴 𝒵 𝒶 𝒷 𝒸 𝒹 𝑒 𝒻 𝑔 𝒽 𝒾 𝒿 𝓀 𝓁 𝓂 𝓃 𝑜 𝓅 𝓆 𝓇 𝓈 𝓉 𝓊 𝓋 𝓌 𝓍 𝓎 𝓏".split(" ")),
    smallCaps: font("abcdefghijklmnoprstuvwyzqæƀðʒǝɠɨłꟽɯœɔȣꝵʉγλπρψ", "ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘʀꜱᴛᴜᴠᴡʏᴢǫᴁᴃᴆᴣⱻʛᵻᴌꟺꟺɶᴐᴕꝶᵾᴦᴧᴨᴩᴪ".split("")),
    oldEnglish: font(ABC + abc + num, "𝕬 𝕭 𝕮 𝕯 𝕰 𝕱 𝕲 𝕳 𝕴 𝕵 𝕶 𝕷 𝕸 𝕹 𝕺 𝕻 𝕼 𝕽 𝕾 𝕿 𝖀 𝖁 𝖂 𝖃 𝖄 𝖅 𝖆 𝖇 𝖈 𝖉 𝖊 𝖋 𝖌 𝖍 𝖎 𝖏 𝖐 𝖑 𝖒 𝖓 𝖔 𝖕 𝖖 𝖗 𝖘 𝖙 𝖚 𝖛 𝖜 𝖝 𝖞 𝖟 𝟎 𝟏 𝟐 𝟑 𝟒 𝟓 𝟔 𝟕 𝟖 𝟗".split(" ")),
    outline: font(ABC + abc + num, "𝔸 𝔹 ℂ 𝔻 𝔼 𝔽 𝔾 ℍ 𝕀 𝕁 𝕂 𝕃 𝕄 ℕ 𝕆 ℙ ℚ ℝ 𝕊 𝕋 𝕌 𝕍 𝕎 𝕏 𝕐 ℤ 𝕒 𝕓 𝕔 𝕕 𝕖 𝕗 𝕘 𝕙 𝕚 𝕛 𝕜 𝕝 𝕞 𝕟 𝕠 𝕡 𝕢 𝕣 𝕤 𝕥 𝕦 𝕧 𝕨 𝕩 𝕪 𝕫 𝟘 𝟙 𝟚 𝟛 𝟜 𝟝 𝟞 𝟟 𝟠 𝟡".split(" "))
};

function applyFont(input: string, font: Font) {
    let result = "";

    for (let i = 0; i < input.length; i++) {
        let letter = input[i];
        for (let j = 0; j < font.from.length; j++) {
            if (input[i] === font.from[j]) {
                letter = font.to[j];
                break;
            }
        }
        result += letter;
    }

    return result;
}

export default definePlugin({
    name: "FontCommands",
    description: "Adds a couple of commands for applying a font generator to your message",
    authors: [{ name: "Jaegerwald", id: 711944262173982822n }, { name: "SwitchedCube", id: 866910016535527454n }],
    commands: [
        // Debug
        {
            name: "dbg-invert",
            description: "inverts ABC2abc and abc2ABC",
            options: [RequiredMessageOption],
            devOnly: true,
            execute: opts => ({
                content: applyFont(findOption(opts, "message", ""), fonts.invert)
            })
        },
        {
            name: "dbg-none",
            description: "applies nothing",
            options: [RequiredMessageOption],
            devOnly: true,
            execute: opts => ({
                content: applyFont(findOption(opts, "message", ""), fonts.none)
            })
        },
        // Main
        {
            name: "upside-down",
            description: "Turns your text uʍop ǝpı̣sdn. (Only A-Z, a-z supported for now.)",
            options: [RequiredMessageOption],
            execute: opts => ({
                content: applyFont(findOption(opts, "message", "").split("").reverse().join(""), fonts.upsideDown)
            })
        },
        {
            name: "cursive",
            description: "Turns your text 𝓬𝓾𝓻𝓼𝓲𝓿𝓮. (Only A-Z, a-z, 0-9 supported for now.)",
            options: [RequiredMessageOption],
            execute: opts => ({
                content: applyFont(findOption(opts, "message", ""), fonts.cursive)
            })
        },
        {
            name: "small-caps",
            description: "Turns your text into ꜱᴍᴀʟʟ ᴄᴀᴘꜱ (Only A-Z, a-z, \",!?&_;.\" supported for now.)",
            options: [RequiredMessageOption],
            execute: opts => ({
                content: applyFont(findOption(opts, "message", "").toLowerCase(), fonts.smallCaps)
            })
        },
        {
            name: "old-english",
            description: "Turns your text into 𝖞𝖊 𝖔𝖑𝖉𝖊 𝖊𝖓𝖌𝖑𝖎𝖘𝖍. (Only A-Z, a-z, 0-9 supported for now.)",
            options: [RequiredMessageOption],
            execute: opts => ({
                content: applyFont(findOption(opts, "message", ""), fonts.oldEnglish)
            })
        },
        {
            name: "outline",
            description: "Turns your text into 𝕒𝕟 𝕠𝕦𝕥𝕝𝕚𝕟𝕖. (Only A-Z, a-z, 0-9 supported for now.)",
            options: [RequiredMessageOption],
            execute: opts => ({
                content: applyFont(findOption(opts, "message", ""), fonts.outline)
            })
        }
    ]
});
