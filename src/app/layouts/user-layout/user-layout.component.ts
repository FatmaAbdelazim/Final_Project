import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../../Components/navbar/navbar.component";
import { FooterComponent } from "../../Components/footer/footer.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.css'],
  imports: [NavbarComponent, FooterComponent,RouterModule]
})
export class UserLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
