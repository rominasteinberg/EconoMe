import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegistroComponent } from './components/registro/registro.component';
import { LoginComponent } from './components/login/login.component';
import { GastosComponent } from './components/partials/gastos/gastos.component';
import { HomeComponent } from './components/home/home.component';
import { IngresoComponent } from './components/agregar/ingreso/ingreso.component';
import { GastoComponent } from './components/agregar/gasto/gasto.component';
import { HistorialComponent } from './components/historial/historial.component';
import { AhorrosComponent } from './components/partials/ahorros/ahorros.component';
import { AhorroComponent } from './components/agregar/ahorro/ahorro.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { AuthGuard } from './auth.guard';
import { AdminComponent } from './components/admin/admin.component';


const routes: Routes = [
  {
    path : 'registro',
    component : RegistroComponent
  },
  {
    path : 'login',
    component : LoginComponent
  },
  {
    path : 'gastos',
    canActivate : [AuthGuard],
    component : GastosComponent
  },
  {
    path : 'home',
    canActivate : [AuthGuard],
    component : HomeComponent
  },
  {
    path : 'nuevo-ingreso',
    canActivate : [AuthGuard],
    component : IngresoComponent
  },
  {
  path : 'nuevo-gasto',
  canActivate : [AuthGuard],
    component : GastoComponent
  },
  {
    path : 'historial',
    canActivate : [AuthGuard],
    component : HistorialComponent
  },
  {
    path : 'ahorros',
    canActivate : [AuthGuard],
    component : AhorrosComponent
  },
  {
    path : 'nuevo-ahorro',
    canActivate : [AuthGuard],
    component : AhorroComponent
  },
  {
    path : 'perfil',
    canActivate : [AuthGuard],
    component : PerfilComponent
  },
  {
    path : 'admin',
    canActivate : [AuthGuard],
    component : AdminComponent
  },
  {
    path : '**',
    redirectTo: 'home'
  }  //Se pone al final de todo. Si la ruta no coincide redirige al home en este caso.
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
