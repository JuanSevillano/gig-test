export const CREATE_CONTACT = 'CREATE_CONTACT';
export const CREATE_CONTACT_SUCCESS = 'CREATE_CONTACT_SUCCESS';
export const CREATE_CONTACT_FAILED = 'CREATE_CONTACT_FAILED';

export const EDIT_CONTACT = 'EDIT_CONTACT';
export const EDIT_CONTACT_SUCCESS = 'EDIT_CONTACT_SUCCESS';
export const EDIT_CONTACT_FAILED = 'EDIT_CONTACT_FAILED';

export const DELETE_CONTACT = 'DELETE_CONTACT';
export const DELETE_CONTACT_SUCCESS = 'DELETE_CONTACT_SUCCESS';
export const DELETE_CONTACT_FAILED = 'DELETE_CONTACT_FAILED';

export const LOAD_PREV_CONTACTS = 'LOAD_PREV_CONTACTS';

export const REMOVE_CONTACT = 'REMOVE_CONTACT';
export const REMOVE_CONTACT_SUCCESS = 'REMOVE_CONTACT_SUCCESS';
export const REMOVE_CONTACT_FAILED = 'REMOVE_CONTACT_FAILED';


export type Contact = {
    id?: number;
    name: string;
    last_name: string;
    email: string;
    country: string;
    blocked: boolean;
}

export interface CreateContact {
    type: typeof CREATE_CONTACT;
    payload: Contact
}

export interface CreateContactSuccess {
    type: typeof CREATE_CONTACT_SUCCESS;
    payload: Contact
}

export interface CreateContactFailed {
    type: typeof CREATE_CONTACT_FAILED;
    error: string;
}

export interface LoadPrevContacts {
    type: typeof LOAD_PREV_CONTACTS;
}

export interface RemoveContact {
    type: typeof REMOVE_CONTACT
}

export interface RemoveContactSuccess {
    type: typeof REMOVE_CONTACT_SUCCESS;
    payload: { name: string }
}

export interface RemoveContactFailed {
    type: typeof REMOVE_CONTACT_FAILED;
    error: string;
}


export type AddressBookDispatchTypes =
    CreateContact |
    CreateContactSuccess |
    CreateContactFailed |
    LoadPrevContacts |
    RemoveContact |
    RemoveContactSuccess |
    RemoveContactFailed 