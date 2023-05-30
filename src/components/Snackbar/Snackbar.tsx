import { Snackbar } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { forwardRef, useState, SyntheticEvent, FC, useEffect } from 'react';

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props, ref
) { return <MuiAlert ref={ref} variant="filled" {...props} />; });

interface IErrorSnackbar {
    error: { state: boolean, errorText: string },
    setError: ({ state, errorText }: { state: boolean; errorText: string }) => void
}

const ErrorSnackbar: FC<IErrorSnackbar> = ({ error, setError }) => {
    const [open, setOpen] = useState(error.state);

    const handleClose = (e?: SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') return;
        setOpen(false);
        setError({ state: false, errorText: '' });
    };

    useEffect(() => setOpen(error.state), [error.state])

    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
                {error.errorText}
            </Alert>
        </Snackbar>
    );
}

export default ErrorSnackbar;