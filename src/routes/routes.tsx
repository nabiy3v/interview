import React from 'react';
import { Navigate, Outlet, Route, Routes as Switch } from 'react-router-dom';
import { AuthContext } from '~/modules/auth/context';
import { Login, Register, Catalogs, Mentors, Catalog, Mentor, Profile } from '~/pages';
import { MentorInfo } from '~/pages/mentors/mentor-info';
import { MentorSlot } from '~/pages/mentors/mentor-slot';

export const Routes: React.FC = () => {
	const { isLoading, isAuthenticated } = React.useContext(AuthContext);

	if (isLoading) return <div>Loading...</div>;

	return (
		<Switch>
			<Route path="auth" element={isAuthenticated ? <Navigate to="/catalogs" /> : <Outlet />}>
				<Route path="login" element={<Login />} />
				<Route path="register" element={<Register />} />
				<Route index path="*" element={<Navigate to="/auth/login" />} />
			</Route>

			<Route path="catalogs">
				<Route index element={<Catalogs />} />
				<Route path=":catalogId" element={<Catalog />} />
				<Route path="*" element={<Navigate to="/catalogs" />} />
			</Route>

			<Route path="mentors">
				<Route index element={<Mentors />} />
				<Route path=":mentorId" element={<Mentor />} />
				<Route path=":mentorId/infos" element={<MentorInfo />} />
				<Route path=":mentorId/slots" element={<MentorSlot />} />
				<Route path="*" element={<Navigate to="/mentors" />} />
			</Route>

			<Route path="profile" element={<Profile />} />

			<Route path="*" element={<Navigate to="/catalogs" />} />
		</Switch>
	);
};
