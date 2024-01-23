import { FirebaseApp } from "./firebase";
import { Canvas } from "./canvas.js";

export class WindowControl {
  private firebase: FirebaseApp;
  constructor(firebase: FirebaseApp) {
    this.firebase = firebase;
    this.updateWindowControls(window.location.href);
  }

  private async updateWindowControls(windowLocationHref: string) {
    if (windowLocationHref.includes("register")) {
      this.registerControls();
    } else if (windowLocationHref.includes("login")) {
      this.loginControls();
    } else if (windowLocationHref.includes("lobby")) {
      this.lobbyControls();
    } else if (windowLocationHref.includes("menu")) {
      this.menuControls();
    } else if (windowLocationHref.includes("join")) {
      this.joinRoomControls();
    } else if (windowLocationHref.includes("room")) {
      await this.roomControls();
    } else if (windowLocationHref.includes("game")) {
      new Canvas();
    }
  }

  private async roomControls(): Promise<void> {
    await this.firebase.listenToConnection();
    await this.firebase.waitUntilUserAvailable();
    if (!localStorage.getItem("room-code")) {
      await this.firebase.createRoom().then(() => {
        console.log(this.firebase);
        console.log(this.firebase.newClient);
        this.displayRoomCode;
      });
    } else {
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

  private registerControls(): void {
    document.getElementById("register").addEventListener("click", () => {
      this.firebase.register(
        (document.getElementById("email") as HTMLInputElement).value,
        (document.getElementById("password") as HTMLInputElement).value,
        (document.getElementById("username") as HTMLInputElement).value
      );
    });
  }

  private loginControls(): void {
    document.getElementById("login").addEventListener("click", () => {
      this.firebase.login(
        (document.getElementById("email") as HTMLInputElement).value,
        (document.getElementById("password") as HTMLInputElement).value
      );
    });
  }

  private lobbyControls(): void {
    document.getElementById("login").addEventListener("click", () => {
      window.location.href = "./login.html";
    });
    document.getElementById("register").addEventListener("click", () => {
      window.location.href = "./register.html";
    });
  }

  private menuControls(): void {
    document.getElementById("join-room").addEventListener("click", () => {
      window.location.href = "./join.html";
    });
    document.getElementById("create-room").addEventListener("click", () => {
      window.location.href = "./room.html";
    });
    this.firebase.listenToConnection();
  }

  private joinRoomControls(): void {
    document.getElementById("join").addEventListener("click", () => {
      localStorage.setItem(
        "room-code",
        (document.getElementById("room-code") as HTMLInputElement).value
      );
      window.location.href = "./room.html";
    });
  }

  private displayRoomCode(): void {
    (document.getElementById("room-code") as HTMLParagraphElement).innerText =
      this.firebase.newClient.uid;
  }
}
