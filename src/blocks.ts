import { ethereum             } from '@graphprotocol/graph-ts'
import { Block as BlockEntity } from '../generated/schema'

export namespace blocks {
	export function log(block: ethereum.Block): BlockEntity {
		let entity       = new BlockEntity(block.number.toHex())
		entity.number    = block.number
		entity.timestamp = block.timestamp
		entity.save()
		return entity as BlockEntity
	}
	export type Block = BlockEntity
}
