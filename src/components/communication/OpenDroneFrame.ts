import { IStickMovement } from "../../models/IStickMovement";

export class OpenDroneFrame {
  values: IStickMovement[];
  codes: string[];

  constructor(values: IStickMovement[]) {
    this.values = values;
  }

  toString() {
    const terminator = ";";
    let str = "";

    str += "1010101010101000" + terminator;
    str += "1" + terminator;
    str += this.values.length + "" + terminator;

    for (const val of this.values) {
      const code = val.code;
      const data = val.val;

      str += code + "" + terminator;
      str += data + "" + terminator;
      str += "1" + terminator;
    }

    str += "0001010101010101" + terminator;

    return str;
  }
}
