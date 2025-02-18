
const logout = () => {
    localStorage.removeItem('auth_token');
}

export default logout;