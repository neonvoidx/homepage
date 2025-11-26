---
title: Wayland Window Managers
draft: false
description: So which Wayland window manager are we using?
created: 2025-11-25T00:00:00.000Z
tags:
  - linux
  - wayland
  - dotfiles
  - hyprland
  - niri
  - mangowc
---
### Why oh why didn't _you_ choose Hyprland?

![Why oh why](../images/whyohwhy.gif)

Not sure to be honest, you should though!

I tried a lot of window managers over the years, from i3, sway, awesomewm, and dwm. Each had their pros and cons, but none really stuck with me as much as Hyprland. I continue to try new window managers as they come out, as they get updates, but I always come back the anime overlord window manager known as [Hyprland](https://hypr.land/).

It offers master and dwindle layouts, the customization options are endless, and the community is fantastic (for me, although there is always some drama in Linux land, say what you want about Vaxry, but he's a good guy).

##### _Pros_

- Supports HDR
- Plugin system
- Just the prettiest, period
- Vast hypr\* ecosystem of libraries (sometimes a double edged sword)
- Doesn't use wlroots, but has it's own custom implementation since it broke off, freeing it from waiting for changes
- Large community, discord and forums that have many active users
- Has a premium sub cost if you are into that, that comes with VIP support as well as customized Hyprland setups ready to go
- IPC support

##### _Cons_

- Because of its vast hypr ecosystem, if you plan on just installing it from your package manager, like the git variants from the AUR, be prepared for trouble
  - What trouble?
    - Did hyprgraphics just update but you forgot to rebuild Hyprland or hyprlock and it had a breaking change? Surprise next time you boot or lock your screen, have fun in your TTY
  - because of this I recommend building this in order manually if you plan on using latest HEAD commits. While this isn't as nice as installing a single package and praying, it gives you a better peace of mind that things wont break
    - You can find my **(probably suboptimal opinionated)** script [here](https://github.com/neonvoidx/dotfiles/blob/master/linux/dev/hypr/rebuild.sh), which clones all repos needed, updates from latest commits, and builds them in order (I build Hyprland without UWSM, because it's icky). But if it doesn't work, don't ping me, open a PR or move on lol.

### Other Wayland window managers

#### [Niri](https://yalter.github.io/niri/)

This is the hot new kid on the block

Not a tiling window manager per se, but a scrolling tiler. Each monitor has `n` workspaces, with each workspace extending horizontally infinitely without resizing windows. If you open 15 terminals sequentially, your current workspace will continue to extend horizontally, and those terminals won't be resized. Of course you can have binds to resize to different sizes or ratios, and even emulate a tiling type layout by consuming windows into columns.

##### _Pros_

- written in Rust, it's just insanely smooth
- Configuration files are in KDL, it's highly intuitive and easy to setup
- Has a built-in screenshot tool (mostly because of the way its layout works, it needs one)
- Has builtin support for when monitors get disconnected, workspaces move to another monitor when disconnected
- IPC support
- Great trackpad support for swiping, intuitive, great for laptop users (I actually use Niri when I'm on my laptop because I think it's layout pattern just works better for single screens)

##### _Cons_

- No HDR support
- Depends on smithay wayland library so if you want new features implemented pertaining to Wayland itself, you'll need to wait for smithay to implement
- No vertical scrolling, so setting up a portrait mode monitor is a little odd, you'll likely need to do what I did and have a script that listens for windows to open and moves them into the same column by calling consume
- Still has some quirks, i've found a few things here and there like some windows randomly just being maximized to the edge with no borders or decorations when i've explicitly made a window rule to never do that
- If you're coming from a tiling window manager with workspaces per monitor, this will take some muscle memory change to get used to, do you usually hit SUPER+2 to go to your second monitor that has workspace 2? Well in Niri workspaces aren't guaranteed (without rules) to be on specific monitors, and even then they can move. This isn't necessarily a negative, i'm just calling it out as it will take some change in your habits

#### [MangoWC](https://github.com/DreamMaoMao/mangowc)

Written by DreamMaoMao, this is a dwl inspired window manager for Wayland, written in C. It's fast, it builds extremely fast, and it has a lot of bells and whistles.. but not all of them (yet).

##### _Pros_

- Extremely small and lightweight
- The biggest pro: It has insane layout support. Supports tile, scrolling (horizontal), monocle, grid, deck, center tile, vertical tiling, vertical grid, and vertical scrolling.
- It's rapidly gaining adoption and being iterated on

##### _Cons_

- Still in its infancy, has some bugs
- The IPC support isn't great yet, it's not well documented (at the time of writing) and hard to work with

