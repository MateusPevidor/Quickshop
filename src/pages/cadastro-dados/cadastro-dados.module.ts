import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadastroDadosPage } from './cadastro-dados';

@NgModule({
  declarations: [
    CadastroDadosPage,
  ],
  imports: [
    IonicPageModule.forChild(CadastroDadosPage),
  ],
})
export class CadastroDadosPageModule {}
