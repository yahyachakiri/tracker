import { FocusEvent, SetStateAction } from 'react';

export default function WorkInputHandler(
    e: FocusEvent<HTMLInputElement, Element>,
    setState: (value: SetStateAction<string>) => void,
    sendState: string,
    setSendState: (value: SetStateAction<string>) => void,
    sendOtherState: string,
    updateWork: (min: string, h: string) => Promise<void>,
    type: 'minutes' | 'hours'
) {
    if (
        e.target.value == sendState ||
        e.target.value == '' ||
        Number.isNaN(Number(e.target.value)) ||
        e.target.value == null ||
        Number(e.target.value) > 59
    ) {
        setState(sendState);
    } else {
        setSendState(e.target.value);
        if (type == 'minutes') {
            updateWork(e.target.value, sendOtherState as string);
        } else if (type == 'hours') {
            updateWork(sendOtherState as string, e.target.value);
        }
    }
}
