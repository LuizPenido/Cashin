import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
import { fakeBackendProvider } from './_helpers/fake-backend';

import { AppRoutingModule } from './app-routing.module';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { ErrorInterceptor } from './_services/_interceptors/error.interceptor';

import { AppComponent } from './app.component';
import { MainComponent } from './_pages/_shared/main/main.component';
import { HomeComponent } from './_pages/home/home.component';
import { ProductRegistrationComponent } from './_pages/inventory/product-registration/product-registration.component';
import { ProductDetailsComponent } from './_pages/inventory/product-details/product-details.component';
import { ProductListingComponent } from './_pages/inventory/product-listing/product-listing.component';
import { ManagementComponent } from './_pages/management/management.component';
import { PurchaseComponent } from './_pages/purchase/purchase.component';
import { ItemListComponent } from './_pages/buying/item-list/item-list.component';
import { ProductRemovalComponent } from './_pages/inventory/product-removal/product-removal.component';


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        MainComponent,
        HomeComponent,
        ProductRegistrationComponent,
        ProductDetailsComponent,
        ProductListingComponent,
        PurchaseComponent,
        ManagementComponent,
        ItemListComponent,
        ProductRemovalComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // provider used to create fake backend
        // fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})
export class AppModule { };