import { Electrode } from "./electrode.model";

enum Color {
  Red = '#FF0000',
  Green = '#00FF00',
  Blue = '#0000FF',
  Yellow = '#FFFF00',
  Magenta = '#FF00FF',
  Cyan = '#00FFFF',
  Orange = '#FF8000',
  SkyBlue = '#0080FF',
  Purple = '#8000FF',
  Lime = '#80FF00',
  Pink = '#FF0080',
  Turquoise = '#00FF80',
  Indigo = '#8000FF',
  Azure = '#0080FF'
}

export class BWElectrodeArray {
  data: Electrode[];

  constructor(){
    this.data = [
      new Electrode('F3', Color.Red, true),
      new Electrode('FC5', Color.Green, true),
      new Electrode('AF3', Color.Blue, true),
      new Electrode('F7', Color.Yellow, true),
      new Electrode('T7', Color.Magenta, true),
      new Electrode('P7', Color.Cyan, true),
      new Electrode('O1', Color.Orange, true),
      new Electrode('O2', Color.SkyBlue, true),
      new Electrode('P8', Color.Purple, true),
      new Electrode('T8', Color.Lime, true),
      new Electrode('F8', Color.Pink, true),
      new Electrode('AF4', Color.Turquoise, true),
      new Electrode('FC6', Color.Indigo, true),
      new Electrode('F4', Color.Azure, true)
    ];
  }

  toggleElectrodeVisibility(name: string): boolean{
    let index = this.data?.findIndex(electrode => electrode.name === name);
    if(index < 0){
      return false;
    }
    this.data[index].isVisible = !this.data[index].isVisible;
    return true;
  }

}
