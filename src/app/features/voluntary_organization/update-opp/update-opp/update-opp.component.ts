import { Team } from './../../../../models/team';
import { Component, inject, OnInit } from '@angular/core';
import { OpportunitiesService } from '../../../../core/services/opportunities.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Organization } from '../../../../models/organization';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateOpp } from '../../../../models/opportunty';

@Component({
  selector: 'app-update-opp',
  imports: [ReactiveFormsModule, RouterLink, FormsModule],
  templateUrl: './update-opp.component.html',
  styleUrl: './update-opp.component.css'
})
export class UpdateOppComponent implements OnInit{
  private readonly _OpportunitiesService = inject(OpportunitiesService);
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _FormBuilder = inject(FormBuilder)
  private readonly _Router = inject(Router)

  id!:string | null;
  opp!: UpdateOpp;
  orgs! : Organization[];
  teams! : Team[];
  fileName: string | null = null;
  fileToUpload: File | null = null;
  isLoading: boolean = false;
  skillsInput: string = '';

  updateForm = this._FormBuilder.group({
    title: [''],
    description: [''],
    location : [''],
    startDate : [''],
    endDate : [''],
    requiredVolunteers : [0],
    categoryName : [''],
    organizationName : [''],
    teamName : [''],
    timeAttend : [''],
    isAttendanceTracked : [false],
    isCertificateAvailable : [false],
    totalHours : [0],
    genderRequirement : [''],
    requiredSkills : [['']]
  })

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(value)=> {
        this.id= value.get("id");
        this._OpportunitiesService.getAllOrgs().subscribe({
          next:(value)=> {
            this.orgs = value;
            this._OpportunitiesService.getAllTeams().subscribe({
              next:(res)=>{
                this.teams =res;
                this._OpportunitiesService.getDataToUpdate(this.id).subscribe({
              next:(value) =>{
                this.opp = value;
                if (this.opp.startDate) {
  this.opp.startDate = this.opp.startDate.split('T')[0];
}
if (this.opp.endDate) {
  this.opp.endDate = this.opp.endDate.split('T')[0];
}
let cleanedSkills: string[] = [];

try {
  const parsed = JSON.parse(this.opp.requiredSkills as any);
  if (Array.isArray(parsed)) {
    cleanedSkills = parsed.filter((s: any) => typeof s === 'string');
  }
} catch {
  cleanedSkills = Array.isArray(this.opp.requiredSkills)
    ? this.opp.requiredSkills.filter((s: any) => typeof s === 'string')
    : [];
}

this.updateForm.patchValue({
  ...this.opp,
  requiredSkills: cleanedSkills
});

                // this.updateForm.patchValue(this.opp)

              },
              error:(err)=> {
                console.error('Validation error:', err.error);
              },
            })
              },
              error:(err)=>{
                console.log(err);
              }
            })
          },
          error:(err)=> {
                console.log(err);
              },
        })
      },
      error:(err)=> {
                console.log(err);
              },
    })
  }


  onFileSelected(event: Event): void {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    this.fileName = input.files[0].name;
    this.fileToUpload = input.files[0];
  } else {
    this.fileName = null;
    this.fileToUpload = null;
  }
}

  Update(){
    if(this.updateForm.valid){
      const formData = new FormData();
      formData.append('updateOportunuityDto.id', this.id ?? '');
      formData.append('updateOportunuityDto.title', this.updateForm.get("title")?.value ?? '');
formData.append('updateOportunuityDto.description', this.updateForm.get("description")?.value ?? '');
formData.append('updateOportunuityDto.location', this.updateForm.get("location")?.value ?? '');
formData.append('updateOportunuityDto.startDate', this.updateForm.get("startDate")?.value ?? '');
formData.append('updateOportunuityDto.endDate', this.updateForm.get("endDate")?.value ?? '');
formData.append('updateOportunuityDto.requiredVolunteers', String(this.updateForm.get("requiredVolunteers")?.value ?? ''));
formData.append('updateOportunuityDto.categoryName', this.updateForm.get("categoryName")?.value ?? '');
formData.append('updateOportunuityDto.organizationName', this.updateForm.get("organizationName")?.value ?? '');
formData.append('updateOportunuityDto.teamName', this.updateForm.get("teamName")?.value ?? '');
formData.append('updateOportunuityDto.isAttendanceTracked', String(this.updateForm.get("isAttendanceTracked")?.value ?? ''));
formData.append('updateOportunuityDto.isCertificateAvailable', String(this.updateForm.get("isCertificateAvailable")?.value ?? ''));
formData.append('updateOportunuityDto.timeAttend', this.updateForm.get("timeAttend")?.value ?? '');
formData.append('updateOportunuityDto.totalHours', String(this.updateForm.get("totalHours")?.value ?? ''));
formData.append('updateOportunuityDto.genderRequirement', this.updateForm.get("genderRequirement")?.value ?? '');
const skills = this.updateForm.get('requiredSkills')?.value ?? [];
const cleanedSkills = skills
  .filter((s: any) => typeof s === 'string' && s.trim() !== '')
  .filter((val, i, self) => self.indexOf(val) === i);

cleanedSkills.forEach(skill => {
  formData.append('updateOportunuityDto.requiredSkills', skill);
});

if (this.fileToUpload) {
  formData.append('updateOportunuityDto.image', this.fileToUpload, this.fileToUpload.name);
  }

  for (const pair of formData.entries()) {
    console.log(`${pair[0]}:`, pair[1]);
  }
      this.isLoading = true;
      console.log(formData);

      this._OpportunitiesService.updateOpp(this.id!,formData).subscribe({
        next:(res) =>{
          this.isLoading = false;
          console.log(res)
          alert('تم التعديل');
          this._Router.navigate(['/']);
        },
        error:(err)=>{
          console.log(err);
          this.isLoading = false;
        }
    })
    }
  }

  del(index: number): void {
  const currentSkills = this.updateForm.get('requiredSkills')?.value ?? [];

  // نعمل نسخة نظيفة تمامًا
  const updatedSkills = currentSkills
    .map((s: any) => {
      try {
        return typeof s === 'string' ? JSON.parse(s) : s;
      } catch {
        return s;
      }
    })
    .flat(Infinity)
    .filter((s: any) => typeof s === 'string');

  // نحذف العنصر
  updatedSkills.splice(index, 1);

  // نعمل نسخة جديدة بالكامل عشان Angular يشوف التغيير
  this.updateForm.patchValue({
    requiredSkills: [...updatedSkills]
  });

  console.log('بعد الحذف:', this.updateForm.value.requiredSkills);
}

  addSkill(){
    const skill = this.skillsInput.trim();

    const currentSkills = this.updateForm.value.requiredSkills ?? [];

  if (skill && !currentSkills.includes(skill)) {
    const updatedSkills = [...currentSkills, skill];
    this.updateForm.patchValue({ requiredSkills: updatedSkills });
    this.skillsInput = '';
  }
  }
}
