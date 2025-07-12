import { Component } from '@angular/core';

@Component({
  selector: 'app-add-opp',
  imports: [],
  templateUrl: './add-opp.component.html',
  styleUrl: './add-opp.component.css'
})
export class AddOppComponent {
fileToUpload: File | null = null;
  fileName: string | null = null;
onFileSelected(event: Event): void {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    this.fileName = input.files[0].name;
    this.fileToUpload = input.files[0]; // خزّن الملف في متغير مستقل
  } else {
    this.fileName = null;
    this.fileToUpload = null;
  }
}

}
