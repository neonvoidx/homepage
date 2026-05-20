---
created: "2026-19-05 22:29"
draft: false
title: Why NixOS is the best Linux distro
tags:
  - linux
  - nixos
---

# What is NixOS

NixOS[^1] is a declarative system. Essentially, if you took the dotfile mindset and applied it to an entire system configuration, you have NixOS. Instead of manually building your system by installing packages from your package manager, messing with systemd[^2] service configurations, etc., you do everything in the Nix declarative language inside essentially one folder.

# Pros

- Great if you have multiple machines
- Great if you want a **truly** reproducible build
- Stable (if not using unstable, which is still ironically quite stable)
- Take one config anywhere, to any machine, to anyone, and get the exact same setup within about 5–10 minutes tops
- Rolling back to previous generations is quick and easy, even built into most bootloaders as entries, similar to BTRFS snapshots
- nix-shell: Have you ever been working and needed a specific Python package or a tool, but didn't need it forever?
  - In Nix, this is as simple as `nix-shell -p command`—it will drop you into a shell where you will have access to that package. After exiting that shell, it's gone, not installed on your system
  - or better yet use comma, `, -s cowsay` to enter a shell that has cowsay available, or `, cowsay HELLO` to run the command.
  - These packages you use in this way aren't installed on your actual system, they are built and hashed into the nix store for easy cleanup, and the moment you leave the shell they are gone

# Cons

- Steep learning curve—Nix language and the declarations can be pretty confusing
- Documentation is very spread out and often out of date
- You need to use Nix flakes[^3] and home-manager[^4] essentially if you want all the best features
- Because of the way your system is declared, it can often be hard when coming from a normal Linux distro
- home-manager
  - home-manager lets you manage your user configurations. This includes your configuration of programs as well as user installed programs (not installed at system level).
  - You can choose essentially any of the following options for dotfile management:
    - Either have home-manager symlink all your dotfiles, similar to what GNU Stow[^5] does
    - Declare all your app configurations with home-manager—often this is pretty annoying at first, however, you get build time error checking before your configurations rebuild
    - completely ignore home manager and use something like GNU stow or yadm or chezmoi
- Storage space: NixOS, because of its rebuild system and hash based package caching, takes up A LOT of storage over time; however, you can get around this by adding a garbage collection option to your configs or running it manually

# Final thoughts

I made a blog post [here](./is-nixos-worth) when I originally tried NixOS because I simply didn't like it at all, I misunderstood it, I didn't have the full context, etc. I have been daily driving NixOS now for almost a year and will never go back to another operating system. I will agree the initial learning curve is quite hard. You need to learn the Nix language, which is not a configuration syntax but an actual Turing complete language, but this also brings a LOT of benefits. Building your own packages is also very nice and clear. As an example I use [NVF](https://nvf.notashelf.dev/) which is essentially a nix wrapper around Neovim. I define all my packages, my neovim config, plugins, treesitters, language servers, etc in one git repo. I add that as a flake input to my system, and I have a working neovim config anywhere with everything bundled together. Never do I need to make sure I have treesitter installed on my system, different code formatters or LSPs, even better on my work Macbook, I also have nix installed and the very same neovim setup. It's a 1:1 nvim, with no system dependencies other than having Nix.

You can find my full setup [here](https://github.com/neonvoidx/nix) for my NixOS systems, and my NVF/Neovim setup [here](https://github.com/neonvoidx/nvim). I am using a more advanced setup of nix flakes call Den, its a framework that builds on something called dendritic pattern. As you can see in my Nix repo, I define my home manager and nix system configurations in things called aspects.

Here's an example, for my [Stylix](https://nix-community.github.io/stylix/) (which gives me a colorscheme setup for a wide variety of applications by default) aspect:

```nix
{ den, inputs, ... }:
{
  den.aspects.stylix = {
    # Nix system level configurations for Stylix
    nixos =
      { pkgs, lib, ... }:
      {
        imports = [ inputs.stylix.nixosModules.stylix ];
        stylix = {
          enable = true;
          polarity = "dark";

          targets.qt = {
            enable = true;
            platform = lib.mkForce "qtct";
          };
          targets.gtk.enable = true;

          icons = {
            enable = true;
            light = "Dracula";
            dark = "Dracula";
            package = pkgs.dracula-icon-theme;
          };

          base16Scheme = "${pkgs.base16-schemes}/share/themes/eldritch.yaml";

          fonts = {
            serif = {
              package = pkgs.roboto;
              name = "Roboto";
            };

            sansSerif = {
              package = pkgs.roboto;
              name = "Roboto";
            };

            monospace = {
              package = pkgs.jetbrains-mono;
              name = "JetBrains Mono";
            };

            emoji = {
              package = pkgs.noto-fonts-color-emoji;
              name = "Noto Color Emoji";
            };

            sizes = {
              terminal = 16;
              applications = 13;
            };
          };
        };
      };

    # Home manager configuration for stylix
    homeManager =
      { lib, ... }:
      {
        stylix.targets = {
          cava.rainbow.enable = true;
          firefox.enable = false;
          hyprland.enable = true;
          hyprland.colors.enable = false;
          kitty.enable = false;
          neovim.enable = false;
          noctalia-shell.enable = false;
          obsidian.enable = false;
          starship.enable = true;
          yazi.enable = false;
          spicetify.enable = false;
          qt = {
            platform = lib.mkForce "qtct";
            standardDialogs = "xdgdesktopportal";
          };
        };
      };
  };
}
```

You can see with Den framework and the dendritic pattern, this aspect can be imported into any user or nix system setup, and all my concerns for this one application are in one single spot.

[^1]: <https://nixos.org/>

[^2]: <https://systemd.io/>

[^3]: <https://nixos.wiki/wiki/Flakes>

[^4]: <https://github.com/nix-community/home-manager>

[^5]: <https://www.gnu.org/software/stow/>
