import {MAVLinkMessage} from '@ifrunistuttgart/node-mavlink';
import {readInt64LE, readUInt64LE} from '@ifrunistuttgart/node-mavlink';
import {MavOdidIdType} from '../enums/mav-odid-id-type';
import {MavOdidUaType} from '../enums/mav-odid-ua-type';
/*
Data for filling the OpenDroneID Basic ID message. This and the below messages are primarily meant for feeding data to/from an OpenDroneID implementation. E.g. https://github.com/opendroneid/opendroneid-core-c
*/
// id_type Indicates the format for the uas_id field of this message. uint8_t
// ua_type Indicates the type of UA (Unmanned Aircraft). uint8_t
// uas_id UAS (Unmanned Aircraft System) ID following the format specified by id_type. Shall be filled with nulls in the unused portion of the field. uint8_t
export class OpenDroneIdBasicId extends MAVLinkMessage {
	public id_type!: MavOdidIdType;
	public ua_type!: MavOdidUaType;
	public uas_id!: number;
	public _message_id: number = 12900;
	public _message_name: string = 'OPEN_DRONE_ID_BASIC_ID';
	public _crc_extra: number = 197;
	public _message_fields: [string, string, boolean][] = [
		['id_type', 'uint8_t', false],
		['ua_type', 'uint8_t', false],
		['uas_id', 'uint8_t', false],
	];
}