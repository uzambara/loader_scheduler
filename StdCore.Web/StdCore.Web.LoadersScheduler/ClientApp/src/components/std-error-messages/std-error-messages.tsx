import * as React from "react";

export interface IStdErrorMessages {
    messages: string[]
}

export function StdErrorMessages(props: IStdErrorMessages) {
    return <React.Fragment>
        {props.messages.map((m, idx) => <span key={idx}>{m}<br/></span>)}
    </React.Fragment>
}
