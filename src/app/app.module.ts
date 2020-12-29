
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';

//Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from './../environments/environment';
import { LoginComponent } from './login/login.component';
import { JogoComponent } from './jogo/jogo.component';
import { ProfileCardComponent } from './profile-card/profile-card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalVitoriaComponent } from './modal-vitoria/modal-vitoria.component';
import { ModalQrcodComponent } from './modal-qrcod/modal-qrcod.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    JogoComponent,
    ProfileCardComponent,
    ModalVitoriaComponent,
    ModalQrcodComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    MatDividerModule,
    MatMenuModule,
    MatToolbarModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatGridListModule,
    MatBadgeModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
