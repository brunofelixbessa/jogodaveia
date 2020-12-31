import { FireAuthService } from './../fire-auth.service';
import { FirebaseService } from './../firebase.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { catchError, take } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../model.user';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  hide = true;
  user$: Observable<User> = this.authService.user$;

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  senhaFormControl = new FormControl('', [
    Validators.required,
  ]);

  matcher = new MyErrorStateMatcher();
  return: string = '';
  constructor(
    public authService: FireAuthService,) { }

  ngOnInit(): void {
    // this.route.queryParams
    //   .subscribe(params => this.return = params['return'] || '/jogo');
  }

  loginGoogle() {
    this.authService.loginViaGoogle();
  }
}
