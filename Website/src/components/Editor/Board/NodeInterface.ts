export default interface Node {
    id: string;
    numberInputs: number;
    numberOutputs: number;
    prevPosition: {x: number; y: number};
    currPosition: {x: number; y: number};
    
    inputEdgeIds: String[];
    outputEdgeIds: String[];
}