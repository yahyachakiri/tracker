export default interface ITodolistProperties {
    Name: {
        title: [
            {
                text: {
                    content: string;
                };
            }
        ];
    };
    Type: {
        select: {
            name: string;
        };
    };
    Priority: {
        select: {
            name?: string;
        };
    };
    Done: {
        checkbox: boolean;
    };
    Date: {
        date: {
            start: string;
            end: string | null;
        };
    };
    Deadline: {
        date: {
            start: string;
            end: string | null;
        };
    };
}
