---
created: 2025-11-26 11:30
draft: false
title: Choosing a Linux Distribution
tags:
  - linux
  - arch
  - cachyos
  - ubuntu
  - bazzite
  - nixos
---
# Oh the options...

Let me preface this entire post by saying, this is entirely subjective. What is great for me may not be great for you.  Distributions for the most part are entirely personal preference. 

There are different types of distributions, mostly all stemming from a major distribution. For example Ubuntu[^1] is just based on Debian[^2], EndeavourOS[^3] is a spin off from Arch[^4], and so on...

See the full distribution family map [here](https://distrowatch.com/images/other/distro-family-tree.png) **Warning: This image is large**

![[wtf.gif]]

If you clicked that, I'm sorry, but it's pretty crazy right!? The Linux distribution family tree is large and spans over 20 years.

Let's move on

# Figuring out your use case

- What do you want to do?
	- Are you primarily trying to play games?
	- Are you trying to run a server?
	- Are you using this for video editing?
	- Are you primarily going to use this for programming?
	- Are you just going to browse the web and use discord?
- Are you using modern hardware?
- Do you want bleeding edge packages or do you prefer stability and long term support?
- Do you want an immutable distro or a standard distro?
	- NixOS[^5] is an example of an immutable distro (more about this later)
- Piggybacking off the above, do you want a reproducible system?
- Do you care about the type of package manager you are using?
- Do you care about documentation for troubleshooting or installing/configuring your system?
- Do you care about a graphical vs terminal installer?
- Do you want to tweak and configure everything yourself, or do you want something like Windows or Mac that is just ready to go out of the box?

# Distros and what they are good at

The following is just a list of some of the distros that I know and have tested or at least have read extensively on. This obviously isn't all inclusive as you can see from the family tree above of Linux distros, that would be a 400 page article. 

## Arch

You will see the meme plenty, but "I use Arch btw". While it is a meme, there's a reason.
Arch allows you to configure everything to your liking, it's meant for people that want to do everything themselves. It doesn't do hand holding, it doesn't have a graphical installer (although it does have the `archinstall` script, which can mostly do everything for you, don't worry about the hecklers if you choose to use this script).
### Pros
- Top tier documentation, arguably the best in the Linux world, often you'll find yourself here even if coming from other distros
- AUR[^6]
	- A user package repository for bleeding edge packages, if you can't find a package in the Arch package list, it's almost guaranteed to be here, and if for some reason it isn't, it's quite easy to create a PKGBUILD
- No opinionated packages, what you install is what you get. It's so minimal at times that if you forget to install specific packages during install, you'll be booting into a system with no internet, no `git` to be able to pull packages, no dev packages to build anything
### Cons
- No graphical installer (if you care)
- Not an "out of the box" type of distro
- I personally wouldn't pick a bleeding edge distro for something like a server, but there also isn't a reason you couldn't

## CachyOS (Arch based)

CachyOS[^7] is an Arch based distro that has custom kernels and custom compiled packages to take advantage of modern hardware.
### Pros:
- Everything you love about Arch is still here
- Optimized kernel for modern hardware, users claim performance increases
- Great for gaming
- Comes with choice of many Desktop Environments[^8] and Window Managers[^9] out of the box
- Offers graphical or cli based installer based on preference
- Has custom compiled packages, often from AUR and Arch package list, optimized for newer hardware
### Cons
- None really, other than it isn't meant for older hardware

## EndeavourOS (Arch based)

Essentially just Arch, with a graphical installer, and options to pick what DE or WM you want to use. The pros and cons are the same as Arch.

## What about Omarchy?!

Omarchy isn't a distro, it's just Arch Linux preinstalled with packages including Hyprland[^10], with DHH's[^11] dotfiles slapped on top. There's plenty of other dotfile setups you could use as well.

## Ubuntu (Debian based)

A popular distro that is highly adopted. Probably the most "noob" friendly distro next to Linux Mint[^12].

### Pros
 - Highly adopted, plenty of documentation and packages
 - Out of the box setup with graphical installer
 - Has LTS editions for servers
### Cons
- Bleeding edge package support lacking

## Linux Mint (Debian based)

Same as Ubuntu essentially, won't go over too much. Out of the box experience, extremely friendly for beginners. Great for Windows first time Linux converts.

## NixOS

This distro is a beast of its own. It's something I have only dabbled with, but does appeal to me. I always rice my stuff and have my dotfiles setup. I may be testing this more thoroughly soon, and could even be my new main distro, who knows! This distro is essentially the dotfiles of distros. Highly recommend watching [this](https://www.youtube.com/watch?v=v5RK3oNRiNY) if interested. Props to @tonybtw, great content!

### Pros
 - Declarative system, ability to store your entire system in a few configuration files and store them in source control, making your system reproducible in a matter of minutes on any machine
 - Highly adopted at this point, most packages you want will be there in Nix format for adding to your config
 - Immutable system (double edged sword in some cases)
	 - Anytime you install a package or change your config, you rebuild your system using a simple command like `nixos-rebuild switch`. Most changes are instant, while some changes will require a restart
	 - Ability to create on demand environments without installing packages:
		 - `nix-shell -p python3` will drop you into a new shell, where python3 is installed, after exiting that shell python3 will not be on your system
		 - This allows you to also create an entire environment at once, for instance you could have a dev environment with specific tools and package version, that you could easily swap in or out of at any time
 - Flakes
	 - While considered experimental, essentially the entire community uses them. The default NixOS setup uses "channels", but most people switch to "flakes"
	 - It allows you to have a package lock system, pinning exact versions when you run the flake command
		 - Can update package versions as well similar to other package lock systems like package.json and node_modules
	 - You define inputs and outputs
		 - Inputs are package sources (typically from nixos-unstable) as well as other flakes or files or git repositories
		 - Outputs are your package configurations and can also be system specific if needed. This is what gets output into your NixOS system
	 - As an example, if you really like someone elses NixOS setup and dotfiles, you can download their flake and have your entire system the same as theirs in a matter of minutes
### Cons
- Most of the above pros are also a double edged sword:
	- Declarative system
		- It's daunting at first, like learning a new config language
- Packages you want might not be available
- Immutable system, means it's not easy to just simply install a package on your system like on something like Arch
- Packages aren't in their typical place such as /usr/bin, but actually in the nix store folder under a unique hash name

## Bazzite (Fedora Based)

Bazzite[^13] is a distro with a focus on being ready to go for gaming.
### Pros
- Great for Linux if you just want a clean install ready to game
- Comes with Steam[^14] pre installed
- Has HDR and VRR support
- Optimized CPU scheduler for gaming
- Image based, every update the previous version of your system is retained so you can easily rollback
- Comes with default secure boot and encryption
- Builtin support for game controllers, GPUs and additional drivers like Wifi and DisplayLink
- Comes with multiple choices for environments: GNOME[^15], KDE[^16], Steam Gaming mode (similar to Steam Deck/big picture mode), and Waydroid[^17] to play Android games.
- Supports handheld hardware, great for installing on handhelds or even living room gaming machines
### Cons
 - Not many, if you want to just game with an easy setup on Linux, this is actually a great option. 
 - If you aren't a gamer this distro probably isn't for you

# My original journey leading up to my end all distro

I started young, originally using Puppy Linux[^18] because I only had an eMac at the time. I then moved onto Slackware[^19] and like other Linux users, distro hopped a lot. I mostly used Slackware and Fedora[^20] for a while. Then when Ubuntu became really mainstream and shipped out free install CDs I moved to Ubuntu before finally landing at some point on Arch (btw).

Arch has been good to me, it serves my nature, I like to configure everything and tweak everything to my liking down to the T. This is the purpose that Arch serves, it's for those that want to tinker, who want to customize everything, and don't want any opinionated defaults. 

I have had my eyes set on trying out CachyOS and or NixOS though, NixOS is extremely appealing to me as a user of multiple machines, but I am not sure if I can come to terms with not having the things I'm used to in Arch, so I may swap to CachyOS to keep that Arch vibe while having great modern hardware improvements for gaming.  If I do end up attempting one of these, I'll be sure to document it here on my blog.

[^1]: https://ubuntu.com/
[^2]: https://www.debian.org/
[^3]: https://endeavouros.com/
[^4]: https://archlinux.org/
[^5]: https://nixos.org/
[^6]: https://aur.archlinux.org/ - Arch User Repository
[^7]: https://cachyos.org/
[^8]: https://wiki.archlinux.org/title/Desktop_environment
[^9]: https://wiki.archlinux.org/title/Window_manager
[^10]: https://hyprland.org/
[^11]: https://dhh.dk/ - David Heinemeier Hansson
[^12]: https://linuxmint.com/
[^13]: https://bazzite.gg/
[^14]: https://store.steampowered.com/
[^15]: https://www.gnome.org/
[^16]: https://kde.org/
[^17]: https://waydro.id/
[^18]: https://puppylinux-woof-ce.github.io/
[^19]: http://www.slackware.com/
[^20]: https://fedoraproject.org/
