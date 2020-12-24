import { Address as AddressType   } from '@graphprotocol/graph-ts'
import { Address as AddressEntity } from '../generated/schema'

export namespace addresses {
	export function log(address: AddressType): AddressEntity {
		let entity = new AddressEntity(address.toHex())
		entity.save()
		return entity as AddressEntity
	}
	export type Address = AddressEntity
}
