/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { ApplicationCommandInputType, ApplicationCommandOptionType, sendBotMessage } from "@api/Commands";
import { Devs } from "@utils/constants";
import definePlugin from "@utils/types";
import { findByPropsLazy } from "@webpack";
import { DraftType, UploadManager } from "@webpack/common";
import { Jimp } from "jimp";
import floydSteinberg from 'floyd-steinberg';

import { brailleMap } from "./braille_map";
const UploadStore = findByPropsLazy("getUpload");

/**
 * Maps a color to 0 or 1
 *
 * @param color Color to convert
 * @returns 0 for black, 1 for white (depending on color theme)
 */
function mapToZeroOrOne(color: number) {
    let cleanColor = removeBit(color, 8);
    cleanColor = removeBit(cleanColor, 7);
    if (color > 0x808080) {
        return 1;
    }
    return 0;
}

function removeBit(number, bitPosition) {
    const mask = ~(1 << bitPosition);
    return number & mask;
}

/**
 * Get the braille character for a 2x3 grid of pixels
 *
 * @param image JIMP image
 * @param xOff x offset
 * @param yOff y offset
 * @returns Braille character
 */
function getBrailleCharacter(image: any, xOff: number, yOff: number) {
    const trueOffsetX = xOff * 2;
    const trueOffsetY = yOff * 2;
    const thing = [
        [
            mapToZeroOrOne(image.getPixelColor(0 + trueOffsetX, 0 + trueOffsetY)),
            mapToZeroOrOne(image.getPixelColor(1 + trueOffsetX, 0 + trueOffsetY))
        ],
        [
            mapToZeroOrOne(image.getPixelColor(0 + trueOffsetX, 1 + trueOffsetY)),
            mapToZeroOrOne(image.getPixelColor(1 + trueOffsetX, 1 + trueOffsetY))
        ],
        [
            mapToZeroOrOne(image.getPixelColor(0 + trueOffsetX, 2 + trueOffsetY)),
            mapToZeroOrOne(image.getPixelColor(1 + trueOffsetX, 2 + trueOffsetY))
        ]
    ];

    // I hate JavaScript
    return brailleMap.get(JSON.stringify(thing));
}


export default definePlugin({
    name: "BrailleArt",
    description: "Converts an image to braille art",
    authors: [{ name: "Cobblestone", id: 425778239760367617n }],
    dependencies: ["CommandsAPI"],
    commands: [
        {
            name: "brailleart",
            description: "Convert an image to braille art",
            inputType: ApplicationCommandInputType.BUILT_IN,
            options: [
                {
                    type: ApplicationCommandOptionType.ATTACHMENT,
                    name: "image",
                    description: "The image to convert to braille art",
                    required: true
                },
                {
                    type: ApplicationCommandOptionType.NUMBER,
                    name: "width",
                    description: "The width of the text, will print max size if not provided",
                    required: false
                },
                {
                    type: ApplicationCommandOptionType.NUMBER,
                    name: "brightness",
                    description: "The brightness of the text",
                    required: false
                },
                {
                    type: ApplicationCommandOptionType.BOOLEAN,
                    name: "invert",
                    description: "Invert colors of the image",
                    required: false
                },
                {
                    type: ApplicationCommandOptionType.BOOLEAN,
                    name: "dither",
                    description: "Enable dithering on the image",
                    required: false
                },
            ],
            execute: async (opts, ctx) => {
                const upload = UploadStore.getUpload(ctx.channel.id, opts.find(o => o.name === "image")!.name, DraftType.SlashCommand);
                let rawImage: File | null = null;

                // Is the file an image?
                if (upload) {
                    if (!upload.isImage) {
                        UploadManager.clearAll(ctx.channel.id, DraftType.SlashCommand);
                        throw "Upload is not an image";
                    }
                    rawImage = upload.item.file;
                }

                if (!rawImage) {
                    throw "No image provided";
                }

                // Do processing
                const imageData = await Jimp.read(await rawImage.arrayBuffer());

                const ditherParam = opts.find(o => o.name === "dither");
                const invertParam = opts.find(o => o.name === "invert");

                let image = imageData.greyscale()
                let s = "```\n";

                if (opts.find(o => o.name === "width")) {
                    image.resize({ w: parseInt(opts.find(o => o.name === "width")!.value) });
                }

                if (opts.find(o => o.name === "brightness")) {
                    image.brightness(parseInt(opts.find(o => o.name === "brightness")!.value) / 128);
                }


                if (ditherParam && ditherParam!.value) {
                    const bmp = floydSteinberg(image.bitmap)
                    image = Jimp.fromBitmap(bmp)
                } else {
                    image.contrast(1).threshold({ max: 128 });
                }

                if (invertParam && invertParam!.value) {
                    image.invert()
                }

                // Write characters
                for (let i = 0; i < image.height / 2; i++) {
                    for (let j = 0; j < image.width / 2; j++) {
                        s += getBrailleCharacter(image, j, i);
                    }
                    s += "\n";
                }

                sendBotMessage(ctx.channel.id, {
                    content: s + "\n```"
                });
            }
        }
    ],

});
