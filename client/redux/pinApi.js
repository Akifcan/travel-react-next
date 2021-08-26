import { getPins } from '../apis'

export function fetchCount(amount = 1) {
    return new Promise((resolve) =>
        setTimeout(() => resolve({ data: amount }), 500)
    );
}

export async function fetchPins() {
    const pins = await getPins()
    return pins
}