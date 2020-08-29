import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  openNavbarMenu = false;

  constructor(
    public translate: TranslateService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout();
  }

}
