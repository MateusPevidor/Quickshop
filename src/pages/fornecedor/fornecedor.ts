import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ProdutoProvider } from '../../providers/produto/produto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-fornecedor',
  templateUrl: 'fornecedor.html',
})
export class FornecedorPage {
  title: string;
  form: FormGroup;
  produto: any;

  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    private formBuilder: FormBuilder, private provider: ProdutoProvider,
    private toast: ToastController) {

      this.produto = this.navParams.data.produto || {};
      this.createForm();

      this.setupPageTitle();
  }

  private setupPageTitle(){
    this.title = this.navParams.data.produto ? 'Modificando Produto' : 'Novo Produto';
  }


  createForm(){
    this.form = this.formBuilder.group({
      key: [this.produto.key],
      precoAntigo: [this.produto.precoAntigo, Validators.required],
      precoNovo: [this.produto.precoNovo, Validators.required],
      descricao: [this.produto.descricao, Validators.required],
      imgPath: [this.produto.imgPath, Validators.required]
    });
  }

  onSubmit(){
    if (this.form.valid){
      this.provider.save(this.form.value)
      .then(() => {
        this.toast.create({ message: 'Produto salvo com sucesso.', duration: 3000 }).present();
        this.navCtrl.pop();
      })
      .catch((e) => {
        this.toast.create({ message: 'Erro ao salvar produto.', duration: 3000 }).present();
        console.error(e);
      });
    }
  }



}
