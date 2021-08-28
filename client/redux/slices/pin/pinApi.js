import { getPins } from '../../../apis'

export async function fetchPins() {
    const pins = await getPins()
    return pins
}