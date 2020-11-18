import { BigInt } from '@graphprotocol/graph-ts'
import { constants } from './constants'

export namespace integers {
	export function increment(num: BigInt, amount: BigInt = constants.BIGINT_ONE): BigInt {
		return num.plus(amount)
	}
	export function decrement(num: BigInt, amount: BigInt = constants.BIGINT_ONE): BigInt {
		return num.minus(amount)
	}
}
