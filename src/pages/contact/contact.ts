import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  usuarioLogado: boolean;
  
  constructor(public navCtrl: NavController, private firebaseAuth: AngularFireAuth) {

  }

  changePage(){
    this.navCtrl.push(LoginPage);
  }

  ionViewDidEnter() {
    console.log('Carregou Pagina da encomenda');
    if (this.firebaseAuth.auth.currentUser == null){
      this.usuarioLogado = false;
    }else{
      this.usuarioLogado = true;
    }
  }
}
