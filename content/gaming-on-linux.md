---
created: 2025-11-25 20:56
draft: false
tags:
  - gaming
  - linux
  - wayland
  - steam
  - valve
  - gamescope
  - proton
  - wine
title: So you want to game on Wayland eh...?
desc: Specifically Wayland & Tiling window managers, but some of this is relevant to Linux in general
---

![Gabe the G|400](gabe.png)

# Linux and its recent evolution

Linux gaming has highly evolved over the last few years, mostly because of Valve's commitment to [Gamescope](https://github.com/ValveSoftware/gamescope), [Proton](https://github.com/ValveSoftware/Proton), and [Steam](https://store.steampowered.com/). Gabe Newell said "Rely on Microsoft and Windows? nah, pass", and for that we are grateful. Linux desktop usage has risen to be over 6% globally now, which right now seems small, but is a major feat.

Because of these improvements, gaming on Linux is actually pretty awesome, most of the time the games I used to play on Windows actually run better on Linux.  

You may have heard of the [Steam Deck](https://www.steamdeck.com/en/), a handheld platform from Valve, this is actually a Linux handheld, running [SteamOS](https://store.steampowered.com/steamos) which is built on top of Arch Linux and utilizes Gamescope/Proton. Valve also just recently announced the new [Steam Machine](https://store.steampowered.com/sale/steammachine), this is only going to improve Linux gaming over the next few years!

*However there are some caveats...*

# Caveats?

![huh|300](huh.gif)

- HDR Support
	- Not all Linux desktop environments and window managers have HDR support, here are a few that **do** (not all inclusive):
		- Hyprland
		- KDE Plasma
		- Gamescope
			- *yes* , Gamescope is its own compositor, and can be ran from a TTY like other desktop environments and window managers
- NVIDIA
	- NVIDIA drivers can be wonky, some users often report getting about 10-20% less performance on Linux. This is because NVIDIA's drivers are not open source like AMD. They also aren't automatically included in most distributions. You'll have to go through some setup here and you'll also have to check which drivers you want to use, closed vs open, and probably modify some kernel launch arguments.
	- NVIDIA GPU also require some extra environmental arguments on Wayland
	- That being said, I was using NVIDIA previously, and it worked relatively fine, I only ran into a couple issues (but phew the AMD builtin support for Linux is so much better, if you plan on committing to Linux and are about to build a new rig, I highly recommend considering AMD)
- Not all games run on Linux. At the time of writing this though, over 90% of games on ProtonDB are playable on Linux.  Some games will require some manual tweaking, unlike Windows where you just click install and play, this won't always be the case for Linux though, luckily there are helpful resources most of the time to make this easier.

Phew. Got past the bad stuff, let's move on...

# Checking that you can play your favorite games
## ProtonDB

 [ProtonDB](https://www.protondb.com/) is a great way to check if the games you love work on Linux.  The ratings listed are based on user feedback that are using Linux.

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
	- Complete dog shit, doesn't work at all, 99% of the time it's because of kernel level anti-cheat and a shitty game dev company that doesn't care about you and doesn't deserve your money.  
		- *Hint:*  Buy this game on Steam, then immediately refund it and list the reason as *"No Linux Support"*, this lets the developers/publishers that they lost money and why.

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
	- A Microsoft exclusive, also older at this point, but a lot of games still have it and support it, some new games might not even support DirectX 12 at all
- **DirectX 12 (DX12)**
	- The newest Microsoft tech, this is a graphics engine that is very complex and essentially gives very low level technology for game engines to use to interact with GPU
- **Vulkan**
	- This is one is cross platform, most games supporting Vulkan are able to be ran natively on Linux
	
**What proton does with these engines?**
 - If a game is running in DX11:
	 - Proton will use a translation method, called DXVK, short for Direct X to Vulkan. Essentially it takes all the calls that the game makes to DirectX and converts them to Vulkan. 
	- You would think that this would have some overhead, but under the hood it actually makes some performance improvements where it needs to, often causing games to run faster and smoother on Linux than Windows
 - If a game is running in DX12:
	- Proton will use a translation method called VKD3D, short for Vulkan Direct3D. This essentially does the same thing that Proton does with DX11, but for DX12

# Playing your favorite games

There are many methods to play games on Steam, I'll go over a few here

## Steam

Games bought from Steam store by default if non native, will use Proton. However you can also play all your other games via Steam as well. 

1. Go to *Steam* -> *Library*
2. On the bottom left click *Add a Game*
3. *Add Non Steam Game*
4. From here you can browse for an application on your machine
5. After adding it, it will appear in your Library list

### Changing Proton versions
1. Right click the newly added game, or the steam bought game
2. Click *Properties*
3. Go to *Compatibility*
4. Check the *Force the use of a specific Steam Play compatibility tool*
5. From the dropdown you can select whichever Proton version you want, I usually recommend using *Proton Experimental* or downloading the latest *Proton GE*  (short for Glorious Eggroll)
		- If you want to download extra Proton version to select here, you can use something like [ProtonUp-Qt](https://davidotek.github.io/protonup-qt/)

That is pretty much all you need to play games on Steam, it's that easy. I will go into some further help below in TODO

## Lutris
[Lutris ](https://lutris.net/) is a launcher that has a lot of already made game specific scripts that install appropriate Wine, DLLs, fonts etc needed to play games. This is mostly useful for non steam games, although Steam tends to still be the easier route, but if you just can't get it working in Steam, Lutris is a good fallback. It has plenty of graphical customization for you to use and can even add the configured game to your Steam library, which is just a shortcut that will launch the game through Lutris.
## Other mentions
- [Faugus Launcher](https://github.com/Faugus/faugus-launcher)
	- Essentially a new age Lutris, very simple to use, really nice
 - [Heroic Game Launcher](https://heroicgameslauncher.com/)
	 - This is mostly for playing Epic, GOG, and Amazon Prime games

# Utilizing Gamescope

## What is [Gamescope](https://github.com/ValveSoftware/gamescope)?

It's Valve's own compositor made for gaming. The biggest usage you will get out of this is probably if you are in a window manager setup such as Hyprland, because it has the ability to force grab cursor so it doesn't fly outside your monitor while gaming to other monitors, but it does have plenty of other uses. This is also usable for native Linux games as well for the reasons mentioned below, it's not only for Proton ran games.

I won't go into all of  its arguments you can pass to it, but here is just a few examples of ones that I use and what they do:
	- `-f`  forces fullscreen
	- `--force-grab-cursor`  forces cursor to stay in gamescope window, you can still use your window manager's specific keybinds for navigating to workspaces, but this will just stop your cursor from randomly leaving game window unintentionally
	- `-r 144`  this will set the game refresh rate to 144hz (obviously change this to your monitors refresh rate)
	- `--adaptive-sync` enables adaptive sync if your monitor supports it
	- `--hdr-enabled` enables HDR support
	- `-w 3440 -h 1440` width and height for game content
	- `-W 3440 -H 1440` width and height for output window (you can set this and the one above)

As I mentioned previously, it also possible to run Gamescope from a display manager, i.e from your TTY, which will work similar to how Steam Deck or the new Steam Machine works. The downside is if you have things you want open like discord, web browser etc, you shouldn't need to run Gamescope like this unless you're making a living room Linux home-rolled Steam machine

## How to use Gamescope
1. Install using your distributions package manager or build from source
2. Add it as a command before you run a game
	1. For instance if you want to use it with a Steam launched game:
		1. Right click the game in your Library -> *Properties*
		2. Navigate to *Shortcut* tab
		3. For *Launch Options* add the following `gamescope -- %command%`
	2. Another example:
		1. From terminal or whatever other launcher you want to use `gamescope -- <yourapphere>`  such as `gamescope -- vkcube`

## Scopebuddy

[Scopebuddy](https://docs.bazzite.gg/Advanced/scopebuddy/)this is just a nice little tool to have, it just lets you create a global config file or specific game by game config files to store all your environment variables you want to launch a game as well as all your gamescope arguments. 

This makes it so instead of typing the following for example to launch a game, for **every** game you add:
`gamescope -w 3440 -h 1440 -W 3440 -H 1440 -r 144 --force-grab-cursor --adaptive-sync -f --hdr-enabled -- %command%`

you would just create a config file in `~/.config/scopebuddy/scb.conf` with the following:
```conf
SCB_GAMESCOPE_ARGS="-w 3440 -h 1440 -W 3440 -H 1440 -r 144 --force-grab-cursor --adaptive-sync -f --hdr-enabled"
command+=' '
```

Then whenever you need to add all those standard arguments, that you want for every game anyways, you can just shorten the command to `scb -- %command`


## Wrap it up B

![[wrapitup.gif]]

If you have any questions let me know, this was mostly from memory, and my journey on Linux gaming has been somewhat long, so I probably missed some stuff here and there.