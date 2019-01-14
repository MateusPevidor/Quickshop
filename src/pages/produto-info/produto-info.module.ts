import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProdutoInfoPage } from './produto-info';

@NgModule({
  declarations: [
    ProdutoInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(ProdutoInfoPage),
  ],
})
export class ProdutoInfoPageModule {}
