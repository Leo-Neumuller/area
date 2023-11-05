enum inputType {
    "text" = "text",
    "number" = "number",
    "textMultiline" = "textMultiline",
    "select" = "select",
    "checkbox" = "checkbox",
    "date" = "date"
}

interface inputData {
    id: string;
    name: string;
    data: string[];
    inputType: inputType;
    type: string;
    required: boolean;
    value?: any;
}

export default interface Node {
    id: string;
    numberInputs: number;
    numberOutputs: number;
    service: string;
    subService?: string;
    subServiceId?: string;
    inputDataFromSubServiceId?: string;
    inputsData?: inputData[];

    prevPosition: {x: number; y: number};
    currPosition: {x: number; y: number};
    type: string;
    
    inputEdgeIds: String[];
    outputEdgeIds: String[];

    title: string;
    img: string;
}

export {inputType};
export type { inputData };
