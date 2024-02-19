export class Hero {
    id: number;
    hero: string;
    universe: string;
    skills: string[];
    is_hero: boolean;

    constructor(data: Partial<Hero>) {
        if (data) {
            this.id = data.id || 0;
            this.hero = data.hero || '';
            this.universe = data.universe || '';
            this.skills = data.skills || [];
            this.is_hero = data.is_hero || false;
        }
    }

    fromParams(id: number, hero: string, universe: string, skills: string[]) {
        this.id = id;
        this.hero = hero;
        this.universe = universe;
        this.skills = skills;
    }
}