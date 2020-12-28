import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from './model.user';
import firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class FireAuthService {

  userData: any;
  private user: BehaviorSubject<Observable<firebase.User>> = new BehaviorSubject<Observable<firebase.User>>(null);

  user$ = this.user
    .asObservable()
    .pipe(switchMap((user: Observable<firebase.User>) => user));

  constructor(private afAuth: AngularFireAuth, private router: Router, public ngZone: NgZone,) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        //console.log(this.userData)
        FireAuthService.setUsuario(this.userData);
      }
    });

    this.user.next(this.afAuth.authState);
  }

  // loginViaGoogle(): Observable<firebase.auth.UserCredential> {
  //   return from(this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider()));
  // }

  loginViaGoogle() {
    return this.AuthLogin(new firebase.auth.GoogleAuthProvider());
  }

  // Auth logic to run auth providers
  AuthLogin(provider) {
    return this.afAuth.signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['jogo']);
        });
        // this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error);
      });
  }

  logout(): Observable<void> {
    localStorage.removeItem('player');
    return from(this.afAuth.signOut());
  }

  // SetUserData(user) {
  //   const userData = {
  //     uid: user.uid,
  //     email: user.email,
  //     displayName: user.displayName,
  //     photoURL: user.photoURL,
  //     emailVerified: user.emailVerified,
  //   };
  //   return this.db.add('users', userData);
  // }

  ///Local Storage
  get isLoggedIn(): boolean {
    const user = FireAuthService.getUsuario();
    return (user !== null) ? true : false;
  }

  ///Local Storage
  public static setUsuario(user: User) {
    const data = JSON.stringify(user);
    localStorage.setItem('player', btoa(data));
  }
  ///Local Storage
  public static getUsuario(): User {
    const data = localStorage.getItem('player');
    if (data) {
      return JSON.parse(atob(data));
    } else {
      return null;
    }
  }

}
