import { Address, BigDecimal, BigInt, Bytes } from '@graphprotocol/graph-ts'

export namespace constants {
	export let   BIGINT_ZERO      = BigInt.fromI32(0)
	export let   BIGINT_ONE       = BigInt.fromI32(1)
	export let   BIGDECIMAL_ZERO  = new BigDecimal(constants.BIGINT_ZERO)
	export let   BIGDECIMAL_ONE   = new BigDecimal(constants.BIGINT_ONE)
	export const ADDRESS_ZERO     = Address.fromString('0x0000000000000000000000000000000000000000')
	export const BYTES32_ZERO     = Bytes.fromHexString('0x0000000000000000000000000000000000000000000000000000000000000000') as Bytes
}
