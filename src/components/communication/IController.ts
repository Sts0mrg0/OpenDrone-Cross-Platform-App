import { IStickMovement } from "../../models/IStickMovement";

export interface IController {
  sendLeftStick(values: IStickMovement[]): void;
  sendRightStick(values: IStickMovement[]): void;
  sendArm(): void;
  sendDisarm(): void;
  sendActivateAltHold(): void;
  sendStopAltHold(): void;
  sendGoHome(): void;
  sendHeartbeat(): void;
  sendTakeOff(): void;
}
