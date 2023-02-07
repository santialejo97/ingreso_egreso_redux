import { Pipe, PipeTransform } from '@angular/core';
import { IngresoEgresos } from '../models/ingreso-egreso.model';

@Pipe({
  name: 'ordeIngreso',
})
export class OrdeIngresoPipe implements PipeTransform {
  transform(items: IngresoEgresos[]): IngresoEgresos[] {
    return items.slice().sort((a, b) => {
      if (a.tipo === 'ingreso') {
        return -1;
      } else {
        return 1;
      }
    });
  }
}
