import { ethereum, Address, Bytes } from '@graphprotocol/graph-ts'

export namespace erc165 {
	export function supportsInterface(address: Address, interfaceId: String, expected: boolean = true): boolean {
		let contract = new ethereum.SmartContract('', address)
		let result = contract.tryCall(
			'supportsInterface',
			'supportsInterface(bytes4):(bool)',
			[ethereum.Value.fromFixedBytes(Bytes.fromHexString(interfaceId) as Bytes)]
		)
		if (!result.reverted) {
			let value = result.value
			return value[0].toBoolean() == expected
		}
		return false
	}
}
