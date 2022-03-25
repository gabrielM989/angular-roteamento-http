import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChildAuthVerificationGuard implements CanActivateChild {

  constructor(
    private router: Router /* mesma lógica que o auth-verification, contudo, para os elementos filhos */
  ){}

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if (localStorage.getItem('token') !== null){
        return true
      }
    return this.router.createUrlTree(['/home'])
  }

  
  
}
