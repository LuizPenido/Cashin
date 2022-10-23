import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { ProductListingComponent } from '../product-listing/product-listing.component';

import { InventoryService } from 'src/app/_services/inventory.service';

import { Product } from 'src/app/_interfaces/product';
import { identifierName } from '@angular/compiler';

@Component({
  selector: 'app-product-registration',
  templateUrl: './product-registration.component.html',
  styleUrls: ['./product-registration.component.css']
})
export class ProductRegistrationComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  submitted = false;

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private inventoryService: InventoryService,
  ) { }

  ngOnInit() {
      this.form = this.formBuilder.group({
          name: ['', Validators.required],
          price: ['', Validators.required],
          quantity: ['', Validators.required]
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

      console.log("Tentando cadastrar produto " + this.f['name'].value)

      let product : Product = {
        id: Math.floor(Math.random() * 100),
        name: this.f['name'].value,
        price: this.convertPrice(this.f['price'].value),
        quantity: this.f['quantity'].value
      }

      this.loading = true;
      this.inventoryService.register({id: product.id, nome: product.name, preco: product.price, quantidade: product.quantity})
          .pipe(first())
          .subscribe({
              next: (response) => {
                  // get return url from query parameters or default to home page
                  //const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
                  //this.router.navigateByUrl(returnUrl);
                  this.inventoryService.updateProductsAdd(response)
              },
              error: () => {
                  this.loading = false;
              }
          });
  }

  convertPrice(price: string) {
    return parseFloat(price.replace(',','.'));
  }
}
