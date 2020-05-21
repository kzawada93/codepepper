export class Planet {
  public name: string;
  public rotationPeriod: number;
  public orbitalPeriod: number;
  public diameter: number;
  public climate: string;
  public population: number;
  public numberOfResidents: number;

  public static getComparableParams(): Array<{name: string, param: string}> {
    return [
      {name: 'Rotation period', param: 'rotationPeriod'},
      {name: 'Orbital period', param: 'orbitalPeriod'},
      {name: 'Diameter', param: 'diameter'},
      {name: 'Population', param: 'population'},
      {name: 'Number of residents', param: 'numberOfResidents'},
    ];
  }

  constructor(sPlanet: ServerPlanet){
    this.name = sPlanet.name;
    this.rotationPeriod = parseInt(sPlanet.rotation_period, 10);
    this.orbitalPeriod = parseInt(sPlanet.orbital_period, 10);
    this.diameter = parseInt(sPlanet.diameter, 10);
    this.climate = sPlanet.climate;
    this.population = parseInt(sPlanet.population, 10);
    this.numberOfResidents = sPlanet.residents.length;
  }
}

export interface ServerPlanet {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents: Array<string>;
  films: Array<string>;
  created: Date;
  edited: Date;
  url: string;
}
