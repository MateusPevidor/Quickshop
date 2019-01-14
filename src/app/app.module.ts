import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CartPage } from '../pages/cart/cart';
import { AccountPage } from '../pages/account/account';
import { LoginPage } from '../pages/login/login';
import { CadastroPage } from '../pages/cadastro/cadastro';
import { CadastroDadosPage } from '../pages/cadastro-dados/cadastro-dados';
import { AjustesPage } from '../pages/ajustes/ajustes';
import { SobrePage } from '../pages/sobre/sobre';
import { ProdutoProvider } from '../providers/produto/produto';
import { FornecedorPage } from '../pages/fornecedor/fornecedor';
import { NovalistaPage } from '../pages/novalista/novalista';
import { OfertasPage } from '../pages/ofertas/ofertas';

import 'rxjs/add/operator/map';
import { ProdutoInfoPage } from '../pages/produto-info/produto-info';
import { UsuarioProvider } from '../providers/usuario/usuario';
import { PagamentoPage } from '../pages/pagamento/pagamento';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    CartPage,
    AccountPage,
    LoginPage,
    CadastroPage,
    CadastroDadosPage,
    AjustesPage,
    SobrePage,
    FornecedorPage,
    ProdutoInfoPage,
    NovalistaPage,
    PagamentoPage,
    OfertasPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyBwg2t-mTrvTBCcGQmSf64pYgRtFBRtkzU",
      authDomain: "tcc-2018-ea914.firebaseapp.com",
      databaseURL: "https://tcc-2018-ea914.firebaseio.com",
      projectId: "tcc-2018-ea914",
      storageBucket: "tcc-2018-ea914.appspot.com",
      messagingSenderId: "873159421075"
    }),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    CartPage,
    AccountPage,
    LoginPage,
    CadastroPage,
    CadastroDadosPage,
    AjustesPage,
    SobrePage,
    FornecedorPage,
    ProdutoInfoPage,
    NovalistaPage,
    PagamentoPage,
    OfertasPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ProdutoProvider,
    UsuarioProvider
  ]
})
export class AppModule {}
