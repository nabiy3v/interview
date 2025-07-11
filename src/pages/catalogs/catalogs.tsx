import React from 'react';
import { Button } from '~/components/ui';
import { AuthContext } from '~/modules/auth/context';

export interface CatalogsProps {}

export const Catalogs: React.FC<CatalogsProps> = () => {
	const { profile, methods } = React.useContext(AuthContext);
	return (
		<div className="container mx-auto mt-2">
			<h1 className="text-4xl">Catalogs Page</h1>
			<pre className="text-2xl text-gray-500">{JSON.stringify(profile)}</pre>
			<Button onClick={methods.logout}>Logout</Button>
		</div>
	);
};
