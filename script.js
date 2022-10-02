updateBackground(); // set background

updateTime(); // set time at start
setInterval(updateTime, 1000); // update the current time every second

updateBattery(); // set battery icon
if (lightdm.battery_data !== undefined && lightdm.battery_update !== undefined) {
    lightdm.battery_update.connect(updateBattery); // update battery info every status change
}

populateUserSelection();

// selects a random background each time
function updateBackground() {
    const images = ['clouds', 'konstanz', 'sunset', 'forest', 'mountains', 'bird', 'path', 'prague']; // image names array
    const index = Math.floor(Math.random() * images.length); // select random number

    console.log('current background: ' + images[index]);
    // set --bg variable to random element of the image names array
    document.documentElement.style.setProperty(
        '--bg',
        `url("img/backgrounds/${images[index]}.jpg")`
    );
}

// updates the current time
function updateTime() {
    const today = new Date();
    document.getElementById("current-time").innerHTML = today.toLocaleTimeString([], {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: "2-digit"
    });
}

function updateBattery() {
    if (lightdm.battery_data === undefined) {
        return;
    }

    console.log('updating battery info...');

    // round down to the nearest multiple of 10
    const batteryLevel = lightdm.battery_data.level - lightdm.battery_data.level % 10;
    const img = document.getElementById('battery-status-icon');

    // set icon
    img.setAttribute(
        'src',
        `img/icons/battery-${batteryLevel}.svg`
    );

    // set title
    img.setAttribute(
        'title',
        `${lightdm.battery_data.level}%`
    );

    const text = document.getElementById('battery-status-text');
    text.innerText = `${lightdm.battery_data.level}%`;
}

function populateUserSelection() {
    const users = lightdm.users;
    const userSelect = document.getElementById('user');

    for (const user of users) {
        let opt = document.createElement('option');
        opt.innerHTML = user.username;

        userSelect.appendChild(opt);
    }
}

function submitPass() {
    let elm = document.getElementById("pass");
    console.log("password submitted");

    setTimeout(async () => {
        const user = document.getElementById('user').innerText;

        let authSent = lightdm.authenticate(user);
        console.log(`authenticated ${user}: ${authSent}`);

        await wait(100); // mandatory

        let responseSent = lightdm.respond(elm.value);
        console.log(`responded with ${elm.value}: ${responseSent}`)
        console.log('starting session...');

        await wait(100); // mandatory
        lightdm.start_session();
    }, 1000);
}

function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}