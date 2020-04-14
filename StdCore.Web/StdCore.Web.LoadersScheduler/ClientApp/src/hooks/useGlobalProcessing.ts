import {useDispatch, useSelector} from "react-redux";
import {selectGlobalProcessing} from "../redux/selectors/processing.selectors";
import {setGlobalProcessing} from "../redux/actions/global-processing.action";
import {ProcessingStatus} from "../enum/processing-type";

export function useGlobalProcessing() {
    const dispatch = useDispatch();
    const globalProcessing = useSelector(selectGlobalProcessing);

    return {
        setStatus: (status: ProcessingStatus) => {
            dispatch(setGlobalProcessing({
                processingStatus: status
            }))
        },
        ...globalProcessing
    }
}
