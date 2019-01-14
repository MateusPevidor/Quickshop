import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { CadastroPage } from '../cadastro/cadastro';
import { AngularFireAuth } from 'angularfire2/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { infoUsuarioLogado, controleLoop } from '../../appInfo/global';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  formLogin: FormGroup;

  login: string;
  pass: string;

  arrayDeUsuarios: any;

  constructor(private firebaseAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private toast: ToastController, private provider: UsuarioProvider) {
    this.createForm();
  }

  createForm(){
    this.formLogin = this.formBuilder.group({
      login: [this.login, Validators.required],
      pass: [this.pass, Validators.required]
    });
  }

  ionViewDidLoad() {
    
  }

  onSubmit(){
    if (this.formLogin.valid){
      this.firebaseAuth.auth.signInWithEmailAndPassword(this.formLogin.value['login'], this.formLogin.value['pass'])
      .then( data => {
        console.log('got some data', data);
        var subscription = this.provider.getAll().subscribe(arr => {
          console.log(arr);
          arr.forEach(element => {
            console.log("rodou foreach");
            if (element["id"] == data["user"].uid){
              infoUsuarioLogado.nome = element["nome"];
              infoUsuarioLogado.sobrenome = element["sobrenome"];
              infoUsuarioLogado.key = element["key"];
              infoUsuarioLogado.uid = element["id"];
              this.toast.create({ message: 'Logado com sucesso! Bem-vindo, ' + infoUsuarioLogado.nome, duration: 3000 }).present();
            }
          });
        });
        setTimeout(function(){
          subscription.unsubscribe();
        }, 1000);
        this.navCtrl.pop();
      })
      .catch( error => {
        console.log(error);
        if (error.code == "auth/user-not-found" || "auth/wrong-password"){
          this.toast.create({ message: 'E-mail ou senha incorretos!', duration: 2000 }).present();
        } else if (error.code == "auth/invalid-email"){
          this.toast.create({ message: 'O e-mail inserido é inválido.', duration: 2000 }).present();
        }
      }); 
    }
  }

  esqueciSenha(){
    let arrayDeUser;
    let usuarios = this.provider.getAll().subscribe(arr => {
      arrayDeUser = arr;
      console.log("exec");
      console.log(arrayDeUser);
    });
    console.log(arrayDeUser);
  }

  paginaDeCadastro(){
    this.navCtrl.push(CadastroPage);
  }

}
