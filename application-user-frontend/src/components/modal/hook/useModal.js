import { useState } from "react";

const useModal = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);

    return {
        open,
        handleOpen
    };
};

export default useModal;
