export interface LoginResponse {
    token: string;
    tempoExpiracao: number;
    listaNomesPerfis?: string[]; // Torne opcional para evitar erros se não estiver presente
  }
  