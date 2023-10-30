export default interface Node {
    id: string;
    numberInputs: number;
    numberOutputs: number;
    prevPosition: {x: number; y: number};
    currPosition: {x: number; y: number};
    type: string;
    
    inputEdgeIds: String[];
    outputEdgeIds: String[];

    title: string;
    img: string;
}