import { BigDecimal, BigInt } from '@graphprotocol/graph-ts'

export namespace constants {
	export let   BIGINT_ZERO      = BigInt.fromI32(0)
	export let   BIGINT_ONE       = BigInt.fromI32(1)
	export let   BIGDECIMAL_ZERO  = new BigDecimal(constants.BIGINT_ZERO)
	export const ZERO_ADDRESS     = '0x0000000000000000000000000000000000000000'
	export const ZERO_BYTES32     = '0x0000000000000000000000000000000000000000000000000000000000000000'
}
