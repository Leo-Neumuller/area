export interface IServiceSchema {
    id: string;
    name: string;
    description: string;
    type: "action" | "reaction";
    inputsData : [
        data: {
            id: string;
            name: string;
            inputType: "text" | "number" | "textMultiline" | "select" | "checkbox";
            type: string;
            required: boolean;
            data: [
                {
                    Items: string;
                }
            ]
            value?: string;
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