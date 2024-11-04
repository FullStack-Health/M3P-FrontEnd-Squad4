export interface LoginResponse {
    token: string;
    tempoExpiracao: number;
    listaNomesPerfis?: string[];
    pacienteId?: string;   
    usuarioId: string;
    email: string;
    nome?: string;
  }
  