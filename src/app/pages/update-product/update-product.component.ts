import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductsApiService } from 'src/app/services/products-api.service';
import * as validator from 'validator';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  productId!: number
  
  productForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    price: ['', [Validators.required, Validators.min(1)]],
    picture: ['', [Validators.required]]

  })

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute, /* permite acessar os dados que são passados pela rota */
    private router: Router,
    private snack: MatSnackBar,
    private prodApiService: ProductsApiService
  ) { }

  ngOnInit(): void {
    this.productId = parseInt(this.route.snapshot.queryParamMap.get('id') || '') 

    let name = this.route.snapshot.queryParamMap.get('name') /* o snapshot é apenas do "momento" não fica atualizando as informações */
    let price = this.route.snapshot.queryParamMap.get('price')
    let picture = this.route.snapshot.queryParamMap.get('picture')

    // this.route.queryParamMap.subscribe --> outra opção, ao invés do snapshot

    this.productForm.get('name')?.setValue(name)
    this.productForm.get('price')?.setValue(price)
    this.productForm.get('picture')?.setValue(picture)
    
  }

  saveProduct(): void {
    let picture = this.productForm.get('picture') as FormControl

    if(validator.default.isURL(picture.value)) { /* Está validando a URL, vendo se é um link, de fato */
      const product: Product = this.productForm.value
      product.id = this.productId

      this.prodApiService.updateProduct(product).subscribe(
        () =>{ /* função de sucesso */
          /* this.router.navigateByUrl('/home') */ /* para direcionar à pasta home */
          
          this.router.navigateByUrl(`/product/${this.productForm.get('name')?.value}`) /* para direcionar ao produto criado */
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
