import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AngularFireAuth } from 'angularfire2/auth';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { infoUsuarioLogado } from '../../appInfo/global';
import { PagamentoPage } from '../pagamento/pagamento';

/**
 * Generated class for the CartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  usuarioLogado: boolean;

  produtos: any;
  produtoArray: any[] = [];

  arrayPrecoNovo: any[] = [];
  arrayQuantidade: any[] = [];
  arrayPrecoTotal: any[] = [];
  arrayPrecoTotalString: any[] = [];

  decimal: any;
  inteiro: any;


  precoTotal: number;
  precoTotalString: any;
  
  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    private firebaseAuth: AngularFireAuth, private usuarioProvider: UsuarioProvider,
    private alertCtrl: AlertController, private toast: ToastController) {
      
  }

  changePage(){
    this.navCtrl.push(LoginPage);
  }

  comprar(){
    console.log(infoUsuarioLogado.carrinho);
    this.usuarioProvider.saveTransacao();
    this.navCtrl.push(PagamentoPage);
  }

  ionViewDidEnter() {
    
      
    
    console.log('Carregou Pagina do carrinho');
    if (this.firebaseAuth.auth.currentUser == null){
      this.usuarioLogado = false;
    }else{
      this.usuarioLogado = true;
    }
    var subscription = this.usuarioProvider.carrinhoGetAll().subscribe(arr => {
      this.produtoArray = arr;
      infoUsuarioLogado.carrinho = arr;
    });
    setTimeout(function() {
      subscription.unsubscribe();
    }, 1000);
    
    this.normalizePreco();
    this.calcularPrecoTotal();
  }

  normalizePreco(){
    let string = new String();
    for (var i = 0; i < this.produtoArray.length; i++){
      string = this.produtoArray[i].precoNovo;
      this.inteiro = string.substr(0, string.length-3);
      this.inteiro = parseInt(this.inteiro);
      this.decimal = string.substr(string.length-2, string.length);
      this.decimal = parseFloat(this.decimal);

      this.arrayPrecoNovo[i] = this.inteiro + this.decimal/100;
      
      string = this.produtoArray[i].qnt;
      this.arrayQuantidade[i] = parseInt(string.toString());

    }
    console.log(this.arrayPrecoNovo);


  }

  calcularPrecoTotal(){
    this.precoTotal = 0;
    for (var i = 0; i < this.produtoArray.length; i++){
      this.arrayPrecoTotal[i] = this.arrayPrecoNovo[i] * this.arrayQuantidade[i];
      this.precoTotal += this.arrayPrecoTotal[i];

      let string = new String(this.arrayPrecoTotal[i]);
      this.arrayPrecoTotalString[i] = string.replace(".", ",");

      

    }

    let string = new String(this.precoTotal);
    this.precoTotalString = string.replace(".", ",");
    console.log(this.precoTotal);
  }

  alertaApagarCarrinho(){
    let alert = this.alertCtrl.create({
      title: 'Limpar Carrinho?',
      message: 'Todos os itens no seu carrinho serão EXCLUÍDOS! Deseja prosseguir?',
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
            console.log('adicionou');
            this.usuarioProvider.removeCarrinho();
          }
        }
      ]
    });
    alert.present();
  }

  removerProduto(index: any){
    this.usuarioProvider.removeProdutoDoCarrinho(this.produtoArray[index].key);
    this.toast.create({ message: 'Produto removido!', duration: 1000 }).present();
  }

}
