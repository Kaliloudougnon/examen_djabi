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
  allEtudiant: any;

  ngOnInit(): void {


  }

  constructor(public service: EtudiantService, public fb: FormBuilder) {
    this.forms = this.fb.group(
      {
        numPlace: this.fb.control(null),
        session: this.fb.control(""),
        academie: this.fb.control("")
      }
    )

  }

  chercherResultat() {

    if (this.forms?.value.numPlace != null) {
      this.service.getEtudiant(this.forms?.value.numPlace, this.forms?.value.session).subscribe(
        (data) => {
          this.etudiant = data;
          this.allEtudiant=null;
        }
      )
    }
    if (this.forms?.value.numPlace == null) {
      this.service.getAllEtudiant(this.forms?.value.academie, this.forms?.value.session).subscribe(
        (data) => {
          this.allEtudiant = data;
          console.log(data);
        }
      )
    }
  }
}
