import React from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import GenderCheckbox from '../components/GenderCheckbox';
import { ISignUpInputs } from '../types/types';
import useSignup from '../hooks/useSignup';
import Loader from '../components/loaders/Loader';

const SignUpSchema = Yup.object().shape({
	fullName: Yup.string()
		.required('Full Name is required'),
	username: Yup.string()
		.required('Username is required'),
	password: Yup.string()
		.required('Password is required')
		.min(6, 'Password must be at least 6 characters'),
	confirmPassword: Yup.string()
		.oneOf([Yup.ref('password')], 'Passwords must match')
		.required('Confirm Password is required'),
	gender: Yup.string()
		.required('Gender is required')
});

const SignUp: React.FC = () => {
	const { loading, signup } = useSignup();

	const initialValues: ISignUpInputs = {
		fullName: '',
		username: '',
		password: '',
		confirmPassword: '',
		gender: ''
	};

	const handleSubmit = async (values: ISignUpInputs, { setSubmitting }: any) => {
		try {
			// Handle form submission logic here, e.g., API calls
			console.log(values);
			await signup(values); // Example: Make API call to signup user
			setSubmitting(false); // Set submitting to false after API call
		} catch (error) {
			console.error('Error submitting form:', error);
			setSubmitting(false);
		}
	};


	return (
		<div className='flex flex-col items-center justify-center min-h-screen bg-transparent w-full overflow-y-auto'>
			<div className='w-full max-w-md p-8 rounded-lg shadow-lg bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg'>
				<h1 className='text-3xl font-semibold text-center text-gray-300 mb-6'>
					Sign Up <span className='text-blue-500'>ChatApp</span>
				</h1>

				<Formik
					initialValues={initialValues}
					validationSchema={SignUpSchema}
					onSubmit={handleSubmit}
				>
					{({ isSubmitting }) => (
						<Form>
							<div className='mb-4'>
								<label htmlFor='fullName' className='block text-gray-300 mb-2'>
									<span className='text-base'>Full Name</span>
								</label>
								<Field
									type='text'
									id='fullName'
									name='fullName'
									placeholder='John Doe'
									className='w-full p-2 bg-gray-800 border border-gray-300 text-white placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
								/>
								<ErrorMessage name='fullName' component='div' className='text-red-500 mt-1' />
							</div>

							<div className='mb-4'>
								<label htmlFor='username' className='block text-gray-300 mb-2'>
									<span className='text-base'>Username</span>
								</label>
								<Field
									type='text'
									id='username'
									name='username'
									placeholder='johndoe'
									className='w-full bg-gray-800 p-2 bg-transparent border border-gray-300 text-white placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
								/>
								<ErrorMessage name='username' component='div' className='text-red-500 mt-1' />
							</div>

							<div className='mb-4'>
								<label htmlFor='password' className='block text-gray-300 mb-2'>
									<span className='text-base'>Password</span>
								</label>
								<Field
									type='password'
									id='password'
									name='password'
									placeholder='Enter Password'
									className='w-full bg-gray-800 p-2 bg-transparent border border-gray-300 text-white placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
								/>
								<ErrorMessage name='password' component='div' className='text-red-500 mt-1' />
							</div>

							<div className='mb-4'>
								<label htmlFor='confirmPassword' className='block text-gray-300 mb-2'>
									<span className='text-base'>Confirm Password</span>
								</label>
								<Field
									type='password'
									id='confirmPassword'
									name='confirmPassword'
									placeholder='Confirm Password'
									className='w-full p-2 bg-gray-800 bg-transparent border border-gray-300 text-white placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
								/>
								<ErrorMessage name='confirmPassword' component='div' className='text-red-500 mt-1' />
							</div>

							<GenderCheckbox />

							<Link
								to={"/login"}
								className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block text-gray-300'
							>
								Already have an account?
							</Link>

							<div className='mt-6'>
								<button
									type='submit'
									disabled={isSubmitting || loading}
									className='w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
								>
									{isSubmitting ? <Loader /> : 'Sign Up'}
								</button>
							</div>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
};

export default SignUp;
