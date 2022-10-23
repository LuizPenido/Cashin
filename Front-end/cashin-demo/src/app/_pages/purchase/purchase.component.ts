import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { InventoryService } from 'src/app/_services/inventory.service';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  submitted = false;

  product_list: any;
  parent_item_list: any;
  total_cost: any;
  message: any;
  
  constructor(
      private formBuilder: FormBuilder,
      private inventoryService: InventoryService
  ) { }

  ngOnInit() {
      this.form = this.formBuilder.group({
          id: ['', Validators.required],
          quantity: ['', Validators.required],
      });

      this.product_list = [];
      this.parent_item_list = [];
      this.total_cost = -1;
      this.message = '';
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.form.invalid) {
          return;
      }

      let id = this.f['id'].value;
      let requested_quantity = this.f['quantity'].value

      this.loading = true;
      this.inventoryService.getByID(id)
      .pipe(first())
      .subscribe(response => {
          this.addNewItem(response, requested_quantity);
          //this.inventoryService.updateProducts(response)
        }
    );
  }

  addNewItem(product: any, requested_quantity: number): void {
    console.log('Add new item')

    this.message = '';
    
    let {id, nome, preco, quantidade} = product;
    let total_price_number = requested_quantity * preco;
    
    total_price_number = Math.round(total_price_number * 100) / 100

    let total_price_string = total_price_number.toFixed(2).replace('.',',')

    this.parent_item_list.push({name: nome, total_price: total_price_string, requested_quantity: requested_quantity})
    this.product_list.push({id: id, quantidade: requested_quantity})

    console.log(this.product_list)

  }

  endPurcharse() {
    console.log('End Purchase called')
    this.inventoryService.getTotal(this.product_list)
    .pipe(first())
    .subscribe(response => {
        let getCost = (response: any) => {
          let total_cost_number = response.valorTotal;
          return (total_cost_number.toFixed(2)).replace('.',',');
        }
        this.total_cost = getCost(response);
        if (this.total_cost == '-1,00') {
          this.message = 'Compra inválida!';
        }
        else {
          this.message = 'Valor total: R$ ' + this.total_cost;
        }
        console.log(this.message)
      }
  );
  }
}
