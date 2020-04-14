import React, {CSSProperties, PropsWithChildren} from "react";
import Modal from "@material-ui/core/Modal";

export interface StdModalProps {
    backDropStyle?: CSSProperties,
    style?: CSSProperties
}

export function StdModal(props: PropsWithChildren<any>) {
    return <Modal
        open={true}
        className={props.className}
        hideBackdrop={false}
        style={props.style}
        unselectable="on"
        BackdropProps={{
            style: props.backDropStyle
        }}
    >
        {props.children}
    </Modal>
}
