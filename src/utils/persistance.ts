export const savePersistance = (key: string, object: Object) => {
    const _item = JSON.stringify(object);
    localStorage.setItem(key, _item);
}

export const getPersistance = (key: string) => {
    let _item = localStorage.getItem(key)
    return _item ? JSON.parse(_item) : null
}

export const removePersistance = (key: string) => {
    localStorage.removeItem(key);
}
