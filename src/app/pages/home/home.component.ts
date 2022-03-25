import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  productName: string = ''
  search$: Subject<string> = new Subject<string>()
  subscription!: Subscription

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
   this.subscription = this.search$.pipe(
      debounceTime(3000)
    ).subscribe(/* está se inscrevendo */
      (sucesso) => { /* função de sucesso */
        this.router.navigateByUrl(`/home/${sucesso}`)
      }
    )
  }
  search(): void{
    this.search$.next(this.productName)
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  findProduct(): void{
    this.router.navigateByUrl(`/product/${this.productName}`)
  }

}
