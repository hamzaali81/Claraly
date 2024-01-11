import { useForm, SubmitHandler } from "react-hook-form";
import { Box, useColorModeValue } from "@chakra-ui/react";
import { Input } from "../shared/form/Input";
import { get } from "lodash";
import { Button } from "../shared/Button";
import { api } from "../shared/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type LoginForm = {
  email: string;
  password: string;
};

const Auth = () => {
  const bgColor = useColorModeValue("white", "gray.700");
  const navigate = useNavigate();
  const [login, setLogin] = useState(true);
  const [loading, setLoading] = useState<boolean>(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<LoginForm>();

  const loginToggle = () => {
    setLogin((prevState) => !prevState);
  };

  const onSubmit: SubmitHandler<LoginForm> = async (values: LoginForm) => {
    setLoading(true)
    try {
      const res = await api.post(
        login ? "/user/login" : "/user/signup",
        values
      );
      if (login) {
        console.log("login")
        navigate("/");
      } else {
        setLogin(true);
        console.log("signup")
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
      reset()
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Box maxW={"max"} bg={bgColor} rounded={"xl"} boxShadow={"lg"} p={6}>
        <h2>{login ? "Login Form" : "Sign up Form"}</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            {...register("email")}
            isRequired
            label="Email *"
            error={get(errors, "email")}
          />
          <Input
            {...register("password")}
            type="password"
            isRequired
            label="Password *"
            error={get(errors, "password")}
          />
          <Button type="submit" isLoading={loading} style={{ width: "100%", marginTop: 30 }}>
            Login
          </Button>
          <p>
            {login ? `Don't have an account, ` : `Already have an account, `}
            <span
              style={{ fontWeight: "bold", cursor: "pointer" }}
              onClick={loginToggle}
            >
              {login ? "Sign up" : "Login"}
            </span>
          </p>
        </form>
      </Box>
    </div>
  );
};

export default Auth;