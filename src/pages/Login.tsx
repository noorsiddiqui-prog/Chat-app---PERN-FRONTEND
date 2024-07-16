import React from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import useLogin from '../hooks/useLogin';

const Login: React.FC = () => {
	const { loading, login } = useLogin()

	const formik = useFormik({
		initialValues: {
			username: '',
			password: '',
		},
		validationSchema: Yup.object({
			username: Yup.string()
				.required('Username is required*'),
			password: Yup.string()
				.required('Password is required*'),
		}),
		onSubmit: (values) => {
			// Handle form submission
			console.log('Form values:', values);
			login(values.username, values.password)
		},
	});

	return (
		<div className='flex flex-col items-center justify-center min-h-screen bg-transparent w-full'>
			<div className='w-full max-w-md p-8 rounded-lg shadow-lg bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg'>
				<h1 className='text-3xl font-semibold text-center text-gray-300 mb-6'>
					Login <span className='text-blue-500'>ChatApp</span>
				</h1>

				<form onSubmit={formik.handleSubmit}>
					<div className='mb-4'>
						<label className='block text-gray-300 mb-2'>
							<span className='text-base'>Username</span>
						</label>
						<input
							type='text'
							name='username'
							placeholder='Enter username'
							className='w-full p-2 bg-gray-800 border border-gray-300 text-white placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.username}
						/>
						{formik.touched.username && formik.errors.username ? (
							<div className='text-red-500 text-sm mt-1'>{formik.errors.username}</div>
						) : null}
					</div>

					<div className='mb-4'>
						<label className='block text-gray-300 mb-2'>
							<span className='text-base'>Password</span>
						</label>
						<input
							type='password'
							name='password'
							placeholder='Enter Password'
							className='w-full p-2 bg-gray-800 border border-gray-300 text-white placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.password}
						/>
						{formik.touched.password && formik.errors.password ? (
							<div className='text-red-500 text-sm mt-1'>{formik.errors.password}</div>
						) : null}
					</div>

					<Link
						to='/signup'
						className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block text-gray-300'
					>
						{"Don't"} have an account?
					</Link>

					<div className='mt-6'>
						<button type='submit' disabled={loading} className='w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'>
							{loading ? 'loading...' : "Login"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Login;
