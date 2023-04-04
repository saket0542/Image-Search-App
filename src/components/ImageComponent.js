import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { ImageInfoCompo } from "./ImageInfoCompo";

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 280px;
  box-shadow: 0 3px 10px 0 #aaa;
  cursor: pointer;
  border-radius:10px;
`;
const CoverImage = styled.img`
  object-fit: cover;
  height: 362px;
`;
const InfoColumn = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const Des = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: black;
  white-space: nowrap;
  overflow: hidden;
  text-transform: capitalize;
  text-overflow: ellipsis;
`;
const ImageComponent = (props) => {
  const [modal, setmodal] = useState(false);
  const {urls,user,likes,description,id}=props.image
  const clickhandler=()=>{
    setmodal(!modal)
  }
  return (
    <ImageContainer>
      <CoverImage src={urls.regular} alt={description} onClick={clickhandler } />
      {
        modal?<ImageInfoCompo isopen={true} id={id}/>:null
      }
      <InfoColumn>
        <Des>Name : {user.name}</Des>
        <Des>Likes : {likes}</Des>
      </InfoColumn>
    </ImageContainer>
  );
};
export default ImageComponent;