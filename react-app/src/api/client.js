
const defaultHeaders = {
    headers: {
        'Content-Type': 'application/json; charset=UTF-8'
    },
}

//get current user @
export const getCurrentUserAPIMethod = () => {
    return fetch(`/api/currentuser`, {
        ...defaultHeaders,
    }).then(checkStatus)
        .then(parseJSON);
}

//get all notes
export const getNotesAPIMethod = () => {
    return fetch(`/api/notes`, {
        ...defaultHeaders,
    }).then(checkStatus)
        .then(parseJSON);
}

//get note by id
export const getNoteByIdAPIMethod = (noteId) => {
    return fetch(`/api/notes/${noteId}`, {
        ...defaultHeaders,
    }).then(checkStatus)
        .then(parseJSON);
}

//add note
export const createNoteAPIMethod = (note) => {
    return fetch(`/api/notes`, {
        ...defaultHeaders,
        method: 'POST',
        body: JSON.stringify(note),
    }).then(checkStatus)
        .then(parseJSON);
}

//update note
export const updateNoteAPIMethod = (note) => {
    return fetch(`/api/notes/${note._id}`, {
        ...defaultHeaders,
        method: 'PUT',
        body: JSON.stringify(note),
    }).then(checkStatus);
}

//delete note
export const deleteNoteByIdAPIMethod = (noteId) => {
    return fetch(`/api/notes/${noteId}`, {
        ...defaultHeaders,
        method: 'DELETE',
    }).then(checkStatus)
        .then(parseJSON);
}

//get all users
export const getUsersAPIMethod = () => {
    return fetch(`/api/users`, {
        ...defaultHeaders,
    }).then(checkStatus)
        .then(parseJSON);
}

//user register @
export const createUserAPIMethod = (user) => {
    console.log(user);
    return fetch(`/api/users`, {
        ...defaultHeaders,
        method: 'POST',
        body: JSON.stringify(user),
    }).then(checkLoginStatus);
}

//user login @
export const loginUserAPIMethod = (user) => {
    return fetch(`/api/login`, {
        ...defaultHeaders,
        method: 'POST',
        body: JSON.stringify(user),
    }).then(checkLoginStatus);
}

//user logout @
export const logoutUserAPIMethod = (user) => {
    return fetch(`/api/logout`, {
        ...defaultHeaders,
        method: 'POST',
        body: JSON.stringify(user),
    }).then(checkLoginStatus);
}

//update user info @
export const updateUserAPIMethod = (user) => {
    return fetch(`/api/users/${user._id}`, {
        ...defaultHeaders,
        method: 'PUT',
        body: JSON.stringify(user),
    }).then(checkStatus);
}

export const deleteUserByIdAPIMethod = (userId) => {
    return fetch(`/api/users/${userId}`, {
        ...defaultHeaders,
        method: 'DELETE',
    }).then(checkStatus)
        .then(parseJSON);
}

//upload profile image to cloudinary
export const uploadImageToCloudinaryAPIMethod = (formData) => {
    const cloudName = 'minki-jeon';
    return fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
        method: 'POST',
        body: formData,
    }).then(checkStatus)
        .then(parseJSON);
}

function checkLoginStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return true;
    } else {
        return false;
    }
}

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    } else {
        const error = new Error(`${response.statusText}`);
        error.status = response.statusText;
        error.response = response;
        throw error;
    }
}

function parseJSON(response) {
    return response.json();
}