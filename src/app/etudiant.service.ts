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
    return this.http.get<any>("https://resder.onrender.com/etudiant/"+num+"/"+session);
  }
  public getAllEtudiant(academie:string,session:number):Observable<any>{
    return this.http.get<any>("https://resder.onrender.com/allEtudiant/"+academie+"/"+session);
  }
  public getAllEtudiant1(){
    return this.http.get<any>('assets/bac-segou-2022/bacSegou2022.json');
  }
}
