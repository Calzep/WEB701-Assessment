import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ServicesComponent } from './pages/services/services.component';
import { Routes } from '@angular/router';
import { AccountComponent } from './pages/account/account.component';
import { ServicePurchaseComponent } from './pages/service-purchase/service-purchase.component';
import { AuthGuard } from './guards/auth.guard';
import { MemberGuard } from './guards/member.guard';

export const routes: Routes = [
  { path: '', component: ServicesComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'account', component: AccountComponent, canActivate: [AuthGuard] },
  { path: 'service-purchase', component: ServicePurchaseComponent, canActivate: [MemberGuard] },
];
