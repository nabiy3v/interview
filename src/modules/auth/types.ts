export type Status = 'CREATED' | 'ACCEPTED' | 'REJECTED';

export interface Profile {
	id: string;
	firstName: string;
	lastName: string;
	age: number;
	email: string;
	phoneNumber: string;
	imageUrl: string | null;
	status: Status;
}
