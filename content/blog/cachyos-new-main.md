---
created: '2025-12-09 11:58'
draft: false
title: CachyOS - new main!?
tags:
  - linux
  - arch
  - cachyos
---
# CachyOS - What is it?

CachyOS is a distribution built on Arch Linux[^1]. It still provides all the things that Arch does, albeit with quite a few more sane defaults (in my opinion).

# Why is it better than Arch?

- Optimized packages
  - CachyOS has its own mirror list of packages that are custom compiled for things like Zen4 instruction set[^2] and LTO[^3], which provides higher performance
- Custom kernel that utilizes BORE scheduler[^4] and has a variety of scheduler options. These kernels are also optimized for Zen4 and LTO
- Has a graphical installer (or a terminal installer if you just really want to feel the same pain as Arch)
- Can get an encrypted system working out of the box, similar to archinstall script
- Defaults to btrfs[^5] (with other options as well, obviously) with snapper[^6] support for easy rollbacks
- Has options to pick a bootloader and auto set it up
- cachy-chroot
  - The CachyOS equivalent of arch-chroot that allows you to chroot into a mounted filesystem
  - This differs, however, because out of the box, you don't have to mount any filesystems; it is an interactive CLI that lets you easily pick partitions, their mount points, and supports btrfs mounting with ease
- Custom Proton version[^7] for running games
- `game-performance` script that automatically adjusts power when you enter or exit a game
- ananicy-cpp[^8], built-in, with a wide set of rules already configured for `nice` levels for apps

# Can't I just use Arch?

Of course you can. I have used Arch as my main for a very long time. Is CachyOS worth it (if you are on modern hardware)? Absolutely. It legitimately feels snappier in many aspects. If you fear that it strays away from the Arch mindset, don't worry—it doesn't. It is still very much Arch at its core, and you will still be able to follow any Arch documentation you find. CachyOS is just what I like to think of as Arch with sprinkles on top, with more sane defaults that you know you are going to set up manually with Arch anyways.

You can very easily still use Arch if you truly just want to do everything yourself (albeit for no reason, really). You can add the CachyOS mirror list to your existing `pacman.conf`, install CachyOS kernels and optimized packages, clone CachyOS ananicy-cpp rules and set up ananicy-cpp yourself, use ProtonUp-Qt[^9] to get CachyOS Proton, etc.

[^1]: <https://archlinux.org/>

[^2]: <https://en.wikipedia.org/wiki/Zen_4>

[^3]: <https://en.wikipedia.org/wiki/Interprocedural_optimization#WPO_and_LTO>

[^4]: <https://github.com/firelzrd/bore-scheduler>

[^5]: <https://btrfs.wiki.kernel.org/>

[^6]: <https://github.com/openSUSE/snapper>

[^7]: <https://github.com/CachyOS/cachyos-proton>

[^8]: <https://gitlab.com/ananicy-cpp/ananicy-cpp>

[^9]: <https://github.com/DavidoTek/ProtonUp-Qt>

