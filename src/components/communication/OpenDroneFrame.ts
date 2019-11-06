export class OpenDroneFrame {
  data: string[];
  codes: string[];

  constructor(data: string[], codes: string[]) {
    this.data = data;
    this.codes = codes;
  }

  toString() {
    const terminator = ';';
    let str = '';

    str += '1010101010101000' + terminator;
    str += '1' + terminator;
    str += this.data.length + '' + terminator;

    for (let i = 0; i < this.data.length; i++) {
      const curCode = this.codes[i];
      const curData = this.data[i];

      str += curCode + '' + terminator;
      str += curData + '' + terminator;
      str += '1' + terminator;
    }
    str += '0001010101010101' + terminator;

    return str;
  }
}
