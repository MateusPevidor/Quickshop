import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IonicPage, NavController, NavParams, Alert } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { infoUsuarioLogado } from '../../appInfo/global';
import { UsuarioProvider } from '../../providers/usuario/usuario';

/**
 * Generated class for the ProdutoInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-produto-info',
  templateUrl: 'produto-info.html',
})
export class ProdutoInfoPage {

  public produtos: ProductData[] = [];
  public index: number;
  public imgPaths: String[] = [];
  public imagens: String[] = [];

  public produto: ProductData[] = [];

  public quantidade: number;

  testCheckboxOpen: false;
  testCheckboxResult: any;

  listas: any;


  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    private alertCtrl: AlertController, private usuarioProvider: UsuarioProvider) {
  }

  ionViewDidLoad() {
    
    this.produtos = this.navParams.get('produtos');
    this.index = this.navParams.get('idx');
    this.imgPaths = this.navParams.get('imgPath');
    this.quantidade = 0;
    console.log(this.produtos[this.index].precoAntigo);

    this.produto[0] = this.produtos[this.index];
    this.imagens[0] = this.imgPaths[this.index];
    console.log(this.imagens[this.index]);
  }

  increment(){
    this.quantidade++;
  }
  decrement(){
    if (this.quantidade > 0)
      this.quantidade--;
  }

  adicionarAoCarrinho(){
    this.usuarioProvider.saveProdutoCarrinho(this.produtos[this.index], this.quantidade);
  }

  alertaAdicionarAoCarrinho() {
    let alert = this.alertCtrl.create({
      title: 'Adicionar ao Carrinho?',
      message: 'Tem certeza de que deseja adicionar ' + this.quantidade + 'x "' + this.produtos[this.index].descricao + '" ao Carrinho de Compras?',
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
            this.adicionarAoCarrinho();
          }
        }
      ]
    });
    alert.present();
  }

  doCheckbox() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Adicionar produto nas seguintes listas:');
    var subscription = infoUsuarioLogado.listas.subscribe(arr => {
      arr.forEach(element => {
        alert.addInput({
          type: 'checkbox',
          label: element["nomeLista"].nome,
          value: element.key,
        });
      });
    });
    setTimeout(function(){
      subscription.unsubscribe();
    }, 1000);

    alert.addButton('Cancelar');
    alert.addButton({
      text: 'Salvar',
      handler: (data: any) => {
          console.log('Checkbox data:', data);
          this.testCheckboxOpen = false;
          this.testCheckboxResult = data;

          data.forEach(element => {
            this.usuarioProvider.saveProduto(element, this.produtos[this.index], this.quantidade);
          });
      }
    });
    setTimeout(function(){
      alert.present();
    }, 500);
    
  }

  ionViewDidEnter(){
    this.listas = infoUsuarioLogado.listas;
  }

}

export class ProductData {
  precoAntigo: any;
  precoNovo: any;
  descricao: any;
  imgPath: any;
}
