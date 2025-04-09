import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../service/profile.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-employeeprofile',
  templateUrl: './employeeprofile.component.html',
  styleUrls: ['./employeeprofile.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class EmployeeprofileComponent implements OnInit {
  userProfile: any = {};
  isLoading = true;
  errorMessage = '';
  isDropdownOpen: boolean = false;

  constructor(private profileService: ProfileService) {}

  ngOnInit() {
    // Get UID from session storage (assuming you store it during login)
    const userData = sessionStorage.getItem('currentUser');
    
    if (userData) {
      const user = JSON.parse(userData);
      this.profileService.fetchProfile(user.uid);
      
      this.profileService.currentProfile$.subscribe({
        next: (profile) => {
          if (profile) {
            this.userProfile = profile;
            this.isLoading = false;
          }
        },
        error: (err) => {
          this.errorMessage = 'Failed to load profile';
          this.isLoading = false;
          console.error(err);
        }
      });
    } else {
      this.errorMessage = 'User not logged in';
      this.isLoading = false;
    }
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}