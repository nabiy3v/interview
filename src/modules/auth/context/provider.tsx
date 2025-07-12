import React from 'react';
import { AuthContext, type AuthState } from './context';
import store from 'store2';
import { ACCESS_TOKEN_KEY } from '../constants';
import { http } from '~/services';

interface ProviderProps {
	children?: React.ReactNode;
}

export const Provider: React.FC<ProviderProps> = ({ children }) => {
	const [state, setState] = React.useState<AuthState>(() => ({
		isAuthenticated: false,
		isLoading: store.get(ACCESS_TOKEN_KEY) ? true : false,
		accessToken: store.get(ACCESS_TOKEN_KEY),
		profile: null,
	}));

	const login = ({ accessToken, profile }: Pick<AuthState, 'accessToken' | 'profile'>) => {
		store.set(ACCESS_TOKEN_KEY, accessToken);
		setState({ isAuthenticated: !!accessToken, isLoading: false, accessToken, profile });
	};

	const logout = () => {
		store.remove(ACCESS_TOKEN_KEY);
		setState({ isAuthenticated: false, isLoading: false, accessToken: null, profile: null });
	};

	React.useEffect(() => {
		const { accessToken } = state;
		if (accessToken) {
			http
				.get('/users/me', { headers: { Authorization: `Bearer ${accessToken}` } })
				.then(({ data: profile }) => login({ accessToken, profile }));
		}
	}, []);

	return (
		<AuthContext.Provider value={{ ...state, methods: { login, logout } }}>
			{children}
		</AuthContext.Provider>
	);
};

Provider.displayName = 'AuthProvider';
