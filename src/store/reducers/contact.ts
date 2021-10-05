import { getPersistance, savePersistance } from "../../utils/persistance";
import {
    Contact,
    CreateContact,
    CREATE_CONTACT,
    AddressBookDispatchTypes,
    CreateContactSuccess,
    CREATE_CONTACT_SUCCESS,
    LoadPrevContacts,
    LOAD_PREV_CONTACTS,
    RemoveContact,
    REMOVE_CONTACT,
    RemoveContactSuccess,
    REMOVE_CONTACT_SUCCESS,
    CREATE_CONTACT_FAILED,
    CreateContactFailed,
    REMOVE_CONTACT_FAILED,
    RemoveContactFailed,
    EditContact,
    EditContactSuccess,
    EDIT_CONTACT,
    EditContactFailed,
    EDIT_CONTACT_SUCCESS,
    EDIT_CONTACT_FAILED
} from "../actionTypes/adressBook";

interface AddressBookI {
    id?: number;
    error: boolean;
    loading: boolean;
    contacts: Array<Contact>;
    blockedContacts: Array<Contact>;
}

const initialState: AddressBookI = {
    id: 0,
    contacts: [],
    error: false,
    loading: false,
    blockedContacts: []
}


const createContact = (state: AddressBookI, { payload }: CreateContact): AddressBookI => {

    const updatedState: AddressBookI = {
        ...state,
        loading: true
    }

    savePersistance('contacts', updatedState);

    return updatedState
}

const createContactSuccess = (state: AddressBookI, { payload }: CreateContactSuccess): AddressBookI => {

    // We can check for duplicated contact

    const updatedContacts: Array<Contact> = [
        ...state.contacts,
        payload
    ]

    const updatedState: AddressBookI = {
        ...state,
        contacts: updatedContacts,
        loading: false
    }

    savePersistance('contacts', updatedState);
    return updatedState

}

const createContactFailed = (state: AddressBookI, { error }: CreateContactFailed): AddressBookI => {


    console.log('error => ', error);

    const updatedState: AddressBookI = {
        ...state,
        error: true,
        loading: false
    }


    return updatedState

}

const loadPrevContacts = (state: AddressBookI, action: LoadPrevContacts): AddressBookI => {

    const prevContacts: Array<Contact> = getPersistance('contacts')?.contacts;

    if (!prevContacts) return state

    const updatedState: AddressBookI = {
        ...state,
        contacts: prevContacts
    }

    return updatedState
}

const removeContact = (state: AddressBookI, action: RemoveContact): AddressBookI => {

    const updatedState: AddressBookI = {
        ...state,
        loading: true
    }

    return updatedState
}

const removeContactSuccess = (state: AddressBookI, { payload }: RemoveContactSuccess): AddressBookI => {

    const { id } = payload;
    console.log('llega el id', id);
    const updatedContacts: Array<Contact> = state.contacts.filter(contact => contact.id !== id);
    const updatedState: AddressBookI = {
        ...state,
        contacts: updatedContacts,
        loading: false
    }

    savePersistance('contacts', updatedState);

    return updatedState
}

const removeContactFailed = (state: AddressBookI, { error }: RemoveContactFailed): AddressBookI => {

    const updatedState: AddressBookI = { ...state, error: true };
    return updatedState;
}

const editContact = (state: AddressBookI, action: EditContact): AddressBookI => {

    const udpatedState: AddressBookI = { ...state, loading: true };

    return udpatedState
}



const editContactSuccess = (state: AddressBookI, action: EditContactSuccess): AddressBookI => {

    const { contact } = action.payload;

    const updatedContacts = state.contacts.map(friend => friend.id !== contact.id ? friend : contact);
    const updatedState: AddressBookI = { ...state, contacts: updatedContacts, loading: false };

    savePersistance('contacts', updatedState);

    return updatedState
}

const editContactFailed = (state: AddressBookI, action: EditContactFailed): AddressBookI => {

    const { error } = action;
    const updatedState: AddressBookI = { ...state, error: true, loading: false };

    return updatedState
}

const addressBookReducer = (state: AddressBookI = initialState, action: AddressBookDispatchTypes): AddressBookI => {
    switch (action.type) {
        case CREATE_CONTACT: return createContact(state, action);
        case CREATE_CONTACT_SUCCESS: return createContactSuccess(state, action);
        case CREATE_CONTACT_FAILED: return createContactFailed(state, action);
        case LOAD_PREV_CONTACTS: return loadPrevContacts(state, action);
        case REMOVE_CONTACT: return removeContact(state, action);
        case REMOVE_CONTACT_SUCCESS: return removeContactSuccess(state, action);
        case REMOVE_CONTACT_FAILED: return removeContactFailed(state, action);
        case EDIT_CONTACT: return editContact(state, action);
        case EDIT_CONTACT_SUCCESS: return editContactSuccess(state, action);
        case EDIT_CONTACT_FAILED: return editContactFailed(state, action);
        default: return state;
    }
}

export default addressBookReducer