export enum MavSmartBatteryFault {
	MAV_SMART_BATTERY_FAULT_DEEP_DISCHARGE = 1, // Battery has deep discharged.
	MAV_SMART_BATTERY_FAULT_SPIKES = 2, // Voltage spikes.
	MAV_SMART_BATTERY_FAULT_SINGLE_CELL_FAIL = 4, // Single cell has failed.
	MAV_SMART_BATTERY_FAULT_OVER_CURRENT = 8, // Over-current fault.
	MAV_SMART_BATTERY_FAULT_OVER_TEMPERATURE = 16, // Over-temperature fault.
	MAV_SMART_BATTERY_FAULT_UNDER_TEMPERATURE = 32, // Under-temperature fault.
	MAV_SMART_BATTERY_FAULT_ENUM_END = 33, // 
}