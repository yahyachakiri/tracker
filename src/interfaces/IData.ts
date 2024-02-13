export default interface IData {
    properties: {
        Done: {
            checkbox: boolean;
        };
        Undone: {
            checkbox: boolean;
        };
        MW: {
            number: number;
        };
        Priority: {
            select: {
                name: string;
            };
        };
        Date: {
            date: {
                start: string;
            };
        };
        Name: {
            title: [
                {
                    text: {
                        content: string;
                    };
                }
            ];
        };
    };
}
