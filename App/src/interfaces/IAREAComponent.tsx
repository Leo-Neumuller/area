import React from "react";
import {IServiceSchema} from "./IServiceSchema";
import {IAREAServices} from "./IAREAServices";

export interface IAREAComponent {
    name?: string,
    default: boolean,
    type: "reaction" | "action" | string,
    svg?: () => React.ReactNode,
    serviceId?: string,
    subService?: IAREAServices,
    serviceSchema?: IServiceSchema,
}
export default IAREAComponent;