import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-join-team',
  imports: [RouterLink],
  templateUrl: './join-team.component.html',
  styleUrl: './join-team.component.css'
})
export class JoinTeamComponent {

  selectedFile: File | null = null;

onFileSelected(event: Event) {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    this.selectedFile = input.files[0];
    console.log('File selected:', this.selectedFile);
  }
}

onDragOver(event: DragEvent) {
  event.preventDefault();
}

onDrop(event: DragEvent) {
  event.preventDefault();
  if (event.dataTransfer && event.dataTransfer.files.length > 0) {
    this.selectedFile = event.dataTransfer.files[0];
    console.log('File dropped:', this.selectedFile);
  }
}
}
