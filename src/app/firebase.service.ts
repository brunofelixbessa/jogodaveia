import { Jogo } from './model.jogo';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private colecao = '/jogos';
  private jogosFB$: Observable<Jogo[]>;
  private jogoFB$: Observable<Jogo>;

  //Iniciar o templeate no firebase com esa classe
  jogosRef: AngularFirestoreCollection<Jogo> = null;

  constructor(private firestore: AngularFirestore) {
    //Cria uma instancia da coleção
    this.jogosRef = firestore.collection(this.colecao);
  }

  criar_id(data: Jogo, id: string) {
    return this.jogosRef.doc(id).set({ ...data });
  }

  criar(data: Jogo): any {
    return this.jogosRef.add({ ...data });
  }

  update(id: string, data: any): Promise<void> {
    return this.jogosRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.jogosRef.doc(id).delete();
  }

  busca_todos1(): AngularFirestoreCollection<Jogo> {
    return this.jogosRef;
  }
  busca_todos2() {
    return this.firestore.collection('jogos').snapshotChanges();
  }

  busca_todos3() {
    this.jogosFB$ = this.firestore.collection<Jogo>("jogos").snapshotChanges().pipe(
      map(result => {
        return result.map(x => {
          const produto = x.payload.doc;
          const id = produto.id;
          return { id, ...produto.data() } as Jogo;
        });
      })
    );
    return this.jogosFB$;
  }

  buscarUnicoObs(id: string): Observable<Jogo> {
    this.jogoFB$ = this.firestore.collection<Jogo>(this.colecao).doc(id).valueChanges();
    return this.jogoFB$;
  }

  buscarUnico(id: string): any {
    return this.firestore.collection<Jogo>(this.colecao).doc(id).valueChanges();
  }

  // atualizar_jogo(recordID, record) {
  //   this.firestore.doc('jogos/' + recordID).update(record);
  // }
  // excluir_jogo(record_id) {
  //   this.firestore.doc('jogos/' + record_id).delete();
  // }

}
