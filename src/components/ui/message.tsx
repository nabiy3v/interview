import React from 'react';

export interface MessageProps {
	error?: string;
	name: string;
}

export const Message: React.FC<MessageProps> = ({ error, name }) => {
	if (!error) return null;

	return (
		<p data-slot="form-message" id={`${name}-error`} className="text-destructive text-sm">
			{error}
		</p>
	);
};
