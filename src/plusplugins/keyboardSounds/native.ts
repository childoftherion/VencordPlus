/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { CspPolicies } from "@main/csp";

CspPolicies["github.com"] = [...CspPolicies["github.com"], "media-src"];
CspPolicies["raw.githubusercontent.com"] = [...CspPolicies["raw.githubusercontent.com"], "media-src"];
