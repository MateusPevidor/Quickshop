import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AjustesPage } from '../ajustes/ajustes';
import { AngularFireAuth } from 'angularfire2/auth';
import { AlertController } from 'ionic-angular'

/**
 * Generated class for the AccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {

  usuarioLogado: boolean;

  constructor(public navCtrl: NavController, private firebaseAuth: AngularFireAuth, private alertCtrl: AlertController){
    
  }

  entrarAjustes(){
    this.navCtrl.push(AjustesPage);
  }

  entrarLogin(){
    this.navCtrl.push(LoginPage);
  }

  ionViewDidEnter() {
    console.log('Carregou Pagina de configuracao');
    if (this.firebaseAuth.auth.currentUser == null){
      this.usuarioLogado = false;
    }else{
      this.usuarioLogado = true;
    }
  }

  logout(){
    this.presentConfirm();
  }

  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: 'Deseja sair?',
      message: 'Tem certeza de que deseja sair?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancelou');
          }
        },
        {
          text: 'Sair',
          handler: () => {
            console.log('Logoff');
            this.firebaseAuth.auth.signOut();
          }
        }
      ]
    });
    alert.present();
  }

}
