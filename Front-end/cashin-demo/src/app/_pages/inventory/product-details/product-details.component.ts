import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InventoryService } from 'src/app/_services/inventory.service';
import { first } from 'rxjs/operators';

import { Product } from 'src/app/_interfaces/product';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  submitted = false;

  valid_product: boolean = false;
  current_product: any;

  constructor(
      private formBuilder: FormBuilder,
      private inventoryService: InventoryService,
  ) { }

  ngOnInit() {
      this.form = this.formBuilder.group({
          id: ['', Validators.required]
      });
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.form.invalid) {
          return;
      }

      let id = this.f['id'].value

      console.log("Tentando buscar produto de ID" + id)

      this.loading = true;
      this.inventoryService.getByID(id)
        .pipe(first())
        .subscribe(response => {
            this.valid_product = true;
            this.setCurrentProduct(response);
            //this.inventoryService.updateProducts()
          }
      );
  }

  setCurrentProduct(product:any) {
    let {id, nome, preco, quantidade} = product

    console.log(nome)
    console.log(preco)

    let price_number = Math.round(preco * 100) / 100
    let price_string = price_number.toFixed(2).replace('.',',')

    this.current_product = {id: id, name: nome, price: price_string, quantity: quantidade}
  }
}
