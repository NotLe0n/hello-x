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
- **Customization through css**

# Backgrounds
###### photographed by NotLe0n
| ![clouds](img/backgrounds/clouds.jpg) | ![sunset](img/backgrounds/sunset.jpg)       | ![konstanz](img/backgrounds/konstanz.jpg)             |
|---------------------------------------|---------------------------------------------|-------------------------------------------------------|
| ![forest](img/backgrounds/forest.jpg) | ![mountains](img/backgrounds/mountains.jpg) | ![path](img/backgrounds/path.jpg)                     |
| ![prague](img/backgrounds/prague.jpg) | ![tenerife](img/backgrounds/tenerife.jpg)   | ![neuschwanstein](img/backgrounds/neuschwanstein.jpg) |

# Installation
1. ### Install [`web-greeter`](https://github.com/JezerM/web-greeter) or [`nody-greeter`](https://github.com/JezerM/nody-greeter)
2. ### Replace `greeter-session=slick-greeter` with `greeter-session=web-greeter` (or nody-greeter if you installed that) in `/usr/share/lightdm/lightdm.conf.d/90-slick-greeter.conf` (for my computer at least)
![step 2](https://user-images.githubusercontent.com/26361108/204892175-b2ff226d-8a9a-498c-9411-a866f26892e0.png)

3. ### Clone this repo into `/usr/share/web-greeter/themes/`
4. ### Set geeter.theme to `hello-x` in `/etc/lightdm/web-greeter.yml`
![step 4](https://user-images.githubusercontent.com/26361108/204892590-c68dc0ee-ccde-405e-b3a2-a8150f8e90d8.png)

5. ### Set `battery: True` in `/etc/lightdm/web-greeter.yml`
![step 5](https://user-images.githubusercontent.com/26361108/204892818-fcadc9d7-97a0-47cf-8236-b5254e32e036.png)

6. ### reboot maybe

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

# Customization
## Changing theme
To customize the theme, you'll have to edit the [style.css](style.css) file.
The :root element holds common colors. If you know how to write CSS you may also change other elements to your liking.

## Adding backgrounds
1. Add a .jpg file to the [img/backgrounds](img/backgrounds/) directory.
2. Append the name of the file (without extention) to the `images` array inside `updateBackground()`
