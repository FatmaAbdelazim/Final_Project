import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TeamsService } from '../../../core/services/teams.service';
import { TeamDetails } from '../../../models/team-details';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-join-team',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './join-team.component.html',
  styleUrl: './join-team.component.css'
})
export class JoinTeamComponent implements OnInit, OnDestroy{
  private readonly _ActivatedRoute = inject(ActivatedRoute)
  private readonly _TeamsService = inject(TeamsService)
   private readonly _FormBuilder = inject(FormBuilder)
  private readonly _Router = inject(Router)

  team! :TeamDetails;
  id : string | null = null;
  isLoading: boolean = false;
  selectedFile: File | null = null;
  fileName: string | null = null;

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(value) => {
        this.id= value.get("id");
        this._TeamsService.getTeamDetails(this.id).subscribe({
          next:(res)=> {
            this.team =res;
          },
        })
      },
    })

  }
  ngOnDestroy(): void {

  }

  applyForm = this._FormBuilder.group({
    motivation:['', Validators.required],
    hasPreviousExperience:['', Validators.required],
    skills: this._FormBuilder.array([])
  })

onFileSelected(event: Event) {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    this.fileName = input.files[0].name;
    this.selectedFile = input.files[0];
  } else {
    this.fileName = null;
    this.selectedFile = null;
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

convertFileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const base64String = (reader.result as string).split(',')[1]; // Get just the base64 part
      resolve(base64String);
    };

    reader.onerror = error => {
      reject(error);
    };

    reader.readAsDataURL(file);
  });
}


Send():void{
  if(this.applyForm.valid){
    let body:any;
    if(this.selectedFile !== null){
      body = {
      teamId: this.id,
      motivation: this.applyForm.value.motivation,
      hasPreviousExperience: this.applyForm.value.hasPreviousExperience,
      skills: this.applyForm.value.skills,
      attachmentBase64: this.convertFileToBase64(this.selectedFile!)
      }
    }else{
    body = {
      teamId: this.id,
      motivation: this.applyForm.value.motivation,
      hasPreviousExperience: this.applyForm.value.hasPreviousExperience,
      skills: this.applyForm.value.skills,

};
    }
  this.isLoading = true;
      console.log(body);
      this._TeamsService.joinTeam(body).subscribe({
        next:(res)=>{
          this.isLoading = false;
          console.log(res);
          alert('تم ارسال طلبك بنجاح');
          this._Router.navigate(['/teams']);
        },
        error:(err)=>{
          console.log('❌ Validation Error:', err.error);
          this.isLoading = false;
        }
      })
  }
  else{
      Object.values(this.applyForm.controls).forEach(control => {
      control.markAsTouched();
      control.updateValueAndValidity();
      });
    }
}
}
