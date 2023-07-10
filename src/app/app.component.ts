import {Component, OnInit} from '@angular/core';
import {EtudiantService} from "./etudiant.service";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'consult_exam_front';
  etudiant: any;
  forms: FormGroup;

  ngOnInit(): void {


  }

  constructor(public service: EtudiantService, public fb: FormBuilder) {
    this.forms = this.fb.group(
      {
        numPlace: this.fb.control(""),
        session: this.fb.control("")
      }
    )
  }

  chercherResultat() {
    this.service.getEtudiant(this.forms?.value.numPlace,this.forms?.value.session).subscribe(
      (data) => {
        this.etudiant = data;
      }
    )
  }
}
