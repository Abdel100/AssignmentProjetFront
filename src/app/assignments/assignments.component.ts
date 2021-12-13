import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ignoreElements } from 'rxjs';
import { MatSort,Sort } from '@angular/material/sort';
import { AuthService } from '../shared/auth.service';


import { AssignmentsService } from '../shared/assignments.service';
import { Assignment } from './assignment.model';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css'],
})
export class AssignmentsComponent implements OnInit {
  couleur = 'orange';
  ajoutActive = false;

  assignments: Assignment[] = [];
  // slider pour changer la limite
  sliderLimit: number = 50;

  // Pour pagination
  page: number = 1;
  limit: number = 50;
  totalDocs: number = 0;
  totalPages: number = 0;
  hasPrevPage: boolean = false;
  prevPage: number = 0;
  hasNextPage: boolean = false;
  nextPage: number = 0;
  displayedColumns: string[] = ['id', 'nom', 'dateDeRendu', 'rendu', 'modifier', 'supprimer'];

  clickedRows = new Set<Assignment>();
  pageEvent?: PageEvent;
  pageIndex = 0;
  length = 100;
  pageSize = 50;
  pageSizeOptions: number[] = [5, 10, 25, 50];

  dataSource:Assignment[] = [];
  sortedData:Assignment[] = [];
  constructor(private assignmentsService: AssignmentsService, private snackBar: MatSnackBar,
              private router:Router,private authService:AuthService,
              ) { }

              ngOnInit(): void {
                console.log('Appelé avant affichage');
                // appelée avant l'affichage du composant
                // on demande les donnnées au service de gestion des assignments
                this.getAssignments()
                this.assignmentsService.getAssignmentsPagine(0,20).subscribe((data)=>{
                  this.assignments = data.docs;
                
                });
              }

  getAssignments() {
    this.assignmentsService.getAssignmentsPagine(this.page, this.limit).subscribe((data) => {
      this.assignments = data.docs;
      this.page = data.page;
      this.limit = data.limit;
      this.totalDocs = data.totalDocs;
      this.totalPages = data.totalPages;
      this.hasPrevPage = data.hasPrevPage;
      this.prevPage = data.prevPage;
      this.hasNextPage = data.hasNextPage;
      this.nextPage = data.nextPage;
      console.log("données reçues");
    });
  }
  isAdmin() {
    return this.authService.loggedIn;
  }

  changeLimit() {
    console.log("change limit")
    this.limit = this.sliderLimit;
    this.getAssignments();
  }

  pagePrecedente() {
    this.page = this.prevPage;
    this.getAssignments();
  }

  pageSuivante() {
    this.page = this.nextPage;
    this.getAssignments();
  }

  dernierePage() {
    this.page = this.totalPages;
    this.getAssignments();
  }

  premierePage() {
    this.page = 1;
    this.getAssignments();
  }

  onDelete(assignment: Assignment) {
    this.assignmentsService.deleteAssignment(assignment).subscribe((response) => {
      this.getAssignments();
      console.log(response.message);
    });
  }

  openSnackBar(assignment: Assignment, mode: string) {
    if (mode == 'supprimer') {
      this.snackBar.open('Le devoir ' + assignment.nom + ' a été supprimé', 'Ok!');
    }
   
  }

  genererDonneesDeTest() {
    this.assignmentsService.peuplerBDAvecForkJoin()
      .subscribe(() => {
        console.log("Insertion reussite");

        this.router.navigate(["/home"]);
      });
  }
  
 
}



