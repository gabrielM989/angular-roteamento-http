import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { NewProductComponent } from 'src/app/pages/new-product/new-product.component';

interface OnCanDeactivate {
  canDeactivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree 
}

@Injectable({
  providedIn: 'root'
})/* Quando tentar sair da rota, ele vai te impedir de alguma maneira */
export class FormVerificationGuard implements CanDeactivate<OnCanDeactivate> { 
  
  canDeactivate(
    component: NewProductComponent, /* o componente que você quer */
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
          
    return component.canDeactivate();
  }
  
}
