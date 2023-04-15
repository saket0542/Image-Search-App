import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import styled from 'styled-components';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import DownloadIcon from '@mui/icons-material/Download';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Button from '@mui/material/Button';
const Image = styled.img`
  width: 100%;
  height: 80vh;
  object-fit: cover;
  border-radius: 8px 8px 0 0;
`;

const ModalContainer = styled(Box)`
  border-radius: 8px;
  padding: 10px;
  display: flex;
  flex-direction:column;
  align-items: center;
`;

const StyledModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ImageInfoCompo = (props) => {
  let [open, setOpen] = useState(props.isopen);
  const [image, setImage] = useState({});
  const [user, setUser] = useState({});
  const [liked,setliked]=useState(false);
  const PHOTO_ID = props.id;
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`https://api.unsplash.com/photos/${PHOTO_ID}`, {
          headers: {
            Authorization: `Client-ID ${process.env.REACT_APP_ACCESS_KEY}`,
          },
        });
        const json = await response.json();
        setImage(json);
        setUser(json);
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
    width: 700,
    height: 700,
    maxWidth: '90%',
    maxHeight: '90%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    backgroundColor: 'white',
  };
const clickhandler=()=>{
setliked(!liked);
}
  return (
    <StyledModal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <ModalContainer sx={style}>
        {image.urls ? (
          <>
            <Image src={image.urls.regular} />
            <Box sx={{display:'flex', flexDirection:'row', marginTop:2,marginBottom:1,gap:1,width:'100%'}}>
  <Box sx={{display:'flex',flexGrow:1}}>
   <Button onClick={clickhandler} variant="outlined" startIcon= {liked ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}>Like</Button>
    <Button variant="outlined" startIcon={<ShareIcon />}>Share</Button>
    <Button variant="outlined" startIcon={<PowerSettingsNewIcon />}>Info</Button>
  </Box>
  <Button variant="contained" color="success"startIcon={<DownloadIcon />}>
  Download
</Button>
</Box>
          </>
        ) : (
          <Typography>Loading...</Typography>
        )}
      </ModalContainer>
    </StyledModal>
  );
};
