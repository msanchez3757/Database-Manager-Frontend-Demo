const API_URL = 'http://localhost:8080/api/user';

class AuthService {
    async register(username, password) {
        try {
            const response = await fetch(`${API_URL}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username,
                    password
                })
            });

            if (!response.ok) {
                throw new Error('Registration failed');
            }

            const data = await response.json();
            if (data.token) {
                localStorage.setItem('jwt_token', data.token);
                return true;
            }
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    }
}
const authService = new AuthService();