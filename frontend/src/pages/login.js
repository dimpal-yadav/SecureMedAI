import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { getBaseURL } from '../apiConfig';
import { useState } from 'react';

export default function Login() {
  const [error, setError] = useState(false);
  const [copiedRole, setCopiedRole] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const copyCredentials = (role, email, password) => {
    const credentials = `Email: ${email}\nPassword: ${password}`;
    navigator.clipboard.writeText(credentials).then(() => {
      setCopiedRole(role);
      setTimeout(() => setCopiedRole(''), 2000);
    });
  };

  const onSubmit = async (data) => {
    // Handle login logic here
    try {
      const response = await axios.post(`${getBaseURL()}/user/login/`, data);

      localStorage.setItem('token', response.data.token.access);
      localStorage.setItem('refreshToken', response.data.token.refresh);
      localStorage.setItem('name', response.data.name.split(' ')[0]);
      localStorage.setItem('role', response.data.role);
      
      // Redirect based on role
      switch(response.data.role) {
        case 'PATIENT':
          window.location.href = '/patient-dashboard';
          break;
        case 'DOCTOR':
          window.location.href = '/doctor-dashboard';
          break;
        case 'HOSPITAL_ADMIN':
          window.location.href = '/admin-dashboard';
          break;
        default:
          window.location.href = '/';
      }
    } catch (err) {
      console.error(err);
      setError(err.response.data.errors.non_field_errors[0]);
    }
  };

  return (
    <div className="min-h-screen w-full bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
      <div className="home pt-5 pl-10 absolute top-0 left-0">
        <Link to="/">
          <img src="/images/home.png" alt="" className="w-8 h-8" />
        </Link>
      </div>
      <section className="px-4 py-8 md:py-16">
        <div className="mx-auto max-w-lg rounded-3xl border bg-[linear-gradient(to_bottom,#c3f1fc,#FFFFFF)] px-6 py-10 shadow-custom sm:px-10 md:px-14 md:py-14">
          <div className="mb-6 flex justify-center">
            <div className="relative h-16 w-16">
              <img
                src="/images/in.png"
                alt="Logo"
                fill
                className="object-contain"
              />
            </div>
          </div>

          <div className="mb-8 text-center md:mb-12">
            <h3 className="mb-2 text-xl font-semibold md:text-2xl text-black">
              Welcome Back!
            </h3>
            <p className="text-sm text-gray-600 md:text-base">
              Enter your credentials to login to your account
            </p>
          </div>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <div className="form">
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Role Selection */}
              <div className="mb-4">
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5">
                    <img src="/images/user.png" alt="User icon" />
                  </div>
                  <select
                    className={`w-full rounded-lg border p-2 pl-12 text-black ${
                      errors.role ? 'border-red-500' : 'border-[#a3a3a3]'
                    } ${!register ? '' : (!register('role').value ? 'text-black' : 'text-black')}`}
                    {...register('role', {
                      required: 'Please select your role',
                    })}
                    defaultValue=""
                  >
                    <option value="" disabled hidden className="text-black">
                      Select Role
                    </option>
                    <option value="PATIENT" className="text-black">
                      Patient
                    </option>
                    <option value="DOCTOR" className="text-black">
                      Doctor
                    </option>
                    <option value="HOSPITAL_ADMIN" className="text-black">
                      Hospital Admin
                    </option>
                  </select>
                </div>
                {errors.role && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.role.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="mb-4">
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5">
                    <img src="/images/email.png" alt="Email icon" />
                  </div>
                  <input
                    type="email"
                    placeholder="Email"
                    className={`w-full rounded-lg border p-2 pl-12 text-black placeholder:text-black ${
                      errors.email ? 'border-red-500' : 'border-[#a3a3a3]'
                    }`}
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address',
                      },
                    })}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="mb-4">
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5">
                    <img
                      src="/images/password.png"
                      alt="Password icon"
                      width={20}
                      height={20}
                    />
                  </div>
                  <input
                    type="password"
                    placeholder="Password"
                    className={`w-full rounded-lg border p-2 pl-12 text-black placeholder:text-black ${
                      errors.password ? 'border-red-500' : 'border-[#a3a3a3]'
                    }`}
                    {...register('password', {
                      required: 'Password is required',
                    })}
                  />
                </div>
                {errors.password && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Checkbox and Forgot Password */}
              <div className="mb-6 flex flex-wrap items-center justify-between gap-2">
                {/* <div className="flex items-center">
                  <input type="checkbox" id="rememberMe" className="mr-2" {...register("rememberMe")} />
                  <label htmlFor="rememberMe" className="text-sm">
                    Remember me
                  </label>
                </div> */}
                <Link
                  href="/forgot-password"
                  className="text-sm hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>

              {/* Button */}
              <div>
                <button
                  type="submit"
                  className="w-full rounded-xl bg-black py-2.5 text-white transition-colors hover:bg-gray-800"
                >
                  Get Started
                </button>
              </div>
            </form>

            {/* Test Credentials Section */}
            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <h4 className="text-sm font-semibold text-gray-700 mb-3 text-center">
                Test Credentials (For Demo)
              </h4>
              <div className="space-y-3">
                {/* Patient Credentials */}
                <div className="bg-white p-3 rounded border">
                  <div className="flex justify-between items-start">
                    <div>
                      <h5 className="text-xs font-medium text-blue-600 mb-1">Patient Access</h5>
                      <div className="text-xs text-gray-600">
                        <p><strong>Email:</strong> patientpatient@securemedai.com</p>
                        <p><strong>Password:</strong> patient123</p>
                      </div>
                    </div>
                    <button
                      onClick={() => copyCredentials('patient', 'patientpatient@securemedai.com', 'patient123')}
                      className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded hover:bg-blue-200 transition-colors"
                    >
                      {copiedRole === 'patient' ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                </div>
                
                {/* Doctor Credentials */}
                <div className="bg-white p-3 rounded border">
                  <div className="flex justify-between items-start">
                    <div>
                      <h5 className="text-xs font-medium text-green-600 mb-1">Doctor Access</h5>
                      <div className="text-xs text-gray-600">
                        <p><strong>Email:</strong> doctorpatient@securemedai.com</p>
                        <p><strong>Password:</strong> doctor123</p>
                      </div>
                    </div>
                    <button
                      onClick={() => copyCredentials('doctor', 'doctorpatient@securemedai.com', 'doctor123')}
                      className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded hover:bg-green-200 transition-colors"
                    >
                      {copiedRole === 'doctor' ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                </div>
                
                {/* Admin Credentials */}
                <div className="bg-white p-3 rounded border">
                  <div className="flex justify-between items-start">
                    <div>
                      <h5 className="text-xs font-medium text-purple-600 mb-1">Hospital Admin Access</h5>
                      <div className="text-xs text-gray-600">
                        <p><strong>Email:</strong> adminpatient@securemedai.com</p>
                        <p><strong>Password:</strong> admin123</p>
                      </div>
                    </div>
                    <button
                      onClick={() => copyCredentials('admin', 'adminpatient@securemedai.com', 'admin123')}
                      className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded hover:bg-purple-200 transition-colors"
                    >
                      {copiedRole === 'admin' ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-3 text-center">
                Select the appropriate role and use these credentials to test the system
              </p>
            </div>

            {/* Signup */}
            <div className="mt-8 text-center text-sm">
              Don&apos;t have an account yet?
              <Link to="/signup" className="ml-1 font-semibold hover:underline">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
