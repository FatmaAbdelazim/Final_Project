import { Component } from '@angular/core';

import { FooterComponent } from "./shared/components/footer/footer.component";
import { NavbarComponent } from "./shared/components/navbar/navbar.component";
<<<<<<< HEAD
import { RegisterComponent } from "./features/volunteer/register/register.component";
@Component({
  selector: 'app-root',
  imports: [FooterComponent, NavbarComponent, RegisterComponent],
=======
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-root',
  imports: [FooterComponent, NavbarComponent,RouterOutlet],
>>>>>>> e03111c3c614e2f9de64631675ee3acd562ebcf7
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'بصمه';
}
