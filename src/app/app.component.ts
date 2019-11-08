import { Component } from '@angular/core';
import { AuthService } from 'shared/Services/auth.service';
import { Router } from '@angular/router';
import { UserService } from 'shared/Services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private userService:UserService,private authService:AuthService,router:Router){
   
    authService.user.subscribe(user=>{
      if(!user) return;
      // if(user){
        this.userService.save(user); 

        let returnUrl=localStorage.getItem('returnUrl');
        
      if(!returnUrl) return;

        // if(returnUrl){
          localStorage.removeItem('returnUrl');
          router.navigateByUrl(returnUrl);
        //}
      //}
    });
  }
}
