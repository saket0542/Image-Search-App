import React from "react";
import styled from "styled-components";
import { useState } from "react";
import IconButton from '@mui/material/IconButton';
import { ImageInfoCompo } from "./ImageInfoCompo";
import Avatar from '@mui/material/Avatar';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { Icon, Typography } from "@mui/material";
import InstagramIcon from '@mui/icons-material/Instagram';
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
const NameandIcon=styled.div`
display:flex;
margin-top:0.5rem;
flex-direction:row;
justify-content:center;
align-items:center;
gap:2px;
`;
const InfoColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 5px;
`;
const Des = styled.div`
  font-size: 12px;
  font-weight: 500;
  color: black;
  white-space: nowrap;
  overflow: hidden;
  text-transform: capitalize;
  text-overflow: ellipsis;
  display:flex;
  flex-direction:row;
  justify-content:space-around;
  align-items:center;
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
      <NameandIcon>
      <Avatar alt={user.name} src={user.profile_image.small} /> 
      <Typography>{user.name}</Typography>
      </NameandIcon>
      </InfoColumn>
      <Des>
      <Typography>
      <Icon sx={{ display: 'inline-block', verticalAlign: 'middle',color:'#E75480' }} component={InstagramIcon} />
      :{user.instagram_username}
    </Typography>
    <Typography>
      <Icon sx={{ display: 'inline-block', verticalAlign: 'middle', color:'#728FCE'}} component={ThumbUpIcon} />
      :{likes}
    </Typography>
    </Des>
      </ImageContainer>
  );
};
export default ImageComponent;