---
created: '2025-11-25 20:56'
draft: false
tags:
  - gaming
  - linux
  - wayland
  - steam
  - valve
  - Gamescope
  - proton
  - wine
title: Linux Gaming 101 (Wayland)
---
![Gabe the G|350](gabe.png)

# Linux and its recent evolution

Linux gaming has highly evolved over the last few years, mostly because of Valve's commitment to Gamescope[^1], Proton[^2], and Steam[^3]. Gabe Newell said "Rely on Microsoft and Windows? nah, pass", and for that we are grateful. Linux desktop usage has risen to be over 5% globally now[^4], which right now seems small, but is a major feat.

Because of these improvements, gaming on Linux is actually pretty awesome, most of the time the games I used to play on Windows actually run better on Linux.

You may have heard of the Steam Deck[^5], a handheld platform from Valve, this is actually a Linux handheld, running SteamOS[^6], which is based on Arch and tailored by Valve . Valve also just recently announced the new Steam Machine[^7] (not the old one that failed), this is only going to improve Linux gaming over the next few years!

_However there are some caveats..._

# Caveats?

![huh|250](huh.gif)

- HDR Support
  - Not all Linux desktop environments and window managers have HDR support, here are a few that **do** (not all inclusive):
    - [Hyprland](window-manager-choice.md)
    - KDE Plasma
    - Gamescope
      - _yes_ , Gamescope is its own compositor, and can be ran from a TTY like other desktop environments and window managers
- NVIDIA
  - NVIDIA drivers can be wonky, some users often report getting about 10-20% less performance on Linux. This is because NVIDIA's drivers are not open source and integrated into distributions like AMD, which are integrated into mesa and amdgpu, which are often automatically bundled with your distribution. You'll have to go through some setup here and you'll also have to check which drivers you want to use, closed vs open, and probably modify some kernel launch arguments.
  - NVIDIA GPU also require some extra environmental arguments on Wayland
  - NVIDIA’s proprietary drivers historically had gaps (Wayland/GBM vs EGLStreams, tooling differences), but performance varies widely by driver version, kernel, game, and Proton/Wine configuration. NVIDIA has improved Wayland/GBM support in recent drivers.
- Not all games run on Linux. At the time of writing this though, a large majority of popular titles are reported playable. Some games will require some manual tweaking, unlike Windows where you just click install and play, this won't always be the case for Linux though, luckily there are helpful resources most of the time to make this easier.

Phew. Got past the bad stuff, let's move on...

# Checking that you can play your favorite games

## ProtonDB

ProtonDB[^8] is a great way to check if the games you love work on Linux. The ratings listed are based on user feedback that are using Linux. **Note:** This only lists games purchaseable through Steam.

About the rating system:

- <span style="color:rgb(0, 176, 80)"><b>Native</b></span>
  - that means it works out of the box on Linux without using Proton (more on this later)
- <span style="color:rgb(0, 176, 240)"><b>Platinum</b></span>
  - it's pretty much guaranteed to work under Proton, flawlessly
- <span style="color:rgb(255, 255, 0)"><b>Gold</b></span>
  - also pretty much guaranteed to work under Proton, but may need some launch arg tweaks
- <span style="color:rgb(143, 143, 143)"><b>Silver</b></span>
  - Probably works, with some tweaking
- <span style="color:rgb(255, 192, 0)"><b>Bronze</b></span>
  - Mostly unplayable, slight chance based on hardware and mass amount of tweaking
- <span style="color:rgb(255, 0, 0)"><b>Borked</b> </span>
  - Complete trash, doesn't work at all, 99% of the time it's because of kernel level anti-cheat and a shitty game dev company that doesn't care about you and doesn't deserve your money.
    - _Hint:_ Buy this game on Steam, then immediately refund it and list the reason as _"No Linux Support"_, this lets the developers/publishers that they lost money and why.

> [!NOTE]
> Refunds on Steam are governed by Steam’s policy (usually within 14 days and under 2 hours playtime). So if you do this, make sure you don't play it a bunch!

## Native vs Proton

### Native

It's what it sounds like, it will run on Linux with no compatibility layers needed.

### Proton

#### Wine (prelude to Proton)

Wine is a compatibility layer to run Windows games and applications on Linux. This allows us to run things not made for Linux.

#### Proton

Proton is a bundle of compatibility tools, maintained by Valve, that bundles things such as Wine and DirectX. Proton is built right into the Steam client by default as well as available for download to run via other applications. This is the gold standard and what you'll be using, whether you know it or not, for non native games.

##### How does Proton work?

**A little about graphics engines:**

- **OpenGL**:
  - This is old, and new games won't be using this, this is mostly older games now
- **DirectX 11 (DX11)**
  - A Microsoft exclusive, also older at this point, but a lot of games still have it and support it, some new games might not even support DirectX 12 at all and only support DX11.
- **DirectX 12 (DX12)**
  - The newest Microsoft tech, this is a graphics engine that is very complex and essentially gives very low level technology for game engines to use to interact with GPU
- **Vulkan**
  - This is one is cross platform, most games supporting Vulkan are able to be ran natively on Linux. Vulkan is considered the most complex of these graphics engines but gives the most control of GPU.

**What proton does with these engines?**

- If a game is running in DX11:
  - DXVK translates Direct3D 9/10/11 calls to Vulkan — DXVK specifically targets D3D9/10/11, used mostly for D3D10/11; for D3D9 there's d9vk historically merged into DXVK.
  - You would think that this would have some overhead, but under the hood it actually makes some performance improvements where it needs to, often causing games to run faster and smoother on Linux than Windows
- If a game is running in DX12:
  - For Direct3D 12, vkd3d (and Valve’s vkd3d‑proton fork) translates D3D12 to Vulkan.

# Playing your favorite games

There are many methods to play games on Linux, I'll go over a few here

## Steam

Games bought from Steam store by default if non native, will use Proton. However you can also play all your other games via Steam as well.

1. Go to _Steam_ -> _Library_
2. On the bottom left click _Add a Game_
3. _Add Non Steam Game_
4. From here you can browse for an application on your machine
5. After adding it, it will appear in your Library list

### Changing Proton versions

1. Right click the newly added game, or the steam bought game
2. Click _Properties_
3. Go to _Compatibility_
4. Check the _Force the use of a specific Steam Play compatibility tool_
5. From the dropdown you can select whichever Proton version you want, I usually recommend using _Proton Experimental_ or downloading the latest _Proton GE_ (short for Glorious Eggroll) - If you want to download extra Proton version to select here, you can use something like ProtonUp-Qt[^11]

That is pretty much all you need to play games on Steam, it's that easy. I will go into some further help below in [Utilizing Gamescope](#utilizing-gamescope)

## Lutris

Lutris[^12] is a launcher that has a lot of already made game specific scripts that install appropriate Wine, DLLs, fonts etc needed to play games. This is mostly useful for non steam games, although Steam tends to still be the easier route, but if you just can't get it working in Steam, Lutris is a good fallback. It has plenty of graphical customization for you to use and can even add the configured game to your Steam library, which is just a shortcut that will launch the game through Lutris.

## Other mentions

- Heroic Game Launcher[^13]
  - This is mostly for playing Epic, GOG, and Amazon Prime games
- Faugus Launcher[^14]
  - Essentially a new age Lutris, very simple to use, really nice

# Utilizing Gamescope

## What is [Gamescope](https://github.com/ValveSoftware/gamescope)?

It's Valve's own micro Wayland compositor made for gaming that can be ran as a nested or standalone session from a TTY. It's meant for gaming, and not to be a standalone desktop environment or window manager. The biggest usage you will get out of this is probably if you are in a window manager setup such as Hyprland, because it has the ability to force grab cursor so it doesn't fly outside your monitor while gaming to other monitors, but it does have plenty of other uses. This is also usable for native Linux games as well for the reasons mentioned below, it's not only for Proton ran games.

I won't go into all of its arguments you can pass to it, but here is just a few examples of ones that I use and what they do: - `-f` forces fullscreen - `--force-grab-cursor` forces cursor to stay in Gamescope window, you can still use your window manager's specific keybinds for navigating to workspaces, but this will just stop your cursor from randomly leaving game window unintentionally - `-r 144` this will set the game refresh rate to 144hz (obviously change this to your monitors refresh rate) - `--adaptive-sync` enables adaptive sync if your monitor supports it - `--hdr-enabled` enables HDR support - `-w 3440 -h 1440` width and height for game content - `-W 3440 -H 1440` width and height for output window (you can set this and the one above)

As I mentioned previously, it also possible to run Gamescope from a display manager, i.e from your TTY, which will work similar to how Steam Deck or the new Steam Machine works. The downside is if you have things you want open like discord, web browser etc, you shouldn't need to run Gamescope like this unless you're making a living room Linux home-rolled Steam machine.

## How to use Gamescope

1. Install using your distributions package manager or build from source
2. Add it as a command before you run a game
   1. For instance if you want to use it with a Steam launched game:
      1. Right click the game in your Library -> _Properties_
      2. Navigate to _Shortcut_ tab
      3. For _Launch Options_ add the following `gamescope -- %command%`
   2. Another example:
      1. From terminal or whatever other launcher you want to use `gamescope -- <yourapphere>` such as `gamescope -- vkcube`

## Scopebuddy

Scopebuddy[^15] is just a nice little tool to have, it just lets you create a global config file or specific game by game config files to store all your environment variables you want to launch a game as well as all your Gamescope arguments.

This makes it so instead of typing the following for example to launch a game, for **every** game you add:
`gamescope -w 3440 -h 1440 -W 3440 -H 1440 -r 144 --force-grab-cursor --adaptive-sync -f --hdr-enabled -- %command%`

you would just create a config file in `~/.config/scopebuddy/scb.conf` with the following:

```conf
SCB_GAMESCOPE_ARGS="-w 3440 -h 1440 -W 3440 -H 1440 -r 144 --force-grab-cursor --adaptive-sync -f --hdr-enabled"
command+=' '
```

Then whenever you need to add all those standard arguments, that you want for every game anyways, you can just shorten the command to `scb -- %command`

## Gamemode

Another utility worth mentioning, gamemoderun[^16]. This essentially will remove power saving and governors while playing games. You can prefix this before launching games like so:
`gamemoderun (gamescope or scb) -- %command`, or you can add this to scopebuddy config like so:

```conf
SCB_GAMESCOPE_ARGS="-w 3440 -h 1440 -W 3440 -H 1440 -r 144 --force-grab-cursor --adaptive-sync -f --hdr-enabled --mangoapp"
command="gamemoderun $command" # here we add gamemoderun and then $command, so this will launch gamemoderun followed by gamescope with the above gamescope args
```

then in Steam launch options:
`scb -- %command%`

## Wrap it up B

![[wrapitup.gif|250]]

If you have any questions let me know, this was mostly from memory, and my journey on Linux gaming has been somewhat long, so I probably missed some stuff here and there.

[^1]: [Valve's Gamescope](https://github.com/ValveSoftware/gamescope) - Official Gamescope compositor repository

[^2]: [Valve's Proton](https://github.com/ValveSoftware/Proton) - Official Proton compatibility layer repository

[^3]: [Steam](https://store.steampowered.com/) - Valve's digital distribution platform

[^4]: [Linux Desktop Market Share Statistics](https://gs.statcounter.com/os-market-share/desktop/worldwide) - StatCounter Global Stats tracking Linux desktop usage

[^5]: [Steam Deck](https://www.steamdeck.com/) - Valve's Linux-based handheld gaming device

[^6]: [SteamOS](https://store.steampowered.com/steamos) - Valve's Arch-based Linux distribution

[^7]: [New Steam Machines Announcement](https://store.steampowered.com/sale/steammachine) - Valve's renewed Steam Machine initiative

[^8]: [ProtonDB](https://www.protondb.com/) - Community database for game compatibility ratings

[^11]: [ProtonUp-Qt](https://davidotek.github.io/protonup-qt/) - Proton version manager

[^12]: [Lutris](https://lutris.net/) - Open gaming platform for Linux

[^13]: [Heroic Game Launcher](https://heroicgameslauncher.com/) - Epic, GOG, and Amazon Prime game launcher

[^14]: [Faugus Launcher](https://github.com/Faugus/faugus-launcher) - Modern game launcher for Linux

[^15]: [Scopebuddy Documentation](https://docs.bazzite.gg/Advanced/scopebuddy/) - Gamescope configuration utility

[^16]: [Gamemode](https://github.com/FeralInteractive/gamemode) - System optimizer for Linux gaming

