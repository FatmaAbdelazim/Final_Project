import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { opportunities } from '../../../../models/team-details';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-create-team',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './create-team.component.html',
  styleUrl: './create-team.component.css'
})
export class CreateTeamComponent {
  private readonly _FormBuilder = inject(FormBuilder)

  opps! : opportunities[];
  isLoading : boolean = false;

  createForm = this._FormBuilder.group({

  })
  Create(){

  }
}
