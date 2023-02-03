export class Usuario {
  constructor(
    public uid: string,
    public nombre: string,
    public email: string
  ) {}

  static formFirebase({
    email,
    nombre,
    uid,
  }: {
    email: string;
    nombre: string;
    uid: string;
  }) {
    return new Usuario(uid, nombre, email);
  }
}
