export class Endereco {
  constructor(
    public id: number,
    public cep: string,
    public localidade: string,
    public uf: string,
    public logradouro: string,
    public numero: string,
    public complemento: string,
    public bairro: string,
    public pontoReferencia: string
  ) {}
}