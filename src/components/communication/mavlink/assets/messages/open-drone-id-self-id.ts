import {MAVLinkMessage} from '@ifrunistuttgart/node-mavlink';
import {readInt64LE, readUInt64LE} from '@ifrunistuttgart/node-mavlink';
import {MavOdidDescType} from '../enums/mav-odid-desc-type';
/*
Data for filling the OpenDroneID Self ID message. The Self ID Message is an opportunity for the operator to (optionally) declare their identity and purpose of the flight. This message can provide additional information that could reduce the threat profile of a UA (Unmanned Aircraft) flying in a particular area or manner.
*/
// description_type Indicates the type of the description field. uint8_t
// description Text description or numeric value expressed as ASCII characters. Shall be filled with nulls in the unused portion of the field. char
export class OpenDroneIdSelfId extends MAVLinkMessage {
	public description_type!: MavOdidDescType;
	public description!: string;
	public _message_id: number = 12903;
	public _message_name: string = 'OPEN_DRONE_ID_SELF_ID';
	public _crc_extra: number = 149;
	public _message_fields: [string, string, boolean][] = [
		['description_type', 'uint8_t', false],
		['description', 'char', false],
	];
}