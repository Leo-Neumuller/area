export interface IServiceSchema {
    id: string;
    name: string;
    description: string;
    type: "action" | "reaction";
    inputsData : [
        data: {
            id: string;
            name: string;
            inputType: "text" | "number" | "textMultiline" | "select" | "checkbox" | "date";
            type: string;
            required: boolean;
            data: [
                {
                    Items: string;
                }
            ]
            value?: string | number | boolean | Date;
        }
    ],
    outputData : [
        {
            id: string;
            name: string;
            type: string;
        }
    ]
}