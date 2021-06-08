import { useMutation } from "@apollo/client";
import { faMugHot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import gql from "graphql-tag";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import AuthLayout from "../components/auth/AuthLayout";
import BottomBox from "../components/auth/BottomBox";
import Button from "../components/auth/Button";
import FormBox from "../components/auth/FormBox";
import FormError from "../components/auth/FormError";
import Input from "../components/auth/Input";
import { Title } from "../components/common";
import PageTitle from "../components/PageTitle";
import routes from "../routes";

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $username: String!
    $email: String!
    $name: String!
    $password: String!
    $avatar: String
    $location: String
    $githubUsername: String
  ) {
    createAccount(
      username: $username
      email: $email
      name: $name
      password: $password
      avatar: $avatar
      location: $location
      githubUsername: $githubUsername
    ) {
      ok
      error
    }
  }
`;

const SignUp = () => {
  const history = useHistory();
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
  });

  const onCompleted = (data) => {
    const { username, password } = getValues();
    const {
      createAccount: { ok, error },
    } = data;
    if (!ok) {
      return setError("createAccountResult", { message: error });
    }
    history.push(routes.home, {
      message: "Account Created!",
      username,
      password,
    });
  };

  const [createAccount, { loading }] = useMutation(CREATE_ACCOUNT_MUTATION, {
    onCompleted, // onCompleted gives us "data"
  });

  const onsubmitValid = (data) => {
    if (loading) {
      return;
    }
    const {
      username,
      password,
      name,
      email,
      avatar,
      location,
      githubUsername,
    } = getValues();

    createAccount({
      variables: {
        username,
        password,
        name,
        email,
        avatar,
        location,
        githubUsername,
      },
    });
  };

  const clearCreateAccountError = () => {
    clearErrors("createAccountResult");
  };

  return (
    <AuthLayout>
      <PageTitle title={"Sign up"} />
      <FormBox>
        <Title>
          NomadCoffee
          <FontAwesomeIcon icon={faMugHot} size="2x" />
        </Title>

        <form onSubmit={handleSubmit(onsubmitValid)}>
          <FormError message={errors?.createAccountResult?.message} />
          <Input
            ref={register({
              required: "Username is required.",
              minLength: {
                value: 3,
                message: "Username should be longer than 3 characters.",
              },
            })}
            name="username"
            type="text"
            placeholder="username"
            onChange={clearCreateAccountError}
          />
          <FormError message={errors?.username?.message} />

          <Input
            ref={register({
              required: "Name is required.",
            })}
            name="name"
            type="name"
            placeholder="name"
            onChange={clearCreateAccountError}
          />
          <FormError message={errors?.name?.message} />

          <Input
            ref={register({
              required: { message: "Email is required." },
            })}
            name="email"
            type="email"
            placeholder="email"
            onChange={clearCreateAccountError}
          />
          <FormError message={errors?.email?.message} />

          <Input
            ref={register({
              required: "Password is required.",
              minLength: {
                value: 3,
                message: "Password should be longer than 3 characters.",
              },
            })}
            name="password"
            type="password"
            placeholder="password"
            onChange={clearCreateAccountError}
          />
          <FormError message={errors?.password?.message} />

          <Button
            type="submit"
            value={loading ? "Loading..." : "Sign Up"}
            disabled={!formState.isValid || loading}
          />
        </form>
      </FormBox>

      <BottomBox
        cta="Do have an account?"
        linkText="Log in"
        link={routes.home}
      />
    </AuthLayout>
  );
};

export default SignUp;
