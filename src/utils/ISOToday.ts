export default function ISOToday() {
    return new Date().toISOString().split('T')[0];
}
