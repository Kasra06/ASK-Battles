import { Canvas } from "./canvas";
export class WindowControl {
  firebase;
  constructor(firebase) {
    this.firebase = firebase;
    this.updateWindowControls(window.location.href);
  }
  updateWindowControls(windowLocationHref) {
    if (windowLocationHref.includes("register")) {
      document.getElementById("register").addEventListener("click", () => {
        this.firebase.register(
          document.getElementById("email").value,
          document.getElementById("password").value,
          document.getElementById("username").value
        );
      });
    } else if (windowLocationHref.includes("login")) {
      document.getElementById("login").addEventListener("click", () => {
        this.firebase.login(
          document.getElementById("email").value,
          document.getElementById("password").value
        );
      });
    } else if (windowLocationHref.includes("lobby")) {
      document.getElementById("login").addEventListener("click", () => {
        window.location.href = "./login.html";
      });
      document.getElementById("register").addEventListener("click", () => {
        window.location.href = "./register.html";
      });
    } else if (windowLocationHref.includes("menu")) {
      document.getElementById("join-room").addEventListener("click", () => {
        window.location.href = "./join.html";
      });
      document.getElementById("create-room").addEventListener("click", () => {
        window.location.href = "./room.html";
      });
      this.firebase.listenToConnection();
    } else if (windowLocationHref.includes("join")) {
      document.getElementById("join").addEventListener("click", () => {
        localStorage.setItem(
          "room-code",
          document.getElementById("room-code").value
        );
        window.location.href = "./room.html";
      });
    } else if (windowLocationHref.includes("room")) {
      if (!localStorage.getItem("room-code")) {
        this.firebase.createRoom().then(() => {
          console.log(this.firebase);
          console.log(this.firebase.newClient);
          document.getElementById("room-code").innerText =
            this.firebase.newClient.uid;
        });
      } else {
        this.firebase.joinRoom(localStorage.getItem("room-code"));
      }
    } else if (windowLocationHref.includes("game")) {
      new Canvas();
    }
  }
}
//# sourceMappingURL=window-control.js.map
