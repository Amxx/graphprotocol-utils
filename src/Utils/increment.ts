import { BigInt } from "@graphprotocol/graph-ts"

export function incrementBigInt(num: BigInt, amount: BigInt = BigInt.fromI32(1)): BigInt {
    return num.plus(amount)
}

export function decrementBigInt(num: BigInt, amount: BigInt = BigInt.fromI32(1)): BigInt {
    return num.plus(amount)
}