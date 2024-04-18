import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class PacientesService {

  constructor() { }

  salvarPaciente(paciente: any) {
    let pacientes: any[] = JSON.parse(localStorage.getItem('pacientes') || '[]');
    pacientes.push(paciente);
    localStorage.setItem('pacientes', JSON.stringify(pacientes));
  }

  obterPacientes(): any[] {
    return JSON.parse(localStorage.getItem('pacientes') || '[]');
  }

  deletarPacientes() {
    localStorage.removeItem('pacientes');
  }
}