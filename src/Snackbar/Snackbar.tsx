import { Snackbar } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { forwardRef, useState, SyntheticEvent } from 'react';

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props, ref
) { return <MuiAlert ref={ref} variant="filled" {...props} />; });

const ErrorSnackbar = () => {
    const [open, setOpen] = useState(true);

    const handleClick = () => setOpen(true);
    const handleClose = (e?: SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') return;
        setOpen(false);
    };

    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
                Error fetching posts! Try reloading the page.
            </Alert>
        </Snackbar>
    );
}

export default ErrorSnackbar;