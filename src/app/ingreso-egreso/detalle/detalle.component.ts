import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { IngresoEgresos } from 'src/app/models/ingreso-egreso.model';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from 'src/app/services/ingreso-egreso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: [],
})
export class DetalleComponent implements OnInit, OnDestroy {
  public ingresosEngresos: IngresoEgresos[] = [];
  ingresosSubscription!: Subscription;

  constructor(
    private store: Store<AppState>,
    private ingresoEgresoService: IngresoEgresoService
  ) {}

  ngOnInit(): void {
    this.ingresosSubscription = this.store
      .select('items')
      .subscribe(({ items }) => (this.ingresosEngresos = items));
  }

  ngOnDestroy(): void {
    this.ingresosSubscription.unsubscribe();
  }

  borrar(uid: string) {
    this.ingresoEgresoService
      .borrarIteam(uid)
      .then(() =>
        Swal.fire({
          title: 'Eliminacion de iteam',
          text: `iteam eliminado ${uid}`,
          icon: 'success',
        })
      )
      .catch((err) =>
        Swal.fire({
          title: 'Error',
          text: err.message,
          icon: 'error',
        })
      );
  }
}
