# VencordPlus Update Plan

## Current Status

-   **Current Version**: v1.13.2
-   **Target Version**: v1.13.4 (latest upstream)
-   **Last Merge**: f327bf3b (Merge upstream Vencord v1.13.2 with VencordPlus)

## Key Changes to Merge (Excluding Plugins)

### 1. Version & Package Updates

-   **Version bump**: 1.13.2 → 1.13.4
-   **Description update**: Remove "Vencord+ is a fork..." text, restore original description
-   **Dependencies cleanup**: Remove unused dependencies that were added for plus plugins:
    -   `@ffmpeg/ffmpeg`, `@ffmpeg/util` (audio features)
    -   `@types/less`, `@types/stylus`, `@types/tinycolor2` (theme support)
    -   `buttplug` (adult content)
    -   `idb`, `jsqr` (QR login)
    -   `openai` (AI features)
    -   `socket.io` (real-time features)
    -   `usercss-meta` (theme metadata)
    -   `@electron/asar`, `@types/adm-zip` (desktop packaging)

### 2. Core Component System Overhaul

-   **New Form Components**: Complete replacement of Discord's Forms with independent components
    -   `src/components/BaseText.tsx` & `BaseText.css`
    -   `src/components/Button.tsx` & `Button.css`
    -   `src/components/Divider.tsx` & `Divider.css`
    -   `src/components/FormDivider.tsx` & `FormDivider.css`
    -   `src/components/FormSwitch.tsx` & `FormSwitch.css` (enhanced with clickable area & focus rings)
    -   `src/components/Heading.tsx` & `Heading.css`
    -   `src/components/Paragraph.tsx`
    -   `src/components/Icons.tsx` (updated)

### 3. API Improvements

-   **AudioPlayer.ts**: New audio functionality
-   **ChatButtons.tsx**: Enhanced chat button system
-   **Commands/index.ts**: Improved command system
-   **NicknameIcons.tsx**: New nickname icon functionality
-   **Settings.ts**: Updated settings management
-   **index.ts**: Updated API exports

### 4. Browser Extension Updates

-   **VencordNativeStub.ts**: Updated native stub
-   **content.js**: Enhanced content script
-   **manifest.json**: Updated manifest (v3)
-   **manifestv2.json**: Updated manifest (v2)
-   **userscript.meta.js**: Updated userscript metadata

### 5. Build System Updates

-   **scripts/build/**: Updated build scripts
-   **scripts/generateDevsList.ts**: Removed (no longer needed)
-   **scripts/generatePluginList.ts**: Updated
-   **scripts/generateReport.ts**: Updated
-   **scripts/runInstaller.mjs**: Updated installer

### 6. Type Definitions

-   **packages/discord-types/**: Updated Discord type definitions
    -   Activity.d.ts
    -   components.d.ts
    -   index.d.ts
    -   menu.d.ts
    -   passiveupdatestate.d.ts
    -   Various store definitions

## Implementation Steps

### Phase 1: Core Updates (High Priority)

1. **Merge upstream changes** excluding plugins
2. **Update package.json** with version bump and dependency cleanup
3. **Update core components** (Form system overhaul)
4. **Update browser files** (manifest, content scripts)

### Phase 2: API & Build System (Medium Priority)

1. **Update API files** with new functionality
2. **Update build scripts** and tooling
3. **Update type definitions**

### Phase 3: Testing & Validation (High Priority)

1. **Test build process** with updated dependencies
2. **Verify core functionality** works with new components
3. **Test browser extension** compatibility
4. **Validate plus plugins** still work with new core

## Risk Assessment

-   **Low Risk**: Version bumps, dependency cleanup
-   **Medium Risk**: Form component replacement (may affect plus plugin UIs)
-   **High Risk**: API changes (may break plus plugin integrations)

## Notes

-   **Preserve**: All plus plugins in `src/plusplugins/` and `RemovedPlusPlugins/`
-   **Focus**: Core system updates only, no plugin modifications
-   **Testing**: Thorough testing required due to component system overhaul
-   **Rollback**: Keep current state as backup before major merges

## Estimated Impact

-   **Build Size**: Reduced due to dependency cleanup
-   **Performance**: Improved with new component system
-   **Compatibility**: Enhanced with updated Discord types
-   **Maintenance**: Easier with independent form components
