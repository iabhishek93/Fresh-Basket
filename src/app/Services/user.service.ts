import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireObject } from "@angular/fire/database";
import * as firebase from "firebase";
import { AppUser } from "../models/app-user";

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(private db: AngularFireDatabase) { }

  save(users: firebase.User) {
    this.db.object("/users/" + users.uid).update({
      name: users.displayName,
      email: users.email
    });
  }

  get(uid: string): AngularFireObject<AppUser> {
    return this.db.object("/users/" + uid);
  }
}
