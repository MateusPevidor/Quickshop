import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

/**
 * Generated class for the PagamentoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pagamento',
  templateUrl: 'pagamento.html',
})
export class PagamentoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private toast: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PagamentoPage');
  }

  send(){
    this.toast.create({ message: 'Pagamento concluído com sucesso!', duration: 3000 }).present();
  }

}
