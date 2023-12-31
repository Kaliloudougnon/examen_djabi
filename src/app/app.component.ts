import {Component, OnInit} from '@angular/core';
import {EtudiantService} from "./etudiant.service";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Resultat bac malien';
  isFindData = false;
  isFindEtudiant=false;
  etudiant: any;
  forms: FormGroup;
  allEtudiant: any;
  allEtudiantTse: any = [];
  allEtudiantTsexp: any = [];
  allEtudiantTseco: any = [];
  allEtudiantTss: any = [];
  allEtudiantTll: any = [];
  allEtudiantTal: any = [];
  pagination: number = 0;
  spinner = false;
  serie: any;

  ngOnInit(): void {

  }

  constructor(public service: EtudiantService, public fb: FormBuilder) {
    this.forms = this.fb.group(
      {
        numPlace: this.fb.control(null),
        session: this.fb.control(""),
        academie: this.fb.control( null)
      }
    )

  }

  chercherResultat() {
    this.spinner = true;
    this.etudiant = null;
    this.isFindEtudiant=false;
    if (this.forms?.value.numPlace != null) {
      this.service.getAllEtudiant1().subscribe(
        (data) => {
          for (let i = 0; i < data.list.length; i++) {
            if (data.list[i].numPlace==this.forms?.value.numPlace){
              this.etudiant = data.list[i];
              this.serie=data.list[i].serie;
              break
            }
          }
          if (this.etudiant == null){
            this.isFindEtudiant=true;
          }
          this.allEtudiant = null;
          this.spinner = false;
        }
      )
    }
    if (this.forms?.value.numPlace == null && this.forms?.value.academie!=null) {
       this.service.getAllEtudiant1().subscribe(
          (data) => {
            this.allEtudiantTse = [];
            this.allEtudiantTsexp = [];
            this.allEtudiantTseco = [];
            this.allEtudiantTss = [];
            this.allEtudiantTll = [];
            this.allEtudiantTal = [];
            this.isFindData = true;
            this.etudiantBySerie(data.list,this.forms?.value.academie);
            this.service.getAllEtudiant1()
            this.etudiant = null;
            this.spinner = false;

          }
        )
    }
  }

  renderPage(event: number) {
    this.pagination = event;
  }

  etudiantBySerie(data: any,academie:string) {
    for (let i = 0; i < data.length; i++) {
      if (data[i].academie==academie){
        switch (data[i].serie) {
          case "TSE":
            this.allEtudiantTse.push(data[i]);
            break;
          case "TSEXP":
            this.allEtudiantTsexp.push(data[i]);
            break;
          case "TSECO":
            this.allEtudiantTseco.push(data[i])
            break;
          case "TSS":
            this.allEtudiantTss.push(data[i])
            break;
          case "TLL":
            this.allEtudiantTll.push(data[i])
            break;
          case "TAL":
            this.allEtudiantTal.push(data[i])
            break;
          default:
            break;
        }
      }
    }
  }

  affichageBySerie(serie: string) {
    this.serie = serie;
    switch (serie) {
      case "TSE":
        this.allEtudiant = this.allEtudiantTse;
        break;
      case "TSEXP":
        this.allEtudiant = this.allEtudiantTsexp;
        break;
      case "TSECO":
        this.allEtudiant = this.allEtudiantTseco;
        break;
      case "TSS":
        this.allEtudiant = this.allEtudiantTss;
        break;
      case "TLL":
        this.allEtudiant = this.allEtudiantTll;
        break;
      case "TAL":
        this.allEtudiant = this.allEtudiantTal;
        break;
      default:
        break;
    }
  }
}
