import {MAVLinkMessage} from '@ifrunistuttgart/node-mavlink';
import {readInt64LE, readUInt64LE} from '@ifrunistuttgart/node-mavlink';
import {CellularNetworkStatusFlag} from '../enums/cellular-network-status-flag';
import {CellularNetworkRadioType} from '../enums/cellular-network-radio-type';
/*
Report current used cellular network status
*/
// status Status bitmap uint16_t
// type Cellular network radio type: gsm, cdma, lte... uint8_t
// quality Cellular network RSSI/RSRP in dBm, absolute value uint8_t
// mcc Mobile country code. If unknown, set to: UINT16_MAX uint16_t
// mnc Mobile network code. If unknown, set to: UINT16_MAX uint16_t
// lac Location area code. If unknown, set to: 0 uint16_t
// cid Cell ID. If unknown, set to: UINT32_MAX uint32_t
export class CellularStatus extends MAVLinkMessage {
	public status!: CellularNetworkStatusFlag;
	public type!: CellularNetworkRadioType;
	public quality!: number;
	public mcc!: number;
	public mnc!: number;
	public lac!: number;
	public cid!: number;
	public _message_id: number = 334;
	public _message_name: string = 'CELLULAR_STATUS';
	public _crc_extra: number = 135;
	public _message_fields: [string, string, boolean][] = [
		['cid', 'uint32_t', false],
		['status', 'uint16_t', false],
		['mcc', 'uint16_t', false],
		['mnc', 'uint16_t', false],
		['lac', 'uint16_t', false],
		['type', 'uint8_t', false],
		['quality', 'uint8_t', false],
	];
}