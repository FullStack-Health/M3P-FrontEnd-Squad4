import { Endereco } from "./endereco.model";
import { User } from "./user.model";

export class Paciente {
  constructor(
    public id: number,
    public nome: string,
    public genero: string,
    public dataNascimento: Date,
    public cpf: string,
    public rg: string,
    public orgaoExpedidor: string,
    public estadoCivil: string,
    public telefone: string,
    public email: string,
    public naturalidade: string,
    public contatoEmergencia: string,
    public listaAlergias: string[],
    public listaCuidados: string[],
    public convenio: string,
    public numeroConvenio: string,
    public validadeConvenio: Date,
    public endereco: Endereco,
    public usuario: User
  ) {
    if (Array.isArray(dataNascimento)) {
      this.dataNascimento = new Date(dataNascimento[0], dataNascimento[1] - 1, dataNascimento[2]);
    } else {
      this.dataNascimento = new Date(dataNascimento);
    }

    // Converte validadeConvenio de string para Date
    this.validadeConvenio = new Date(validadeConvenio);
  }
}