export class Person {
  public name: string;
  public height: number;
  public mass: number;
  public hairColor: string;
  public birthYear: string;
  public gender: string;

  public static getComparableParams(): Array<{name: string, param: string}> {
    return [
      {name: 'Height', param: 'height'},
      {name: 'Mass', param: 'mass'},
    ];
  }

  constructor(sPerson: ServerPerson){
    this.name = sPerson.name;
    this.height = parseInt(sPerson.height, 10);
    this.mass = parseInt(sPerson.mass, 10);
    this.hairColor = sPerson.hair_color;
    this.birthYear = sPerson.birth_year;
    this.gender = sPerson.gender;
  }
}

export interface ServerPerson {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: Array<string>;
  species: Array<string>;
  vehicles: Array<string>;
  starships: Array<string>;
  created: Date;
  edited: Date;
  url: string;
}
