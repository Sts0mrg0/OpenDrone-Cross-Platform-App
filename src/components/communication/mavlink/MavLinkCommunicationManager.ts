import { MAVLinkModule } from "@ifrunistuttgart/node-mavlink";
import { messageRegistry } from "./assets/message-registry";

import * as udp from "react-native-udp";

import { MavLinkPrepper } from "./MavLinkPrepper";

global.Buffer = global.Buffer || require("buffer").Buffer;
const DEFAULT_IP = "172.168.1.254";
const DEFAULT_PORT = 14551;

export class MavLinkCommunicationManager {
  private static myInstance = null;

  private client = udp.createSocket("udp4");
  private mavLink = new MAVLinkModule(messageRegistry);
  private mavLinkPrepper = new MavLinkPrepper(this.mavLink);

  private ip = DEFAULT_IP;
  private port = DEFAULT_PORT;

  constructor(ip: string, port: number) {
    if (ip) {
      this.ip = ip;
    }
    if (port >= 0) {
      this.port = port;
    }
  }

  static getInstance(ip?: string, port?: number): MavLinkCommunicationManager {
    if (MavLinkCommunicationManager.myInstance == null) {
      MavLinkCommunicationManager.myInstance = new MavLinkCommunicationManager(ip, port);
    }

    return this.myInstance;
  }

  private _sendMessage(buffer: Buffer, successCallback?: () => any, errorCallback?: () => any) {
    const ip = this.ip;
    const port = this.port;
    this.client.send(buffer, port, ip, function(error) {
      if (error) {
        this.client.close();
        errorCallback();
      } else {
        successCallback();
      }
    });
  }

  public sendHeartbeat(successCallback?: () => any, errorCallback?: () => any) {
    const buffer = this.mavLinkPrepper.prepareHeartbeat();
    this._sendMessage(buffer, successCallback, errorCallback);
  }

  public sendAbort(successCallback?: () => any, errorCallback?: () => any) {
    const buffer = this.mavLinkPrepper.prepareAbort(1);
    this._sendMessage(buffer, successCallback, errorCallback);
  }

  public sendArm(successCallback?: () => any, errorCallback?: () => any) {
    const buffer = this.mavLinkPrepper.prepareArm();
    this._sendMessage(buffer, successCallback, errorCallback);
  }

  public sendDisarm(successCallback?: () => any, errorCallback?: () => any) {
    const buffer = this.mavLinkPrepper.prepareDisarm();
    this._sendMessage(buffer, successCallback, errorCallback);
  }

  public sendTakeOff(successCallback?: () => any, errorCallback?: () => any) {
    const buffer = this.mavLinkPrepper.prepareTakeOff();
    this._sendMessage(buffer), successCallback, errorCallback;
  }

  public sendThrottle(percent: number, successCallback?: () => any, errorCallback?: () => any) {
    const buffer = this.mavLinkPrepper.prepareThrottle(percent);
    this._sendMessage(buffer, successCallback, errorCallback);
  }

  //degrees from -20 - 20. Officially, the unit is rad/s but for simplicity we just use degrees
  public sendPitchRollYaw(
    pitch: number,
    roll: number,
    yaw: number,
    successCallback?: () => any,
    errorCallback?: () => any
  ) {
    const buffer = this.mavLinkPrepper.preparePitchRollYaw(pitch, roll, yaw);
    this._sendMessage(buffer, successCallback, errorCallback);
  }

  public sendAltHold(successCallback?: () => any, errorCallback?: () => any) {
    const buffer = this.mavLinkPrepper.prepareAltHold();
    this._sendMessage(buffer, successCallback, errorCallback);
  }
}
