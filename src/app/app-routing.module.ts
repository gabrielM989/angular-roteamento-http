import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, Routes } from '@angular/router'
import { HomeComponent } from './pages/home/home.component'
import { LoginComponent } from './pages/login/login.component'
import { ErrorComponent } from './pages/error/error.component'
import { ProductComponent } from './pages/product/product.component'

const routes: Routes = [
    {
        path: '', /* qual é o caminho que preciso percorrer, para acessar a minha rota, string vazia quer dizer que é a rota principal */
        pathMatch: 'full', /* Estamos dizendo que para entrar nessa rota, a string precisa ser totalmente vazia */
        component: HomeComponent /* Definindo em qual componente a rota irá atuar */
    },
    {
        path: 'login',
        pathMatch: 'full',
        component: LoginComponent
    },
    {
        path: 'product/:name', /* Criação rotas com parâmetros */
        component: ProductComponent

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