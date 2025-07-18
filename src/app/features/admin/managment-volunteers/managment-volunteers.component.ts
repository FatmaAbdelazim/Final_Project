import { Component } from '@angular/core';
import { volunteersForAdmin } from '../../../models/volunteersForAdmin';
import { AdminService } from '../../../core/services/admin.service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-managment-volunteers',
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './managment-volunteers.component.html',
  styleUrl: './managment-volunteers.component.css'
})
export class ManagmentVolunteersComponent {
  currentPage: number = 1;
    itemsPerPage: number = 4;
    pagedVols: volunteersForAdmin[] = [];
    serchName!: string;
    serchCity!: string;
    serchHours!: number;
    serchStatus!: string;
    volList!: volunteersForAdmin[];
    volFilterList!: volunteersForAdmin[];
    constructor(private _AdminService: AdminService) {

    }
    ngOnInit(): void {
      this.getAllVolunnteers();
    }

    getAllVolunnteers() {
      this._AdminService.getAllVolunnteers().subscribe({
        next: (response) => {
          this.volList = response;
          this.volFilterList = response;
          this.currentPage = 1;
          this.updatePagedVolunteers();
        },
        error: (e) => {
          console.log(e.error);
        }
      })
    }
    searchByName() {
      this._AdminService.searchByVolName(this.serchName).subscribe({
        next: (response) => {
          this.volFilterList = response;
          this.currentPage = 1;
          this.updatePagedVolunteers();
        },
        error: (e) => {
          console.log(e.error);
        }
      })
    }
    searchByStatus() {
      this._AdminService.searchByVolStatus(this.serchStatus).subscribe({
        next: (response) => {
          this.volFilterList = response;
          this.currentPage = 1;
          this.updatePagedVolunteers();
        },
        error: (e) => {
          console.log(e.error);
        }
      })
    }
    searchByCity() {
      this._AdminService.searchByVolCity(this.serchCity).subscribe({
        next: (response) => {
          this.volFilterList = response;
          this.currentPage = 1;
          this.updatePagedVolunteers();
        },
        error: (e) => {
          console.log(e.error);
        }
      })
    }
    searchByHours() {
      this._AdminService.searchByVolHours(this.serchHours).subscribe({
        next: (response) => {
          this.volFilterList = response;
          this.currentPage = 1;
          this.updatePagedVolunteers();
        },
        error: (e) => {
          console.log(e.error);
        }
      })
    }

    banVol(volId: string) {
      this._AdminService.banVol(volId).subscribe({
        next: () => {
          alert("تم حظر المتطوع بنجاح");
          this.getAllVolunnteers();
        },
        error: (e) => {
          console.log(e.error);
        }
      })
    }
    deleteVol(volId: string) {
      this._AdminService.deleteVol(volId).subscribe({
        next: () => {
          alert("تم حذف المتطوع بنجاح");
          this.getAllVolunnteers();
        },
        error: (e) => {
          console.log(e.error);
        }
      })
    }
    updatePagedVolunteers() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      this.pagedVols = this.volFilterList.slice(startIndex, endIndex);
    }

    goToPage(page: number) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
        this.updatePagedVolunteers();
      }
    }


    get totalPages(): number {
      return Math.ceil(this.volFilterList.length / this.itemsPerPage);
    }
    getStarsArray(rating: number): any[] {
      const rounded = Math.floor(rating || 0);
      return Array(rounded);
    }
}
