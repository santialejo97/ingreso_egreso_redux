import { Routes } from '@angular/router';
import { DetalleComponent } from '../ingreso-egreso/detalle/detalle.component';
import { EstadisticaComponent } from '../ingreso-egreso/estadistica/estadistica.component';
import { IngresoEgresoComponent } from '../ingreso-egreso/ingreso-egreso.component';

export const dashbordRouter: Routes = [
  { path: 'ingreso-egreso', component: IngresoEgresoComponent },
  { path: 'detalles', component: DetalleComponent },
  { path: '', component: EstadisticaComponent },
  { path: '**', redirectTo: '' },
];
