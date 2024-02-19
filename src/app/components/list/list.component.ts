import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

import { HeroesService } from '../../services/heroes.service';
import { Hero } from '../../models/hero';
import { IsHeroOrNotPipe } from '../../pipes/IsHeroOrNotPipe';

import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatChipsModule } from '@angular/material/chips';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatChipsModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatCardModule,
    FormsModule,
    IsHeroOrNotPipe],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit, OnDestroy {
  HeroesList: Array<Hero>;
  HeroesFilteredList: Array<Hero>;
  HeroesListPaginated: Array<Hero>;
  HeroesListSubscription: Subscription;

  filterType: number = 1;
  displayedColumns: Array<string> = ['id', 'hero', 'univers', 'skills', 'is_hero', 'options'];

  pageEvent: PageEvent;
  length: number;
  pageSize: number = 10;
  pageIndex: number;
  pageSizeOptions = [5, 10, 25];

  constructor(
    private heroesSrv: HeroesService,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.HeroesList = new Array<Hero>();
    this.HeroesFilteredList = new Array<Hero>();
    this.HeroesListPaginated = new Array<Hero>();
    this.HeroesListSubscription = new Subscription();

  }

  ngOnInit(): void {
    this.HeroesListSubscription = this.heroesSrv.allHeroes.subscribe(heroes => {
      this.HeroesList = heroes.map(hero => { return new Hero(hero) });
      this.HeroesFilteredList = heroes.map(hero => { return new Hero(hero) });
      this.HeroesListPaginated = this.HeroesList.slice(0, 10);
    });
  }

  ngOnDestroy(): void {
    this.HeroesListSubscription.unsubscribe();
  }

  handlePageEvent(e: PageEvent): void {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;

    this.HeroesListPaginated = new Array<Hero>();
    let currentIndex = this.pageIndex * this.pageSize;

    for (let i = 0; i < this.pageSize; i++) {
      this.HeroesListPaginated.push(this.HeroesFilteredList[currentIndex + i]);
    }
  }

  setPageSizeOptions(setPageSizeOptionsInput: string): void {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput
        .split(',')
        .map((str) => +str);
    }
  }

  filterHeroes(value: string): void {
    this.heroesSrv.filterHeroes(value, this.filterType);
  }

  editHero(hero: Hero): void {
    this.router.navigate(['hero/' + hero.id])
  }

  createHeroe(): void {
    this.router.navigate(['hero/-1'])
  }

  deleteHeroe(hero: Hero): void {
    let dialogRef = this.dialog.open(DialogOverviewExampleDialog);

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) this.heroesSrv.deleteHeroe(hero.id);
    });
  }
}




@Component({
  selector: 'general-dialog',
  templateUrl: 'general-dialog.html',
  styleUrl: './list.component.css',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatCardModule,
  ],
})
export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
  ) { }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onClick(): void {
    this.dialogRef.close(true);
  }
}

