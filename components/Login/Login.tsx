'use client';
import styles from './Login.module.scss';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { Formik, Form, Field, ErrorMessage } from 'formik';

interface LoginFormValues {
  email: string;
  password: string
}

export default function Login() {
  return (
    <div className={styles.formContainer}>
      <div className={styles.formWrapper}>
        <span className={styles.logo}>Live Chat</span>
        <span className={styles.title}>Login</span>
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={async (values, { setStatus }) => {
            // If onSubmit is async, Formik automatically sets isSubmitting to false once it resolves
            try {
              console.log('values', values);
              // const res = await fetch('/api/contact', {
              //   method: 'POST',
              //   body: JSON.stringify(values),
              //   headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
              // });
              // if (!res.ok) {
              //   throw new Error(`Error sending message: ${res.status}`);
              // }
            } catch (error) {
              console.error(error);
              setStatus({ error: 'There was an error.' });
              throw error;
            }
          }}
        >
          {({ values, errors, submitCount, status, isSubmitting }) => (
            <Form>
              <label htmlFor="email">Email Address</label>
              <Field id="email" type="email" name="email" />
              {submitCount > 0 && errors.email && <ErrorMessage name="email" component="div" className={styles.errorMessage} />}
              <label htmlFor="password">Password</label>
              <Field id="password" name="password" type="password" />
              <button type="submit" disabled={isSubmitting || !values.email || !values.password} aria-label="Send email form">
                Submit
              </button>
              {status?.error && <p className={styles.errorStatus}>{status.error}</p>}
            </Form>
          )}
        </Formik>
        <button onClick={() => signIn('google')}>
          Login with Google
        </button>
        <p>You don&apos;t have an account? <Link href="/register">Register</Link></p>
      </div>
    </div >
  );
}
