import { Component, NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, Routes } from '@angular/router'
import { HomeComponent } from './pages/home/home.component'
import { LoginComponent } from './pages/login/login.component'
import { ErrorComponent } from './pages/error/error.component'
import { ProductComponent } from './pages/product/product.component'
import { NewProductComponent } from './pages/new-product/new-product.component'
import { ProductsComponent } from './pages/products/products.component'
import { UpdateProductComponent } from './pages/update-product/update-product.component'
import { FormVerificationGuard } from './guards/guards/form-verification.guard'
import { AuthVerificationGuard } from './guards/auth-verification.guard'
import { ChildAuthVerificationGuard } from './guards/child-auth-verification.guard'

const routes: Routes = [
    {
        path: '', /* qual é o caminho que preciso percorrer, para acessar a minha rota, string vazia quer dizer que é a rota principal */
        pathMatch: 'full', /* Estamos dizendo que para entrar nessa rota, a string precisa ser totalmente vazia */
        redirectTo: '/home'
        
    },
    {
        path: 'home', /* Precisamos direcionar para a home, pq o path, na rota inicial está vazio */
        component: HomeComponent,
        children: [ /* As subrotas das rotas pais - elas possuem as mesmas propriedades das rotas pais */
            {
            path: ':name', /* declaramos a nossa rota filha */
            component: ProductComponent
            }
        ],
        canActivateChild: [ /* permite ou não entrar na rota filha de uma rota */
            ChildAuthVerificationGuard
        ]
    },
    {
        path: 'new', /* nova rota, para o new-product */
        component: NewProductComponent,
        canDeactivate: [ /* Para usar o guards!!! */
            FormVerificationGuard
        ],
        canActivate: [
            AuthVerificationGuard
        ]
    },
  
    {
        path: 'product/:name', /* Criação rotas com parâmetros */
        component: ProductComponent

    },
    {
        path: 'products',
        component: ProductsComponent

    },
    {
        path: 'update',
        component: UpdateProductComponent,
        canDeactivate: [ /* Para usar o guards!!! */
            FormVerificationGuard
        ],
        canActivate: [
            AuthVerificationGuard
        ]
    },

    {
        path: 'login',
        pathMatch: 'full',
        component: LoginComponent/* Definindo em qual componente a rota irá atuar */
    },
    {
        path: '**', /* É a rota coringa, caso o usuário tente acessar uma página que não exista */
        /* redirectTo: '/login', */
        component: ErrorComponent
    }

]

@NgModule({
    declarations: [

    ],
    imports: [
        CommonModule,
        RouterModule.forRoot(routes) /* vamos registrar as rotas, no roteamento */
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule{

}