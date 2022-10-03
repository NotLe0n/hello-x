# hello-x
A simple web-greeter theme.

![image](https://user-images.githubusercontent.com/26361108/193463855-90106e0d-686d-43d3-94c4-9f116140e7cb.png)

### Try out the [demo](https://notle0n.github.io/hello-x/)!

# Features
- **Battery display** (you need to set `battery: True` in `/etc/lightdm/web-greeter.yml`)
- **Background switches every reload**
- **Hidden user switcher**
- **Shutdown, restart, and suspend buttons**

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
