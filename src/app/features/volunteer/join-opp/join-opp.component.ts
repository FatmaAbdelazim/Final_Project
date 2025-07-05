import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { OpportunitiesService } from '../../../core/services/opportunities.service';
import { OpportuntyDetails } from '../../../models/opportunty-details';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-join-opp',
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './join-opp.component.html',
  styleUrl: './join-opp.component.css'
})
export class JoinOppComponent implements OnInit{
  private readonly _ActivatedRoute = inject(ActivatedRoute)
  private readonly _OpportunitiesService = inject(OpportunitiesService)
  private readonly _FormBuilder = inject(FormBuilder)
  private readonly _Router = inject(Router)

  opp! : OpportuntyDetails;
  id!: string | null;
  isLoading: boolean = false;
  selectedFile: File | null = null;
  fileName: string | null = null;
  fileRequiredError: boolean = false;


  ngOnInit(): void {
  this._ActivatedRoute.paramMap.subscribe({
      next:(value) => {
        this.id= value.get("id");
        this._OpportunitiesService.getOpportunityDetails(this.id).subscribe({
          next:(res)=> {
            this.opp =res;
          },
        })
      },
    })
 }


  applyForm = this._FormBuilder.group({
    MotivationLetter:['', Validators.required],
    HasRequiredSkills:['', Validators.required]
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

Send():void{
  if(this.applyForm.valid && this.selectedFile){
    this.fileRequiredError = false;
    const formData = new FormData();
      formData.append('OpportunityID', this.id ?? '');
      formData.append('MotivationLetter', this.applyForm.get("MotivationLetter")?.value ?? '');
      formData.append('HasRequiredSkills', this.applyForm.get("HasRequiredSkills")?.value ?? '');
      formData.append('Attachment', this.selectedFile, this.selectedFile.name);


  for (const pair of formData.entries()) {
    console.log(`${pair[0]}:`, pair[1]);
  }
  this.isLoading = true;
      console.log(formData);
      this._OpportunitiesService.joinOpp(formData).subscribe({
        next:(res)=>{
          this.isLoading = false;
          console.log(res);
          alert('تم ارسال طلبك بنجاح');
          this._Router.navigate(['/opportunities']);
        },
        error:(err)=>{
          console.log(err);
          this.isLoading = false;
        }
      })
  }
  else{
      Object.values(this.applyForm.controls).forEach(control => {
      control.markAsTouched();
      control.updateValueAndValidity();
      });
      this.fileRequiredError = !this.selectedFile;
    }
}

}
