import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultaCepService {

  constructor ( private http: HttpClient ){}

  obterEndereco(cep: any): Observable<any>{
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    // const headers = new HttpHeaders({ 'Content-Type':  'application/json'});
    console.log(url);
    return this.http.get(url);
  }
}
