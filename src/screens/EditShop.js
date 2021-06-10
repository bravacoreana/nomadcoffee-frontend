import gql from "graphql-tag";
import styled from "styled-components";
import Button from "../components/auth/Button";
import Input from "../components/auth/Input";
import PageTitle from "../components/PageTitle";
import routes from "../routes";
import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useHistory, useLocation, useParams } from "react-router";
import { Link } from "react-router-dom";
import { Title } from "../components/common";

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const CafeInfo = styled.div``;

const Box = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px;
  border: 1px solid ${(props) => props.theme.borderColor};
`;

const Table = styled.table`
  margin: 20px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  font-size: 14px;
  max-width: 350px;
  th {
    width: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  tr {
  }
  td {
    color: ${(props) => props.theme.accent};
  }
`;
const BtnBox = styled.div`
  display: flex;
  button {
    width: 50%;
    padding: 5px;
    margin-top: 5px;
    background-color: ${(props) => props.theme.accent};
    color: ${(props) => props.theme.bgColor};
    font-weight: 600;
    font-size: 14px;
  }
`;

const Btn = styled.button`
  border: none;
  &:nth-child(2) {
    margin-left: 5px;
  }
`;

const EDIT_SHOP_MUTATION = gql`
  mutation editCoffeeShop(
    $id: Int!
    $name: String
    $latitude: String
    $longitude: String
    $photos: [Upload]
    $categories: [String]
  ) {
    editCoffeeShop(
      id: $id
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

const DELETE_SHOP_MUTATION = gql`
  mutation deleteShop($id: Int!) {
    deleteCoffeeShop(id: $id) {
      ok
      error
    }
  }
`;

function EditShop() {
  const history = useHistory();
  const { id, latitude, longitude, name, photos, user, categories, isMine } =
    useLocation()?.state;

  const { register, handleSubmit, formState, setError } = useForm({
    mode: "onChange",
  });

  const onCompleted = (data) => {
    const {
      editCoffeeShop: { ok, error },
    } = data;
    history.push(routes.home);
    if (!ok) {
      console.log("[editFormOnCompletedError]", error);
      return setError("result", {
        message: error,
      });
    }
  };

  const [editCoffeeShop, { loading }] = useMutation(EDIT_SHOP_MUTATION, {
    onCompleted,
  });

  const onCompletedDelete = (data) => {
    const {
      deleteCoffeeShop: { ok, error },
    } = data;
    if (!ok) {
      console.log("[deleteFormCompletedError]", error);
      return setError("failDelete", {
        message: error,
      });
    }
  };
  const [deleteShop] = useMutation(DELETE_SHOP_MUTATION, {
    onCompleted: onCompletedDelete,
  });

  const onSubmitValid = (data) => {
    if (loading) {
      return;
    }
    editCoffeeShop({
      variables: {
        id: parseInt(id, 10),
        name: data?.name,
        latitude: data?.latitude,
        longitude: data?.longitude,
        photos: data?.photos,
        categories: data?.categories,
      },
    });
  };

  function deleteCafe() {
    if (window.confirm("Are you sure you wish to delete this item?")) {
      deleteShop({
        variables: { id },
      });
    } else {
      return;
    }
  }

  return (
    <Container>
      <Box>
        <PageTitle title="Edit Caffe" />
        <Title>Edit your caffe!</Title>
        <Table>
          <th>
            <tr>cafename</tr>
            <td>{name}</td>
          </th>
          <th>
            <tr>address</tr>
            <td>
              {latitude}, {longitude}
            </td>
          </th>
          <th>
            <tr>categories</tr>
            <td>{categories.map((cat) => cat.name)}</td>
          </th>
        </Table>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input
            ref={register}
            type="text"
            name="name"
            placeholder="Cafename"
          />

          <Input
            ref={register}
            type="text"
            name="categories"
            placeholder="Category"
          />

          <Input
            ref={register}
            type="text"
            name="longitude"
            placeholder="Longitude"
          />

          <Input
            ref={register}
            type="text"
            name="latitude"
            placeholder="Latitude"
          />

          <Input
            ref={register}
            type="file"
            name="photos"
            placeholder="photos"
            accept="image/*"
            multiple="multiple"
          />

          <Button
            type="submit"
            value={loading ? "Loading..." : "Upload"}
            disabled={!formState.isValid || loading}
          />
          <BtnBox>
            <Btn onClick={deleteCafe}>delete</Btn>
            <Btn>
              <Link to={routes.home}>cancel</Link>
            </Btn>
          </BtnBox>
        </form>
      </Box>
    </Container>
  );
}

export default EditShop;
