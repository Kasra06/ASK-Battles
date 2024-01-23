export class WindowControl {
    firebase;
    constructor(firebase) {
        this.firebase = firebase;
        this.updateWindowControls(window.location.href);
    }
    async updateWindowControls(windowLocationHref) {
        await this.firebase.waitUntilUserAvailable();
        if (this.firebase.userIsSingedOut() &&
            (windowLocationHref.includes("join") ||
                windowLocationHref.includes("room") ||
                windowLocationHref.includes("menu"))) {
            window.location.href = "./lobby.html";
        }
        const controls = {
            "register.html": () => this.registerControls(),
            "login.html": () => this.loginControls(),
            "lobby.html": () => this.lobbyControls(),
            "menu.html": () => this.menuControls(),
            "join.html": () => this.joinRoomControls(),
            "room.html": () => this.roomControls(),
        };
        controls[this.getUrlKey(windowLocationHref)](); // Invoke the function
    }
    getUrlKey(url) {
        // Extract the key from the URL (e.g., "register" from "/register")
        return url.split("/").pop();
    }
    async roomControls() {
        await this.firebase.waitUntilUserAvailable();
        if (!localStorage.getItem("room-code")) {
            await this.firebase.createRoom().then(() => {
                console.log(this.firebase);
                console.log(this.firebase.newClient);
                this.displayRoomCode();
            });
        }
        else {
            await this.firebase
                .joinRoom(localStorage.getItem("room-code"))
                .then(() => {
                console.log(this.firebase);
                console.log(this.firebase.newClient);
                this.displayRoomCode();
            });
        }
        await this.firebase.listenToConnection();
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
        document.getElementById("signout").addEventListener("click", async () => {
            await this.firebase.signout();
            window.location.href = "./lobby.html";
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
        console.log("displaying uid", this.firebase.newClient.uid);
        document.getElementById("room-code").innerText =
            this.firebase.newClient.uid;
    }
}
//# sourceMappingURL=window-control.js.map