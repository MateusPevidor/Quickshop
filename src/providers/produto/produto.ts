import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';


@Injectable()
export class ProdutoProvider {

  private PATH = 'produtos/';

  constructor(private db: AngularFireDatabase) {  }

  getAll(){
    return this.db.list(this.PATH)
      .snapshotChanges()
      .map(changes => {
        return changes.map(produto => ({ key: produto.payload.key, ...produto.payload.val() }));
      })
  }

  get(key: string){
    return this.db.object(this.PATH + key)
      .snapshotChanges()
      .map(produto => {
        return { key: produto.key, ...produto.payload.val() };
      })
  }

  save(produto: any){
    return new Promise((resolve, reject) => {
      if (produto.key) {
        this.db.list(this.PATH)
          .update(produto.key, { precoAntigo: produto.precoAntigo})
          .then(() => resolve())
          .catch((e) => reject(e));
      } else {
        this.db.list(this.PATH)
          .push({ precoAntigo: produto.precoAntigo, precoNovo: produto.precoNovo, descricao: produto.descricao, imgPath: produto.imgPath })
          .then(() => resolve());
      }
    })
  }

  remove(key: string){
    return this.db.list(this.PATH).remove(key);
  }


}
