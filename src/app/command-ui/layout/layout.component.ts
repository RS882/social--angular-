import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { ProfileService } from '../../data/services/profile.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

  profileService=inject(ProfileService);
  
    ngOnInit(){
    this.profileService.geMe().subscribe(val=>console.log(val));
 
    }

}
