export interface User {
    id: string | number;
    username: string;
    firstName: string;
    lastName: string;
    email?: string;
    roles?: string[];
    groups?: string[];
    permissions: string[];
}
