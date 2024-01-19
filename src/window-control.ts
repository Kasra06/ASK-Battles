import { FirebaseApp } from "./firebase";
import { Canvas } from "./canvas";

export class WindowControl {
  private firebase: FirebaseApp;
  constructor(firebase: FirebaseApp) {
    this.firebase = firebase;
    this.updateWindowControls(window.location.href);
  }
  updateWindowControls(windowLocationHref: string) {
    if (windowLocationHref.includes("register")) {
      document.getElementById("register").addEventListener("click", () => {
        this.firebase.register(
          (document.getElementById("email") as HTMLInputElement).value,
          (document.getElementById("password") as HTMLInputElement).value,
          (document.getElementById("username") as HTMLInputElement).value
        );
      });
    } else if (windowLocationHref.includes("login")) {
      document.getElementById("login").addEventListener("click", () => {
        this.firebase.login(
          (document.getElementById("email") as HTMLInputElement).value,
          (document.getElementById("password") as HTMLInputElement).value
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
          (document.getElementById("room-code") as HTMLInputElement).value
        );
        window.location.href = "./room.html";
      });
    } else if (windowLocationHref.includes("room")) {
      if (!localStorage.getItem("room-code")) {
        this.firebase.createRoom().then(() => {
          console.log(this.firebase);
          console.log(this.firebase.newClient);
          (
            document.getElementById("room-code") as HTMLParagraphElement
          ).innerText = this.firebase.newClient.uid;
        });
      } else {
        this.firebase.joinRoom(localStorage.getItem("room-code"));
      }
    } else if (windowLocationHref.includes("game")) {
      new Canvas();
    }
  }
}
