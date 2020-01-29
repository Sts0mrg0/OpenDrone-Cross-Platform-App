import {MAVLinkMessage} from '@ifrunistuttgart/node-mavlink';
import {readInt64LE, readUInt64LE} from '@ifrunistuttgart/node-mavlink';
import {ComponentCapFlags} from '../enums/component-cap-flags';
/*
Information about a component. For camera components instead use CAMERA_INFORMATION, and for autopilots use AUTOPILOT_VERSION. Components including GCSes should consider supporting requests of this message via MAV_CMD_REQUEST_MESSAGE.
*/
// time_boot_ms Timestamp (time since system boot). uint32_t
// vendor_name Name of the component vendor uint8_t
// model_name Name of the component model uint8_t
// firmware_version Version of the component firmware (v << 24 & 0xff = Dev, v << 16 & 0xff = Patch, v << 8 & 0xff = Minor, v & 0xff = Major) uint32_t
// hardware_version Version of the component hardware (v << 24 & 0xff = Dev, v << 16 & 0xff = Patch, v << 8 & 0xff = Minor, v & 0xff = Major) uint32_t
// capability_flags Bitmap of component capability flags. uint32_t
// component_definition_version Component definition version (iteration) uint16_t
// component_definition_uri Component definition URI (if any, otherwise only basic functions will be available). The XML format is not yet specified and work in progress. char
export class ComponentInformation extends MAVLinkMessage {
	public time_boot_ms!: number;
	public vendor_name!: number;
	public model_name!: number;
	public firmware_version!: number;
	public hardware_version!: number;
	public capability_flags!: ComponentCapFlags;
	public component_definition_version!: number;
	public component_definition_uri!: string;
	public _message_id: number = 395;
	public _message_name: string = 'COMPONENT_INFORMATION';
	public _crc_extra: number = 231;
	public _message_fields: [string, string, boolean][] = [
		['time_boot_ms', 'uint32_t', false],
		['firmware_version', 'uint32_t', false],
		['hardware_version', 'uint32_t', false],
		['capability_flags', 'uint32_t', false],
		['component_definition_version', 'uint16_t', false],
		['vendor_name', 'uint8_t', false],
		['model_name', 'uint8_t', false],
		['component_definition_uri', 'char', false],
	];
}