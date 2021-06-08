import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import AuthLayout from "../components/auth/AuthLayout";
import BottomBox from "../components/auth/BottomBox";
import Button from "../components/auth/Button";
import FormBox from "../components/auth/FormBox";
import Input from "../components/auth/Input";
import { BoldLink, Title } from "../components/common";
import PageTitle from "../components/PageTitle";
import routes from "../routes";
import { useForm } from "react-hook-form";
import FormError from "../components/auth/FormError";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { logUserIn } from "../apollo";
import { useLocation } from "react-router";
import { faMugHot } from "@fortawesome/free-solid-svg-icons";

const GithubLogin = styled(BoldLink)`
  font-size: 18px;
  margin-top: 20px;
  span {
    margin-left: 7px;
    font-size: 14px;
  }
`;

const Notification = styled.div`
  color: #2ee712;
`;

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      token
      error
    }
  }
`;

function LogIn() {
  const location = useLocation();
  console.log(location);
  const {
    register,
    handleSubmit,
    errors,
    formState,
    getValues,
    setError,
    clearErrors,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      username: location?.state?.username || "",
      password: location?.state?.password || "",
    },
  });
  const onCompleted = (data) => {
    const {
      login: { ok, error, token },
    } = data;
    if (!ok) {
      return setError("loginResult", { message: error });
    }
    if (token) {
      logUserIn(token);
    }
  };
  const [login, { loading }] = useMutation(LOGIN_MUTATION, { onCompleted });

  const onSubmitValid = (data) => {
    if (loading) {
      return;
    }
    const { username, password } = getValues();
    login({
      variables: {
        username,
        password,
      },
    });
  };

  const clearLoginError = () => {
    clearErrors("loginResult");
  };

  return (
    <AuthLayout>
      <PageTitle title={"Log In"} />
      <FormBox>
        <Title>
          NomadCoffee
          <FontAwesomeIcon icon={faMugHot} size="2x" />
        </Title>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <FormError message={errors?.loginResult?.message} />
          <Notification>{location?.state?.message}</Notification>
          <Input
            ref={register({
              required: "Username is required",
              minLength: {
                value: 5,
                message: "username should be longer than 5 characters.",
              },
            })}
            name="username"
            type="text"
            placeholder="username"
            hasError={Boolean(errors?.username?.message)}
            onChange={clearLoginError}
          />
          <FormError message={errors?.username?.message} />
          <Input
            ref={register({
              required: "Password is required",
            })}
            name="password"
            type="password"
            placeholder="password"
            onChange={clearLoginError}
          />
          <FormError message={errors?.password?.message} />
          <Button
            type="submit"
            hasError={Boolean(errors?.password?.message)}
            value={loading ? "Loading..." : "Log in"}
            disabled={!formState.isValid || loading}
          />
        </form>
        <GithubLogin>
          <FontAwesomeIcon icon={faGithub} />
          <span>Log in with Github</span>
        </GithubLogin>
      </FormBox>
      <BottomBox
        cta="Don't have an account?"
        linkText="Sign up"
        link={routes.signUp}
      />
    </AuthLayout>
  );
}

export default LogIn;
