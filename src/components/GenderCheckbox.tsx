import React from 'react';
import { Field, ErrorMessage } from 'formik';

const GenderCheckbox: React.FC = () => {
	return (
		<div className="mb-4">
			<label className="block text-gray-300 mb-2">
				<span className="text-base">Gender</span>
			</label>
			<div className="flex items-center space-x-4">
				<label className="inline-flex items-center">
					<Field type="radio" name="gender" value="male" className="form-radio text-blue-500 h-5 w-5" />
					<span className="ml-2 text-gray-300">Male</span>
				</label>
				<label className="inline-flex items-center">
					<Field type="radio" name="gender" value="female" className="form-radio text-pink-500 h-5 w-5" />
					<span className="ml-2 text-gray-300">Female</span>
				</label>
				<label className="inline-flex items-center">
					<Field type="radio" name="gender" value="other" className="form-radio text-yellow-500 h-5 w-5" />
					<span className="ml-2 text-gray-300">Other</span>
				</label>
			</div>
			<ErrorMessage name="gender" component="div" className="text-red-500 mt-1" />
		</div>
	);
};

export default GenderCheckbox;
