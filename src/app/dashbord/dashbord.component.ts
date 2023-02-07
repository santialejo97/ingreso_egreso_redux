import { Component, OnInit, OnDestroy } from '@angular/core';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { setItems } from '../ingreso-egreso/ingreso-egreso.actions';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styles: [],
})
export class DashbordComponent implements OnInit, OnDestroy {
  unSubscrition!: Subscription;
  ingresosEgresosIteams!: Subscription;

  constructor(
    private ingresoEgresoService: IngresoEgresoService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.unSubscrition = this.store
      .select('user')
      .pipe(filter((auth) => auth.user != null))
      .subscribe(({ user }) => {
        this.ingresosEgresosIteams = this.ingresoEgresoService
          .initIngresosEgresosListener(user?.uid!)
          .subscribe((iteams: any) => {
            // console.log(iteams);
            this.store.dispatch(setItems({ items: iteams }));
          });
      });
  }

  ngOnDestroy(): void {
    this.unSubscrition.unsubscribe();
    this.ingresosEgresosIteams.unsubscribe();
  }
}
