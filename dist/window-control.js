export class WindowControl {
    firebase;
    constructor(firebase) {
        this.firebase = firebase;
        this.updateWindowControls(window.location.href);
    }
    updateWindowControls(windowLocationHref) {
        if (windowLocationHref.includes("register")) {
            document.getElementById("register").addEventListener("click", () => {
                this.firebase.register(document.getElementById("email").value, document.getElementById("password").value, document.getElementById("username").value);
            });
        }
        else if (windowLocationHref.includes("login")) {
            document.getElementById("login").addEventListener("click", () => {
                this.firebase.login(document.getElementById("email").value, document.getElementById("password").value);
            });
        }
        else if (windowLocationHref.includes("lobby")) {
            document.getElementById("login").addEventListener("click", () => {
                window.location.href = "./login.html";
            });
            document.getElementById("register").addEventListener("click", () => {
                window.location.href = "./register.html";
            });
        }
        else if (windowLocationHref.includes("menu")) {
            document.getElementById("join-room").addEventListener("click", () => {
                window.location.href = "./join-room.html";
            });
            document.getElementById("create-room").addEventListener("click", () => {
                this.firebase.createRoom();
            });
        }
        else if (windowLocationHref.includes("join")) {
            document.getElementById("join").addEventListener("click", () => {
                this.firebase.joinRoom(document.getElementById("room-code").value);
            });
        }
        else if (windowLocationHref.includes("room")) {
            console.log(this.firebase);
            console.log(this.firebase.newClient);
            console.log(this.firebase.newClient.uuid);
            document.getElementById("room-code").innerText =
                this.firebase.newClient.uuid;
        }
    }
}
//# sourceMappingURL=window-control.js.map