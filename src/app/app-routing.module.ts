import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guard/auth.guard';
import { AmlPolicyComponent } from './shared/aml-policy/aml-policy.component';
import { MaintenaceComponent } from '../app/maintenace/maintenace.component';
import { Page404Component } from './shared/page404/page404.component';
import { PrivacyPolicyComponent } from './shared/privacy-policy/privacy-policy.component';
import { ResponsibleGamingComponent } from './shared/responsible-gaming/responsible-gaming.component';
import { TermsAndConditionsComponent } from './shared/terms-and-conditions/terms-and-conditions.component';
import { MaintenanceGuard } from './core/guard/maintenance.guard';
import { ElementMaintainComponent } from './shared/element-maintain/element-maintain.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
    canActivate: [MaintenanceGuard]
  },
  {
    path: '',
    loadChildren: () => import('./web/web.module').then(m => m.WebModule),
    canActivate: [MaintenanceGuard]
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule),
    canActivate: [AuthGuard, MaintenanceGuard]
  },

  { path: 'terms&conditions', component: TermsAndConditionsComponent, canActivate: [MaintenanceGuard] },
  { path: 'responsible-gaming', component: ResponsibleGamingComponent, canActivate: [MaintenanceGuard] },
  { path: 'privacy-policy', component: PrivacyPolicyComponent, canActivate: [MaintenanceGuard] },
  { path: 'aml-privacy', component: AmlPolicyComponent, canActivate: [MaintenanceGuard] },
  { path: 'maintenance', component: MaintenaceComponent },
  { path: 'element-maintain', component: ElementMaintainComponent },
  { path: '**', component: Page404Component, canActivate: [MaintenanceGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
