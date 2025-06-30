import React, { useState, useEffect, useRef} from 'react';
import * as Yup from 'yup';
import { useNavigate, Navigate} from 'react-router-dom';
import { verifyCode, requestCode } from '../../api/auth';
import { Formik, Form, ErrorMessage } from 'formik';
import { Card, CardContent } from '../../reuseables/Card';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '../../reuseables/input-otp';
import { Label } from '../../reuseables/label';
import { Button } from '../../reuseables/button';
import { Toaster, toast } from 'react-hot-toast';

const otpValidationSchema = Yup.object({
  otp: Yup.string()
    .required('OTP is required')
     .matches(/^\d{6}$/, 'Must be exactly 6 digits')
    .length(6, 'Must be exactly 6 characters'),
});

const VerifyOtp: React.FC = () => {
  const navigate = useNavigate();
  const email = new URLSearchParams(window.location.search).get('email');
  const [error, setError] = useState<string>('');
  const [isResending, setIsResending] = useState<boolean>(false);
  const otpSentRef = useRef(false);

  useEffect(() => {
    if (email && !otpSentRef.current) {
      otpSentRef.current = true;
      requestCode({ email })
        .then(() => {
          toast.success('OTP sent to your email!');
        })
        .catch(() => {
          setError('Failed to send OTP. Please try again.');
        });
    }
  }, [email]);

  if (!email) {
    return <Navigate to="/signup" replace />;
  }

  
  const handleResendOTP = async () => {
    setError('');
    setIsResending(true);
    try {
      await requestCode({ email });
      toast.success("OTP resent successfully!");
    } catch (err: unknown) {
      setError('Failed to resend OTP. Please try again.');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className='flex h-screen w-full'>
     <Toaster position='top-center' />
      <div className='w-full md:w-1/2 bg-gray-100 flex flex-col justify-center px-4 sm:px-6 lg:px-20 xl:px-24'>
        <div className='w-full max-w-sm mx-auto'>
          <div className='text-center mb-6'>
            <h1 className='text-4xl font-bold text-[#008080]'>
              Chatta<span className='text-orange-400 text-4xl'>Trader</span>
            </h1>
          </div>
          <Card>
            <CardContent className='pt-4'>
              <h2 className='text-3xl font-bold text-center text-gray-900 mb-2'>
                Verify Your Email
              </h2>
              <p className='text-sm text-center text-gray-600 mb-4'>
                Please enter the verification code sent to your email
              </p>
              {error && (
                <div className='text-red-500 text-sm text-center mb-3'>
                  {error}
                </div>
              )}
              <Formik
                initialValues={{ otp: '' }}
                validationSchema={otpValidationSchema}
               onSubmit={async (values, { setSubmitting }) => {
                setError('');
                try {
                await verifyCode({ code: values.otp, email });
                navigate('/sign-up'); 
                toast.success('Email verified successfully!')
               } catch (err: unknown) {
               console.error(err);
                const errorMessage = (err as any)?.response?.data?.message || 'Failed to verify code. Please try again.';
                setError(errorMessage);
                toast.error(errorMessage);
               }
               setSubmitting(false);
               }}
              >
                {({
                  values,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                  setFieldValue,
                }) => (
                  <Form className='space-y-4' onSubmit={handleSubmit}>
                    <div className='space-y-2'>
                      <div className='text-left'>
                        <Label htmlFor='otp'>Verification Code</Label>
                      </div>
                      <div className='flex justify-center items-center'>
                        <InputOTP
                          type="numeric"
                          maxLength={6}
                          value={values.otp}
                          onChange={(value) => setFieldValue('otp', value)}
                          onBlur={handleBlur}
                          name='otp'
                        >
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                          </InputOTPGroup>
                          <InputOTPSeparator />
                          <InputOTPGroup>
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </div>
                      <div className='text-left'>
                        <ErrorMessage
                          name='otp'
                          component='div'
                          className='text-red-500 text-sm'
                        />
                      </div>
                    </div>
                    <Button
                      type='submit'
                      className='w-full bg-[#008080] text-[#FAFAFA] cursor-pointer'
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Verifying...' : 'Verify Email'}
                    </Button>
                    <p className='text-sm text-center text-gray-600 mt-4'>
                      Didn't receive the code?{' '}
                      <button
                        type='button'
                        className='text-[#008080] hover:underline'
                        onClick={handleResendOTP}
                        disabled={isResending}
                      >
                        {isResending ? 'Resending...' : 'Resend'}
                      </button>
                    </p>
                  </Form>
                )}
              </Formik>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className='w-1/2 hidden md:flex'>
        <img
          className='h-full w-full object-cover'
          src='/images/chatbot.png'
          alt='ChattaTrader background'
        />
      </div>
    </div>
  );
};

export default VerifyOtp;
