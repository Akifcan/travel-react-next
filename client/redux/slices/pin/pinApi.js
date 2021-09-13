import { getPins } from '../../../apis'

export async function fetchPins() {
	const pins = await getPins()
	return pins
}

export async function fetchListedPins() {
	const pins = await fetch(`${process.env.BASE_URL}/pins?staticMap=true`)
	const json = await pins.json()
	return json
}
