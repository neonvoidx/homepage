---
title: Moving to Stow from yadm
description: Dotfile management with GNU Stow
date: 2025-11-22T00:00:00.000Z
draft: false
tags:
  - linux
  - mac
  - dotfiles
---
## Why?

I was using [yadm](https://yadm.io/) to manage my dotfiles, but I found it to be a bit cumbersome for my needs. First, the management of entire home directory recursively with git had its quirks, I had to have a lot of `.gitignore`s and anytime I accidentally muscle memory typed `yadm add .` in my home folder, I was in for a bad time. I wanted a simpler solution that would allow me to manage my dotfiles more easily and with less overhead.

## Finding something new

I started looking around. Found [chezmoi](https://www.chezmoi.io/), and absolutely disliked it's management style, it's just not for me, and I'm not really sure what the hype is about. I heard nothing but praise for [stow](https://www.gnu.org/software/stow/), it's old and ancient (in the best ways), it's simple, and it's GNU. What's not to love?.

## Difficulties

I use multiple machines, a Macbook for work, Arch on my main desktop, and Arch on my laptop. With yadm I had the semi-nice option of Jinja templates and alternate files, i.e being able to have `.gitconfig##os.Darwin` vs `.gitconfig##default` etc.

### So how do we solve this in stow?

It's simple! I created my ~/dotfiles folder. Inside this I have multiple subfolder:

- `common`
- `linux`
- `mac`

The names are pretty implicit, all my common files go in common, linux only files in linux, etc. This way I can easily manage my dotfiles for each OS without any complicated logic.
I add an easy bash script in my dotfiles:

```bash
#!/bin/bash
set -e # Exit on error

echo "Updating git submodules..."
if ! git submodule update --init --recursive --remote; then
  echo "✗ Error: Failed to update git submodules" >&2
  exit 1
fi
echo "✓ Successfully updated git submodules"

echo "Running stow for common package..."
stow -v common
echo

if [ "$(uname -s)" = "Darwin" ]; then
  echo "Detected macOS. Running stow on 'mac' folder for Mac-specific dotfiles..."
  stow -v mac
  echo "✓ Successfully ran stow on 'mac' folder"
fi

if [ "$(uname -s)" = "Linux" ]; then
  echo "Detected Linux. Running stow on 'linux' folder..."
  stow -v linux
  echo "✓ Successfully ran stow on 'linux' folder"
fi
echo

echo "Dotfiles updated successfully!"
```

First this updates my git submodules, for me I keep my pics (wallpapers), neovim config, and obsidian vault as separate repos.

This runs `stow common` followed by auto detecting my OS by `uname -s` and running stow on appropriate OS folder.

The result is simple and easy. Now all my dotfiles are symlinked back to my ~/dotfiles.

Obviously we want this in git, so we just `cd ~/dotfiles && git init && git add . && git commit -m "init"` and push it up. We are good to go!

#### Side notes

- How do you solve issues when you already have existing files on system and try to stow?
  - The best way is either:
    - remove those files, then stow
    - stow --adopt and then drop changes in dotfiles

