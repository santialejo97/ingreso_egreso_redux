export class IngresoEgresos {
  constructor(
    public description: string,
    public monto: number,
    public tipo: string,
    public uid?: string
  ) {}
}
