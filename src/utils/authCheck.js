export const isAuthenticated = () => {
    const token = localStorage.getItem('task_manager_token');
    return token !== null;
};