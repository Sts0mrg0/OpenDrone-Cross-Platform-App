import {MAVLinkMessage} from '@ifrunistuttgart/node-mavlink';
import {readInt64LE, readUInt64LE} from '@ifrunistuttgart/node-mavlink';
import {MavSeverity} from '../enums/mav-severity';
/*
Status text message. These messages are printed in yellow in the COMM console of QGroundControl. WARNING: They consume quite some bandwidth, so use only for important status and error messages. If implemented wisely, these messages are buffered on the MCU and sent only at a limited rate (e.g. 10 Hz).
*/
// severity Severity of status. Relies on the definitions within RFC-5424. uint8_t
// text Status text message, without null termination character char
export class Statustext extends MAVLinkMessage {
	public severity!: MavSeverity;
	public text!: string;
	public _message_id: number = 253;
	public _message_name: string = 'STATUSTEXT';
	public _crc_extra: number = 83;
	public _message_fields: [string, string, boolean][] = [
		['severity', 'uint8_t', false],
		['text', 'char', false],
	];
}