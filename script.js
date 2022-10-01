updateBackground(); // set background

updateTime(); // set time at start
setInterval(updateTime, 1000) // update the current time every second

updateBatteryIcon() // set battery icon
setInterval(updateBatteryIcon, 60000) // update the battery icon every minute

populateUserSelection();

// selects a random background each time
function updateBackground() {
    const images = ['clouds', 'konstanz', 'sunset'] // image names array
    const index = Math.floor(Math.random() * 3); // select random number from 0-3

    // set --bg variable to random element of the image names array
    document.documentElement.style.setProperty(
        '--bg',
        `url("img/backgrounds/${images[index]}.jpg")`
    );
}

// updates the current time
function updateTime() {
    const today = new Date();
    document.getElementById("current-time").innerHTML = today.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: "2-digit" });
}

function updateBatteryIcon() {
    if (lightdm.battery_data === undefined) {
        return;
    }

    // round down to the nearest multiple of 10
    const batteryLevel = lightdm.battery_data.level - lightdm.battery_data.level % 10
    const img = document.getElementById('battery-status');

    // set icon
    img.setAttribute(
        'src',
        `img/icons/battery-${batteryLevel}.svg`
    )

    // set title
    img.setAttribute(
        'title',
        `${lightdm.battery_data.level}%`
    )
}

function populateUserSelection() {
    const users = lightdm.users
    const userSelect = document.getElementById('user')
    for (const user of users) {
        let opt = document.createElement('option');
        opt.innerHTML = user.username

        userSelect.appendChild(opt)
    }
}

function submitPass() {
    let elm = document.getElementById("pass");
    console.log("password submitted")

    setTimeout(async () => {
        const user = document.getElementById('user').innerText
        
        let authSent = lightdm.authenticate(user)
        console.log(`authenticated ${user}: ${authSent}`)

        await wait(100) // mandatory

        let responseSent = lightdm.respond(elm.value);
        console.log(`responded with ${elm.value}: ${responseSent}`)
        console.log('starting session...')

        await wait(100) // mandatory
        lightdm.start_session()
    }, 1000);
}

function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}