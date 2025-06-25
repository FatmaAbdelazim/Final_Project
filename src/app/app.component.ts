import { Component } from '@angular/core';
import { FooterComponent } from "./shared/components/footer/footer.component";
@Component({
  selector: 'app-root',
  imports: [FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'بصمه';
}
