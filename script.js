// true: most likely running the demo
if ((typeof lightdm) === "undefined") {
    // create fake lightdm object
    var lightdm = {
        layout: {short_description: "en"},
        can_access_battery: true,
        battery_data: { level: 100 },
        users: [ { username: "demo" } ],
        authentication_complete: {
            connect(callback) { this.callbacks.push(callback); },
            callbacks: []
        },
        sessions: [
            { key: "demo-session1" },
            { key: "demo-session2" }
        ],
        authenticate() { return true },
        respond() { this.authentication_complete.callbacks.forEach(x => x()); return true },
        start_session(session) { alert('logging in...'); return true },
        shutdown() { alert('shutting down...') },
        restart() { alert('restarting...'); document.location.reload() },
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

let selectedSession = lightdm.default_session;
const locale = lightdm.layout?.short_description;

updateBackground(); // set background

updateTime(); // set time at start
setInterval(updateTime, 1000); // update the current time every second

if (lightdm.can_access_battery) {
    updateBattery(); // set battery icon
    lightdm.battery_update?.connect(updateBattery); // update battery info every status change
}

populateUserSelection();

updateHello();

populateSettingsSessionSelect();

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
    document.getElementById("current-time").innerHTML = today.toLocaleTimeString([locale], { hour12: false });

    document.getElementById("current-date").innerHTML = today.toLocaleDateString([locale], { dateStyle: "long"  })
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

function updateHello() {
    document.getElementById('hello').innerText = hello[locale];
}

async function login() {
    document.getElementById('message-field').setAttribute('hidden', '');
    document.getElementById('loader').removeAttribute('hidden');

    const user = document.getElementById('user').innerText;
    const password = document.getElementById("pass").value;

    if (!lightdm.authenticate(user)) {
        sendErrorMessage(`Failed to authenticate user: ${user}`);
    }

    await new Promise((resolve) => setTimeout(resolve, 100)); // mandatory

    if (!lightdm.respond(password)) {
        sendErrorMessage(`Couldn't respond with password: ${password}`);
    }
}

lightdm.authentication_complete?.connect(() => {
    if (!lightdm.start_session(selectedSession)) {
        sendErrorMessage('Incorrect Password');
    }
    else {
        document.getElementById('loader').setAttribute('hidden', '');
    }
});

function sendErrorMessage(msg) {
    const field = document.getElementById('message-field');
    field.removeAttribute('hidden');
    field.innerText = msg;
    document.getElementById('loader').setAttribute('hidden', '');
}

let settingsOpen = false;
function toggleSettings() {
    const elm = document.getElementById('settings');
    if (settingsOpen) {
        elm.style.right = "-18rem";
    }
    else {
        elm.style.right = "1rem";
    }
    settingsOpen = !settingsOpen;
}

function populateSettingsSessionSelect() {
    let select = document.getElementById('session-select');
    for (const session of lightdm.sessions) {
        let opt = document.createElement('option');
        opt.innerText = session.key;
        select.appendChild(opt);
    }
}

document.getElementById('pass').addEventListener('keydown',
    (event) => {
    const capsImg = document.getElementById('caps-img');
    if (event.getModifierState && event.getModifierState('CapsLock')) {
        capsImg.removeAttribute('hidden')
    }
    else {
        capsImg.setAttribute('hidden', '')
    }
});