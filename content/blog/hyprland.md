---
created: '2025-12-08 20:10'
draft: true
title: Hyprland
tags:
  - linux
  - hyprland
  - wayland
---
# What is Hyprland? (uwu)

Hyprland is a Wayland tiling window manager. It's pretty, you've probably seen it around, and one of the most prominent tiling window managers there is, especially for Wayland.

# How to get

You can read the Hyprland docs, but you'll mostly want to be on Arch (or an Arch derivative) or NixOS, although people have it working on plenty of other distros.

> [!WARNING] A word of caution about choosing hyprland vs its `-git` variants. If you choose to install `-git` and aren't tech savy, don't. Hyprland has a vast ecosystem of packages, that all depend on each other. If you build from `-git` you need to know how to rebuild packages. `-git` will give you the latest features, but comes at a cost.

For the remainder of this blog post I'll assume you are on Arch.

1. It's as simple as `sudo pacman -S hyprland`, or `yay|paru -S hyprland-git` (if going the -git route)

