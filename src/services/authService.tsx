export interface User {
  id: string;
  username: string;
  email: string;
  fullName: string;
}

export interface LoginResponse {
  success: boolean;
  user: User;
  token?: string;
}

class AuthService {
  private readonly USER_KEY = 'user';
  private readonly TOKEN_KEY = 'token';

  async login(username: string, password: string): Promise<LoginResponse> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (username && password) {
      const user: User = {
        id: '1',
        username: username,
        email: `${username}@example.com`,
        fullName: username.charAt(0).toUpperCase() + username.slice(1),
      };

      const token = 'demo-jwt-token-' + Date.now();

      localStorage.setItem(this.USER_KEY, JSON.stringify(user));
      localStorage.setItem(this.TOKEN_KEY, token);

      return { success: true, user, token };
    }

    throw new Error('Invalid credentials');
  }

  async register(username: string, email: string, password: string): Promise<LoginResponse> {
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (username && email && password) {
      const user: User = {
        id: Date.now().toString(),
        username,
        email,
        fullName: username.charAt(0).toUpperCase() + username.slice(1),
      };

      const token = 'demo-jwt-token-' + Date.now();

      localStorage.setItem(this.USER_KEY, JSON.stringify(user));
      localStorage.setItem(this.TOKEN_KEY, token);

      return { success: true, user, token };
    }

    throw new Error('Registration failed');
  }

  logout(): void {
    localStorage.removeItem(this.USER_KEY);
    localStorage.removeItem(this.TOKEN_KEY);
  }

  getCurrentUser(): User | null {
    const userStr = localStorage.getItem(this.USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}

export const authService = new AuthService();
