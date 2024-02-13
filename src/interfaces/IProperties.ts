export default interface IProperties {
    Title?: {
        title: [
            {
                text: {
                    content: string;
                };
            }
        ];
    };
    Work: {
        number: number | null;
    };
    Weight: {
        number: number | null;
    };
    Calories: {
        formula: {
            number: number | null;
        }
    };
    Fajr: {
        checkbox: boolean;
    };
    Quran: {
        checkbox: boolean;
    };
    Exercise: {
        checkbox: boolean;
    };
    Macros: {
        checkbox: boolean;
    };
    Date: {
        date: {
            start: string;
        };
    };
}
