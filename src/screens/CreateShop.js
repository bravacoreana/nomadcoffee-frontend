import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import styled from "styled-components";
import Button from "../components/auth/Button";
import Input from "../components/auth/Input";
import { Title } from "../components/common";
import PageTitle from "../components/PageTitle";
import routes from "../routes";

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Box = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CREATE_SHOP_MUTATION = gql`
  mutation createCoffeeShop(
    $name: String!
    $latitude: String!
    $longitude: String!
    $photos: [Upload]
    $categories: [String]
  ) {
    createCoffeeShop(
      name: $name
      latitude: $latitude
      longitude: $longitude
      photos: $photos
      categories: $categories
    ) {
      ok
      error
    }
  }
`;

export const CreateShop = () => {
  const history = useHistory();
  const { register, handleSubmit, errors, formState } = useForm({
    mode: "onChange",
  });

  const onCompleted = (data) => {
    const {
      createCoffeeShop: { ok },
    } = data;
    if (ok) history.push(routes.home);
    // if (!ok) {
    //   console.log("CreateShopOnCompleted", error);
    //   return;
    // }
  };

  const [createCoffeeShop, { loading }] = useMutation(CREATE_SHOP_MUTATION, {
    onCompleted,
  });

  const onSubmitValid = (data) => {
    if (loading) {
      return;
    }
    createCoffeeShop({
      variables: { ...data },
    });
  };

  return (
    <Container>
      <Box>
        <PageTitle title="Create Caffe" />
        <Title>Share your caffe!</Title>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input
            ref={register({
              required: "Caffe Name is required",
            })}
            type="text"
            name="name"
            placeholder="Caffe name"
            hasError={Boolean(errors?.name?.message)}
          />

          <Input
            ref={register}
            type="text"
            name="categories"
            placeholder="Category"
            hasError={Boolean(errors?.categories?.message)}
          />

          <Input
            ref={register({
              required: "Address is required",
            })}
            type="text"
            name="longitude"
            placeholder="longitude"
            hasError={Boolean(errors?.longitude?.message)}
          />

          <Input
            ref={register({
              required: "Address is required",
            })}
            type="text"
            name="latitude"
            placeholder="latitude"
            hasError={Boolean(errors?.latitude?.message)}
          />

          <Input
            ref={register}
            type="file"
            name="photos"
            placeholder="photos"
            accept="image/*"
            multiple="multiple"
            hasError={Boolean(errors?.photos?.message)}
          />

          <Button
            type="submit"
            value={loading ? "Loading..." : "Upload"}
            disabled={!formState.isValid || loading}
          />
        </form>
      </Box>
    </Container>
  );
};

export default CreateShop;
