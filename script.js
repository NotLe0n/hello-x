// true: most likely running the demo
if ((typeof lightdm) === "undefined") {
    // create fake lightdm object
    var lightdm = {
        can_access_battery: true,
        battery_data: { level: 100 },
        users: [ { username: "demo" } ],
        authentication_complete: {
            connect(callback) { this.callbacks.push(callback); },
            callbacks: []
        },
        authenticate() { return true },
        respond() { this.authentication_complete.callbacks.forEach(x => x()); return true },
        start_session() { alert('logging in...'); return true },
        shutdown() { alert('shutting down...') },
        restart() { alert('restarting...') },
        suspend() { alert('suspending...') }
    }

    // emulate the smaller scale
    document.documentElement.style.setProperty('font-size', "1rem");
    document.querySelectorAll('img.button').forEach(x => {
        x.setAttribute('width', '16px');
        x.setAttribute('height', '16px');
    });
    document.getElementById('battery-status-icon').setAttribute('width', '12px');
    document.getElementById('battery-status-icon').setAttribute('height', '12px');
}

updateBackground(); // set background

updateTime(); // set time at start
setInterval(updateTime, 1000); // update the current time every second

if (lightdm.can_access_battery) {
    updateBattery(); // set battery icon
    lightdm.battery_update?.connect(updateBattery); // update battery info every status change
}

populateUserSelection();

// selects a random background each time
function updateBackground() {
    const images = ['clouds', 'konstanz', 'sunset', 'forest', 'mountains', 'tenerife', 'path', 'prague', 'neuschwanstein']; // image names array
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
    // round down to the nearest multiple of 10
    const batteryLevel = lightdm.battery_data?.level - lightdm.battery_data?.level % 10;
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
    text.innerText = `${lightdm.battery_data?.level}%`;
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

async function login() {
    document.getElementById('message-field').setAttribute('hidden', '');
    document.getElementById('loader').removeAttribute('hidden');

    const user = document.getElementById('user').innerText;
    const password = document.getElementById("pass").value;

    if (!lightdm.authenticate(user)) {
        sendErrorMessage(`Failed to authenticate user: ${user}`);
    }

    await wait(100); // mandatory

    if (!lightdm.respond(password)) {
        sendErrorMessage(`Couldn't respond with password: ${password}`);
    }
}

lightdm.authentication_complete?.connect(() => {
    if (!lightdm.start_session()) {
        sendErrorMessage('Incorrect Password');
    }
    else {
        document.getElementById('loader').setAttribute('hidden', '');
    }
});

function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function sendErrorMessage(msg) {
    const field = document.getElementById('message-field');
    field.removeAttribute('hidden');
    field.innerText = msg;
    document.getElementById('loader').setAttribute('hidden', '');
}