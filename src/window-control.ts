import { FirebaseApp } from "./firebase";
import { Canvas } from "./canvas.js";

export class WindowControl {
  private firebase: FirebaseApp;
  constructor(firebase: FirebaseApp) {
    this.firebase = firebase;
    this.updateWindowControls(window.location.href);
  }

  private async updateWindowControls(
    windowLocationHref: string
  ): Promise<void> {
    await this.firebase.waitUntilUserAvailable();
    if (
      this.firebase.userIsSingedOut() &&
      (windowLocationHref.includes("join") ||
        windowLocationHref.includes("room") ||
        windowLocationHref.includes("menu"))
    ) {
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

  private getUrlKey(url: string): string {
    // Extract the key from the URL (e.g., "register" from "/register")
    return url.split("/").pop();
  }

  private async roomControls(): Promise<void> {
    await this.firebase.waitUntilUserAvailable();
    if (!localStorage.getItem("room-code")) {
      await this.firebase.createRoom().then(() => {
        console.log(this.firebase);
        console.log(this.firebase.newClient);
        this.displayRoomCode();
      });
    } else {
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
    document.getElementById("signout").addEventListener("click", async () => {
      await this.firebase.signout();
      window.location.href = "./lobby.html";
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
    console.log("displaying uid", this.firebase.newClient.uid);
    (document.getElementById("room-code") as HTMLParagraphElement).innerText =
      this.firebase.newClient.uid;
  }
}
