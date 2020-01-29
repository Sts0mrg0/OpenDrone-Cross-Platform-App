import { MAVLinkMessage, MAVLinkModule } from "@ifrunistuttgart/node-mavlink";

import { MavCmd } from "./assets/enums/mav-cmd";
import { CommandLong } from "./assets/messages/command-long";
import { ManualSetpoint } from "./assets/messages/manual-setpoint";
import { Heartbeat } from "./assets/messages/heartbeat";

export class MavLinkPrepper {
  mavLink: MAVLinkModule;

  constructor(mavLink: MAVLinkModule) {
    this.mavLink = mavLink;
  }

  prepareHeartbeat(): Buffer {
    const cmd = new Heartbeat(1, 1);
    cmd.type = 7;

    return this.packMessage(cmd);
  }

  setVersion(): Buffer {
    const cmd = new CommandLong(1, 1);
    cmd.command = MavCmd.MAV_CMD_REQUEST_PROTOCOL_VERSION;
    cmd.param1 = 2;

    return this.packMessage(cmd);
  }

  //Method for sending the take-off-command to the drone
  prepareTakeOff(): Buffer {
    //Param1: Pitch, Param4: Yaw, Param5,6,7 -> Empty due to no gps needed for starting
    const cmd = new CommandLong(1, 1);
    cmd.command = MavCmd.MAV_CMD_NAV_TAKEOFF;
    cmd.param1 = 0;
    cmd.param4 = 0;
    cmd.param5 = 0;
    cmd.param6 = 0;
    cmd.param7 = 0;

    return this.packMessage(cmd);
  }

  //Method for setting the throttle of the drone
  prepareThrottle(percentage: number): Buffer {
    const cmd = new CommandLong(1, 1);
    cmd.command = MavCmd.MAV_CMD_DO_CHANGE_SPEED;
    cmd.param3 = percentage;

    return this.packMessage(cmd);
  }

  preparePitchRollYaw(pitch: number, roll: number, yaw: number): Buffer {
    //Param1: Pitch, Param4: Yaw, Param5,6,7 -> Empty due to no gps needed for starting
    //send in rad
    const cmd = new ManualSetpoint(1, 1);
    cmd.param1 = new Date().getMilliseconds();
    cmd.param2 = pitch;
    cmd.param3 = roll;
    cmd.param4 = yaw;
    cmd.param5 = 0; // 0 <= Thrust <= 1
    cmd.param6 = 0; // 0 <= ModeSwitch <= 255
    cmd.param7 = 0; // 0 <= OverrideSwitch <= 255

    return this.packMessage(cmd);
  }

  //Method for setting the altitude-hold
  prepareAltHold(): Buffer {
    const cmd = new CommandLong(1, 1);
    cmd.command = MavCmd.MAV_CMD_NAV_LOITER_UNLIM;
    cmd.param3 = 0;
    cmd.param4 = NaN;
    cmd.param5 = 0;
    cmd.param6 = 0;
    cmd.param7 = 0;

    return this.packMessage(cmd);
  }

  //Shutdown drone -> Drone will crash
  prepareAbort(param1: number): Buffer {
    const cmd = new CommandLong(1, 1);
    cmd.command = MavCmd.MAV_CMD_DO_FLIGHTTERMINATION;
    cmd.param1 = param1;

    return this.packMessage(cmd);
  }

  //Basic function for calling the arm method
  private _arm(param1: number): Buffer {
    const cmd = new CommandLong(1, 1);
    cmd.command = MavCmd.MAV_CMD_COMPONENT_ARM_DISARM;
    cmd.param1 = param1;
    cmd.param2 = 0;

    return this.packMessage(cmd);
  }

  //Arm drone
  prepareArm(): Buffer {
    return this._arm(0);
  }

  //Disarm drone
  prepareDisarm(): Buffer {
    return this._arm(1);
  }

  packMessage(message: MAVLinkMessage): Buffer {
    const messages: MAVLinkMessage[] = [message];
    return this.mavLink.pack(messages);
  }
}
