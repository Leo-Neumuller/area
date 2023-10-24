import React from "react";
import {IServiceSchema} from "./IServiceSchema";

export interface IAREAComponent {
    name?: string,
    default: boolean,
    type: "reaction" | "action" | string,
    svg?: () => React.ReactNode,
    serviceSchema?: IServiceSchema,
}
export default IAREAComponent;