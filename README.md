# hello-x
A simple web-greeter theme.

(image coming soon)

# Features
- **Battery display** (you need to set `battery: True` in `/etc/lightdm/web-greeter.yml`)
- **Background switches every reload**
- **Hidden user switcher**
- **Shutdown, restart, and suspend buttons**

# Backgrounds
###### photographed by NotLe0n
|![clouds](img/backgrounds/clouds.jpg)|![sunset](img/backgrounds/sunset.jpg)|![konstanz](img/backgrounds/konstanz.jpg)|
|--|--|--|

# Installation
1. Install `web-greeter` or `nody-greeter`
2. replace `greeter-session=slick-greeter` with `greeter-session=web-greeter` (or nody-greeter if you installed that) in `/usr/share/lightdm/lightdm.conf.d/90-slick-greeter.conf`
2. Clone repo into `/usr/share/web-greeter/themes/`
3. set geeter.theme to `hello-x` in `/etc/lightdm/web-greeter.yml`
4. set `battery: True` in `/etc/lightdm/web-greeter.yml`
5. reboot maybe
