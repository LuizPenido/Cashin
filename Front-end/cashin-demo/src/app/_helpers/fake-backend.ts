import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, materialize, dematerialize } from 'rxjs/operators';
import { Product } from '../_interfaces/product';

// array in local storage for registered users
const usersKey = 'cashin-users';
const productsKey = 'cashin-products';
const productsListKey = 'cashin-products-list';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;

        return handleRoute();

        function handleRoute() {
            switch (true) {
                case url.endsWith('/login') && method === 'POST':
                    return authenticate();
                case url.endsWith('/produtos') && method === 'POST':
                    return register();
                case url.match(/\/produtos\/\d+$/) && method === 'GET':
                    return getProductById();
                case url.match(/\/produtos\/\d+$/) && method === 'DELETE':
                    return removeProduct();
                case url.match('/produtos') && method === 'GET':
                    return getAllProductsList();
                case url.match('/produtos') && method === 'PUT':
                    return getTotalCost();
                case url.match('/nivel-de-acesso-usuario') && method === 'GET':
                    return getAcessoUsuario();
                default:
                    //pass through any requests not handled above
                    return next.handle(request);
            }    

            
        }

        // route functions

        function authenticate() {
            console.log("Metodo autenticacao chamado")

            let users = JSON.parse(localStorage.getItem(usersKey) || JSON.stringify([]));
            
            const { username, password } = body;
            const user = users.find((x: { username: any; password: any; }) => x.username === username && x.password === password);
            console.log("Usuario e senha procurados")
            if (!user) {
                console.log("Usuario e senha não encontrados")
                return error('Usuário e/ou senha incorretos');
            }
            console.log("Usuario e senha encontrados")
            return ok({
                token: 'fake-jwt-token'
            })
        }

        function register() {
            console.log('Metodo cadastrar chamado');

            let {id, nome, preco, quantidade} = body;

            console.log("-ID do produto " + id);
            console.log("-Nome do produto " + nome);
            console.log("-Preço " + preco);
            console.log("-Qunatidade " + quantidade);

            let products = JSON.parse(localStorage.getItem(productsKey) || JSON.stringify([]));
            products.push(body);
            localStorage.setItem('cashin-products', JSON.stringify(products));

            //addNewRecentProduct(body)

            return ok(body);
        }

        function getProductById() {

            let products = JSON.parse(localStorage.getItem(productsKey) || JSON.stringify([])); 

            const product = products.find((x: Product) => x.id === idFromUrl());

            if (!product){return error("Produto não encontrado");}

            //if (product) {
            //    addNewRecentProduct(product);
            //}
                
            return ok_product(basicDetails(product));
        }

        function getAllProductsList()
        {
            console.log("getAllProducts called")
            let products_list = JSON.parse(localStorage.getItem(productsKey) || JSON.stringify([]));
            return of(new HttpResponse({ status: 200, body: products_list }))
            .pipe(delay(500));
        }

        function removeProduct()
        {
            console.log("Remove product called")
            let products = JSON.parse(localStorage.getItem(productsKey) || JSON.stringify([])); 
            
            const product = products.find((x: Product) => x.id === idFromUrl());

            let id = idFromUrl()

            products.forEach((element: Product, index: number)=>{
                if(element.id == id) {
                    products.splice(index,1)
                } 
             });

             if (product) {
                localStorage.setItem('cashin-products', JSON.stringify(products));
                return ok_product(basicDetails(product));
             }

             return error("Produto não encontrado");
        }

        function getTotalCost() {
            let item_list = body;
            let products = JSON.parse(localStorage.getItem(productsKey) || JSON.stringify([]));

            var total_cost = 0

            console.log(item_list)

            item_list.forEach((element: any) => {
                let id = element.id
                let quantity = element.quantidade
                const product = products.find((x: any) => x.id === id);
                total_cost += product.preco * quantity
            })

            console.log(total_cost)

            return ok({valorTotal: total_cost});
        }

        function getAcessoUsuario() {
            return ok({nivelPermissao: 'admin'});
        }

        // helper functions

        function ok(body?: { token?: string, list?: Product[], valorTotal?: number, nivelPermissao?: string}) {
            return of(new HttpResponse({ status: 200, body }))
                .pipe(delay(500)); // delay observable to simulate server api call
        }

        function ok_product(body?: any) {
            return of(new HttpResponse({ status: 200, body }))
                .pipe(delay(500)); // delay observable to simulate server api call
        }

        function error(message: string) {
            return throwError({ error: { message } })
                .pipe(materialize(), delay(500), dematerialize()); // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648);
        }


        function basicDetails(product: any) {
            const { id, nome, preco, quantidade } = product;
            return { id, nome:nome, preco:preco, quantidade: quantidade };
        }

        function isLoggedIn() {
            return headers.get('Authorization') === 'Bearer fake-jwt-token';
        }

        function idFromUrl() {
            const urlParts = url.split('/');
            return parseInt(urlParts[urlParts.length - 1]);
        }

        function addNewRecentProduct(product: Product) {

            console.log("addnewProduct called")

            let product_list = JSON.parse(sessionStorage.getItem(productsListKey) || JSON.stringify([]));

            console.log("Product List: ", product_list)
            product_list.unshift(product);

            if (product_list.length > 3) {product_list.pop()}
            
            sessionStorage.setItem(productsListKey, JSON.stringify(product_list));
        }
    }
}

export const fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};