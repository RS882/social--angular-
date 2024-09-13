import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {

  authService:AuthService = inject(AuthService);
  router =inject(Router);

  form: FormGroup=new FormGroup({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required)
  })

  onSubmit(){

    if(this.form.valid){
      
      this.authService.login(this.form.value)
       .subscribe(()=>{
          this.router.navigate([''])
       }); 
    }else{
      console.error('Incorect login data');      
    }    
  }
}
