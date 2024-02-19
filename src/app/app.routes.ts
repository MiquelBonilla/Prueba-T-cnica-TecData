import { Routes } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { HeroComponent } from './components/hero/hero.component';

export const routes: Routes = [
    { path: 'list', component: ListComponent },
    { path: 'hero/:id', component: HeroComponent },
    { path: '',   redirectTo: 'list', pathMatch: 'full' },
];
