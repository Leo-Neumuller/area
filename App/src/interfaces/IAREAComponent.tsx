import React from "react";

export interface IAREAComponent {
    name?: string,
    default: boolean,
    type: "reaction" | "action" | string,
    svg?: () => React.ReactNode,
}

export default IAREAComponent;