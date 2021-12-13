import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-statut-log',
  templateUrl: './statut-log.component.html',
  styleUrls: ['./statut-log.component.css']
})
export class StatutLogComponent implements OnInit {

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logOut();
  }

  checkLog() {
    return this.authService.loggedIn;
  }

}
