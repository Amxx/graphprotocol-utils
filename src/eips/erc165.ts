import { ethereum, Address, Bytes } from '@graphprotocol/graph-ts'

export namespace erc165 {
	export function supportsInterface(contract: ethereum.SmartContract, interfaceId: String, expected: boolean = true): boolean {
		let result = ethereum.call(new ethereum.SmartContractCall(
			contract._name,
			contract._address,
			'supportsInterface',
			'supportsInterface(bytes4):(bool)',
			[ethereum.Value.fromFixedBytes(Bytes.fromHexString(interfaceId) as Bytes)]
		))
		return result != null && (result as Array<ethereum.Value>)[0].toBoolean() == expected
	}
	// export function supportsInterface(address: Address, interfaceId: String, expected: boolean = true): boolean {
	// 	let result = ethereum.call(new ethereum.SmartContractCall(
	// 		'', // contract name
	// 		address,
	// 		'', // function name
	// 		'supportsInterface(bytes4):(bool)',
	// 		[ethereum.Value.fromFixedBytes(Bytes.fromHexString(interfaceId) as Bytes)]
	// 	))
	// 	return result != null && (result as Array<ethereum.Value>)[0].toBoolean() == expected
	// }
}
