import { Canvas } from "./canvas.js";
export class WindowControl {
    firebase;
    constructor(firebase) {
        this.firebase = firebase;
        this.updateWindowControls(window.location.href);
    }
    async updateWindowControls(windowLocationHref) {
        if (windowLocationHref.includes("register")) {
            this.registerControls();
        }
        else if (windowLocationHref.includes("login")) {
            this.loginControls();
        }
        else if (windowLocationHref.includes("lobby")) {
            this.lobbyControls();
        }
        else if (windowLocationHref.includes("menu")) {
            this.menuControls();
        }
        else if (windowLocationHref.includes("join")) {
            this.joinRoomControls();
        }
        else if (windowLocationHref.includes("room")) {
            await this.roomControls();
        }
        else if (windowLocationHref.includes("game")) {
            new Canvas();
        }
    }
    async roomControls() {
        await this.firebase.listenToConnection();
        await this.firebase.waitUntilUserAvailable();
        if (!localStorage.getItem("room-code")) {
            await this.firebase.createRoom().then(() => {
                console.log(this.firebase);
                console.log(this.firebase.newClient);
                this.displayRoomCode;
            });
        }
        else {
            await this.firebase
                .joinRoom(localStorage.getItem("room-code"))
                .then(() => {
                console.log(this.firebase);
                console.log(this.firebase.newClient);
                this.displayRoomCode;
            });
        }
        await this.firebase.listenToPresence();
    }
    registerControls() {
        document.getElementById("register").addEventListener("click", () => {
            this.firebase.register(document.getElementById("email").value, document.getElementById("password").value, document.getElementById("username").value);
        });
    }
    loginControls() {
        document.getElementById("login").addEventListener("click", () => {
            this.firebase.login(document.getElementById("email").value, document.getElementById("password").value);
        });
    }
    lobbyControls() {
        document.getElementById("login").addEventListener("click", () => {
            window.location.href = "./login.html";
        });
        document.getElementById("register").addEventListener("click", () => {
            window.location.href = "./register.html";
        });
    }
    menuControls() {
        document.getElementById("join-room").addEventListener("click", () => {
            window.location.href = "./join.html";
        });
        document.getElementById("create-room").addEventListener("click", () => {
            window.location.href = "./room.html";
        });
        this.firebase.listenToConnection();
    }
    joinRoomControls() {
        document.getElementById("join").addEventListener("click", () => {
            localStorage.setItem("room-code", document.getElementById("room-code").value);
            window.location.href = "./room.html";
        });
    }
    displayRoomCode() {
        document.getElementById("room-code").innerText =
            this.firebase.newClient.uid;
    }
}
//# sourceMappingURL=window-control.js.map