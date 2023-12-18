import React, { useReducer } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { startRegisterUser } from "../../actions/userAction";
import { startSupplierRegister } from "../../actions/actionGenerator";
import { useFormik } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("/pics/shop1.jpg") center/cover no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  padding: 40px;
  width: 100%;
  max-width: 400px;
  background-color: #fff;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const Title = styled.h1`
  font-size: 24px;
  text-align: center;
  color: #333;
  margin-bottom: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const InputField = styled.input`
  padding: 15px;
  border: 2px solid #ddd;
  border-radius: 4px;
  margin-bottom: 1rem;
  font-size: 16px;

  &:focus {
    border-color: #008080;
    box-shadow: 0 0 0 2px rgba(0, 128, 128, 0.1);
  }
`;

const ErrorText = styled.div`
  color: #d32f2f;
  font-size: 14px;
  margin-top: -10px;
  margin-bottom: 10px;
  text-align: left;
`;

const PasswordInput = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const Input = styled(InputField)`
  flex-grow: 1;
`;

const Button = styled.button`
  padding: 15px 20px;
  background-color: #000080;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.2s ease;
  margin-top: 10px;

  &:hover {
    background-color: #000066;
  }

  &:active {
    transform: translateY(1px);
  }
`;

const LoginLink = styled(Link)`
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  color: #000080;
  text-decoration: none;
`;

const LoginPromptText = styled.span`
  display: block;
  text-align: center;
  margin-top: 20px;
  font-size: 16px;
`;

const ToggleVisibilityButton = styled.button`
  background: none;
  border: 2px solid #ddd;
  border-left: none;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  padding: 15px;
  cursor: pointer;
  font-size: 16px;
  margin-bottom: auto;

  &:focus {
    outline: none;
  }
`;

const passwordReducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE":
      return { ...state, [action.field]: !state[action.field] };
    default:
      return state;
  }
};

const registrationReducer = (state, action) => {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    default:
      return state;
  }
};

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [state, dispatchRegistration] = useReducer(registrationReducer, {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    admin: true,
  });

  const [showPassword, setShowPassword] = useReducer(passwordReducer, {
    password: false,
    confirmPassword: false,
  });

  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, "Username must be at least 3 characters")
      .required("Username is required"),
    email: Yup.string()
      .email("Please enter a valid email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password should be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one symbol"
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Password did not match")
      .required("Confirm password is required"),
  });

  const formik = useFormik({
    initialValues: state,
    validationSchema,
    onSubmit: (values) => {
      if (state.admin) {
        dispatch(startSupplierRegister(values, () => navigate("/auth/login")));
      } else {
        dispatch(startRegisterUser(values, () => navigate("/auth/login")));
      }
      dispatchRegistration({ type: "SET_FIELD", field: "admin", value: false });
    },
  });

  const togglePasswordVisibility = (field) => {
    setShowPassword({ type: "TOGGLE", field });
  };

  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form onSubmit={formik.handleSubmit}>
          <InputField
            placeholder="Username"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.username && formik.errors.username && (
            <ErrorText>{formik.errors.username}</ErrorText>
          )}
          <InputField
            placeholder="Email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && (
            <ErrorText>{formik.errors.email}</ErrorText>
          )}
          <PasswordInput>
            <Input
              type={showPassword.password ? "text" : "password"}
              placeholder="Password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <ToggleVisibilityButton
              onClick={() => togglePasswordVisibility("password")}
              type="button"
            >
              {showPassword.password ? <FaEyeSlash /> : <FaEye />}
            </ToggleVisibilityButton>
          </PasswordInput>
          {formik.errors.password && formik.touched.password && (
            <ErrorText>{formik.errors.password}</ErrorText>
          )}
          <PasswordInput>
            <Input
              type={showPassword.confirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              name="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <ToggleVisibilityButton
              onClick={() => togglePasswordVisibility("confirmPassword")}
              type="button"
            >
              {showPassword.confirmPassword ? <FaEyeSlash /> : <FaEye />}
            </ToggleVisibilityButton>
          </PasswordInput>
          {formik.errors.confirmPassword && formik.touched.confirmPassword && (
            <ErrorText>{formik.errors.confirmPassword}</ErrorText>
          )}
          <Button type="submit" disabled={formik.isSubmitting}>
            CREATE
          </Button>

          <LoginPromptText>
            <span style={{ color: "red" }}>Already have an account?</span>{" "}
            <LoginLink to="/auth/login">Log in</LoginLink>
          </LoginPromptText>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default RegistrationForm;
