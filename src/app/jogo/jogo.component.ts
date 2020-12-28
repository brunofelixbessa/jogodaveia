import { FirebaseService } from './../firebase.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FireAuthService } from '../fire-auth.service';
import { User } from '../model.user';
import { Jogo } from '../model.jogo';
import { ActivatedRoute, Router, } from '@angular/router';
import { IfStmt } from '@angular/compiler';

@Component({
  selector: 'app-jogo',
  templateUrl: './jogo.component.html',
  styleUrls: ['./jogo.component.css']
})
export class JogoComponent implements OnInit {

  //jogos: any; // Mapeado 2
  //jogo$: Observable<Jogo>;  // Retorno
  jogoAtual: Jogo = new Jogo(); // Criacao
  usuario: User

  constructor(
    private readonly snackBar: MatSnackBar,
    private firebase: FirebaseService,
    public auth: FireAuthService,
    private readonly route: ActivatedRoute, private readonly router: Router,) { }

  ngOnInit() {
    const productIdFromRoute = this.route.snapshot.paramMap.get('jogoID');
    this.buscar_unitario2(productIdFromRoute);
    this.identificarUsuario();
  }

  identificarUsuario() {
    this.usuario = FireAuthService.getUsuario();

    if (this.usuario) {
      if (this.usuario.displayName === this.jogoAtual.player1) {
        this.snackBar.open(`Vamos lá ${this.jogoAtual.player1} 'Player 1'`, 'Fechar', {
          duration: 1000,
        });
        return;
      }

      if (!this.jogoAtual.player1) {
        let record = {};
        record['player2'] = this.usuario.displayName;
        this.firebase.update(this.jogoAtual.jogoID, record);

        this.snackBar.open(`Vamos lá ${this.usuario.displayName} 'Player 2'`, 'Fechar', {
          duration: 1000,
        });
      }
    }

  }

  criarJogo() {

    if (!this.usuario)
      return;

    this.jogoAtual.jogoID = this.usuario.uid;
    this.jogoAtual.player1 = this.usuario.displayName;
    this.jogoAtual.player2 = '';
    this.jogoAtual.c1 = '';
    this.jogoAtual.c2 = '';
    this.jogoAtual.c3 = '';
    this.jogoAtual.c4 = '';
    this.jogoAtual.c5 = '';
    this.jogoAtual.c6 = '';
    this.jogoAtual.c7 = '';
    this.jogoAtual.c8 = '';
    this.jogoAtual.c9 = '';
    this.jogoAtual.suavez = true;
    this.jogoAtual.ultimoGanhado = '';
    this.jogoAtual.p1 = 0;
    this.jogoAtual.p2 = 0;

    this.firebase.criar_id(this.jogoAtual, this.jogoAtual.jogoID).then(resp => {
      this.snackBar.open(`Jogo criado ${this.usuario.uid} 😾`, 'Fechar', {
        duration: 1000,
      });
      this.router.navigate(['jogo', this.usuario.uid]);
    })
      .catch(error => {
        console.log(error);
      });
  }

  jogar(casa: string) {

    if (this.jogoAtual.suavez && this.usuario.displayName === this.jogoAtual.player1) {
      let record = {};
      record[casa] = 'X';
      record['suavez'] = false;
      this.firebase.update(this.jogoAtual.jogoID, record);
    }

    if (!this.jogoAtual.suavez && this.usuario.displayName === this.jogoAtual.player2) {
      let record = {};
      record[casa] = 'O';
      record['suavez'] = true;
      this.firebase.update(this.jogoAtual.jogoID, record);
    }

  }

  buscar_unitario1() {
    //this.jogo$ = this.firebase.buscarUnicoObs("2");
  }

  buscar_unitario2(jogoID: string) {

    if (jogoID) {
      this.firebase.buscarUnico(jogoID).subscribe(data => {
        this.jogoAtual = data;
      });
    }
  }

  buscar_todos1() {

  }
  buscar_todos2() {
    // this.firebase.busca_todos2().subscribe(data => {
    //   this.jogos = data.map(e => {
    //     return {
    //       id: e.payload.doc.id,
    //       jogoID: e.payload.doc.data()['jogoID'],
    //       player1: e.payload.doc.data()['player1'],
    //       player2: e.payload.doc.data()['player2'],
    //       c1: e.payload.doc.data()['c1'], c2: e.payload.doc.data()['c2'], c3: e.payload.doc.data()['c3'],
    //       c4: e.payload.doc.data()['c4'], c5: e.payload.doc.data()['c5'], c6: e.payload.doc.data()['c6'],
    //       c7: e.payload.doc.data()['c7'], c8: e.payload.doc.data()['c8'], c9: e.payload.doc.data()['c9'],
    //       suavez: e.payload.doc.data()['suavez'],
    //       ultimoGanhado: e.payload.doc.data()['ultimoGanhado'],
    //       p1: e.payload.doc.data()['p1'],
    //       p2: e.payload.doc.data()['p2'],
    //     };
    //   })
    //   console.log(this.jogos);
    // });
  }
  buscar_todos3() {

  }
}
