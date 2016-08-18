import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FORM_DIRECTIVES, FormBuilder,  ControlGroup, Validators, AbstractControl } from '@angular/common';

@Component({
  templateUrl: 'build/pages/contactus/contactus.html',
  directives: [FORM_DIRECTIVES]
})
export class ContactusPage {
  contactForm: ControlGroup;
  name: AbstractControl;
  email: AbstractControl;

  constructor(private nav: NavController, private fb: FormBuilder) {
    this.contactForm = fb.group({
      'name': ['', Validators.required],
      'email': ['', Validators.required]
    });

    this.name = this.contactForm.controls['name'];
    this.email = this.contactForm.controls['email'];

  }

  submitForm() {
    debugger;
  }
}
