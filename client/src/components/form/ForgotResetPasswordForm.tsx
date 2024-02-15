import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';

function ForgotResetPasswordForm({handleSubmit}:{handleSubmit: any}) {

  const initialValues = {
    password: '',
    confirmPassword: '',
    showPassword: false, // Add this line
    showConfirmPassword: false, // Add this line
  };

  const passwordResetSchema = yup.object().shape({
    password: yup.string().required('Password is required'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Passwords must match')
      .required('Confirm Password is required'),
  });
  
  return (
    <Formik
    initialValues={initialValues}
    validationSchema={passwordResetSchema}
    onSubmit={(values) => {
      console.log(values);

      if (!values) {
        console.error('Form values are undefined.');
        return;
      }
      
      handleSubmit(values);
    }}
  >
    {(formik) => (
      <Form noValidate className="min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full p-8 bg-white shadow-md rounded-md">
          <h2 className="text-2xl font-semibold mb-6">Password Reset</h2>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <div className="relative">
              <Field
                type={formik.values.showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                placeholder="Password"
                className={`mt-1 p-2 w-full border rounded-md ${
                  formik.errors.password && formik.touched.password ? 'border-red-500' : ''
                }`}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 px-3 flex items-center"
                onClick={() => formik.setFieldValue('showPassword', !formik.values.showPassword)}
              >
                {formik.values.showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-5 w-5 text-gray-500"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-5 w-5 text-gray-500"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )}
              </button>
            </div>
            <ErrorMessage name="password" component="p" className="text-red-500 text-xs mt-1" />
          </div>

          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-600">
              Confirm Password
            </label>
            <div className="relative">
              <Field
                type={formik.values.showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm Password"
                className={`mt-1 p-2 w-full border rounded-md ${
                  formik.errors.confirmPassword && formik.touched.confirmPassword ? 'border-red-500' : ''
                }`}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 px-3 flex items-center"
                onClick={() =>
                  formik.setFieldValue('showConfirmPassword', !formik.values.showConfirmPassword)
                }
              >
                {formik.values.showConfirmPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-5 w-5 text-gray-500"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-5 w-5 text-gray-500"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )}
              </button>
            </div>
            <ErrorMessage name="confirmPassword" component="p" className="text-red-500 text-xs mt-1" />
          </div>

          <div className="mb-6">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
            >
              Reset Password
            </button>
          </div>

          {formik.errors.password !== 'Passwords must match' &&
            formik.touched.password && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.password}</p>
            )}

          {formik.errors.confirmPassword && formik.touched.confirmPassword && (
            <p className="text-red-500 text-xs mt-1">{formik.errors.confirmPassword}</p>
          )}
        </div>
      </Form>
    )}
  </Formik>
  )
}

export default ForgotResetPasswordForm
