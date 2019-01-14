import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AngularFireAuth } from 'angularfire2/auth';
import { NovalistaPage } from '../novalista/novalista';
import { infoUsuarioLogado } from '../../appInfo/global';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  usuarioLogado: boolean;
  listas: any;

  keys: any;

  listaComprada: any;

  constructor(
    public navCtrl: NavController, private firebaseAuth: AngularFireAuth,
    private listaProvider: UsuarioProvider, private alertCtrl: AlertController,
    private toast: ToastController) {
  }

  changePage(){
    this.navCtrl.push(LoginPage);
  }

  novaLista(){
    this.navCtrl.push(NovalistaPage, {titulo: "Nova Lista"});
  }

  teste(){
    /*var subscription = this.listaProvider.listasGetAll().subscribe(arr => {
      infoUsuarioLogado.listas = arr;
    });
    setTimeout(function(){
      subscription.unsubscribe();
    }, 1000);*/
    infoUsuarioLogado.listas = this.listas;
  }

  removerLista(key: string, listname: string){
    console.log(key, listname);
    this.presentConfirm(key, listname);
  }

  editarLista(lista: any){
    console.log("enviando", lista);
    this.navCtrl.push(NovalistaPage, {titulo: "Editar Lista", list: lista});
  }

  comprarLista(lista: any){
    console.log(lista);

    this.keys = Object.keys(lista["produtos"]);

    for (var i = 0; i < this.keys.length; i++){

      let objeto = {
        key: lista["produtos"][this.keys[i]].keyProduto,
        descricao: lista["produtos"][this.keys[i]].descricao,
        imgPath: lista["produtos"][this.keys[i]].imgPath,
        precoAntigo: lista["produtos"][this.keys[i]].precoAntigo,
        precoNovo: lista["produtos"][this.keys[i]].precoNovo};

      console.log(objeto);

      this.listaProvider.saveProdutoCarrinho(
        objeto,
        lista["produtos"][this.keys[i]].qnt);
        console.log(lista["produtos"][this.keys[i]].qnt);
    }

    this.toast.create({ message: "Produtos adicionados ao carrinho!", duration: 1500 }).present();

  }

  confirmarCompraLista(lista: any) {
    let alert = this.alertCtrl.create({
      title: 'Comprar ' + lista["nomeLista"].nome + '?',
      message: 'Ao comprar esta lista, todos os itens contidos nela serão adicionados ao seu Carrinho de Compras. Deseja prosseguir?',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
          handler: () => {
            console.log('Cancelou');
          }
        },
        {
          text: 'Sim',
          handler: () => {
            this.comprarLista(lista);
          }
        }
      ]
    });
    alert.present();
  }

  presentConfirm(chave: string, lista: string) {
    let alert = this.alertCtrl.create({
      title: 'Deletar lista?',
      message: 'Você deseja deletar a lista "' + lista + '"?',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
          handler: () => {
            console.log('Cancelou');
          }
        },
        {
          text: 'Sim',
          handler: () => {
            console.log('Removeu');
            this.listaProvider.removeList(chave);
          }
        }
      ]
    });
    alert.present();
  }

  ionViewDidEnter() {
    console.log('Carregou Pagina da lista');
    if (this.firebaseAuth.auth.currentUser == null){
      this.usuarioLogado = false;
    }else{
      this.usuarioLogado = true;
    }
    this.listas = this.listaProvider.listasGetAll();
    this.teste();
  }

  ionViewDidLeave(){
    this.teste();
  }

}
