import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseAuth } from '@firebase/auth-types';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HomePage } from '../home/home';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { infoUsuarioLogado } from '../../appInfo/global';



/**
 * Generated class for the CadastroDadosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cadastro-dados',
  templateUrl: 'cadastro-dados.html',
})
export class CadastroDadosPage {

  form: FormGroup;
  
  nome: string;
  sobrenome: string;
  email: string;
  pass: string;


  constructor(private formBuilder: FormBuilder, private firebaseAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams, private toast: ToastController, private provider: UsuarioProvider) {

    this.createForm();
  }

  createForm(){
    this.form = this.formBuilder.group({
      nome: [this.nome, Validators.required],
      sobrenome: [this.sobrenome, Validators.required],
      email: [this.email, Validators.required],
      pass: [this.pass, Validators.required]
    });
  }

  onSubmit(){
    if (this.form.valid){
      console.log('registrando usuario com: ', this.form.value['email'], this.form.value['pass']);
      this.firebaseAuth.auth.createUserWithEmailAndPassword(this.form.value['email'], this.form.value['pass'])
      .then(data => {
        console.log(data);
        this.provider.saveUser(this.form.value, data["user"].uid);
        this.toast.create({ message: 'Registrado com sucesso!', duration: 3000 }).present();

        //DEPOIS DE CADASTRAR LOGA AUTOMATICAMENTE
        this.firebaseAuth.auth.signInWithEmailAndPassword(this.form.value['email'], this.form.value['pass'])
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
        })
        .catch( error => {
          console.log(error);
        }); 
        ///////
        this.navCtrl.setRoot(HomePage);
      })
      .catch(error => {
        console.log(error);
      });
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroDadosPage');
  }

  cadastrar(user: string, pass: string){
    console.log('Tentativa de cadastro');
  }

}
