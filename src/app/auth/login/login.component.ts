import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import{FormGroup, FormControl, Validators}from '@angular/forms'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private authService:AuthService) { }

  name!:string;
  password!:string;


  onSubmit(){
    this.authService.logIn(this.name, this.password);
  }

  ngOnInit(): void {
  }

  passFormControl = new FormControl('', [
    Validators.required,
]);
confirmFormControl = new FormControl('', [
    Validators.required,
    ]);

     hide =true;

}
 



