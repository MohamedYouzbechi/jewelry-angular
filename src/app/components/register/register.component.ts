import { map } from 'rxjs/operators';
import { CheckEmailService } from './../../validators/check-email.service';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registrationForm: FormGroup;
  // tslint:disable-next-line:max-line-length
  private emailPattern =
    "(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])";
  comparePassword: boolean;
  registrationMessage: string;

  constructor(
    private userService:UserService,
    private formBuilder:FormBuilder,
    private CheckEmailService:CheckEmailService) {

      this.registrationForm = formBuilder.group({
        fname: ["", [Validators.required, Validators.minLength(4)]],
        lname: ["", [Validators.required, Validators.minLength(4)]],
        email: [
          "",
          [Validators.required, Validators.pattern(this.emailPattern)],
          [this.CheckEmailService.emailValidate()],
        ],
        password: ["", [Validators.required, Validators.minLength(6)]],
        confirmPassword: ["", [Validators.required, Validators.minLength(6)]],
      });
  }

  get formControls() {
    return this.registrationForm.controls;
  }

  ngOnInit(): void {
    this.registrationForm.valueChanges
      .pipe(
        map((controls) => {
          return (
            this.formControls.confirmPassword.value === this.formControls.password.value
          );
        })
      )
      .subscribe((passwordState) => {
        // console.log("samePass", passwordState);
        this.comparePassword = passwordState;
        // console.log(this.registrationForm);
      });
  }

  registerUser() {
    if (this.registrationForm.invalid) {
      return;
    }
    // console.log(this.registrationForm.value)
    this.userService
      .registerUser({ ...this.registrationForm.value })
      .subscribe((response: { message: string }) => {
        this.registrationMessage = response.message;
      });

    this.registrationForm.reset();
  }

}
