// @ts-ignore Import module
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
// @ts-ignore Import module
import {
  getDatabase,
  set,
  ref,
  remove,
  onValue,
  off,
  onDisconnect,
  get,
  update,
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

export class FirebaseApp {
  private app;
  private db;
  private auth;
  public newClient: Client;
  private connectionListener;
  private playerKey: string;
  private otherPlayerKey: string;
  private otherConnection: boolean;
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
          uid: this.auth.currentUser.uid,
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

  public waitUntilUserAvailable(): Promise<void> {
    return new Promise((resolve) => {
      const connectedRef = ref(this.db, ".info/connected");

      const onConnected = (snap) => {
        if (snap.val()) {
          // User is available
          resolve();
          off(connectedRef, onConnected); // Remove the listener once resolved
        }
      };

      onValue(connectedRef, onConnected);
    });
  }

  public async listenToConnection(): Promise<void> {
    const connectedRef = ref(this.db, ".info/connected");
    const onConnected = async (snap) => {
      if (snap.val()) {
        // User is connected
        console.log("User is connected");
        try {
          // Add the user to active-players
          await this.addToActivePlayers();
          console.log("User added to active-players");
          onDisconnect(
            ref(this.db, `active-players/${this.auth.currentUser.uid}`)
          ).remove();
          if (this.newClient) {
            onDisconnect(
              ref(this.db, `rooms/${this.newClient.uid}/${this.playerKey}`)
            ).remove();
            onDisconnect(
              ref(this.db, `rooms/${this.newClient.uid}/presence`)
            ).update({
              [this.playerKey]: false,
            });
          }
        } catch (error) {
          console.error("Error adding user to active-players:", error.message);
        }
      }
    };
    // Add the listener for connection status
    onValue(connectedRef, onConnected);
  }

  private async addToActivePlayers(): Promise<void> {
    console.log("adding to active players");
    console.log(this.auth.currentUser);
    console.log(this.auth.currentUser.uid);
    console.log(this.auth.currentUser.displayName);
    await set(ref(this.db, `active-players/${this.auth.currentUser.uid}`), {
      username: this.auth.currentUser.displayName,
    });
  }

  public async createRoom(): Promise<void> {
    console.log("creatig room");
    this.newClient = new Client(this);
    await this.initializePlayerPresences(this.newClient.uid);
    await set(ref(this.db, `rooms/${this.newClient.uid}/player1`), {
      uid: this.auth.currentUser.uid,
      username: this.auth.currentUser.displayName,
    });
    this.playerKey = "player1";
    this.otherPlayerKey = "player2";
    await this.changePlayerPresence(this.newClient.uid, true);
  }

  public async joinRoom(roomId: string): Promise<void> {
    this.newClient = new Client(this, roomId);
    await set(ref(this.db, `rooms/${roomId}/player2`), {
      uid: this.auth.currentUser.uid,
      username: this.auth.currentUser.displayName,
    });
    this.playerKey = "player2";
    this.otherPlayerKey = "player1";
    await this.changePlayerPresence(this.newClient.uid, true);
    this.deleteRoomWhenNoPlayers();
  }

  private deleteRoomWhenNoPlayers() {
    const roomRef = ref(this.db, `rooms/${this.newClient.uid}`);
    const connectedRef = ref(this.db, `.info/connected`);

    onValue(connectedRef, async (snap): Promise<void> => {
      console.log(snap.val());
      if (!snap.val() && !this.otherConnection) {
        await remove(roomRef);
        onDisconnect(roomRef).remove();
      }
    });
  }

  /**
   * This will listen for when the players join
   * I haven't thought of the use for it yet
   * should be useful for the game tho
   */
  public async listenToPresence(): Promise<void> {
    const func = async (snap) => {
      const presenceData = await snap.val();
      console.log(presenceData);
      this.otherConnection =
        this.otherPlayerKey === "player1"
          ? presenceData.player1
          : presenceData.player2;
    };
    await onValue(ref(this.db, `rooms/${this.newClient.uid}/presence`), func);
  }

  public async initializePlayerPresences(roomId: string): Promise<void> {
    console.log("initializing the presence");
    await set(ref(this.db, `rooms/${roomId}/presence`), {
      player1: false,
      player2: false,
    });
  }

  private async changePlayerPresence(
    roomId: string,
    newState: boolean
  ): Promise<void> {
    await update(ref(this.db, `rooms/${roomId}/presence`), {
      [this.playerKey]: newState,
    });
  }

  public async signout(): Promise<void> {
    await signOut(this.auth);
  }

  public userIsSingedOut(): boolean {
    return !this.auth.currentUser;
  }
}
