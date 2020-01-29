import {MAVLinkMessage} from '@ifrunistuttgart/node-mavlink';
import {readInt64LE, readUInt64LE} from '@ifrunistuttgart/node-mavlink';
import {MavSeverity} from '../enums/mav-severity';
/*
Status text message (use only for important status and error messages). The full message payload can be used for status text, but we recommend that updates be kept concise. Note: The message is intended as a less restrictive replacement for STATUSTEXT.
*/
// severity Severity of status. Relies on the definitions within RFC-5424. uint8_t
// text Status text message, without null termination character. char
export class StatustextLong extends MAVLinkMessage {
	public severity!: MavSeverity;
	public text!: string;
	public _message_id: number = 365;
	public _message_name: string = 'STATUSTEXT_LONG';
	public _crc_extra: number = 36;
	public _message_fields: [string, string, boolean][] = [
		['severity', 'uint8_t', false],
		['text', 'char', false],
	];
}