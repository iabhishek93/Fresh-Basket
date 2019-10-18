import { Injectable } from "@angular/core";
import * as firebase from "firebase";
import { AngularFireAuth } from "@angular/fire/auth";
import { Observable, of } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { AppUser } from "../models/app-user";
import { UserService } from "./user.service";
import { switchMap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  user: Observable<firebase.User>;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) {
    this.user = afAuth.authState;
  }

  login() {
    let returnUrl = this.route.snapshot.queryParamMap.get("returnUrl") || "/";
    localStorage.setItem("returnUrl", returnUrl); //Here firstly we are saving the url in the localstorage and then sending the user for google authentication

    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  get appUser$(): Observable<AppUser> {
    return this.user.pipe(
      switchMap(user => {
        if (user) return this.userService.get(user.uid).valueChanges();

        return of(null)
      })
    );
  }
}
