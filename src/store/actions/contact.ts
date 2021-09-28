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
    REMOVE_CONTACT_FAILED
} from "../actionTypes/adressBook";

export const createContact = (contact: Contact) => async (dispatch: Dispatch) => {


    dispatch(createContactStart(contact));

    // Api calling simulation
    let error;
    setTimeout(() => {
        error = false;
        dispatch(contactCreated(contact));
    }, 1000);

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
        dispatch(removeContactSuccess(contact.name))
    }, 1500)

    if (error) {
        dispatch(removeContactFailed(error));
    }

}

const removeContactStart = (): RemoveContact => ({
    type: REMOVE_CONTACT
})

const removeContactSuccess = (name: string): RemoveContactSuccess => ({
    type: REMOVE_CONTACT_SUCCESS,
    payload: { name: name }
})

const removeContactFailed = (error: string): RemoveContactFailed => ({
    type: REMOVE_CONTACT_FAILED,
    error
})