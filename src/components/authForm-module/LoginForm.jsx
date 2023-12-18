import React, { useReducer, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { startUserLogin } from "../../actions/userAction";
import { startsupplierLogin } from "../../actions/actionGenerator";
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
    url("/pics/shop2.jpg") center/cover no-repeat;
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

const LoginPromptText = styled.span`
  display: block;
  text-align: center;
  margin-top: 20px;
  font-size: 16px;
`;

const ToggleVisibilityIcon = styled.button`
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

const LinkText = styled(Link)`
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  color: #000080;
  text-decoration: none;
`;

const RoleText = styled.div`
  font-size: 15px;
  font-weight: bolder;
  color: navy;
`;

const RoleSelect = styled.select`
  padding: 10px;
  margin-bottom: 1rem;
  border-radius: 4px;
  border: 2px solid #ddd;
  font-size: 16px;

  &:focus {
    border-color: #008080;
  }
`;

const loginReducer = (state, action) => {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    default:
      return state;
  }
};

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [state, dispatchLogin] = useReducer(loginReducer, {
    email: "",
    password: "",
    role: "",
  });

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
    role: Yup.string().required("Role is required"),
  });

  const formik = useFormik({
    initialValues: state,
    validationSchema,
    onSubmit: (values) => {
      const loginAction =
        values.role === "admin"
          ? startsupplierLogin(values, () => navigate("/"))
          : startUserLogin(values, () => navigate("/"));
      dispatch(loginAction);
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatchLogin({ type: "SET_FIELD", field: name, value });
    formik.handleChange(e);
  };

  const togglePasswordVisibility = (e) => {
    e.preventDefault(); // Prevent default form submit behavior
    setShowPassword(!showPassword);
  };

  return (
    <Container>
      <Wrapper>
        <Title>LOG IN</Title>
        <Form onSubmit={formik.handleSubmit}>
          <Input
            type="text"
            name="email"
            value={state.email}
            onChange={handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter your Email"
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-danger">{formik.errors.email}</div>
          ) : null}

          <PasswordInput>
            <Input
              type={showPassword ? "text" : "password"}
              name="password"
              value={state.password}
              onChange={handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter your Password"
            />
            <ToggleVisibilityIcon onClick={togglePasswordVisibility}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </ToggleVisibilityIcon>
          </PasswordInput>
          {formik.touched.password && formik.errors.password ? (
            <div className="text-danger">{formik.errors.password}</div>
          ) : null}

          <RoleText>ROLE:</RoleText>
          <RoleSelect
            name="role"
            value={state.role}
            onChange={handleChange}
            onBlur={formik.handleBlur}
          >
            <option value="" label="Select a role" />
            <option value="admin" label="Admin" />
            <option value="user" label="User" />
          </RoleSelect>
          {formik.touched.role && formik.errors.role ? (
            <ErrorText>{formik.errors.role}</ErrorText>
          ) : null}

          <Button type="submit" disabled={formik.onSubmit}>
            LOGIN
          </Button>

          <LoginPromptText>
            <span style={{ color: "red" }}>Don't have an account?</span>{" "}
            <LinkText to="/auth/register">Register</LinkText>
          </LoginPromptText>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default LoginForm;
