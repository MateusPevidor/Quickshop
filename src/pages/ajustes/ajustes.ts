import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, Platform } from 'ionic-angular';
import { SobrePage } from '../sobre/sobre';
import { FornecedorPage } from '../fornecedor/fornecedor';

/**
 * Generated class for the AjustesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ajustes',
  templateUrl: 'ajustes.html',
})
export class AjustesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public actionSheetCtrl: ActionSheetController, public platform: Platform) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AjustesPage');
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Você quer apagar o histórico?',
      buttons: [
        {
          text: 'Deletar',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'trash' : null,
          handler: () => {
            console.log('Delete clicked');
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          icon: !this.platform.is('ios') ? 'close' : null,
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  entrarSobre(){
    this.navCtrl.push(SobrePage);
  }

  entrarFornecedor(){
    this.navCtrl.push(FornecedorPage);
  }

}
