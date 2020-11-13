import { BigDecimal, BigInt } from '@graphprotocol/graph-ts'

export namespace decimals {
	export const DEFAULT_DECIMALS = 18
	export function toDecimals(value: BigInt, decimals: number = DEFAULT_DECIMALS): BigDecimal {
		let precision = BigInt.fromI32(10).pow(<u8>decimals).toBigDecimal()
		return value.divDecimal(precision)
	}
}
