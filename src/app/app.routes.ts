import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, children: [
      { path: '', component: HomeComponent },
      { path: 'client-form', loadComponent: () => import('./pages/modules/clients/clients-forms/clients-forms.component').then(m => m.ClientsFormsComponent) },
      { path: 'client-list', loadComponent: () => import('./pages/modules/clients/clients-list/clients-list.component').then(m => m.ClientsListComponent) },
      {path: 'services', loadComponent: () => import('./pages/modules/services/services-form/services-form.component').then(m => m.ServicesFormComponent)},
      {path: 'rooms', loadComponent: () => import('./pages/modules/rooms/rooms.component').then(m => m.RoomsComponent)},
      {path: 'reservation', loadComponent: () => import('./pages/modules/reservations/reservations.component').then(m => m.ReservationsComponent)},
      {path: 'billing', loadComponent: () => import('./pages/billing/billing.component').then(m => m.BillingComponent)},
      {path: 'payment', loadComponent: () => import('./pages/payment/payment.component').then(m => m.PaymentComponent)},
      {path: 'billing-admin', loadComponent: () => import('./pages/administration/billing-admin/billing-admin.component').then(m => m.BillingAdminComponent)},
      {path: 'client-admin', loadComponent: () => import('./pages/administration/clients-admin/clients-admin.component').then(m => m.ClientsAdminComponent)},
    ]
  },
  { path: '**', redirectTo: '' },
];
