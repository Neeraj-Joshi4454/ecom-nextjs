
const getLoggedInUserId = () => {
    const userId = localStorage.getItem('user_id')
    return userId;
}
export default getLoggedInUserId;