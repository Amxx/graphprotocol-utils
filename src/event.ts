import {
	ethereum,
} from '@graphprotocol/graph-ts'

export namespace event {
	export function id(event: ethereum.Event): string {
		return event.block.number.toString().concat('-').concat(event.logIndex.toString())
	}
}
