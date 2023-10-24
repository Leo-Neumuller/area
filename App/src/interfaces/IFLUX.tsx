import React from "react";

export interface IFLUX {
    id: number,
    name: string,
    description: string,
    nodes: [
        {
            id: string,
            numberInputs: number,
            numberOutputs: number,
            service?: string,
            subService?: string,
            subServiceId?: string,
            inputDataFromSubServiceId?: string,
            inputsData?: Array<object>,
            prevPosition: { x: number, y: number },
            currPosition: { x: number, y: number },
            type: string,
            inputEdgeIds: Array<string>,
            outputEdgeIds: Array<string>,
            title: string,
            img: string,
        }
    ],
    edges: [
        {
            id: string,
            nodeStartId: string,
            nodeEndId: string,
            inputIndex: number,
            outputIndex: number,
            prevStartPos: { x: number, y: number },
            currStartPos: { x: number, y: number },
            prevEndPos: { x: number, y: number },
            currEndPos: { x: number, y: number },
        }
    ]
}

export default IFLUX;
