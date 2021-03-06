import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductsApiService } from 'src/app/services/products-api.service';
import * as validator from 'validator'

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {

  productForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    price: ['', [Validators.required, Validators.min(1)]],
    picture: ['', [Validators.required]]

  })

  constructor(
    private fb: FormBuilder,
    private snack: MatSnackBar,
    private prodApiService: ProductsApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  saveProduct(): void {
    let picture = this.productForm.get('picture') as FormControl

    if(validator.default.isURL(picture.value)) { /* Está validando a URL, vendo se é um link, de fato */
      const product: Product = this.productForm.value

      this.prodApiService.createProduct(product).subscribe(
        () =>{ /* função de sucesso */
          /* this.router.navigateByUrl('/home') */ /* para direcionar à pasta home */

          let product = this.productForm.get('name')?.value /* Essas 3 linhas são para fazer o reset, não mostrando a mensagem que não foi alterado */
          this.productForm.reset()
          this.router.navigateByUrl(`/product/${product}`) /* para direcionar ao produto criado */
        },
        (erros) =>{ /* função de erro */
          this.snack.open('Houve um erro ao salvar o produto, Foi mal!!', 'OK')
        }

      )

    } else {
      this.snack.open('Informe uma URL válida!!', 'OK')
      picture.setErrors({incorrect: true}) /* Deixa o campo em vermelho, como se estivesse incorreto */
      
    }

  }

  canDeactivate(){

     if(this.productForm.dirty) {  /* dirty vê se o formulário está sujo, se tem algo nele */
        return confirm('Os dados não foram salvos. Deseja realmente sair ?')
      }

      return true
     }

}
