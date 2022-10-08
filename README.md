# hello-x
A simple web-greeter theme.

![preview image](https://user-images.githubusercontent.com/26361108/193652282-3e808950-12fe-4dfb-9f35-cdaf9a31f9d8.png)

### Try out the [demo](https://notle0n.github.io/hello-x/)!

# Features
- **Battery display** (you need to set `battery: True` in `/etc/lightdm/web-greeter.yml`)
- **Background switches every reload**
- **Hidden user switcher**
- **Shutdown, restart, and suspend buttons**
- **Localized**

# Backgrounds
###### photographed by NotLe0n
| ![clouds](img/backgrounds/clouds.jpg) | ![sunset](img/backgrounds/sunset.jpg)       | ![konstanz](img/backgrounds/konstanz.jpg)             |
|---------------------------------------|---------------------------------------------|-------------------------------------------------------|
| ![forest](img/backgrounds/forest.jpg) | ![mountains](img/backgrounds/mountains.jpg) | ![path](img/backgrounds/path.jpg)                     |
| ![prague](img/backgrounds/prague.jpg) | ![tenerife](img/backgrounds/tenerife.jpg)   | ![neuschwanstein](img/backgrounds/neuschwanstein.jpg) |

# Installation
1. Install `web-greeter` or `nody-greeter`
2. replace `greeter-session=slick-greeter` with `greeter-session=web-greeter` (or nody-greeter if you installed that) in `/usr/share/lightdm/lightdm.conf.d/90-slick-greeter.conf`
3. Clone repo into `/usr/share/web-greeter/themes/`
4. set geeter.theme to `hello-x` in `/etc/lightdm/web-greeter.yml`
5. set `battery: True` in `/etc/lightdm/web-greeter.yml`
6. reboot maybe

# Localization
These are all languages that have the word "Hello" translated:
* English
* German
* Italian
* French
* Spanish
* Dutch
* Swedish
* Norwegian
* Turkish
* Russian
* Polish
* Korean
* Japanese
* Chinese

To add your own Language to this list, edit the [hello.js](hello.js) file. If your language uses unicode characters, you need to [escape](https://dencode.com/string/unicode-escape) them before putting them in.
