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
    conditions : [''],
    isAttendanceTracked : [false],
    isCertificateAvailable : [false],
    totalHours : [0],
    genderRequirement : [''],
    skills : [['']]
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
                this.updateForm.patchValue(this.opp)

              },
              error:(err)=> {
                console.log(err);
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

  }

  del(index: number){
    const skills = [...this.updateForm.value.skills ?? []];
    skills.splice(index, 1);
    this.updateForm.patchValue({ skills });
  }
  addSkill(){
    const skill = this.skillsInput.trim();

    const currentSkills = this.updateForm.value.skills ?? [];

  if (skill && !currentSkills.includes(skill)) {
    const updatedSkills = [...currentSkills, skill];
    this.updateForm.patchValue({ skills: updatedSkills });
    this.skillsInput = '';
  }
  }
}
