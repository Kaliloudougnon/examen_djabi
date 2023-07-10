import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EtudiantService {

  constructor(private http:HttpClient) {

  }
  public getEtudiant(num:number,session:number):Observable<any>{
    return this.http.get<any>("http://localhost:8080/etudiant/"+num+"/"+session);
  }
}
