import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultaCepService {
  httpClient: any;

  constructor ( private http: HttpClient ){}

  obterEndereco(cep: any): Observable<any>{
    const headers = new HttpHeaders({ 'Content-Type':  'application/json'});
    return this.httpClient.get(`https://viacep.com.br/ws/${cep}/json/`, { headers });
  }
}
