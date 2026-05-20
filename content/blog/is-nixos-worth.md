---
created: "2025-12-08 19:46"
draft: false
title: Is NixOS worth the hype?
tags:
  - linux
  - nixos
---

TLDR: ~~No~~ Ya, it's actually god tier

# What is NixOS

NixOS[^1] is a declarative system. Essentially, if you took the dotfile mindset and applied it to an entire system configuration, you have NixOS. Instead of manually building your system by installing packages from your package manager, messing with systemd[^2] service configurations, etc., you do everything in the Nix declarative language inside essentially one folder.

# Pros

- Great if you have multiple machines
- Great if you want a **truly** reproducible build
- Stable (if not using unstable)
- Take one config anywhere, to any machine, to anyone, and get the exact same setup within about 5–10 minutes tops
- Rolling back to previous generations is quick and easy
- nix-shell: Have you ever been working and needed a specific Python package or a tool, but didn't need it forever?
  - In Nix, this is as simple as `nix-shell -p command`—it will drop you into a shell where you will have access to that package. After exiting that shell, it's gone, not installed on your system

# Cons

- If you love Linux and its paradigms and systems, this isn't for you. You will spend 95% of your time in the Nix language and not the Linux way of things
- Steep learning curve—Nix language and the declarations can be pretty confusing
- Documentation is very spread out and often out of date
- You need to use Nix flakes[^3] and home-manager[^4] essentially if you want all the best features
- Because of the way your system is declared, it can often be hard when coming from a normal Linux distro
- home-manager
  - Some people swear by it; personally, I hate it
  - home-manager lets you manage your dotfiles as well as your user-specific apps installed and their configurations
  - You can choose essentially two options for dotfile management:
    - Either have home-manager symlink all your dotfiles, similar to what GNU Stow[^5] does
    - Declare all your app configurations with home-manager—often this is pretty annoying, and some home-manager modules for applications are very annoying
      - For example, zsh might have a decent amount of Nix language configuration options, but you'll often find yourself appending things using a multiline comment syntax, which in my opinion makes it very hard to read. You lose syntax highlighting and LSP for that filetype as well (although I'm sure there is probably some wonky hack to get around this)
- Storage space: NixOS, because of its rebuild system, takes up A LOT of storage over time; however, you can get around this by adding a garbage collection option to your configs

# ~~My (subjective) thoughts on why NixOS isn't a good daily driver~~

~~I truly see the NixOS use case; for me though, that is more for multi-machine setups, maybe even servers. What I don't find it useful for is a daily driver for one machine. That feeling in something like Arch[^6] where you can just install what you need instantly isn't necessarily the same in Nix.~~

~~For me, I can get a pretty reproducible system in Arch already. I have btrfs[^7] with snapper[^8] hooked into GRUB[^9] for easy rollbacks. I have my dotfiles stored in Git[^10], easily cloneable, and I have an Ansible[^11] playbook to take care of the rest.~~

~~All of this being said, I do plan to mess around more with NixOS in the future, maybe it'll grow on me, I'm not sure. It's definitely interesting to say the least.~~

[^1]: <https://nixos.org/>

[^2]: <https://systemd.io/>

[^3]: <https://nixos.wiki/wiki/Flakes>

[^4]: <https://github.com/nix-community/home-manager>

[^5]: <https://www.gnu.org/software/stow/>

[^6]: <https://archlinux.org/>

[^7]: <https://btrfs.wiki.kernel.org/>

[^8]: <https://github.com/openSUSE/snapper>

[^9]: <https://www.gnu.org/software/grub/>

[^10]: <https://git-scm.com/>

[^11]: <https://www.ansible.com/>
