import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PagamentoPage } from './pagamento';

@NgModule({
  declarations: [
    PagamentoPage,
  ],
  imports: [
    IonicPageModule.forChild(PagamentoPage),
  ],
})
export class PagamentoPageModule {}
