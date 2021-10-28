const baseUrl = 'https://join.wolfpackit.nl/api/v1/';
const headers = new Headers({
    Accept: "application/json",
    Authorization: "Bearer 9bAqXRPplyiGfF6n81NVUGpAqeLI1QHw46aqICVL1BLaGI6"
})

const getQueryString = (payload) => {
    return Object.keys(payload).map(key => {
        return key + '=' + payload[key]
    }).join('&');
}

export const getPacks = () => {
    return fetch(`${ baseUrl }packs`, { headers });
};

export const updatePack = (id, payload) => {
    return fetch(`${ baseUrl }packs/${ id }?${ getQueryString(payload) }`, {
        headers,
        method: 'PUT'
    })
};

export const deletePack = (id) => {
    return fetch(`${ baseUrl }packs/${ id }`, {
        headers,
        method: 'DELETE'
    })
};

export const createPack = (payload) => {
    return fetch(`${ baseUrl }packs?${ getQueryString(payload) }`, {
        headers,
        method: 'POST'
    })
};

export const getPack = (id) => {
    return fetch(`${ baseUrl }packs/${id}`, { headers });
};

export const updateWolf = (id, payload) => {
    return fetch(`${ baseUrl }wolves/${ id }?${ getQueryString(payload) }`, {
        headers,
        method: 'PUT'
    })
};