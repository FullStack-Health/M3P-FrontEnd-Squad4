export class User {
  constructor(
    public id: number,
    public nome: string,
    public email: string,
    public dataNascimento: string,
    public cpf: string,
    public telefone: string,
    public password: string,
    public listaNomesPerfis: string[],
    public senhaComMascara: string
  ) {}
}
