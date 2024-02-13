export default function caloriesCalculator(weight: string, date: string): number {
    let birthday = new Date('2002-10-03').getTime();
    let ageDifMs = new Date(date).getTime() - birthday;
    let ageDate = new Date(ageDifMs);
    const age = Math.abs(ageDate.getUTCFullYear() - 1970);

    let calories = 10 * Number(weight) + 6.25 * 175 - 5 * age + 5;
    calories *= 1.507;
    return Math.ceil(calories);
}
