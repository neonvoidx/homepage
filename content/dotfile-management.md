---
title: Dotfile management
created: '2025-11-22 00:00'
draft: false
tags:
  - linux
  - mac
  - dotfiles
  - gnu
  - stow
  - yadm
---
# Dotfile management 

## What are "dotfiles"?

The term comes from the typical Linux files that start with a `.` which typically means a hidden file. A typical `ls` command will not show these files without doing a `ls -a`.  Mostly, programs on Linux use your `$XDG_CONFIG_HOME`  (which is `~/.config` by default) to store configuration options per application.

## Why backup dotfiles?

There are many reasons:
1. If your system gets borked, you would hate to have to reconfigure everything again right?
2. If you use multiple machines, dotfile management makes carrying your common configurations across multiple machines
3. The typical glory of version control. If you make some changes, or something else makes changes for you, and you end up not liking them and want to revert, what's better than having a commit history to go back and restore a specific setup?

## Options for dotfile management

[Here](https://dotfiles.github.io/utilities/) is a decent overview of most dotfile management solutions. I'll go over a few:
- chezmoi
	- It does its own state management, you have to add  specific files
- home manager
	- This is popular, especially among users of Nix, but can be used outside Nix  on most systems. I personally haven't used this yet and I don't plan to
- yadm
	- This is a git wrapper, anything that git command can do this can do and more. It also offers storing of secrets (don't recommend), bootstrapping, hooks, and alternate files. I used this one for the longest time.
- GNU Stow
	- It's old and reliable. You have one directory for all your dotfiles, and can run `stow` to automatically symlink everything in that folder, following the folder and file structure to your main home directory. It has other uses as well, and you can create multiple "packages" which I will go into a little bit further below.

# Why I'm using GNU Stow

## Moving from yadm to GNU stow

I was using yadm[^1] to manage my dotfiles, but I found it to be a bit cumbersome for my needs. First, the management of entire home directory recursively with git had its quirks, I had to have a lot of `.gitignore`s and anytime I accidentally muscle memory typed `yadm add .` in my home folder, I was in for a bad time. I wanted a simpler solution that would allow me to manage my dotfiles more easily and with less overhead.

## Finding something new

I started looking around. Found chezmoi[^2], and absolutely disliked it's management style, it's just not for me, and I'm not really sure what the hype is about. 

I heard nothing but praise for stow[^3], it's old and ancient (in the best ways), it's simple, and it's GNU. What's not to love?.

## Difficulties moving to stow (at first)

I use multiple machines, a Macbook for work, Arch[^4] on my main desktop, and Arch on my laptop. 

With yadm I had the semi-nice option of Jinja[^5] templates and alternate files, i.e being able to have `.gitconfig##os.Darwin` vs `.gitconfig##default` etc.

### So how do we solve this in stow?

It's simple! I created my `~/dotfiles` folder. Inside this I have multiple subfolders:

- `common`
- `linux`
- `mac`

The names are pretty implicit, all my common files go in common, linux only files in linux, etc... This way I can easily manage my dotfiles for each OS without any complicated logic.
I add an easy bash script:

```bash
#!/bin/bash
# filepath: ~/dotfiles/stow.sh
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

First this updates my git submodules. For me I keep my pics (wallpapers), neovim[^6] config, and obsidian[^7] vault as separate repos. I add them as git submodules to my dotfiles repo. This allows me to keep these repos in my dotfiles as references to easily get all my dotfiles at once, while still keeping the management of them separate.

It then runs `stow common`  to symlink all my common files, followed by auto detecting my OS by `uname -s` and running stow on appropriate OS folder.

The result is simple and easy. Now all my dotfiles are symlinked back to my `~/dotfiles` appropriately.

Obviously we want this in git. So just `git init`, add changes, commit, and push up to your repo (create one if you don't have one). 

We are good to go! From now on we can store our changes from this one folder. If you need to add a new file from your dotfiles, simply move the file from it's location, to the appropriate path in your dotfiles folder, then run your stow commands to make it symlink again.

#### Side notes

- How do you solve issues when you already have existing files on system and try to stow? The best way is either:
    - remove those files, then stow
    - `stow --adopt` and then drop changes in dotfiles with something like `git clean -xfd`

[^1]: <https://yadm.io/>

[^2]: <https://www.chezmoi.io/>

[^3]: <https://www.gnu.org/software/stow/>

[^4]: <https://archlinux.org/>

[^5]: <https://jinja.palletsprojects.com/>

[^6]: <https://neovim.io/>

[^7]: <https://obsidian.md/>

