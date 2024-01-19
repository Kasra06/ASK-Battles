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
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        console.log("user is signed in", user.displayName);
        console.log("current User", this.auth.currentUser.displayName);
      } else {
        console.log("user is signed out");
      }
    });
  }
  public register(email: string, password: string, username: string): void {
    console.log(email);
    createUserWithEmailAndPassword(this.auth, email, password)
      .then(() => {
        updateProfile(this.auth.currentUser, {
          displayName: username,
        }).then(() => {
          window.location.href = "./login.html";
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
        window.location.href = "./menu.html";
      })
      .catch((error) => {
        if (error.message.includes("invalid")) {
          alert("Wrong password");
        }
      });
  }

  public listenToConnection(): Promise<void> {
    console.log(this.db);
    console.log(this.auth);
    console.log(this.auth.currentUser);
    console.log(this.auth.currentUser.uid);

    return new Promise((resolve, reject) => {
      onDisconnect(
        ref(this.db, `active-players/${this.auth.currentUser.uid}`)
      ).remove();

      onValue(ref(this.db, ".info/connected"), (snap) => {
        if (snap.val()) {
          this.addToActivePlayers();
          resolve(); // Resolve the promise when addToActivePlayers completes
        } else {
          signOut(this.auth)
            .then(() => {
              remove(
                ref(this.db, `active-players/${this.auth.currentUser.uid}`)
              )
                .then(() => {
                  resolve(); // Resolve the promise when removal completes
                })
                .catch(reject); // Reject the promise if removal fails
            })
            .catch(reject); // Reject the promise if signOut fails
        }
      });
    });
  }

  private addToActivePlayers() {
    console.log("adding to active players");
    console.log(this.auth.currentUser);
    console.log(this.auth.currentUser.uid);
    console.log(this.auth.currentUser.displayName);

    set(ref(this.db, `active-players/${this.auth.currentUser.uid}`), {
      username: this.auth.currentUser.displayName,
    });
  }

  public createRoom(): Promise<void> {
    console.log("creatig room");
    return new Promise((resolve, reject) => {
      onAuthStateChanged(this.auth, () => {
        this._newClient = new Client(this);
        set(ref(this.db, `rooms/${this._newClient.uid}/player1`), {
          uid: this.auth.currentUser.uid,
          username: this.auth.currentUser.displayName,
        })
          .then(() => {
            resolve();
            // window.location.href = "./room.html";
          })
          .catch((error) => {
            console.log(error.code, error.message);
            reject();
          });
      });
    });
  }

  public joinRoom(roomId: string) {
    this._newClient = new Client(this, roomId);
    onAuthStateChanged(this.auth, () => {
      set(ref(this.db, `rooms/${roomId}/player2`), {
        uid: this.auth.currentUser.uid,
        username: this.auth.currentUser.displayName,
      });
    });
  }

  public get newClient() {
    return this._newClient;
  }
}

export { FirebaseApp };
