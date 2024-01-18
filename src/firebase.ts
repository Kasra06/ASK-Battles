// @ts-ignore Import module
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
// @ts-ignore Import module
import {
  getDatabase,
  set,
  ref,
  remove,
  onValue,
  onDisconnect,
  // @ts-ignore Import module
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import { firebaseConfig } from "./config.js";
// @ts-ignore Import module
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  // @ts-ignore Import module
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

//import { Client } from "./client.js";

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
        user.displayName = username;
      }
    });
    createUserWithEmailAndPassword(this.auth, email, password)
      .then((user) => {
        console.log("User: " + user.user);
        this.addToActivePlayers();
        //window.location.href = "./game.html";
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
    this.listenToConnection();
  }

  private listenToConnection() {
    onValue(ref(this.db, ".info/connected"), (snap) => {
      if (snap.val()) {
        this.addToActivePlayers();
      } else {
        this.removeActivePlayer();
      }
    });
  }

  public login(email: string, password: string): void {
    signInWithEmailAndPassword(this.auth, email, password)
      .then((user) => {
        this.addToActivePlayers();
        // window.location.href = "./game.html";
      })
      .catch((error) => {
        if (error.message.includes("invalid")) {
          alert("Wrong password");
        }
      });
    this.listenToConnection();
  }

  private addToActivePlayers() {
    set(ref(this.db, `active-players/${this.auth.currentUser.uid}`), {
      username: this.auth.currentUser.displayName,
    });
  }

  private removeActivePlayer() {
    remove(ref(this.db, `active-players/${this.auth.currentUser.uid}`));
  }
  // public createRoom() {
  //   const newRoom: Client = new Client(this, this.playerId);
  //   this.joinRoom(newRoom.uuid, 1);
  // }

  // public joinRoom(roomId: string, playerNumber: number) {
  //   set(ref(this.db, `rooms/${roomId}/player${playerNumber}`), {
  //     id: this.playerId,
  //   });
  //   window.location.href = "./room.html";
  // }
}

export { FirebaseApp };
