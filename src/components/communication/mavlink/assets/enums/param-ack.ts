export enum ParamAck {
	PARAM_ACK_ACCEPTED = 0, // Parameter value ACCEPTED and SET
	PARAM_ACK_VALUE_UNSUPPORTED = 1, // Parameter value UNKNOWN/UNSUPPORTED
	PARAM_ACK_FAILED = 2, // Parameter failed to set
	PARAM_ACK_IN_PROGRESS = 3, // Parameter value received but not yet validated or set. A subsequent PARAM_EXT_ACK will follow once operation is completed with the actual result. These are for parameters that may take longer to set. Instead of waiting for an ACK and potentially timing out, you will immediately receive this response to let you know it was received.
	PARAM_ACK_ENUM_END = 4, // 
}