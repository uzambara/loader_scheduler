import {useCallback, useLayoutEffect, useState} from "react";
import ResizeObserver from 'resize-observer-polyfill';

export const useComponentSize = (ref) => {
    const [size, setSize] = useState(getSize(ref ? ref.current : {}));

    const handleResize = useCallback(() => {
        if (ref.current) {
            setSize(getSize(ref.current));
        }
    }, [ref.current]);

    useLayoutEffect(() => {
        if (!ref.current)
            return;

        handleResize();

        const resizeObserver = new ResizeObserver(handleResize);
        resizeObserver.observe(ref.current);

        return () => resizeObserver.disconnect();
    }, [ref.current]);

    return {
        size
    };
};

function getSize(el) {
    if (!el) {
        return {
            width: 0,
            height: 0
        }
    }

    return {
        width: el.offsetWidth,
        height: el.offsetHeight
    }
}
