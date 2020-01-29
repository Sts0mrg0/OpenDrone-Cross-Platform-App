import {MAVLinkMessage} from '@ifrunistuttgart/node-mavlink';
import {readInt64LE, readUInt64LE} from '@ifrunistuttgart/node-mavlink';
import {MavSmartBatteryFault} from '../enums/mav-smart-battery-fault';
/*
Smart Battery information (dynamic). Use for updates from: smart battery to flight stack, flight stack to GCS. Use instead of BATTERY_STATUS for smart batteries.
*/
// id Battery ID uint16_t
// capacity_remaining Remaining battery energy. Values: [0-100], -1: field not provided. int16_t
// current Battery current (through all cells/loads). Positive if discharging, negative if charging. UINT16_MAX: field not provided. int16_t
// temperature Battery temperature. -1: field not provided. int16_t
// fault_bitmask Fault/health indications. int32_t
// time_remaining Estimated remaining battery time. -1: field not provided. int32_t
// cell_offset The cell number of the first index in the 'voltages' array field. Using this field allows you to specify cell voltages for batteries with more than 16 cells. uint16_t
// voltages Individual cell voltages. Batteries with more 16 cells can use the cell_offset field to specify the cell offset for the array specified in the current message . Index values above the valid cell count for this battery should have the UINT16_MAX value. uint16_t
export class SmartBatteryStatus extends MAVLinkMessage {
	public id!: number;
	public capacity_remaining!: number;
	public current!: number;
	public temperature!: number;
	public fault_bitmask!: MavSmartBatteryFault;
	public time_remaining!: number;
	public cell_offset!: number;
	public voltages!: number;
	public _message_id: number = 371;
	public _message_name: string = 'SMART_BATTERY_STATUS';
	public _crc_extra: number = 161;
	public _message_fields: [string, string, boolean][] = [
		['fault_bitmask', 'int32_t', false],
		['time_remaining', 'int32_t', false],
		['id', 'uint16_t', false],
		['capacity_remaining', 'int16_t', false],
		['current', 'int16_t', false],
		['temperature', 'int16_t', false],
		['cell_offset', 'uint16_t', false],
		['voltages', 'uint16_t', false],
	];
}