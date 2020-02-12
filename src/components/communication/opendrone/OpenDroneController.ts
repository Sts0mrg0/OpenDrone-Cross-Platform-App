import { IController } from "../IController";
import { IStickMovement } from "../../../models/IStickMovement";
import CommunicationManager from "./CommunicationManager";
import { OpenDroneFrame } from "./OpenDroneFrame";
import { CODE_ARM, CODE_ALT_CONTROL, CODE_GO_HOME } from "./Codes";

export class OpenDroneController implements IController {
  communicationManager: CommunicationManager;

  constructor(ip: string, port: number) {
    this.communicationManager = CommunicationManager.getInstance(ip, port);
  }

  sendLeftStick(values: IStickMovement[]) {
    if (!this.communicationManager) {
      return;
    }

    this.sometimesUHaveToSendIt(values);
  }

  sendRightStick(values: IStickMovement[]) {
    if (!this.communicationManager) {
      return;
    }

    this.sometimesUHaveToSendIt(values);
  }

  sendArm(): void {
    const values: IStickMovement[] = [{ code: CODE_ARM, val: 1 }];
    this.sometimesUHaveToSendIt(values);
  }

  sendDisarm(): void {
    const values: IStickMovement[] = [{ code: CODE_ARM, val: 1 }];
    this.sometimesUHaveToSendIt(values);
  }

  sendActivateAltHold(): void {
    const content: IStickMovement[] = [{ code: CODE_ALT_CONTROL, val: 1 }];
    this.sometimesUHaveToSendIt(content);
  }

  sendStopAltHold(): void {
    const content: IStickMovement[] = [{ code: CODE_ALT_CONTROL, val: 1 }];
    this.sometimesUHaveToSendIt(content);
  }

  sendGoHome(): void {
    const values: IStickMovement[] = [{ code: CODE_GO_HOME, val: 1 }];
    this.sometimesUHaveToSendIt(values);
  }

  sendHeartbeat(): void {
    //we don't do that here
  }

  private sometimesUHaveToSendIt(values: IStickMovement[]) {
    const frame = new OpenDroneFrame(values);
    const frameStr = frame.toString();
    console.log(frameStr);
    this.communicationManager.sendMessage(frameStr);
  }
}
