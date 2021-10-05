import { Dispatch } from "redux";
import {
    Contact,
    CREATE_CONTACT,
    CreateContact,
    CreateContactSuccess,
    CREATE_CONTACT_SUCCESS,
    CreateContactFailed,
    CREATE_CONTACT_FAILED,
    LoadPrevContacts,
    LOAD_PREV_CONTACTS,
    RemoveContact,
    REMOVE_CONTACT,
    REMOVE_CONTACT_SUCCESS,
    RemoveContactSuccess,
    RemoveContactFailed,
    REMOVE_CONTACT_FAILED,
    EDIT_CONTACT_SUCCESS,
    EDIT_CONTACT_FAILED,
    EDIT_CONTACT
} from "../actionTypes/adressBook";

import { v4 as uid } from 'uuid';


export const createContact = (contact: Contact) => async (dispatch: Dispatch) => {


    dispatch(createContactStart(contact));

    // Api calling simulation
    let error;
    setTimeout(() => {

        error = false;
        const createdContact: Contact = {
            id: uid(),
            ...contact
        }
        dispatch(contactCreated(createdContact));

    }, 300);

    if (error) {
        dispatch(contactCreateFailed(error));
    }


}


const contactCreated = (contact: Contact): CreateContactSuccess => ({
    type: CREATE_CONTACT_SUCCESS,
    payload: contact
})

const contactCreateFailed = (error: string): CreateContactFailed => ({
    type: CREATE_CONTACT_FAILED,
    error
})

const createContactStart = (contact: Contact): CreateContact => ({
    type: CREATE_CONTACT,
    payload: contact
})


export const loadPrevContacts = (): LoadPrevContacts => ({
    type: LOAD_PREV_CONTACTS
})


export const removeContact = (contact: Contact) => async (dispatch: Dispatch) => {

    let error;
    dispatch(removeContactStart())
    setTimeout(() => {
        error = false;
        dispatch(removeContactSuccess(contact.id as string))
    }, 300)

    if (error) {
        dispatch(removeContactFailed(error));
    }

}

const removeContactStart = (): RemoveContact => ({
    type: REMOVE_CONTACT
})

const removeContactSuccess = (id: string): RemoveContactSuccess => ({
    type: REMOVE_CONTACT_SUCCESS,
    payload: { id }
})

const removeContactFailed = (error: string): RemoveContactFailed => ({
    type: REMOVE_CONTACT_FAILED,
    error
})


export const editContact = (contact: Contact) => async (dispatch: Dispatch) => {

    let error;
    dispatch(editContactStart());
    setTimeout(() => {
        error = false;
        dispatch(editContactSuccess(contact));
    }, 300);

    if (error) {
        dispatch(editContactFailed(error));
    }

}

const editContactStart = () => ({
    type: EDIT_CONTACT
})

const editContactSuccess = (contact: Contact) => ({
    type: EDIT_CONTACT_SUCCESS,
    payload: { contact }
});

const editContactFailed = (error: string) => ({
    type: EDIT_CONTACT_FAILED,
    error
})
