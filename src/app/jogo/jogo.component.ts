import { FirebaseService } from './../firebase.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FireAuthService } from '../fire-auth.service';
import { User } from '../model.user';
import { Jogo } from '../model.jogo';
import { ActivatedRoute, Router, } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ModalVitoriaComponent } from '../modal-vitoria/modal-vitoria.component';
import firebase from 'firebase';

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
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private dialog: MatDialog,
  ) {

    this.usuario = FireAuthService.getUsuario();

    const productIdFromRoute = this.route.snapshot.paramMap.get('jogoID');
    if (!productIdFromRoute) {
      this.criarJogo();
      return;
    }


    this.buscar_unitario2(productIdFromRoute);

  }

  ngOnInit() {

  }

  identificarUsuario() {

    // console.log('vsd' + this.jogoAtual.jogoID)
    // if (this.jogoAtual.jogoID === "")
    //   return;

    if (this.usuario) {
      if (this.usuario.uid === this.jogoAtual.player1) {
        // this.snackBar.open(`Vamos lá ${this.jogoAtual.player1} Player 1`, 'Fechar', {
        //   duration: 1000,
        // });
        return;
      }

      if (this.jogoAtual.player2 === "") {
        let record = {};
        record['player2'] = this.usuario.uid;
        record['nome2'] = this.usuario.displayName;
        this.firebase.update(this.jogoAtual.jogoID, record);

        this.snackBar.open(`Vamos lá ${this.usuario.displayName} Player 2`, 'Fechar', {
          duration: 1000,
        });
      }
    }

  }

  criarJogo() {

    if (!this.usuario)
      return;

    this.jogoAtual.jogoID = this.usuario.uid;
    this.jogoAtual.player1 = this.usuario.uid;
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
    this.jogoAtual.nome1 = this.usuario.displayName;
    this.jogoAtual.nome2 = '';

    this.firebase.criar_id(this.jogoAtual, this.jogoAtual.jogoID).then(resp => {
      this.snackBar.open(`Jogo criado ${this.usuario.uid} 😾`, 'Fechar', {
        duration: 1000,
      });
      localStorage.setItem('jogoID', this.usuario.uid)
      this.router.navigate(['jogo', this.usuario.uid]);
    }).catch(error => {
      console.log(error);
    });

  }

  reiniciar() {

    let aux = this.jogoAtual.player1;
    let placar = 0;

    //Troca o player que vai começar
    this.jogoAtual.player1 = this.jogoAtual.player2;
    this.jogoAtual.player2 = aux;

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
    //Mantem o placar
    placar = this.jogoAtual.p1;
    this.jogoAtual.p1 = this.jogoAtual.p2;
    this.jogoAtual.p2 = placar;
    //Troca o nome de quem vai começar
    aux = this.jogoAtual.nome1;
    this.jogoAtual.nome1 = this.jogoAtual.nome2;
    this.jogoAtual.nome2 = aux

    this.firebase.update(this.jogoAtual.jogoID, this.jogoAtual).then(resp => {
      this.snackBar.open(`Jogo recriado 😾`, 'Fechar', {
        duration: 1000,
      });
    }).catch(error => {
      //console.log(error);
    });
  }

  jogar(casa: string) {

    this.playAudioClique();

    //Verifica fim de jogo
    const ganhador = this.jogoAtual.suavez ? this.jogoAtual.nome1 : this.jogoAtual.nome2;
    if (ganhador !== this.jogoAtual.ultimoGanhado && this.jogoAtual.ultimoGanhado !== "") {
      //this.Derrota(ganhador);
      return;
    }

    if (this.jogoAtual[casa] !== "")
      return;

    if (this.jogoAtual.suavez && this.usuario.uid === this.jogoAtual.player1) {

      let record = {};
      record[casa] = 'X';
      record['suavez'] = false;
      this.firebase.update(this.jogoAtual.jogoID, record).then(resul => {
        this.verificaVitoria();
      });

    }

    if (!this.jogoAtual.suavez && this.usuario.uid === this.jogoAtual.player2) {

      let record = {};
      record[casa] = 'O';
      record['suavez'] = true;

      this.firebase.update(this.jogoAtual.jogoID, record).then(resul => {
        this.verificaVitoria();
      });
    }

  }

  playAudioVitoria() {
    let audio = new Audio();
    audio.src = "assets/vitoria.mp3";
    audio.load();
    audio.play();
  }
  playAudioDerrota() {
    let audio = new Audio();
    audio.src = "assets/derrota.mp3";
    audio.load();
    audio.play();
  }
  playAudioClique() {
    let audio = new Audio();
    audio.src = "assets/clique.mp3";
    audio.load();
    audio.play();
  }

  vitoria() {

    this.playAudioVitoria();
    const ganhador = this.jogoAtual.suavez ? this.jogoAtual.nome2 : this.jogoAtual.nome1;

    //Ajusta placar
    const incremente = firebase.firestore.FieldValue.increment(1)
    let record = {};
    if (!this.jogoAtual.suavez) {
      record['p1'] = incremente;
    } else {
      record['p2'] = incremente;
    }
    record['ultimoGanhado'] = ganhador;
    this.firebase.update(this.jogoAtual.jogoID, record).then(resul => {
      //this.verificaVitoria();
    });

    const dialogRef = this.dialog.open(ModalVitoriaComponent,
      {
        data: {
          titulo: 'Parabéns',
          descricao1: ganhador,
          descricao2: 'você ganhou a véia! 👵'
        }
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.reiniciar();
    });
  }

  Derrota(perdedor: string) {

    this.playAudioDerrota();

    const dialogRef = this.dialog.open(ModalVitoriaComponent,
      {
        data: {
          titulo: 'Uma pena',
          descricao1: perdedor,
          descricao2: 'você perdeu a véia! 👵'
        }
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.reiniciar();
    });
  }

  verificaVitoria() {
    if (this.iguais(this.jogoAtual.c1, this.jogoAtual.c2, this.jogoAtual.c3)) { this.vitoria(); }
    if (this.iguais(this.jogoAtual.c4, this.jogoAtual.c5, this.jogoAtual.c6)) { this.vitoria(); }
    if (this.iguais(this.jogoAtual.c7, this.jogoAtual.c8, this.jogoAtual.c9)) { this.vitoria(); }
    if (this.iguais(this.jogoAtual.c1, this.jogoAtual.c4, this.jogoAtual.c7)) { this.vitoria(); }
    if (this.iguais(this.jogoAtual.c2, this.jogoAtual.c5, this.jogoAtual.c8)) { this.vitoria(); }
    if (this.iguais(this.jogoAtual.c3, this.jogoAtual.c6, this.jogoAtual.c9)) { this.vitoria(); }
    if (this.iguais(this.jogoAtual.c1, this.jogoAtual.c5, this.jogoAtual.c9)) { this.vitoria(); }
    if (this.iguais(this.jogoAtual.c3, this.jogoAtual.c5, this.jogoAtual.c7)) { this.vitoria(); }

  }

  iguais(c1, c2, c3): boolean {

    if (c1 != "" && c2 != "" && c3 != "") {
      if (c1 === c2 && c2 === c3) {
        return true;
      }
    }
    return false;
  }

  buscar_unitario2(jogoID: string) {
    this.firebase.buscarUnico(jogoID).subscribe(data => {
      this.jogoAtual = data;
      this.identificarUsuario();
    });
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
