import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { infoUsuarioLogado } from '../../appInfo/global';
import { resolveDefinition } from '@angular/core/src/view/util';

@Injectable()
export class UsuarioProvider {

  private PATH = 'usuarios/';
  private PATH_LISTA = 'listas/';
  private PATH_CARRINHO = 'carrinho/';
  private PATH_TRANSACOES = 'transacoes/';

  constructor(private db: AngularFireDatabase) {  }

  getAll(){
    console.log("salvando usuario no provider1");
    return this.db.list(this.PATH)
      .snapshotChanges()
      .map(changes => {
        return changes.map(usuario => ({ key: usuario.payload.key, ...usuario.payload.val() }));
      })
  }

  get(key: string){
    return this.db.object(this.PATH + key)
      .snapshotChanges()
      .map(usuario => {
        return { key: usuario.key, ...usuario.payload.val() };
      })
  }

  saveUser(usuario: any, uid: string){
    return new Promise((resolve, reject) => {
      if (usuario.key) {
        this.db.list(this.PATH)
          .update(usuario.key, { nome: usuario.nome})
          .then(() => resolve())
          .catch((e) => reject(e));
      } else {
        this.db.list(this.PATH)
          .push({ nome: usuario.nome, sobrenome: usuario.sobrenome, id: uid })
          .then(() => resolve());
      }
    })
  }

  saveNovaLista(nomeLista: string){
    return new Promise((resolve1, reject) => {
      console.log("salvando lista no provider");
      this.db.list(this.PATH + infoUsuarioLogado.key + "/" + this.PATH_LISTA)
      .push({ nomeLista: nomeLista })
      .then(() => resolve1())
    })
  }

  saveProduto(chaveDaLista: string, produto: any, quantidade: number){
    return new Promise((resolve, reject) => {
      console.log(produto);
      this.db.list(
        this.PATH + infoUsuarioLogado.key + "/" + this.PATH_LISTA +
        chaveDaLista + "/produtos/")
        .push({ keyProduto: produto.key, descricao: produto.descricao, imgPath: produto.imgPath, precoAntigo: produto.precoAntigo, precoNovo: produto.precoNovo, qnt: quantidade })
        .then(() => resolve())
    })
  }

  saveProdutoCarrinho(produto: any, quantidade: number){
    return new Promise((resolve, reject) => {
      this.db.list(
        this.PATH + infoUsuarioLogado.key + "/" + this.PATH_CARRINHO + "/")
        .push({ keyProduto: produto.key, descricao: produto.descricao, imgPath: produto.imgPath, precoAntigo: produto.precoAntigo, precoNovo: produto.precoNovo, qnt: quantidade })
        .then(() => resolve())
    })
  }

  saveProdutoCarrinhoDaLista(produto: any, quantidade: any){
    return new Promise((resolve, reject) => {
      this.db.list(
        this.PATH + infoUsuarioLogado.key + "/" + this.PATH_CARRINHO + "/")
        .push({ keyProduto: produto.keyProduto, descricao: produto.descricao, imgPath: produto.imgPath, precoAntigo: produto.precoAntigo, precoNovo: produto.precoNovo, qnt: quantidade })
        .then(() => resolve())
    })
  }

  saveTransacao(){
    return new Promise((resolve, reject) => {
      this.db.list(
        this.PATH + infoUsuarioLogado.key + "/" + this.PATH_TRANSACOES + "/")
        .push({ produtos: infoUsuarioLogado.carrinho })
        .then(() => resolve())
    })
  }

  atualizarLista(lista: any){
    return new Promise((resolve, reject) => {
      this.db.list(this.PATH + infoUsuarioLogado.key + "/listas/" + lista.key)
        .update("/nomeLista/", { nome: lista.nomeLista.nome })
        .then(() => resolve())
        .catch((e) => reject(e));
    })
  }

  listasGetAll(){
    console.log("salvando usuario no provider2");
    return this.db.list(this.PATH + infoUsuarioLogado.key + "/listas/")
      .snapshotChanges()
      .map(changes => {
        return changes.map(usuario => ({ key: usuario.payload.key, ...usuario.payload.val() }));
      })
  }

  carrinhoGetAll(){
    console.log("pegando produtos do carrinho");
    return this.db.list(this.PATH + infoUsuarioLogado.key + "/carrinho/")
      .snapshotChanges()
      .map(changes => {
        return changes.map(usuario => ({ key: usuario.payload.key, ...usuario.payload.val() }));
      })
  }

  listasGetAllProdutos(){
    return this.db.list(this.PATH + infoUsuarioLogado.key + "/listas/")
      .snapshotChanges()
      .map(changes => {
        return changes.map(usuario => ({ key: usuario.payload.key, ...usuario.payload.val() }));
      })
  }

  remove(key: string){
    return this.db.list(this.PATH).remove(key);
  }

  removeList(key: string){
    return this.db.list(this.PATH + infoUsuarioLogado.key + "/listas/").remove(key);
  }

  removeProduto(keyLista: string, keyProduto: string){
    return this.db.list(this.PATH + infoUsuarioLogado.key + "/listas/" + keyLista + "/produtos/").remove(keyProduto);
  }

  removeCarrinho(){
    return this.db.list(this.PATH + infoUsuarioLogado.key + "/carrinho/").remove()
  }

  removeProdutoDoCarrinho(key: string){
    return this.db.list(this.PATH + infoUsuarioLogado.key + "/carrinho/").remove(key);
  }
}
