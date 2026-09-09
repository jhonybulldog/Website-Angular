import { Component, inject } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ContattiService } from "./contatti.service";
@Component({
  imports: [ReactiveFormsModule],
  selector: "app-contatti",
  styleUrl: "./contatti.css",
  templateUrl: "./contatti.html",
  providers: [ContattiService]
})
export class Contatti {
  private contattiService = inject(ContattiService)

  contattoForm = new FormGroup({
    name: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required, Validators.email]),
    subject: new FormControl("", [Validators.required]),
    message: new FormControl("", [Validators.required]),
  });

 onSubmit() {
  if (this.contattoForm.valid) {
    console.log(this.contattoForm.value);

    this.contattiService.inviaMessaggio(this.contattoForm.value).subscribe();
    this.contattoForm.reset();
    
  }
}
}
