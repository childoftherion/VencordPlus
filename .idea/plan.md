## Goal

Ensure `main` is current with `upstream/main` while preserving VencordPlus changes.

## Current State (as of now)

-   **Remotes**: `origin` (childoftherion/VencordPlus), `upstream` (Vendicated/Vencord)
-   **Current Branch**: `main` (integration tested and published)
-   **Backup Branch**: `backup-before-upstream-merge-20251029-165901` (safety snapshot)
-   **Divergence**: `upstream/main` ahead 0; `main` ahead 945 vs `upstream/main` (long-lived fork; upstream changes are included)
-   **Working tree**: clean

## Progress Status

### ✅ Completed Steps (1-8)

1. ✅ Created safety backup branch: `backup-before-upstream-merge-20251029-165901`
2. ✅ Fetched latest from upstream and origin
3. ✅ Created integration branch: `integrate/upstream-main`
4. ✅ Merged `upstream/main` into integration branch (no conflicts, auto-merged)
5. ✅ Installed dependencies (`pnpm install`)
6. ✅ Build successful (`pnpm build`)
7. ✅ Lint passed (`pnpm lint`)
8. ✅ Verified manually on integration branch and fast-forwarded/published `main` (origin updated)

### Changes Merged from Upstream

The merge brought in **6 upstream commits** affecting **7 files**:

**Plugins Updated:**

-   `expressionCloner/index.tsx` - Fixed crash when server has 0 emojis; improved sticker format handling and slot checking
-   `betterSettings/index.tsx` - Removed duplicate "Other options" menu entries
-   `gameActivityToggle/style.css` - Fixed panel overflow
-   `noBlockedMessages/index.ts` - Fixed with better i18n hash handling and legacy support
-   `noServerEmojis/index.ts` - Improved channel parameter handling

**Core Files:**

-   `_core/settings.tsx` - Settings UI updates
-   `discord-types/src/common/Guild.d.ts` - Type definitions update

### 🔄 Current Step

Operational steady state. Track upstream changes and notable Equicord deltas; schedule periodic syncs.

## Plan of Action

1. Create a safety backup branch

    - Rationale: keep an immutable snapshot before any merge/rebase work.
    - Commands:
        - `git checkout main`
        - `git pull --ff-only origin main`
        - `git branch backup-before-upstream-merge`

2. Update local refs

    - Commands:
        - `git fetch --prune upstream`
        - `git fetch --prune origin`

3. Choose integration strategy: MERGE (not rebase)

    - Rationale: VencordPlus is a long-lived fork with 900+ unique commits; merging `upstream/main` into `main` preserves history and minimizes destructive rewrites.

4. Create an integration branch and merge upstream incrementally

    - Commands:
        - `git checkout -b integrate/upstream-main`
        - `git merge --no-ff upstream/main`
    - Resolve conflicts, preferring upstream defaults for core/shared files unless VencordPlus has intentional overrides.
    - Build and run after resolving each conflict group.

5. Resolve conflicts with a consistent policy

    - Prefer upstream for: build tooling, core library versions, shared APIs, types.
    - Keep VencordPlus changes for: custom plugins, plugin loader, config gating, Equicord backports explicitly required.
    - If in doubt: stage upstream version, add TODO note in follow-up pass, and open an issue for review.

6. Verify build, lint, and runtime

    - Commands:
        - `pnpm i` (or `npm i`/`yarn`) as appropriate
        - `pnpm build`
        - `pnpm lint`

7. Manual testing and validation (LOCAL ONLY - NO PUSHING)

    **Testing Commands:**

    ```bash
    # Ensure you're on the integration branch
    git checkout integrate/upstream-main

    # Build the changes
    pnpm build

    # Inject into Discord (if testing locally)
    pnpm inject
    ```

    **Test Checklist:**

    **Core Functionality:**

    - [ ] Launch Discord with VencordPlus injected - verify no startup errors
    - [ ] Check Vencord settings panel opens correctly
    - [ ] Verify plugin list loads and displays properly

    **Updated Plugins (from upstream merge):**

    - [ ] **expressionCloner**: Test cloning emojis/stickers from servers (especially servers with 0 emojis - should not crash)
    - [ ] **betterSettings**: Check settings menu - verify no duplicate "Other options" entries
    - [ ] **gameActivityToggle**: Test game activity panel - verify no overflow issues
    - [ ] **noBlockedMessages**: Test with blocked messages - verify they're hidden correctly
    - [ ] **noServerEmojis**: Test emoji autocomplete - verify server emoji filtering works

    **VencordPlus-Specific Features:**

    - [ ] Validate high-impact plugins: Venplug, Equicord backports, plugin manager
    - [ ] Toggle multiple plugins; confirm no startup errors
    - [ ] Check settings UI and plugin discovery work
    - [ ] Validate network/API calls introduced by VencordPlus still succeed

8. After successful local testing (DONE)

    - Integration validated; `main` updated and pushed to `origin`.
    - Tag next sync point on subsequent upstream pulls (e.g., `vencordplus-upstream-sync-YYYYMMDD`).

---

## Ecosystem Overview (Vencord / Equicord)

-   **Vencord (upstream)**: `Vendicated/Vencord` — actively maintained Discord client mod with large plugin ecosystem.
    -   Repo: `https://github.com/Vendicated/Vencord`
    -   Related: `Vesktop` (desktop app with Vencord pre-bundled), installers, VS Code companion.
-   **Equicord (fork family)**: Community-maintained forks derived from Vencord with additional opinions/features.
    -   Org hub: `https://github.com/Equicord` (includes installer variants like Equilotl, desktop variants like Equibop, docs/site repos).
-   **VencordPlus (this repo)**: Long-lived fork layering unapproved/experimental plugins and Vencord/Equicord backports.

Notes:

-   Using any client modification may violate Discord ToS; keep features opt-in and clearly labeled.

## Sync Requirements To Stay Current

1. Track upstream Vencord changes
    - Schedule: monthly sweep; ad-hoc for high-severity fixes.
    - Action: `git fetch upstream && git merge --no-ff upstream/main` into an `integrate/*` branch; build, test, then update `main`.
2. Monitor Equicord-adjacent changes relevant to our plugins
    - Watch items: installer/desktop launch changes, plugin API deltas, type updates.
    - Action: selectively backport when beneficial; prefer upstream Vencord implementations when available.
3. Dependency baselines
    - Align core tooling (TypeScript, bundler, eslint configs) with upstream Vencord to reduce drift.
4. Plugin compatibility
    - Re-verify high-impact plugins (Venplug, Equicord backports, plugin manager) after each upstream sync.
5. CI checks (to add)
    - Add a divergence job warning when `upstream/main...main` exceeds threshold (e.g., >50 commits difference).
    - Add lint/build gates and a basic injection smoke test.

## Immediate Next Changes Needed

-   Add a monthly upstream sync workflow (GitHub Actions) that:
    -   Opens/updates `integrate/upstream-main` with latest upstream.
    -   Runs install/build/lint.
    -   Posts divergence summary as PR comment.
-   Add a watchlist for Equicord org repos (Equilotl, Equibop) to notify on breaking changes.
-   Document opt-in flags for unapproved/experimental plugins and surface a warning banner in settings.

## Optional follow-ups

-   Establish a periodic upstream sync cadence (e.g., monthly) to reduce conflict surface.
-   Automate divergence checks in CI: warn if `upstream/main...main` exceeds a threshold.
-   Maintain a `CONTRIBUTING.md` note on the merge policy and conflict triage rules.
