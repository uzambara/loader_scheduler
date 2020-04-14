import {useState} from "react";

export function useDialog(initialDialogOpen: boolean) {
    const [open, setOpen] = useState(initialDialogOpen);
    return {
        isOpen: open,
        open: () => setOpen(true),
        close: () => setOpen(false)
    }
}
