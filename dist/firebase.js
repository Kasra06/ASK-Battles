// @ts-ignore Import module
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
// @ts-ignore Import module
import { getDatabase, set, ref,
// @ts-ignore Import module
 } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
// @ts-ignore Import module
import { firebaseConfig } from "./config.js";
// @ts-ignore Import module
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword,
// @ts-ignore Import module
 } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
class FirebaseApp {
    app;
    db;
    auth;
    playerId;
    playerRef;
    constructor() {
        this.app = initializeApp(firebaseConfig);
        this.db = getDatabase(this.app);
        this.auth = getAuth(this.app);
    }
    register(email, password, username) {
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
    login(email, password) {
        signInWithEmailAndPassword(this.auth, email, password)
            .then(() => {
            window.location.href = "./game.html";
        })
            .catch((error) => {
            if (error.message.includes("invalid")) {
                alert("Wrong info");
            }
        });
    }
}
export { FirebaseApp };
//# sourceMappingURL=firebase.js.map