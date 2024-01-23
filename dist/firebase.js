// @ts-ignore Import module
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
// @ts-ignore Import module
import { getDatabase, set, ref, remove, onValue, off, onDisconnect, update,
// @ts-ignore Import module
 } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import { firebaseConfig } from "./config.js";
import { Client } from "./client.js";
// @ts-ignore Import module
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile,
// @ts-ignore Import module
 } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
export class FirebaseApp {
    app;
    db;
    auth;
    newClient;
    connectionListener;
    constructor() {
        this.app = initializeApp(firebaseConfig);
        this.db = getDatabase(this.app);
        this.auth = getAuth(this.app);
        onAuthStateChanged(this.auth, (user) => {
            if (user) {
                console.log("user is signed in", user.displayName);
                console.log("current User", this.auth.currentUser.displayName);
            }
            else {
                console.log("user is signed out");
            }
        });
    }
    register(email, password, username) {
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
    login(email, password) {
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
    waitUntilUserAvailable() {
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
    async listenToConnection() {
        await this.waitUntilUserAvailable();
        const connectedRef = ref(this.db, ".info/connected");
        const onConnected = async (snap) => {
            if (snap.val()) {
                // User is connected
                console.log("User is connected");
                try {
                    // Add the user to active-players
                    await this.addToActivePlayers();
                    console.log("User added to active-players");
                    onDisconnect(ref(this.db, `active-players/${this.auth.currentUser.uid}`)).remove();
                }
                catch (error) {
                    console.error("Error adding user to active-players:", error.message);
                }
            }
        };
        // Add the listener for connection status
        onValue(connectedRef, onConnected);
    }
    async addToActivePlayers() {
        console.log("adding to active players");
        console.log(this.auth.currentUser);
        console.log(this.auth.currentUser.uid);
        console.log(this.auth.currentUser.displayName);
        await set(ref(this.db, `active-players/${this.auth.currentUser.uid}`), {
            username: this.auth.currentUser.displayName,
        });
    }
    async createRoom() {
        console.log("creatig room");
        this.newClient = new Client(this);
        await this.initializePlayerPresences(this.newClient.uid);
        await set(ref(this.db, `rooms/${this.newClient.uid}/player1`), {
            uid: this.auth.currentUser.uid,
            username: this.auth.currentUser.displayName,
        });
        await this.changePlayerPresence(this.newClient.uid, "player1", true);
    }
    async joinRoom(roomId) {
        this.newClient = new Client(this, roomId);
        await set(ref(this.db, `rooms/${roomId}/player2`), {
            uid: this.auth.currentUser.uid,
            username: this.auth.currentUser.displayName,
        });
        // fix
        await this.changePlayerPresence(this.newClient.uid, "player2", true);
    }
    /**
     * This will listen for when the players join
     * I haven't thought of the use for it yet
     * should be useful for the game tho
     */
    async listenToPresence() {
        const func = async (snap) => {
            const presenceData = await snap.val();
            console.log(presenceData);
            console.log(presenceData.player1);
            console.log(presenceData.player2);
            if (presenceData && presenceData.player1) {
                console.log("player1", presenceData.player1);
            }
            if (presenceData && presenceData.player2) {
                console.log("player2", presenceData.player2);
            }
            if (presenceData.player1 === false && presenceData.player2 === false) {
                remove(ref(this.db, `rooms/${this.newClient.uid}`));
            }
        };
        await onValue(ref(this.db, `rooms/${this.newClient.uid}/presence`), func);
    }
    async initializePlayerPresences(roomId) {
        console.log("initializing the presence");
        await set(ref(this.db, `rooms/${roomId}/presence`), {
            player1: false,
            player2: false,
        });
    }
    async changePlayerPresence(roomId, playerKey, newState) {
        await update(ref(this.db, `rooms/${roomId}/presence`), {
            [playerKey]: newState,
        });
    }
}
//# sourceMappingURL=firebase.js.map