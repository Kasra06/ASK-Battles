import { FirebaseApp } from "./firebase";

export class WindowControl {
  private firebase: FirebaseApp;
  constructor(firebase: FirebaseApp) {
    this.firebase = firebase;
    this.updateWindowControls(window.location.href);
  }

  private updateWindowControls(windowLocationHref: string) {
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
    } else if (windowLocationHref.includes("join")) {
      document.getElementById("join").addEventListener("click", () => {
        this.firebase.joinRoom(
          (document.getElementById("roomId") as HTMLInputElement).value,
          2
        );
      });
    }
  }
}
