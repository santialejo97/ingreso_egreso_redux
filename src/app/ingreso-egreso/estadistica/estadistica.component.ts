import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { IngresoEgresos } from 'src/app/models/ingreso-egreso.model';
import { ChartData } from 'chart.js';
// import { AppStateWithIngreso } from '../ingreso-egreso.reducer';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: [],
})
export class EstadisticaComponent implements OnInit {
  ingresos: number = 0;
  egresos: number = 0;
  totalEgresos: number = 0;
  totalIngresos: number = 0;

  public doughnutChartLabels: string[] = ['Ingreso', 'Egreso'];
  public doughnutChartData!: ChartData<'doughnut'>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.select('items').subscribe(({ items }) => {
      // console.log(items.items);
      this.generarEstadisticas(items);
    });
  }

  generarEstadisticas(items: IngresoEgresos[]) {
    this.totalEgresos = 0;
    this.totalIngresos = 0;
    for (const item of items) {
      if (item.tipo === 'ingreso') {
        this.totalIngresos += item.monto;
        this.ingresos++;
      } else {
        this.totalEgresos += item.monto;
        this.egresos++;
      }
    }
    this.doughnutChartData = {
      labels: this.doughnutChartLabels,
      datasets: [{ data: [this.totalIngresos, this.totalEgresos] }],
    };
  }
}
