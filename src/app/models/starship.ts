export class Starship {
  public name: string;
  public model: string;
  public costInCredits: number;
  public length: number;
  public crewNumber: number;
  public passengersNumber: number;
  public cargoCapacity: number;

  public static getComparableParams(): Array<{name: string, param: string}> {
    return [
      {name: 'Cost in credits', param: 'costInCredits'},
      {name: 'Length', param: 'length'},
      {name: 'Crew number', param: 'crewNumber'},
      {name: 'Passengers number', param: 'passengersNumber'},
      {name: 'Cargo capacity', param: 'cargoCapacity'},
    ];
  }

  constructor(sStarship: ServerStarship){
    this.name = sStarship.name;
    this.model = sStarship.model;
    this.costInCredits = parseInt(sStarship.cost_in_credits, 10);
    this.length = parseInt(sStarship.length, 10);
    this.crewNumber = parseInt(sStarship.crew.split(',').join(''), 10);
    this.passengersNumber = parseInt(sStarship.passengers.split(',').join(''), 10);
    this.cargoCapacity = parseInt(sStarship.cargo_capacity, 10);
  }
}

export interface ServerStarship {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  consumables: string;
  hyperdrive_rating: string;
  MGLT: string;
  starship_class: string;
  pilots: Array<string>;
  films: Array<string>;
  created: Date;
  edited: Date;
  url: string;
}
