import { IController } from "../IController";
import { IStickMovement } from "../../../models/IStickMovement";
export class MavLinkController implements IController {
  sendLeftStick(values: IStickMovement[]): void {
    throw new Error("Method not implemented.");
  }

  sendRightStick(values: IStickMovement[]): void {
    throw new Error("Method not implemented.");
  }

  sendArm(): void {
    throw new Error("Method not implemented.");
  }

  sendDisarm(): void {
    throw new Error("Method not implemented.");
  }

  sendActivateAltHold(): void {
    throw new Error("Method not implemented.");
  }

  sendStopAltHold(): void {
    throw new Error("Method not implemented.");
  }

  sendGoHome(): void {
    throw new Error("Method not implemented.");
  }
}
