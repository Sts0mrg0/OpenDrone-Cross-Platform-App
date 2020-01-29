import {MAVLinkMessage} from '@ifrunistuttgart/node-mavlink';
import {readInt64LE, readUInt64LE} from '@ifrunistuttgart/node-mavlink';
import {MavOdidLocationSrc} from '../enums/mav-odid-location-src';
/*
Data for filling the OpenDroneID System message. The System Message contains general system information including the operator location and possible aircraft group information.
*/
// flags Specifies the location source for the operator location. uint8_t
// operator_latitude Latitude of the operator. If unknown: 0 deg (both Lat/Lon). int32_t
// operator_longitude Longitude of the operator. If unknown: 0 deg (both Lat/Lon). int32_t
// area_count Number of aircraft in the area, group or formation (default 1). uint16_t
// area_radius Radius of the cylindrical area of the group or formation (default 0). uint16_t
// area_ceiling Area Operations Ceiling relative to WGS84. If unknown: -1000 m. float
// area_floor Area Operations Floor relative to WGS84. If unknown: -1000 m. float
export class OpenDroneIdSystem extends MAVLinkMessage {
	public flags!: MavOdidLocationSrc;
	public operator_latitude!: number;
	public operator_longitude!: number;
	public area_count!: number;
	public area_radius!: number;
	public area_ceiling!: number;
	public area_floor!: number;
	public _message_id: number = 12904;
	public _message_name: string = 'OPEN_DRONE_ID_SYSTEM';
	public _crc_extra: number = 238;
	public _message_fields: [string, string, boolean][] = [
		['operator_latitude', 'int32_t', false],
		['operator_longitude', 'int32_t', false],
		['area_ceiling', 'float', false],
		['area_floor', 'float', false],
		['area_count', 'uint16_t', false],
		['area_radius', 'uint16_t', false],
		['flags', 'uint8_t', false],
	];
}