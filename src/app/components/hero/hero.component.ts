import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Hero } from '../../models/hero';
import { HeroesService } from '../../services/heroes.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButton,
  ],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent implements OnInit, OnDestroy {

  routerSubscription: Subscription;

  heroId: number;
  hero: Hero;
  heroForm: FormGroup;
  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private heroSrv: HeroesService,
    private toastr: ToastrService
  ) {
    this.routerSubscription = new Subscription();
    this.hero = new Hero(null);
  }
  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.routerSubscription = this.activeRoute.params.subscribe(params => {
      this.heroId = params['id'];
      if (this.heroId != -1) {
        console.log(this.heroSrv.findHeroById(this.heroId));

        this.hero = new Hero(this.heroSrv.findHeroById(this.heroId));
      }
    });
  }

  onSubmit() {
    let result: boolean = false;
    if (this.heroId == -1) {
      result = this.heroSrv.createHeroe(this.hero);
    }else {
      result = this.heroSrv.modifyHero(this.hero);
    }
    if (result == true) {
      this.router.navigate(['list']);
      this.toastr.success('Héroe creado con éxito');
    }
    else this.toastr.warning('Hubo un problema con la creación del héroe.');
  }

  backtoList(): void {
    this.router.navigate(['list'])
  }
}
