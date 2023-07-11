export class Electrode {
  name: string;
  color: string;
  state: boolean;

  constructor(name: string, color: string, state: boolean) {
    this.name = name;
    this.color = color;
    this.state = state;
  }
}
