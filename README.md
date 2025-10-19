# Vencord+

A fork of the Discord client mod called Vencord that adds unapproved plugins.

###### Vencord+ uses code from [Suncord](https://github.com/verticalsync/Suncord) and [Equicord](https://github.com/Equicord/Equicord).

<br>

![](https://github.com/user-attachments/assets/3fac98c0-c411-4d2a-97a3-13b7da8687a2)

## Features

-   Easy to install
-   [100+ built in plugins]
-   Fairly lightweight despite the many inbuilt plugins
-   Custom CSS and Themes: Inbuilt css editor with support to import any css files (including BetterDiscord themes)
-   Privacy friendly: blocks Discord analytics & crash reporting out of the box and has no telemetry
-   Settings sync: Keep your plugins and their settings synchronised between devices / apps (optional)

## Additional (unofficial) plugins [Vencord+]

[Click here to see a list of the unapproved plugins Vencord+ makes available to you.](https://github.com/childoftherion/VencordPlus/tree/main/src/plusplugins)

## Installing / Uninstalling

See [Installation Guide](docs/1_INSTALLING.md) for detailed instructions on installing from source.

**Quick Install:**

- Download [CLI installer](https://github.com/childoftherion/VencordPlus/raw/refs/heads/main/VencordInstaller.exe)
- Open CMD in downloads folder and paste 
```shell
.\VencordInstaller.exe -install
```
or build:
```shell
git clone https://github.com/childoftherion/VencordPlus
cd VencordPlus
pnpm install --frozen-lockfile
pnpm build
pnpm inject
```

> [!CAUTION]
> Do not request support for anything regarding Vencord+ in the Discord server of Vencord!

## Credits & Thanks

**VencordPlus** is built upon the excellent work of multiple projects and contributors:

### Original Projects

-   **[Vencord](https://github.com/Vendicated/Vencord)** by [Vendicated](https://github.com/Vendicated) - The foundation of this project
    -   Thanks to all Vencord [sponsors](https://github.com/sponsors/Vendicated) for supporting the original project
-   **[VencordPlus (Original)](https://github.com/RobinRMC/VencordPlus)** by [RobinRMC](https://github.com/RobinRMC) - The original VencordPlus fork
-   **[Suncord](https://github.com/verticalsync/Suncord)** by [verticalsync](https://github.com/verticalsync) - Additional plugin contributions
-   **[Equicord](https://github.com/Equicord/Equicord)** - Plugin ecosystem integration

### Special Thanks

A heartfelt thank you to **RobinRMC** for creating VencordPlus and establishing the foundation for this community-driven plugin ecosystem. This fork (hopefully) continues their vision of making Discord customization accessible to everyone.

## Disclaimer

Discord is trademark of Discord Inc. and solely mentioned for the sake of descriptivity.
Mention of it does not imply any affiliation with or endorsement by Discord Inc.

<details>
<summary>Using Vencord(+) violates Discord's terms of service</summary>

Client modifications are against Discord’s Terms of Service.

However, Discord is pretty indifferent about them and there are no known cases of users getting banned for using client mods! So you should generally be fine as long as you don’t use any plugins that implement abusive behaviour. You should know what a plugin does and configure it properly before using it.

Regardless, if your account is very important to you and it getting disabled would be a disaster for you, you should probably not use any client mods (not exclusive to Vencord+ or Vencord), just to be safe.

Additionally, make sure not to send screenshots and messages that expose that you are using a client mod.

</details>
