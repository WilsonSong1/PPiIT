import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule],
})
export class LoginComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
