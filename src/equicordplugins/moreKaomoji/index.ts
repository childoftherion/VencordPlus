/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { findOption, OptionalMessageOption } from "@api/Commands";
import { Devs, EquicordDevs } from "@utils/constants";
import definePlugin from "@utils/types";

export default definePlugin({
    name: "MoreKaomoji",
    description: "Adds more Kaomoji to Discord ヽ(´▽`)/",
    authors: [Devs.JacobTm, EquicordDevs.voidbbg],
    commands: [
        {
            name: "dissatisfaction",
            description: " ＞﹏＜",
            options: [OptionalMessageOption],
            execute: opts => ({
                content: findOption(opts, "message", "") + " " + " ＞﹏＜",
            }),
        },
        {
            name: "smug",
            description: "ಠ_ಠ",
            options: [OptionalMessageOption],
            execute: opts => ({
                content: findOption(opts, "message", "") + " " + "ಠ_ಠ",
            }),
        },
        {
            name: "happy",
            description: "ヽ(´▽`)/",
            options: [OptionalMessageOption],
            execute: opts => ({
                content: findOption(opts, "message", "") + " " + "ヽ(´▽`)/",
            }),
        },
        {
            name: "crying",
            description: "ಥ_ಥ",
            options: [OptionalMessageOption],
            execute: opts => ({
                content: findOption(opts, "message", "") + " " + "ಥ_ಥ",
            }),
        },
        {
            name: "angry",
            description: "ヽ(｀Д´)ﾉ",
            options: [OptionalMessageOption],
            execute: opts => ({
                content: findOption(opts, "message", "") + " " + "ヽ(｀Д´)ﾉ",
            }),
        },
        {
            name: "anger",
            description: "ヽ(ｏ`皿′ｏ)ﾉ",
            options: [OptionalMessageOption],
            execute: opts => ({
                content: findOption(opts, "message", "") + " " + "ヽ(ｏ`皿′ｏ)ﾉ",
            }),
        },
        {
            name: "joy",
            description: "<(￣︶￣)>",
            options: [OptionalMessageOption],
            execute: opts => ({
                content: findOption(opts, "message", "") + " " + "<(￣︶￣)>",
            }),
        },
        {
            name: "blush",
            description: "૮ ˶ᵔ ᵕ ᵔ˶ ა",
            options: [OptionalMessageOption],
            execute: opts => ({
                content: findOption(opts, "message", "") + " " + "૮ ˶ᵔ ᵕ ᵔ˶ ა",
            }),
        },
        {
            name: "confused",
            description: "(•ิ_•ิ)?",
            options: [OptionalMessageOption],
            execute: opts => ({
                content: findOption(opts, "message", "") + " " + "(•ิ_•ิ)?",
            }),
        },
        {
            name: "sleeping",
            description: "(ᴗ_ᴗ)",
            options: [OptionalMessageOption],
            execute: opts => ({
                content: findOption(opts, "message", "") + " " + "(ᴗ_ᴗ)",
            }),
        },
        {
            name: "laughing",
            description: "o(≧▽≦)o",
            options: [OptionalMessageOption],
            execute: opts => ({
                content: findOption(opts, "message", "") + " " + "o(≧▽≦)o",
            }),
        },
        /*
        even more kaomoji
        */
        {
            name: "giving",
            description: "(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧",
            options: [OptionalMessageOption],
            execute: opts => ({
                content: findOption(opts, "message", "") + " " + "(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧",
            }),
        },
        {
            name: "peace",
            description: "✌(◕‿-)✌",
            options: [OptionalMessageOption],
            execute: opts => ({
                content: findOption(opts, "message", "") + " " + "✌(◕‿-)✌",
            }),
        },
        {
            name: "ending1",
            description: "Ꮺ ָ࣪ ۰ ͙⊹",
            options: [OptionalMessageOption],
            execute: opts => ({
                content: findOption(opts, "message", "") + " " + "Ꮺ ָ࣪ ۰ ͙⊹",
            }),
        },
        {
            name: "uwu",
            description: "(>⩊<)",
            options: [OptionalMessageOption],
            execute: opts => ({
                content: findOption(opts, "message", "") + " " + "(>⩊<)",
            }),
        },
        {
            name: "comfy",
            description: "(─‿‿─)♡",
            options: [OptionalMessageOption],
            execute: opts => ({
                content: findOption(opts, "message", "") + " " + "(─‿‿─)♡",
            }),
        },
        {
            name: "lovehappy",
            description: "(*≧ω≦*)",
            options: [OptionalMessageOption],
            execute: opts => ({
                content: findOption(opts, "message", "") + " " + "(*≧ω≦*)",
            }),
        },
        {
            name: "loveee",
            description: "(⁄ ⁄>⁄ ▽ ⁄<⁄ ⁄)",
            options: [OptionalMessageOption],
            execute: opts => ({
                content: findOption(opts, "message", "") + " " + "(⁄ ⁄>⁄ ▽ ⁄<⁄ ⁄)",
            }),
        },
        {
            name: "give",
            description: "(ノ= ⩊ = )ノ",
            options: [OptionalMessageOption],
            execute: opts => ({
                content: findOption(opts, "message", "") + " " + "(ノ= ⩊ = )ノ",
            }),
        },
        {
            name: "lovegive",
            description: "ღゝ◡╹)ノ♡",
            options: [OptionalMessageOption],
            execute: opts => ({
                content: findOption(opts, "message", "") + " " + "ღゝ◡╹)ノ♡",
            }),
        },
        {
            name: "music",
            description: "(￣▽￣)/♫•¨•.¸¸♪",
            options: [OptionalMessageOption],
            execute: opts => ({
                content: findOption(opts, "message", "") + " " + "(￣▽￣)/♫•¨•.¸¸♪",
            }),
        },
        {
            name: "stars",
            description: ".𖥔 ݁ ˖๋ ࣭ ⭑",
            options: [OptionalMessageOption],
            execute: opts => ({
                content: findOption(opts, "message", "") + " " + ".𖥔 ݁ ˖๋ ࣭ ⭑",
            }),
        },
        {
            name: "lovegiving",
            description: "⸜(｡˃ ᵕ ˂ )⸝♡",
            options: [OptionalMessageOption],
            execute: opts => ({
                content: findOption(opts, "message", "") + " " + "⸜(｡˃ ᵕ ˂ )⸝♡",
            }),
        },
        /*
        even more kaomoji than before
        */
        {
            name: "laughing2",
            description: "(＾▽＾)",
            options: [OptionalMessageOption],
            execute: opts => ({
                content: findOption(opts, "message", "") + " " + "(＾▽＾)",
            }),
        },
        {
            name: "laughing3",
            description: "（⌒▽⌒）",
            options: [OptionalMessageOption],
            execute: opts => ({
                content: findOption(opts, "message", "") + " " + "（⌒▽⌒）",
            }),
        },
        {
            name: "wave1",
            description: "( ´ ∀ ` )ﾉ",
            options: [OptionalMessageOption],
            execute: opts => ({
                content: findOption(opts, "message", "") + " " + "( ´ ∀ ` )ﾉ",
            }),
        },
        {
            name: "wave2",
            description: "ヾ(・ω・)",
            options: [OptionalMessageOption],
            execute: opts => ({
                content: findOption(opts, "message", "") + " " + "ヾ(・ω・)",
            }),
        },
        {
            name: "shrug",
            description: "¯_(ツ)_/¯",
            options: [OptionalMessageOption],
            execute: opts => ({
                content: findOption(opts, "message", "") + " " + "¯_(ツ)_/¯",
            }),
        },
        {
            name: "surprised1",
            description: "(O_O)",
            options: [OptionalMessageOption],
            execute: opts => ({
                content: findOption(opts, "message", "") + " " + "(O_O)",
            }),
        },
        {
            name: "surprised2",
            description: "Σ(°ロ°)",
            options: [OptionalMessageOption],
            execute: opts => ({
                content: findOption(opts, "message", "") + " " + "Σ(°ロ°)",
            }),
        },
        {
            name: "love",
            description: "(❤ω❤)",
            options: [OptionalMessageOption],
            execute: opts => ({
                content: findOption(opts, "message", "") + " " + "(❤ω❤)",
            }),
        },
        {
            name: "excited",
            description: "☆*:.｡.o(≧▽≦)o.｡.:*☆",
            options: [OptionalMessageOption],
            execute: opts => ({
                content: findOption(opts, "message", "") + " " + "☆*:.｡.o(≧▽≦)o.｡.:*☆",
            }),
        },
        {
            name: "wink",
            description: "(^_-)-☆",
            options: [OptionalMessageOption],
            execute: opts => ({
                content: findOption(opts, "message", "") + " " + "(^_-)-☆",
            }),
        },
        {
            name: "lenny",
            description: "( ͡° ͜ʖ ͡°)",
            options: [OptionalMessageOption],
            execute: opts => ({
                content: findOption(opts, "message", "") + " " + "( ͡° ͜ʖ ͡°)",
            }),
        },
        {
            name: "cute",
            description: "(｡◕‿◕｡)",
            options: [OptionalMessageOption],
            execute: opts => ({
                content: findOption(opts, "message", "") + " " + "(｡◕‿◕｡)",
            }),
        },
        {
            name: "bear",
            description: "ʕ •ᴥ•ʔ",
            options: [OptionalMessageOption],
            execute: opts => ({
                content: findOption(opts, "message", "") + " " + "ʕ •ᴥ•ʔ",
            }),
        },
        {
            name: "bearhug",
            description: "(/・ω・)/",
            options: [OptionalMessageOption],
            execute: opts => ({
                content: findOption(opts, "message", "") + " " + "(/・ω・)/",
            }),
        },
        {
            name: "love2",
            description: "（*＾3＾）/～♡",
            options: [OptionalMessageOption],
            execute: opts => ({
                content: findOption(opts, "message", "") + " " + "（*＾3＾）/～♡",
            }),
        },
        {
            name: "dance",
            description: "♪┏(°.°)┛┗(°.°)┓┗(°.°)┛┏(°.°)┓♪",
            options: [OptionalMessageOption],
            execute: opts => ({
                content: findOption(opts, "message", "") + " " + "♪┏(°.°)┛┗(°.°)┓┗(°.°)┛┏(°.°)┓♪",
            }),
        },
        {
            name: "neko",
            description: "(≽^°ω°^≼)",
            options: [OptionalMessageOption],
            execute: opts => ({
                content: findOption(opts, "message", "") + " " + "(≽^°ω°^≼)",
            }),
        }
    ]
});
