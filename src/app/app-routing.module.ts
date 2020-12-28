import { JogoComponent } from './jogo/jogo.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';

const routes: Routes = [

  // { path: '', redirectTo: '/jogo', pathMatch: 'full' },
  { path: 'jogo', component: JogoComponent, canActivate: [AuthGuard], },
  { path: 'jogo/:jogoID', component: JogoComponent, canActivate: [AuthGuard], },
  { path: 'login', component: LoginComponent },
  { path: '', component: LoginComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
