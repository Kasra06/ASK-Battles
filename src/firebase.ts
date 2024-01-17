// @ts-ignore Import module
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
// @ts-ignore Import module
import {
  getDatabase,
  set,
  ref,
  onValue,
  // @ts-ignore Import module
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
// @ts-ignore Import module
import { firebaseConfig } from "./config.js";
// @ts-ignore Import module
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  // @ts-ignore Import module
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import { Client } from "./client.js";

class FirebaseApp {
  private app;
  private db;
  private auth;
  private playerId: string;
  private playerRef: string;
  constructor() {
    this.app = initializeApp(firebaseConfig);
    this.db = getDatabase(this.app);
    this.auth = getAuth(this.app);
  }
  public register(email: string, password: string, username: string): void {
    console.log(email);
    onAuthStateChanged(this.auth, (user) => {
      console.log(user);
      if (user) {
        this.playerId = user.uid;
        this.playerRef = `players/${this.playerId}`;
        set(ref(this.db, this.playerRef), {
          username: username,
        });
      }
    });
    createUserWithEmailAndPassword(this.auth, email, password)
      .then((user) => {
        console.log("User: " + user.user);
        window.location.href = "./game.html";
      })
      .catch((error) => {
        // Handle error
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorMessage.includes("already")) {
          alert("email is in use");
        }
        console.error(`Error (${errorCode}): ${errorMessage}`);
      });
  }

  public login(email: string, password: string): void {
    signInWithEmailAndPassword(this.auth, email, password)
      .then(() => {
        window.location.href = "./game.html";
      })
      .catch((error) => {
        if (error.message.includes("invalid")) {
          alert("Wrong passwordx`");
        }
      });
  }

  public createRoom() {
    const newRoom: Client = new Client(this, this.playerId);
    this.joinRoom(newRoom.uuid, 1);
  }

  public joinRoom(roomId: string, playerNumber: number) {
    set(ref(this.db, `rooms/${roomId}/player${playerNumber}`), {
      id: this.playerId,
    });
    window.location.href = "./room.html";
  }
}

export { FirebaseApp };
