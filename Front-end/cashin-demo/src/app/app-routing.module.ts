import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './_pages/_shared/main/main.component';
import { HomeComponent } from './_pages/home/home.component';
import { LoginComponent } from './_pages/login/login.component';
import { ManagementComponent } from './_pages/management/management.component';
import { PurchaseComponent } from './_pages/purchase/purchase.component';

import { AuthGuard } from './_services/_guards/auth-guard';
import { AccessGuard } from './_services/_guards/access-guard';

const loginModule = () => import('./_pages/login/login.module').then(x => x.LoginModule);

const routes: Routes = [
  { path:'login', component: LoginComponent, loadChildren: loginModule },
  {
    path: '', component: MainComponent, canActivate: [AuthGuard],
    children: [
      { path: '', component: HomeComponent, canActivate: [AccessGuard] },
      { path: 'gerenciamento', component: ManagementComponent, canActivate: [AccessGuard] },
      { path: 'compra', component: PurchaseComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
