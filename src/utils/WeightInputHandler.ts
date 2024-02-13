import { FocusEvent, SetStateAction } from 'react';

export default function WeightInputHandler(
    e: FocusEvent<HTMLInputElement, Element>,
    setState: (value: SetStateAction<string>) => void,
    sendState: string,
    setSendState: (value: SetStateAction<string>) => void,
    updateWeight: (weight: string) => Promise<void>
) {
    if (e.target.value == sendState || e.target.value == '' || Number.isNaN(Number(e.target.value)) || e.target.value == null) {
        setState(sendState);
    } else {
        let result = String(Number(e.target.value));
        setState(result);
        setSendState(result);
        updateWeight(result);
    }
}
