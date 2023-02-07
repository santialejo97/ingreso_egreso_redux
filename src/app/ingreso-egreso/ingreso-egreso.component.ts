import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import { IngresoEgresos } from '../models/ingreso-egreso.model';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { Subscription } from 'rxjs';
import { isLoading } from '../shared/ui.actions';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: [],
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {
  ingresoEgresoForm!: FormGroup;
  tipo: string = 'ingreso';
  loading: boolean = false;
  unSubscription!: Subscription;

  constructor(
    private fb: FormBuilder,
    private ingresoEgresoService: IngresoEgresoService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.ingresoEgresoForm = this.fb.group({
      description: ['', Validators.required],
      monto: [, [Validators.required, Validators.min(1)]],
    });
    this.unSubscription = this.store.select('ui').subscribe((ui) => {
      this.loading = ui.isLoading;
    });
  }

  ngOnDestroy(): void {
    this.unSubscription.unsubscribe();
  }

  guardar() {
    this.store.dispatch(isLoading({ value: true }));

    if (this.ingresoEgresoForm.invalid) return;
    const { description, monto } = this.ingresoEgresoForm.value;
    const ingresoEgreso = new IngresoEgresos(description, monto, this.tipo);
    this.ingresoEgresoService
      .crearIngresoEgreso(ingresoEgreso)
      .then((ref) => {
        // console.log('objeto insertado correctamente', ref);}
        this.ingresoEgresoForm.reset();
        this.store.dispatch(isLoading({ value: false }));
        Swal.fire({
          title: 'Registro Creado',
          text: description,
          icon: 'success',
        });
      })
      .catch((err) => {
        this.store.dispatch(isLoading({ value: false }));
        Swal.fire({
          title: 'Error de creacion',
          text: err.message,
          icon: 'error',
        });
      });
  }
}
