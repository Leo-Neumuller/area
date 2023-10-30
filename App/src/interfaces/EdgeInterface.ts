export default interface Edge {
    id: string;
    nodeStartId: string;
    nodeEndId: string;
    inputIndex: number;
    outputIndex: number;

    prevStartPos: {x: number, y: number};
    currStartPos: {x: number, y: number};
    prevEndPos: {x: number, y: number};
    currEndPos: {x: number, y: number};
}