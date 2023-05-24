export type ToastSeverity = 'success' | 'info' | 'warning' | 'error';

export interface Toast {
    severity: ToastSeverity;
    title: string;
    message: string;
}