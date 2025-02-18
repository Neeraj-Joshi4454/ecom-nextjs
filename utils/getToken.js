const getToken = () => {
    const token = localStorage.getItem('auth_token')
    return token;
}
export default getToken;