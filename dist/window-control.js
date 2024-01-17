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
    }
}
//# sourceMappingURL=window-control.js.map