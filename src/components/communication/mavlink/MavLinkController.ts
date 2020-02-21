import { IController } from "../IController";
import { IStickMovement } from "../../../models/IStickMovement";
import { MavLinkCommunicationManager } from "./MavLinkCommunicationManager";
import {
  MIN_MOTOR_VALUE,
  MAX_MOTOR_VALUE,
  MAX_DIRECTION_VALUE,
  MIN_DIRECTION_VALUE
} from "../../../utils/OpenDroneUtils";
import { CODE_THROTTLE, CODE_YAW, CODE_ROLL, CODE_PITCH } from "../opendrone/Codes";
export class MavLinkController implements IController {
  private curPitch: number = 0;
  private curYaw: number = 0;
  private curRoll: number = 0;
  communicationManager: MavLinkCommunicationManager;

  constructor(ip: string, port: number) {
    this.communicationManager = MavLinkCommunicationManager.getInstance(ip, port);
  }

  sendLeftStick(values: IStickMovement[]): void {
    const rangeMotor = MAX_MOTOR_VALUE - MIN_MOTOR_VALUE;
    const rangeDirection = MAX_DIRECTION_VALUE - MIN_DIRECTION_VALUE;

    const throttle = this.getValueForCode(CODE_THROTTLE, values);
    const yaw = this.getValueForCode(CODE_YAW, values);

    const percentThrottle = (throttle / rangeMotor) * 100;
    const yawValue = -20 + (yaw / rangeDirection) * 40;

    this.curYaw = yawValue;
    this.sendThrottle(percentThrottle);
    this.sendPitchRollYaw(this.curPitch, this.curRoll, this.curYaw);
  }

  sendRightStick(values: IStickMovement[]): void {
    const rangeMotor = MAX_MOTOR_VALUE - MIN_MOTOR_VALUE; //might be weird to use it here, but it works
    const rangeDirection = MAX_DIRECTION_VALUE - MIN_DIRECTION_VALUE;

    const roll = this.getValueForCode(CODE_ROLL, values);
    const pitch = this.getValueForCode(CODE_PITCH, values);

    const rollValue = -20 + (roll / rangeMotor) * 40;
    const pitchValue = -20 + (pitch / rangeDirection) * 40;

    this.curRoll = rollValue;
    this.curPitch = pitchValue;

    this.sendPitchRollYaw(this.curPitch, this.curRoll, this.curYaw);
  }

  sendArm(): void {
    this.communicationManager.sendArm();
  }

  sendDisarm(): void {
    this.communicationManager.sendDisarm();
  }

  sendActivateAltHold(): void {
    this.communicationManager.sendAltHold();
  }

  sendStopAltHold(): void {
    this.communicationManager.sendAltHold();
  }

  sendTakeOff(): void {
    this.communicationManager.sendTakeOff();
  }

  sendGoHome(): void {
    //not yet implemented
  }

  sendHeartbeat(): void {
    //we don't do that here
    this.communicationManager.sendHeartbeat();
  }

  private sendThrottle(percent: number) {
    this.communicationManager.sendThrottle(percent);
  }

  private sendPitchRollYaw(pitch: number, roll: number, yaw: number) {
    this.communicationManager.sendPitchRollYaw(pitch, roll, yaw);
  }

  private getValueForCode(code: number, values: IStickMovement[]): number {
    values.forEach(movement => {
      if (movement.code == code) {
        return movement.val;
      }
    });
    return 0;
  }
}
