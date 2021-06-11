import styled from "styled-components";
import Avatar from "../Avatar";
import Category from "./Category";
import { Link } from "react-router-dom";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PhotoContainer = styled.div`
  background-color: ${(props) => props.theme.bgColor};
  border: 1px solid ${(props) => props.theme.borderColor};
`;
const PhotoHeader = styled.header`
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgb(239, 239, 239);
`;
const Profile = styled.div`
  display: flex;
  align-items: center;
`;

const Username = styled.span`
  margin-left: 10px;
`;

const PhotoFile = styled.img`
  width: 300px;
  height: 300px;
`;

const PhotoData = styled.div`
  padding: 10px 15px;
`;

const PhotoActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  svg {
    font-size: 20px;
  }
  div {
    display: flex;
    align-items: center;
  }
`;
const PhotoAction = styled.div`
  margin-right: 10px;
  cursor: pointer;
`;

const EditBtn = styled(Link)``;

const CafeInfo = styled.div``;

const Name = styled.div`
  margin: 15px 0px;
`;

function Photo({ shop }) {
  const { id, name, latitude, longitude, photos, user, categories, isMine } =
    shop;

  return (
    <PhotoContainer key={id}>
      <PhotoHeader>
        <Profile>
          <Link to={`/users/${user.username}`}>
            <Avatar url={user.avatar} large={true} />
          </Link>
          <Link to={`users/${user.username}`}>
            <Username>{user.username}</Username>
          </Link>
        </Profile>
        <span>
          {latitude}, {longitude}
        </span>
      </PhotoHeader>

      {photos[0]?.url ? (
        <PhotoFile src={photos[0].url} />
      ) : (
        <PhotoFile src="https://picsum.photos/200" />
      )}

      <PhotoData>
        <PhotoActions>
          <div>
            <PhotoAction>
              <FontAwesomeIcon size={"lg"} icon={faHeart} />
            </PhotoAction>
          </div>
          {isMine && (
            <div>
              <EditBtn
                to={{
                  pathname: `/shop/${id}`,
                  state: {
                    id,
                    latitude,
                    longitude,
                    name,
                    photos,
                    user,
                    categories,
                    isMine,
                  },
                }}
              >
                EDIT
              </EditBtn>
            </div>
          )}
        </PhotoActions>
        <CafeInfo>
          <Name>{name}</Name>
          {categories?.map((category) => (
            <Category key={category.id} cat={category.slug} />
          ))}
        </CafeInfo>
      </PhotoData>
    </PhotoContainer>
  );
}

export default Photo;
