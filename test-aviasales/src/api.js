import axios from 'axios';

export const getSearchIdRequest = () => {
    return axios.get('https://front-test.beta.aviasales.ru/search').then(res => res.data.searchId)
}
export const getTickets = (searchId) => {
    return axios.get(`https://front-test.beta.aviasales.ru/tickets?searchId=${searchId}`)
}
