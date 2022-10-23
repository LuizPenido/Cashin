import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InventoryService } from 'src/app/_services/inventory.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-product-removal',
  templateUrl: './product-removal.component.html',
  styleUrls: ['./product-removal.component.css']
})
export class ProductRemovalComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  submitted = false;


  constructor(
    private formBuilder: FormBuilder,
    private inventoryService: InventoryService
  ) {}

  ngOnInit(): void {
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

      console.log("Tentando remover produto de ID " + id)

      this.loading = true;
      this.inventoryService.removeProduct(id)
        .pipe(first())
        .subscribe(response => {
            //this.valid_product = true;
            //this.setCurrentProduct(response);
            this.inventoryService.updateProductsRemove(response)
          }
      );
  }

}
