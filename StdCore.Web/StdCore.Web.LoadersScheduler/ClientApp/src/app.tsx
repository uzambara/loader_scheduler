import React, {useEffect} from "react";
import {Route, Switch} from "react-router-dom";
import {LoginPage} from "./pages/login-page/login.page";
import {RegistrationPage} from "./pages/registration-page/registration.page";
import {CalendarPage} from "./pages/calendar-page/calendar.page";
import {AuthorizeService} from "./services/authorize.service";
import {useDispatch} from "react-redux";
import {SetUser} from "./redux/actions/authorize.actions";
import MomentUtils from '@date-io/moment';
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import {useHistory} from "react-router";
import moment from "moment";
import {ReportPage} from "./pages/report-page/report-page";
import {StdDialog} from "./components/std-dialog/std-dialog";
import {useDialog} from "./hooks/useDualog";
import {ProcessingStatus} from "./enum/processing-type";
import {useGlobalProcessing} from "./hooks/useGlobalProcessing";
import {Routes} from "./routing/api-routes";

moment.locale("ru");

export const App = () => {
    const dispatch = useDispatch();
    const globalProcessing = useGlobalProcessing();
    const history = useHistory();
    useEffect(() => {
        AuthorizeService
            .GetCurrentUser()
            .then(response => {
                dispatch(SetUser(response.user));
                if(!response.user) {
                    history.push(Routes.login);
                }
            });
    }, []);

    return <MuiPickersUtilsProvider utils={MomentUtils}>
        <GlobalProcessing
            status={globalProcessing.processingStatus}
            dialogMessage={globalProcessing.dialogMessage}
            setStatus={globalProcessing.setStatus}
        />
        <Switch>
            <Route exact path={Routes.root}>
                <CalendarPage/>
            </Route>
            <Route exact path={Routes.calendar}>
                <CalendarPage/>
            </Route>
            <Route path={Routes.calendar + "/:loaderId"}>
                <CalendarPage/>
            </Route>
            <Route path={Routes.login}>
                <LoginPage/>
            </Route>
            <Route path={Routes.registration}>
                <RegistrationPage/>
            </Route>
            <Route path={Routes.report}>
                <ReportPage/>
            </Route>
        </Switch>
    </MuiPickersUtilsProvider>
};


interface GlobalProcessingProps {
    status: ProcessingStatus,
    dialogMessage?: string,
    setStatus: (status: ProcessingStatus) => void
}

function GlobalProcessing(props: GlobalProcessingProps) {
    switch (props.status) {
        case ProcessingStatus.DialogMessage:
            const dialogHook = useDialog(true);
            return <StdDialog
                message={props.dialogMessage}
                isOpen={dialogHook.isOpen}
                close={() => {
                    dialogHook.close();
                    props.setStatus(ProcessingStatus.None);
                }}
                onOk={() => {
                    dialogHook.close();
                    props.setStatus(ProcessingStatus.None);
                }}
            />;
        default:
            return null;
    }
}
