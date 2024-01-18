import { FirebaseApp } from "./firebase.js";
import { WindowControl } from "./window-control.js";

class System {
  private firebase: FirebaseApp;
  private windowController: WindowControl;
  constructor() {
    console.log("system");
    this.firebase = new FirebaseApp();
    this.windowController = new WindowControl(this.firebase);
  }
}

new System();
