export interface Product {
    id?: number /* id é gerado automaticamente, pelo banco de dados */ 
    /* Inserindo o ponto de interrogação, quer dizer que o ID não é obrigado a ser informado */
    name: string
    price: number
    picture: string
}