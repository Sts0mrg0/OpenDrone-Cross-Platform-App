import {MAVLinkMessage} from '@ifrunistuttgart/node-mavlink';
import {readInt64LE, readUInt64LE} from '@ifrunistuttgart/node-mavlink';
import {MavOdidOperatorIdType} from '../enums/mav-odid-operator-id-type';
/*
Data for filling the OpenDroneID Operator ID message, which contains the CAA (Civil Aviation Authority) issued operator ID.
*/
// operator_id_type Indicates the type of the operator_id field. uint8_t
// operator_id Text description or numeric value expressed as ASCII characters. Shall be filled with nulls in the unused portion of the field. char
export class OpenDroneIdOperatorId extends MAVLinkMessage {
	public operator_id_type!: MavOdidOperatorIdType;
	public operator_id!: string;
	public _message_id: number = 12905;
	public _message_name: string = 'OPEN_DRONE_ID_OPERATOR_ID';
	public _crc_extra: number = 56;
	public _message_fields: [string, string, boolean][] = [
		['operator_id_type', 'uint8_t', false],
		['operator_id', 'char', false],
	];
}