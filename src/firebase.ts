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
import { Client } from "./client.js";
// @ts-ignore Import module
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  // @ts-ignore Import module
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

class FirebaseApp {
  private app;
  private db;
  private auth;
  private _newClient: Client;
  constructor() {
    this.app = initializeApp(firebaseConfig);
    this.db = getDatabase(this.app);
    this.auth = getAuth(this.app);
  }
  public register(email: string, password: string, username: string): void {
    console.log(email);
    createUserWithEmailAndPassword(this.auth, email, password)
      .then(() => {
        /**
         * Do no move. It can only get called when user is created.
         * Do not move to window control, since when its there, it will run before the user is created
         * leading to an error.
         */

        updateProfile(this.auth.currentUser, {
          displayName: username,
        }).then(() => {
          this.listenToConnection();
          window.location.href = "./menu.html";
        });
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
        this.listenToConnection();
        window.location.href = "./menu.html";
      })
      .catch((error) => {
        if (error.message.includes("invalid")) {
          alert("Wrong password");
        }
      });
  }

  public listenToConnection() {
    onDisconnect(
      ref(this.db, `active-players/${this.auth.currentUser.uid}`)
    ).remove();
    onValue(ref(this.db, ".info/connected"), (snap) => {
      if (snap.val()) {
        this.addToActivePlayers();
      } else {
        signOut(this.auth).then(() => {
          remove(ref(this.db, `active-players/${this.auth.currentUser.uid}`));
        });
      }
    });
  }

  private addToActivePlayers() {
    console.log("adding to active players");
    console.log(this.db);
    console.log(this.auth.currentUser.uid);
    console.log(this.auth.currentUser);
    console.log(this.auth.currentUser.displayName);
    console.log(this.auth.currentUser);
    set(ref(this.db, `active-players/${this.auth.currentUser.uid}`), {
      username: this.auth.currentUser.displayName,
    });
  }

  public createRoom() {
    this._newClient = new Client(this, this.auth.currentUser.uid);
    console.log(this._newClient);
    set(
      ref(
        this.db,
        `rooms/${this._newClient.uuid}/${this.auth.currentUser.uid}`
      ),
      {
        username: this.auth.currentUser.displayName,
      }
    )
      .then(() => {
        window.location.href = "./room.html";
      })
      .catch((error) => {
        console.log(error.code, error.message);
      });
  }

  public joinRoom(roomId: string) {
    set(ref(this.db, `rooms/${roomId}/${this.auth().currentUser.uid}`), {
      username: this.auth().currentUser.displayName,
    });
  }

  public get newClient() {
    return this._newClient;
  }
}

export { FirebaseApp };
