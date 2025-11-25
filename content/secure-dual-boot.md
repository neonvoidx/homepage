---
title: Secure Dual Boot
description: How to secure dual boot with Windows and Linux
date: 2025-09-02T00:00:00.000Z
draft: false
tags:
  - linux
  - uefi
  - gaming
  - windows
---
### How to secure boot when dual booting (i.e Linux and Windows)

If you are like me you love Linux, hate Windows, but have gaming FOMO because your friends make you play games like League of Legends.

Most of the steps here I stole from a Reddit post a long time ago and stashed in my notes, but can no longer find. If you find it let me know and I'll credit it here.

### Prerequisites

- You are dual booting with Linux and Windows
  - This means you already have Linux and Windows installed, whether they are on separate drives or partitions
- You are using `grub` as your bootloader

### Steps

1. Re-install GRUB to utilize Microsoft's CA certificates (as opposed to shim) -- replace 'esp' with your EFI system partition:
   - `sudo grub-install --target=x86_64-efi --efi-directory=esp --bootloader-id=GRUB --modules="tpm" --disable-shim-lock`

2. Regenerate your grub configuration:
   - `sudo grub-mkconfig -o /boot/grub/grub.cfg`

3. Install the sbctl tool (assuming Arch here, use your package manager or build from source otherwise):
   - `sudo pacman -S sbctl`

4. As a pre-requisite, in your UEFI settings, set your secure boot mode to setup mode. This means entering BIOS and putting secure boot mode in setup mode, if you don't see a "setup" mode for secure boot, often this just means clearing keys and disabling.

5. Upon re-booting, verify that you are in setup mode:
   - `sbctl status`

6. Create your custom secure boot keys:
   - `sudo sbctl create-keys`

7.Enroll your custom keys (note -m is required to include Microsoft's CA certificates) - `sudo sbctl enroll-keys -m`

8. Verify that your keys have successfully been enrolled:
   - `sbctl status`

9. Check which files need to be signed for secure boot to work:
   - `sudo sbctl verify`

10. Sign all unsigned files (below is what I needed to sign, adjust according to your needs):
    - `sudo sbctl sign -s /efi/EFI/GRUB/grubx64.efi`
    - Be careful here, I recommend manually signing files, if you run some type of `find` `exec` command to sign these, you may sign way too much, and you'll hate yourself later because you'll have to manually un-sign each one

11. (**optional**) You may get an error because of an issue with certain files being immutable. To make those files mutable, run the following command for each file then re-sign afterwards:
    - `sudo chattr -i /sys/firmware/efi/efivars/<filename>`

12. Verify that everything has been signed:
    - `sudo sbctl verify`

13. Finally, in your UEFI settings, enable secure boot, and reboot.

14. Verify that secure boot is enabled:
    - `sbctl status`

_Note:_ that sbctl comes with a pacman hook for automatic signing, so you don't need to worry when you update your system.

Congratulations 🎉️,

you should now have secure boot working with dual booting Windows and Linux! Enjoy your newfound security and peace of mind. Gone are the days of gaming FOMO with friends. Now to game with friends you just reboot into Windows in disgust every minute as you game until you go to sleep at 3AM and wake up the next day smiling as you boot back into Linux.

# linux #windows #dual-boot #secure-boot #grub #sbctl #security #uefi

