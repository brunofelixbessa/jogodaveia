import { Component, HostListener, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { take, catchError } from 'rxjs/operators';
import { FireAuthService } from './fire-auth.service';
import { User } from './model.user';
//import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  user$: Observable<User> = this.auth.user$;

  deferredPrompt: any;
  showButton = false;
  mobile: HTMLInputElement;
  message;

  @HostListener('window:beforeinstallprompt', ['$event'])
  onbeforeinstallprompt(e) {
    console.log(e);
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    this.deferredPrompt = e;
    this.showButton = true;
  }

  constructor(
    //private swUpdates: SwUpdate,
    public auth: FireAuthService,
    private readonly snackBar: MatSnackBar,
    private readonly router: Router
  ) { }

  ngOnInit() {

    this.mobile = document.getElementById('mobileORdescktop') as HTMLInputElement;
    this.reloadCache();
    this.detectar_mobile();

  }

  reloadCache() {
    // if (this.swUpdates.isEnabled) {
    //   this.swUpdates.available.subscribe(() => {
    //     if (confirm('Nova versão diponivel. Deseja atualizar ?')) {
    //       window.location.reload();
    //     }
    //   });
    // }
  }

  installPwa() {
    // hide our user interface that shows our A2HS button
    this.showButton = false;
    // Show the prompt
    this.deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    this.deferredPrompt.userChoice
      .then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        this.deferredPrompt = null;
      });
  }

  detectar_mobile() {

    if (navigator.userAgent.match(/Android/i)
      || navigator.userAgent.match(/webOS/i)
      || navigator.userAgent.match(/iPhone/i)
      || navigator.userAgent.match(/iPad/i)
      || navigator.userAgent.match(/iPod/i)
      || navigator.userAgent.match(/BlackBerry/i)
      || navigator.userAgent.match(/Windows Phone/i)
    ) {
      this.mobile.value = 'true';
      return true;
    } else {
      this.mobile.value = 'false';
      return false;
    }
  }

  login() {
    this.router.navigate(['login']);
  }

  logout() {
    this.auth
      .logout()
      .pipe(take(1))
      .subscribe((response) => {
        this.router.navigate(['login']);
        this.snackBar.open('Volte sempre', 'Fechar', {
          duration: 1000,
        });
      });
  }


}


