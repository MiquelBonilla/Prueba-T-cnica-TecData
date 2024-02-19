import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isHeroOrNot',
  standalone: true,
})
export class IsHeroOrNotPipe implements PipeTransform {

  transform(is_hero: boolean): string {
    
    return is_hero ? 'Héroe' : 'Villano';
  }

}
