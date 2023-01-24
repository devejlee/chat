'use client';
import styles from './Register.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Formik, Form, Field, ErrorMessage } from 'formik';

{/* TODO: Integrate Firebase Registration */ }
export default function Register() {
  const router = useRouter();
  return (
    <div className={styles.formContainer}>
      <div className={styles.formWrapper}>
        <span className={styles.logo}>Live Chat</span>
        <span className={styles.title}>Register</span>
        <Formik
          initialValues={{ name: '', email: '', password: '' }}
          onSubmit={async (values, { setStatus }) => {
            if (values.password.length < 6) {
              setStatus({ error: 'The password must be at least 6 characters long.' });
              return;
            }
            // If onSubmit is async, Formik automatically sets isSubmitting to false once it resolves
            try {
              const res = await fetch('/api/firebaseAuth', {
                method: 'POST',
                body: JSON.stringify(values),
                headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
              });
              if (!res.ok) {
                const json = await res.json();
                if (res.status === 500) {
                  throw new Error(`${json.error}`);
                } else {
                  throw new Error(`Error sending message: ${res.status}`);
                }
              } else {
                setStatus({ error: '' });
                router.push('/');
              }
            } catch (error) {
              setStatus({ error: (error as Error).message });
              throw error;
            }
          }}
        >
          {({ values, errors, submitCount, status, isSubmitting }) => (
            <Form>
              <label htmlFor="name">Name</label>
              <Field id="name" name="name" type="text" />
              <label htmlFor="email">Email Address</label>
              <Field id="email" type="email" name="email" />
              {submitCount > 0 && errors.email && <ErrorMessage name="email" component="div" className={styles.errorMessage} />}
              <label htmlFor="password">Password</label>
              <Field id="password" name="password" type="password" />
              <ErrorMessage name="password" component="div" className={styles.errorMessage} />
              <button type="submit" disabled={isSubmitting || !values.name || !values.email || !values.password} aria-label="Send email form">
                Submit
              </button>
              {status?.error && <p className={styles.errorStatus}>{status.error}</p>}
            </Form>
          )}
        </Formik>
        <p>Already have an account? <Link href="/login">Login</Link></p>
      </div>
    </div >
  );
}
