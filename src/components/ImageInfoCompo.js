import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import styled from 'styled-components';

const Image = styled.img`
  width: 100%;
  height: 60vh;
  object-fit: cover;
  border-radius: 8px 8px 0 0;
`;

const ModalContainer = styled(Box)`
  background-color: white;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileImage = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  margin-right: 16px;
`;

const ProfileInfo = styled(Box)`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

const InstagramHandle = styled(Typography)`
  color: #666;
  margin-top: 8px;
`;

const Likes = styled(Typography)`
  margin-top: 16px;
`;

const StyledModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ImageInfoCompo = (props) => {
  let [open, setOpen] = useState(false);
  const [image, setImage] = useState({});
  const [user, setUser] = useState({});
  const ACCESS_KEY = 'xQ-DWfk84120yW4mpt2O-grHnWomaD5GvCvdHtLBwts';
  const PHOTO_ID = props.id;
  open=props.isopen
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`https://api.unsplash.com/photos/${PHOTO_ID}`, {
          headers: {
            Authorization: `Client-ID ${ACCESS_KEY}`,
          },
        });
        const json = await response.json();
        setImage(json);
        setUser(json.user);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [PHOTO_ID]);

  const handleClose=()=>{
    setOpen(false)
    console.log("handle close is called")
  }
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: 'auto',
    maxWidth: '90%',
    maxHeight: '90%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };

  return (
    <StyledModal
      open={open}
      onClose={handleClose}
      // onBackdropClick={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <ModalContainer sx={style}>
        {image.urls ? (
          <>
            <Image src={image.urls.regular} />
            <ProfileInfo>
              <ProfileImage src={user.profile_image.small} />
              <Typography variant="h6">{user.name}</Typography>
            </ProfileInfo>
            <InstagramHandle variant="subtitle1">@{user.instagram_username}</InstagramHandle>
            <Likes variant="subtitle1">{image.likes} likes</Likes>
          </>
        ) : (
          <Typography>Loading...</Typography>
        )}
      </ModalContainer>
    </StyledModal>
  );
};
