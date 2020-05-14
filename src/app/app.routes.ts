import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ClientsComponent } from './clients/clients.component';


const appRoutes: Routes = [
    {
        path: '',
        component: LoginComponent
    }, {
        path: 'clients',
        component: ClientsComponent
    }, {
        path: '**',
        component: LoginComponent
    }
];

export const AppRoutes = RouterModule.forRoot(appRoutes);