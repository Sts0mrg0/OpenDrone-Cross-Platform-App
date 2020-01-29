import {MAVLinkMessage} from '@ifrunistuttgart/node-mavlink';
import {readInt64LE, readUInt64LE} from '@ifrunistuttgart/node-mavlink';
import {MavOdidStatus} from '../enums/mav-odid-status';
import {MavOdidHeightRef} from '../enums/mav-odid-height-ref';
import {MavOdidHorAcc} from '../enums/mav-odid-hor-acc';
import {MavOdidVerAcc} from '../enums/mav-odid-ver-acc';
import {MavOdidSpeedAcc} from '../enums/mav-odid-speed-acc';
import {MavOdidTimeAcc} from '../enums/mav-odid-time-acc';
/*
Data for filling the OpenDroneID Location message. The float data types are 32-bit IEEE 754. The Location message provides the location, altitude, direction and speed of the aircraft.
*/
// status Indicates whether the Unmanned Aircraft is on the ground or in the air. uint8_t
// direction Direction over ground (not heading, but direction of movement) in degrees * 100: 0.0 - 359.99 degrees. If unknown: 361.00 degrees. uint16_t
// speed_horizontal Ground speed. Positive only. If unknown: 255.00 m/s. If speed is larger than 254.25 m/s, use 254.25 m/s. uint16_t
// speed_vertical The vertical speed. Up is positive. If unknown: 63.00 m/s. If speed is larger than 62.00 m/s, use 62.00 m/s. int16_t
// latitude Current latitude of the UA (Unmanned Aircraft). If unknown: 0 deg (both Lat/Lon). int32_t
// longitude Current longitude of the UA (Unmanned Aircraft). If unknown: 0 deg (both Lat/Lon). int32_t
// altitude_barometric The altitude calculated from the barometric pressue. Reference is against 29.92inHg or 1013.2mb. If unknown: -1000 m. float
// altitude_geodetic The geodetic altitude as defined by WGS84. If unknown: -1000 m. float
// height_reference Indicates the reference point for the height field. uint8_t
// height The current height of the UA (Unmanned Aircraft) above the take-off location or the ground as indicated by height_reference. If unknown: -1000 m. float
// horizontal_accuracy The accuracy of the horizontal position. uint8_t
// vertical_accuracy The accuracy of the vertical position. uint8_t
// barometer_accuracy The accuracy of the barometric altitude. uint8_t
// speed_accuracy The accuracy of the horizontal and vertical speed. uint8_t
// timestamp Seconds after the full hour. Typically the GPS outputs a time of week value in milliseconds. That value can be easily converted for this field using ((float) (time_week_ms % (60*60*1000))) / 1000. float
// timestamp_accuracy The accuracy of the timestamps. uint8_t
export class OpenDroneIdLocation extends MAVLinkMessage {
	public status!: MavOdidStatus;
	public direction!: number;
	public speed_horizontal!: number;
	public speed_vertical!: number;
	public latitude!: number;
	public longitude!: number;
	public altitude_barometric!: number;
	public altitude_geodetic!: number;
	public height_reference!: MavOdidHeightRef;
	public height!: number;
	public horizontal_accuracy!: MavOdidHorAcc;
	public vertical_accuracy!: MavOdidVerAcc;
	public barometer_accuracy!: MavOdidVerAcc;
	public speed_accuracy!: MavOdidSpeedAcc;
	public timestamp!: number;
	public timestamp_accuracy!: MavOdidTimeAcc;
	public _message_id: number = 12901;
	public _message_name: string = 'OPEN_DRONE_ID_LOCATION';
	public _crc_extra: number = 16;
	public _message_fields: [string, string, boolean][] = [
		['latitude', 'int32_t', false],
		['longitude', 'int32_t', false],
		['altitude_barometric', 'float', false],
		['altitude_geodetic', 'float', false],
		['height', 'float', false],
		['timestamp', 'float', false],
		['direction', 'uint16_t', false],
		['speed_horizontal', 'uint16_t', false],
		['speed_vertical', 'int16_t', false],
		['status', 'uint8_t', false],
		['height_reference', 'uint8_t', false],
		['horizontal_accuracy', 'uint8_t', false],
		['vertical_accuracy', 'uint8_t', false],
		['barometer_accuracy', 'uint8_t', false],
		['speed_accuracy', 'uint8_t', false],
		['timestamp_accuracy', 'uint8_t', false],
	];
}