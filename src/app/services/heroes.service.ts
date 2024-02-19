import { Injectable, OnInit } from '@angular/core';
import heroesData from '../../assets/json/heroes.json';
import { Hero } from '../models/hero';
import { BehaviorSubject, Observable, Subject, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private HeroesList: Array<Hero>;
  private HeroesSubject: BehaviorSubject<Array<Hero>>;
  constructor() {
    this.HeroesSubject = new BehaviorSubject<Array<Hero>>(null);
    this.HeroesList = new Array<Hero>();

    this.loadHeroes();
  }

  private loadHeroes(): void {
    this.HeroesList = heroesData.map((obj: any) => new Hero(obj));
    this.HeroesSubject.next(this.HeroesList);
  }

  get allHeroes(): Observable<Array<Hero>> {
    return this.HeroesSubject.asObservable();
  }

  filterHeroes(value: string, filterType: number): void {
    if (filterType == 1) this.HeroesSubject.next(this.HeroesList.filter(x => { return x.id.toString().includes(value) }));
    else if (filterType == 2) this.HeroesSubject.next(this.HeroesList.filter(x => { return x.hero.toLocaleLowerCase().includes(value.toLocaleLowerCase()) }));
    else if (filterType == 3) this.HeroesSubject.next(this.HeroesList.filter(x => { return x.universe.toLocaleLowerCase().includes(value.toLocaleLowerCase()) }));
  }

  findHeroById(value: number): Hero {
    return this.HeroesList.find(x => { return x.id == value });
  }

  deleteHeroe(hero_id: number): void {
    let index = this.HeroesList.findIndex(x => { return x.id == hero_id });

    this.HeroesList.splice(index, 1);
    this.HeroesSubject.next(this.HeroesList);
  }

  createHeroe(hero: Hero): boolean {
    try {
      let maxId = this.HeroesList.reduce((max, current) => {
        return current.id > max.id ? current : max;
      }, this.HeroesList[0]).id;

      hero.id = maxId + 1;

      this.HeroesList.push(hero);
      this.HeroesSubject.next(this.HeroesList);

      return true;
    } catch (error) {
      return false;
    }
  }

  modifyHero(hero: Hero) {
    try {
      let index = this.HeroesList.findIndex(x => { return x.id == hero.id });

      this.HeroesList[index] = hero;
      this.HeroesSubject.next(this.HeroesList);

      return true;
    } catch (error) {
      return false;
    }
  }

}
