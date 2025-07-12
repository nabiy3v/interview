import { useContext } from 'react';
import { Button, Input, Label, Message } from '~/components/ui';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import { http } from '~/services';
import { AuthContext } from '~/modules/auth/context';

const loginSchema = zod.object({
	phoneNumber: zod.string().min(1, 'Phone number is required'),
	password: zod.string().min(1, 'Password is required'),
});

type LoginForm = zod.infer<typeof loginSchema>;

export const Login = () => {
	const form = useForm({ resolver: zodResolver(loginSchema) });
	const { methods } = useContext(AuthContext);

	const onSubmit = async (values: LoginForm) => {
		try {
			const { data } = await http.post('/auth/login', values);
			const accessToken = data.accessToken;

			const Authorization = `Bearer ${accessToken}`;
			const { data: profile } = await http.get('/users/me', { headers: { Authorization } });

			methods.login({ accessToken, profile });
		} catch (error) {
			console.log('error = ', error);
		}
	};

	return (
		<div className="container mx-auto pt-4">
			<h1 className="text-2xl font-bold mb-4">Login Form</h1>
			<form className="max-w-md flex flex-col gap-4" onSubmit={form.handleSubmit(onSubmit)}>
				<div className="grid w-full max-w-sm items-center gap-2">
					<Label htmlFor="phoneNumber">Phone number</Label>
					<Input
						{...form.register('phoneNumber')}
						type="number"
						id="phoneNumber"
						placeholder="Enter your phone number"
					/>
					<Message name="phoneNumber" error={form.formState.errors.phoneNumber?.message} />
				</div>
				<div className="grid w-full max-w-sm items-center gap-2">
					<Label htmlFor="password">Password</Label>
					<Input
						{...form.register('password')}
						type="password"
						id="password"
						placeholder="Enter your password"
					/>
					<Message name="password" error={form.formState.errors.password?.message} />
				</div>
				<Button
					disabled={form.formState.isSubmitting}
					type="submit"
					className="w-max cursor-pointer"
				>
					Login
				</Button>
			</form>
		</div>
	);
};
