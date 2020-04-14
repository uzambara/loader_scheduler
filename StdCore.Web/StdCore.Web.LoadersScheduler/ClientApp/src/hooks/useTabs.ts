import {useState} from "react";

export const useTabs = (initialIndex: number) => {
    const [currentTabIndex, setCurrentTabIndex] = useState(initialIndex);
    const isCurrent = idx => idx === currentTabIndex;
    return {
        currentTabIndex,
        setCurrentTabIndex,
        isCurrent: isCurrent
    };
};
