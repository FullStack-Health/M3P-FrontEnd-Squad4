import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PacientesService {

  constructor() { }

  salvarPaciente(paciente: any) {
    localStorage.setItem('paciente', JSON.stringify(paciente));
  }

  obterPaciente() {
    const pacienteString = localStorage.getItem('paciente');
    return pacienteString ? JSON.parse(pacienteString) : null;
  }

  deletarPaciente() {
    localStorage.removeItem('paciente');
  }

}
