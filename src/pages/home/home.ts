import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { ProdutoProvider } from '../../providers/produto/produto';
import { storage } from 'firebase';
import firebase from 'firebase';
import { ProdutoInfoPage } from '../produto-info/produto-info';
import { AngularFireAuth } from 'angularfire2/auth';
import { infoUsuarioLogado, controleLoop, controlador } from '../../appInfo/global';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { OfertasPage } from '../ofertas/ofertas';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})



export class HomePage {

  produtos: Observable<any>;
  arrayDeProdutos: any;

  urlImg: any;

  productArray: ProductData[] = [];
  imgPaths: String[] = [];
  starsRef: any;
  storageRef:any;

  items: Array<string>;

  constructor(public navCtrl: NavController, private provider: ProdutoProvider, private firebaseAuth: AngularFireAuth, private usuarioProvider: UsuarioProvider) {
    
    

    this.produtos = this.provider.getAll();

    this.produtos.subscribe(productArray => {
      this.productArray = productArray;
      console.log("pros");
    });

    this.storageRef = firebase.storage().ref();
    
    /*starsRef.getDownloadURL().then(url=>{
      console.log(i);
      this.imgPaths[i] = url;
      
    });*/
    setTimeout(function(){
      console.log("vai verificar: ", firebaseAuth.auth.currentUser);
    if (firebaseAuth.auth.currentUser != null){
      
      let uidAtual = firebaseAuth.auth.currentUser.uid;
            
      var subscription = usuarioProvider.getAll().subscribe(arr => {
        arr.forEach(element => {
          console.log(element["id"], uidAtual);
          if (element["id"] == uidAtual){
            infoUsuarioLogado.nome = element["nome"];
            infoUsuarioLogado.sobrenome = element["sobrenome"];
            infoUsuarioLogado.key = element["key"];
            infoUsuarioLogado.uid = element["id"];
            infoUsuarioLogado.listas = usuarioProvider.listasGetAll();
            infoUsuarioLogado.carrinho = usuarioProvider.carrinhoGetAll();
            console.log("setou: ", element["nome"], element["sobrenome"], element["key"], element["id"]);
          }
        });
      });
      setTimeout(function(){
        subscription.unsubscribe();
      }, 1000);
    }
    }, 1500);
    

    let i = 0;

    
    
    var subscription = this.produtos.subscribe(productArray => {
      console.log("LOG", productArray);
      controlador.arrayProdutosInicial = productArray;
      this.arrayDeProdutos = productArray;
      productArray.forEach(element => {
        console.log(element.imgPath);
        this.imgPaths[i] = element.imgPath;
        
        this.download(i);
        
        i++;
      });
    });
    setTimeout(function() {
      subscription.unsubscribe();
    }, 2000);
    //console.log(this.imgPaths);
    

  }

  ngOnInit() {
    this.setItems();
  }

  abrirPaginaOfertas(){
    this.navCtrl.push(OfertasPage);
  }

  setItems() {
    this.items = ['Orange', 'Banana', 'Pear', 'Tomato', 'Grape', 'Apple', 'Cherries', 'Cranberries', 'Raspberries', 'Strawberries', 'Watermelon'];
  }

  resetArray(){
    this.provider.getAll().subscribe(arr => {
      controlador.arrayProdutosInicial = arr;
    });
    this.arrayDeProdutos = controlador.arrayProdutosInicial;
  }

  filtrar(ev: any){
    this.resetArray();

    console.log(ev.target.value);

    let index = 0;
    this.arrayDeProdutos.forEach(element => {
      //console.log(element.descricao);
      //console.log(element.descricao.search('Sonho'));
      if (element.descricao.search('Sonho') != -1){
     
      } else {
        this.arrayDeProdutos.splice(index, 1);
        console.log(element.descricao.search(ev.target.value));
      }
      console.log(this.arrayDeProdutos, controlador.arrayProdutosInicial);
      index++;
    });

  }


  download(i:number){
    this.starsRef = this.storageRef.child('produtos/' + this.imgPaths[i]);
    this.starsRef.getDownloadURL().then(url=>{
      this.imgPaths[i] = url;
    });
  }

  abrirProduto(index: number){
    
    this.produtos.subscribe(productArray => {
      this.productArray = productArray;
    });

    this.navCtrl.push(ProdutoInfoPage, {idx: index, produtos: this.productArray, imgPath: this.imgPaths});
  }

  teste(){
    console.log(this.firebaseAuth.auth.currentUser);
  }

  signout(){
    console.log(infoUsuarioLogado.listas);
  }

}

export class ProductData {
  precoAntigo: any;
  precoNovo: any;
  descricao: any;
  imgPath: any;
}