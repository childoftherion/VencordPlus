/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import "./Button.css";

import { classNameFactory } from "@api/Styles";
import { classes } from "@utils/misc";
import type { Button as DiscordButton } from "@vencord/discord-types";
import type { ComponentPropsWithRef } from "react";

import { OpenExternalIcon } from "./Icons";

const btnCls = classNameFactory("vc-btn-");
const textBtnCls = classNameFactory("vc-text-btn-");

export type ButtonVariant =
    "primary" | "secondary" | "dangerPrimary" | "dangerSecondary" | "overlayPrimary" | "positive" | "link" | "none";
export type ButtonSize = "min" | "xs" | "small" | "medium";

export type ButtonProps = ComponentPropsWithRef<"button"> & {
    variant?: ButtonVariant;
    size?: ButtonSize;
};

export function Button({ variant = "primary", size = "medium", children, className, ...restProps }: ButtonProps) {
    return (
        <button data-mana-component="button" className={classes(btnCls("base", variant, size), className)} {...restProps}>
            {children}
            {variant === "link" && <OpenExternalIcon className={btnCls("link-icon")} />}
        </button>
    );
}

export type TextButtonVariant = "primary" | "secondary" | "danger" | "link";

export type TextButtonProps = ComponentPropsWithRef<"button"> & {
    variant?: TextButtonVariant;
};

export function TextButton({ variant = "primary", className, ...restProps }: TextButtonProps) {
    return (
        <button className={classes(textBtnCls("base", variant), className)} {...restProps} />
    );
}

// #region Old compability

export const ButtonCompat: DiscordButton = function ButtonCompat({ look, color = "BRAND", size = "medium", ...restProps }) {
    return look === "LINK"
        ? <TextButton variant={TextButtonPropsColorMapping[color]} {...restProps as TextButtonProps} />
        : <Button variant={ButtonColorMapping[color]} size={size as ButtonSize} {...restProps as ButtonProps} />;
};

/** @deprecated */
ButtonCompat.Looks = {
    FILLED: "",
    LINK: "LINK",
    BLANK: "BLANK",
    OUTLINED: "OUTLINED"
} as const;

/** @deprecated */
ButtonCompat.Colors = {
    BRAND: "BRAND",
    BRAND_NEW: "BRAND_NEW",
    PRIMARY: "PRIMARY",
    RED: "RED",
    TRANSPARENT: "TRANSPARENT",
    CUSTOM: "CUSTOM",
    GREEN: "GREEN",
    LINK: "LINK",
    WHITE: "WHITE",
    YELLOW: "YELLOW",
} as const;

const ButtonColorMapping: Record<keyof typeof ButtonCompat["Colors"], ButtonProps["variant"]> = {
    BRAND: "primary",
    BRAND_NEW: "primary",
    PRIMARY: "secondary",
    RED: "dangerPrimary",
    TRANSPARENT: "secondary",
    CUSTOM: "none",
    GREEN: "positive",
    LINK: "link",
    WHITE: "overlayPrimary",
    YELLOW: "positive"
};

const TextButtonPropsColorMapping: Record<keyof typeof ButtonCompat["Colors"], TextButtonProps["variant"]> = {
    BRAND: "primary",
    BRAND_NEW: "primary",
    PRIMARY: "primary",
    RED: "danger",
    TRANSPARENT: "secondary",
    CUSTOM: "secondary",
    GREEN: "primary",
    LINK: "link",
    WHITE: "secondary",
    YELLOW: "primary"
};

/** @deprecated */
ButtonCompat.Sizes = {
    SMALL: "small",
    MEDIUM: "medium",
    LARGE: "medium",
    XLARGE: "medium",
    NONE: "min",
    MIN: "min",
    ICON: "min"
} as const;

// #endregion
