import {MAVLinkMessage} from '@ifrunistuttgart/node-mavlink';
import {readInt64LE, readUInt64LE} from '@ifrunistuttgart/node-mavlink';
/*
Describe a trajectory using an array of up-to 5 bezier points in the local frame.
*/
// time_usec Timestamp (UNIX Epoch time or time since system boot). The receiving end can infer timestamp format (since 1.1.1970 or since system boot) by checking for the magnitude the number. uint64_t
// valid_points Number of valid points (up-to 5 waypoints are possible) uint8_t
// pos_x X-coordinate of starting bezier point, set to NaN if not being used float
// pos_y Y-coordinate of starting bezier point, set to NaN if not being used float
// pos_z Z-coordinate of starting bezier point, set to NaN if not being used float
// delta Bezier time horizon, set to NaN if velocity/acceleration should not be incorporated float
// pos_yaw Yaw, set to NaN for unchanged float
export class TrajectoryRepresentationBezier extends MAVLinkMessage {
	public time_usec!: number;
	public valid_points!: number;
	public pos_x!: number;
	public pos_y!: number;
	public pos_z!: number;
	public delta!: number;
	public pos_yaw!: number;
	public _message_id: number = 333;
	public _message_name: string = 'TRAJECTORY_REPRESENTATION_BEZIER';
	public _crc_extra: number = 231;
	public _message_fields: [string, string, boolean][] = [
		['time_usec', 'uint64_t', false],
		['pos_x', 'float', false],
		['pos_y', 'float', false],
		['pos_z', 'float', false],
		['delta', 'float', false],
		['pos_yaw', 'float', false],
		['valid_points', 'uint8_t', false],
	];
}