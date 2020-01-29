const net = require("react-native-tcp");

export default class CommunicationManager {
  static myInstance = null;

  private _client: any;
  private _isConnected = false;
  private _ip = "127.0.0.1";
  private _port = 2018;

  constructor(ip: string, port: number) {
    this.setPortAndIP(ip, port);

    this._client = net.createConnection(
      { host: this._ip, port: this._port },
      this._port,
      () => (this._isConnected = true)
    );
    this._client.on("error", () => {
      console.log("shit");
      this._isConnected = false;
    });
    this._client.on("close", () => (this._isConnected = false));
  }

  static getInstance(ip?: string, port?: number): CommunicationManager {
    if (CommunicationManager.myInstance == null) {
      if (!!ip && !!port) {
        CommunicationManager.myInstance = new CommunicationManager(ip, port);
      }
    }

    return this.myInstance;
  }

  listenToMessages(callback: (message: string) => any): void {
    this._client.on("data", function(data) {
      callback(data);
    });
  }

  sendMessage(message: string) {
    if (this._isConnected) {
      this._client.write(`${message}\n`);
    }
  }

  private setPort(port: number) {
    this._port = port;
  }

  private setIP(ip: string) {
    this._ip = ip;
  }

  private setPortAndIP(ip: string, port: number) {
    this.setIP(ip);
    this.setPort(port);
  }
}
