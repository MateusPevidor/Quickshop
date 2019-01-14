import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { infoUsuarioLogado } from '../../appInfo/global';
import { AngularFireAuth } from 'angularfire2/auth';
import { ProdutoProvider } from '../../providers/produto/produto';
import { ViewChild } from '@angular/core';
import { Content } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-novalista',
  templateUrl: 'novalista.html',
})
export class NovalistaPage {
  @ViewChild(Content) content: Content;

  formNovaLista: FormGroup;
  nome: any;
  title: string;
  listaAtual: any;

  arrayQnts: number[] = [];
  arrayDescs: string[] = [];
  arrayPrecos: any[] = [];
  arrayPrecosString: any[] = [];
  total: any;
  decimal: any;
  inteiro: any;

  arrayProdutos: any[] = [];

  keys: any;

  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    private formBuilder: FormBuilder, private toast: ToastController,
    private provider: UsuarioProvider, public firebaseAuth: AngularFireAuth,
    private produtoProvider: ProdutoProvider) {

      if (navParams.get('list') != null){
        this.listaAtual = navParams.get('list');
        this.nome = this.listaAtual.nomeLista.nome;

        console.log(this.listaAtual["produtos"]);

        if (this.listaAtual["produtos"] != null){
          this.keys = Object.keys(this.listaAtual["produtos"]);

          for (var i = 0; i < this.keys.length; i++){
            this.arrayQnts[i] = this.listaAtual["produtos"][this.keys[i]].qnt;
            this.arrayDescs[i] = this.listaAtual["produtos"][this.keys[i]].descricao;
            this.arrayPrecos[i] = this.listaAtual["produtos"][this.keys[i]].precoNovo;
            
            let string = new String(this.arrayPrecos[i]);
            this.decimal = string.substr(string.length-2, 2);
            
            this.decimal = parseInt(this.decimal);
            
            
            this.inteiro = string.substr(0, string.length-3);
            this.inteiro = parseInt(this.inteiro);
            console.log(this.inteiro);
            
            this.total = this.inteiro + this.decimal/100;

            this.arrayPrecos[i] = this.total;
            this.arrayPrecos[i] *= this.arrayQnts[i];

            this.arrayPrecosString[i] = String(this.arrayPrecos[i]);
            string = this.arrayPrecosString[i];
            string = string.replace(".", ",");
            string = "R$" + string;
            this.arrayPrecosString[i] = string;

            console.log(this.arrayPrecosString[i]);
          }
        }
      }
      this.setupPageTitle();
      this.createForm();
      
  }

  setupPageTitle(){
    this.title = this.navParams.get('titulo');
    console.log(this.listaAtual);
  }

  createForm(){
    this.formNovaLista = this.formBuilder.group({
      nome: [this.nome]
    });
  }

  salvarLista(){
    if (this.formNovaLista.valid){
      if (this.listaAtual == null){
        this.provider.saveNovaLista(this.formNovaLista.value);
        console.log("salvou", this.formNovaLista.value);
        this.navCtrl.pop();
        console.log("popo");
      } else {
        this.listaAtual.nomeLista.nome = this.formNovaLista.value["nome"];
        this.provider.atualizarLista(this.listaAtual);
        this.navCtrl.pop();
        
        console.log("atualizou");
      }
    }
  }

  removerProduto(produtoIndex: number){
    this.provider.removeProduto(this.listaAtual.key, this.keys[produtoIndex]);
    this.toast.create({message: 'Produto removido!', duration: 1000}).present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NovalistaPage');
  }

}
