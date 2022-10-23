import { Component, OnInit, Input } from '@angular/core';
import { Subscription, first } from 'rxjs';

import { Product } from 'src/app/_interfaces/product';
import { InventoryService } from 'src/app/_services/inventory.service';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.css']
})
export class ProductListingComponent implements OnInit {

  updateEventsubscription:Subscription;

  constructor(private inventoryService: InventoryService)
    {
      this.updateEventsubscription=this.inventoryService.getProductsUpdate()
      .subscribe({
        next: (response) => {
          if (response.update == 'add') this.updateAdd(response.product)
          if (response.update == 'remove') this.updateRemove(response.product)
        }
      })
  }

  product_list : any;

  ngOnInit(): void {
    console.log("Iniciando componente de listagem")
    this.inventoryService.getAllProducts()
          .pipe(first())
          .subscribe(response => {
            console.log('Resposta: ' + response)
            let product_list_number = response.reverse();

            let product_list_string =[]

            for (let product of product_list_number) {
              let price_number = product.preco;
              let price_string = (price_number.toFixed(2)).replace('.',',');
              product_list_string.push(
                {id: product.id, name: product.nome, price: price_string, quantity: product.quantidade}
                )
            }

            this.product_list = product_list_string;
          }
            );
  }

  updateAdd(product: any): void {

    let {id, nome, preco, quantidade} = product

    let price_number = Math.round(preco * 100) / 100;
    let price_string = (price_number.toFixed(2)).replace('.',',');

    let new_product = {id: id, name: nome, price: price_string, quantity: quantidade}

    this.product_list.unshift(new_product);
  }

  updateRemove(product: Product): void {
    let {id, name, price, quantity} = product

    this.product_list.forEach((element: Product, index: number)=>{
      if(element.id == id) {
          this.product_list.splice(index,1)
      } 
   });
  }
}
