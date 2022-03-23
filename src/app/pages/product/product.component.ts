import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(
    private route: ActivatedRoute, /* Para usar com Rotas com ParÂmetros   */
    private prodAPiService: ProductsApiService
  ) { }

  ngOnInit(): void {

    this.productName = this.route.snapshot.paramMap.get('name') || ''
    
       
    this.prodAPiService.findByProductName(this.productName) 
    .subscribe(
      (prod) => {
        this.prod = prod
      }
    )

    /* this.prodApiService.findAll().subscribe(
      (prods) => {
        console.log(prods)
      }
    ) */

  }
    
}
