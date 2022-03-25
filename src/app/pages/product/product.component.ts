import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductsApiService } from 'src/app/services/products-api.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  productName: string =''
  prod!: Product
  prodSub$: Subject<Product> =  new Subject<Product>()

  //?nome=valor&nome=valor

  constructor(
    private route: ActivatedRoute, /* Para usar com Rotas com ParÂmetros   */
    private prodAPiService: ProductsApiService,
    private snack: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {

    // this.productName = this.route.snapshot.paramMap.get('name') || '' /* snapshot recupera apenas o momento e não as rotas filhas */
    
    this.route.paramMap.subscribe( /* Essa é a maneira de observar em tempo real a alteração dos valores */
      (paramMap) =>{ /* função de sucesso */
        this.productName = paramMap.get('name') || ' '

        this.prodAPiService.findByProductName(this.productName).subscribe(
          (product) =>{
            this.prod = product
          }
        )
    
      }
    )
       
       /* this.prodApiService.findAll().subscribe(
      (prods) => {
        console.log(prods)
      }
    ) */

  }

  delete(id: number): void{
    this.prodAPiService.deleteProduct(id).subscribe(
      () =>{ /* Função de sucesso */
        this.snack.open('Produto excluído!!', 'OK')
        this.router.navigateByUrl('/home') /* Seremos navegados para a página inicial */
      }
    )
  }

  edit(): void{
    this.router.navigateByUrl(`/update?id=${this.prod.id}&name=${this.prod.name}&price=${this.prod.price}&picture=${this.prod.picture}`)
  }
    
}
