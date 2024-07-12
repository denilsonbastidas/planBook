import { Field, Form, Formik, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import PhoneInput, { isPossiblePhoneNumber } from "react-phone-number-input";
import { signUp } from "../../services";
import { SignUpType } from "../../utils/types";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const signUpValidationSchema = Yup.object().shape({
  fullName: Yup.string().required("Full Name is required"),
  phone: Yup.string()
  .test(
    'validatePhoneNumber',
    'Invalid phone number',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-argument
    (value: any) => Boolean(value.length) && isPossiblePhoneNumber(value),
  )
  .required('Phone Number is required'),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters long"),
});

function SignUp() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  const submitSignUpForm = async (value: SignUpType) => {
    setLoading(true);
    const responseSignUp = await signUp(
      value.fullName,
      value.phone,
      value.password
    );
    setLoading(false);
    if (responseSignUp.message === "Success") {
      toast.success("Registered User!");
      navigate("/signin");
    }
  };
  return (
    <div className="min-h-[calc(100vh-69px)] md:flex md:items-center md:justify-center">
      <div className="mx-auto rounded-2xl w-full max-w-lg p-4 md:my-10 md:p-8 md:border border-gray-200">
        <h2 className="sign-text  text-4xl font-bold">Sign Up</h2>
        <div className="py-4 text-gray-500 text-base font-normal">
          Let's get started with your new account.
        </div>

        <Formik
          validateOnMount
          initialValues={{
            fullName: "",
            phone: "",
            password: "",
          }}
          validationSchema={signUpValidationSchema}
          onSubmit={submitSignUpForm}
        >
          {({ setFieldValue, handleChange, handleBlur, values }) => (
            <Form id="siginup-form" method="post">
              <label className="text-gray-500 text-base font-normal">
                Full Name
              </label>
              <Field type="text" name="fullName" className="input mb-2" />
              <ErrorMessage
                name="fullName"
                component="div"
                className="error-message"
              />
              <label className="text-gray-500 text-base font-normal">
                Phone Number
              </label>

              <PhoneInput
                countrySelectProps={{ unicodeFlags: true }}
                defaultCountry="VE"
                international={false}
                name="phone"
                className="input mb-4"
                placeholder="Enter your phone"
                onChange={(e) => {
                  setFieldValue("phone", e);
                  e?.length && handleChange(e);
                }}
                value={values.phone}
                onBlur={(e) => handleBlur(e)}
              />
               <ErrorMessage
                name="phone"
                component="div"
                className="error-message"
              />

              <label className="text-gray-500 text-base font-normal">
                Password
              </label>
              <Field type="password" name="password" className="input mb-2" />
              <ErrorMessage
                name="password"
                component="div"
                className="error-message"
              />

              {loading ? (
                <Skeleton height={45} />
              ) : (
                <button
                  className="mb-4 mt-2 w-full bg-gray-900 rounded-lg font-medium border-none p-3 text-center text-white"
                  type="submit"
                >
                  Get Started
                </button>
              )}
            </Form>
          )}
        </Formik>

        <div>
          <Link to="/signin">
            <div className="mt-8 text-gray-500">
              Already have an account?{" "}
              <span className="font-bold text-gray-900 hover:underline">
                Sign In
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
export default SignUp;