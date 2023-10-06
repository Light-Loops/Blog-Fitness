import { Alert, AlertColor, Snackbar, Typography } from "@mui/material";
import React from "react";

type NotificationProps = {
    open   : boolean,
    message: string,
    severity: AlertColor | undefined,
    onClose: () => void,
}

export const Notification: React.FC<NotificationProps> = ({open,message,severity,onClose}) => {
    return(
        <Snackbar 
        anchorOrigin={{vertical:"top", horizontal:"center"}}
        autoHideDuration={3000}
        open={open}
        onClose={onClose}
        >
            <Alert 
            onClose={onClose}
            severity={severity}
            >
                <Typography>{message}</Typography>
            </Alert>
        </Snackbar>
    )
}

