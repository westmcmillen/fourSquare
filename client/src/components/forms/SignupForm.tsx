import React, { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { isEmail, isSecure } from './formValidation'
import { auth } from '../../server/firebase'
import Component from '../Component'

const SignupForm = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confirm, setConfirm] = useState<string>('')
    const [emailErrorMessage, setEmailErrorMessage] = useState<string>('')
    const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>('')
    const [confirmErrorMessage, setConfirmErrorMessage] = useState<string>('')
    const [emailError, setEmailError] = useState<boolean>(false)
    const [passwordError, setPasswordError] = useState(false)
    const [confirmError, setConfirmError] = useState(false)

    const validateEmail = () => {
        let valid = false
        if (!isEmail(email)) {
            setEmailErrorMessage('Not a valid email')
            setEmailError(true)
        } else {
            setEmailErrorMessage('')
            setEmailError(false)
            valid = true
        }
        return valid
    }

    const validatePassword = () => {
        let valid = false

        if (!isSecure(password)) {
            setPasswordErrorMessage(
                'Passwords must be between 8-50 characters, include 1 uppercase, 1 number, and 1 special character'
            )
            setPasswordError(true)
        } else if (password !== confirm) {
            setConfirmErrorMessage('Passwords do not match')
            setConfirmError(true)
            setPasswordError(true)
        } else {
            setConfirmErrorMessage('')
            setPasswordErrorMessage('')
            setPasswordError(false)
            setConfirmError(false)
            valid = true
        }
        return valid
    }

    const validateForm = () => {
        let validPassword = validatePassword()
        let validEmail = validateEmail()
        let valid = false
        if (validPassword && validEmail) {
            return (valid = true)
        }
        return valid
    }

    const register = (e: React.SyntheticEvent) => {
        e.preventDefault()
        if (validateForm()) {
            createUserWithEmailAndPassword(auth, email, password)
                .then(() => {
                    console.log('User Created')
                })
                .catch(err => console.error(err))
        }
        setEmail('')
        setPassword('')
        setConfirm('')
    }

    return (
        <Component id='Column'>
            <div className='flex flex-col items-center justify-flex-start px-6 py-8 mx-auto md:h-screen lg:py-0'>
                <div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 '>
                    <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
                        <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl '>
                            Create an account
                        </h1>
                        <form
                            className='space-y-4 md:space-y-6'
                            onSubmit={register}
                        >
                            <div>
                                <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                                    Your email
                                </label>
                                <input
                                    type='email'
                                    name='email'
                                    id='email'
                                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
                                    placeholder='name@company.com'
                                    required={true}
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                                    Password
                                </label>
                                <input
                                    type='password'
                                    name='password'
                                    id='password'
                                    placeholder='••••••••'
                                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
                                    required={true}
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                                    Confirm password
                                </label>
                                <input
                                    type='confirm-password'
                                    name='confirm-password'
                                    id='confirm-password'
                                    placeholder='••••••••'
                                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 '
                                    required={true}
                                    value={confirm}
                                    onChange={e => setConfirm(e.target.value)}
                                />
                            </div>
                            <div className='flex items-start'>
                                <div className='flex items-center h-5'>
                                    <input
                                        id='terms'
                                        aria-describedby='terms'
                                        type='checkbox'
                                        className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800'
                                        required={true}
                                    />
                                </div>
                                <div className='ml-3 text-sm'>
                                    <label className='font-light text-gray-500 dark:text-gray-300'>
                                        I accept the{' '}
                                        <a
                                            className='font-medium text-primary-600 hover:underline dark:text-primary-500'
                                            href='#'
                                        >
                                            Terms and Conditions
                                        </a>
                                    </label>
                                </div>
                            </div>
                            <button
                                type='submit'
                                className='w-full text-white bg-indigo-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
                            >
                                Create an account
                            </button>
                            <p className='text-sm font-light text-gray-500 dark:text-gray-400'>
                                Already have an account?{' '}
                                <a
                                    href='#'
                                    className='font-medium text-primary-600 hover:underline dark:text-primary-500'
                                >
                                    Login here
                                </a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </Component>
    )
}

export default SignupForm
