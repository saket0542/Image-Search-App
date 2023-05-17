import React, { useState } from "react";
import axios from "axios";
import './App.css'
import styled from "styled-components";
import ImageComponent from "./components/ImageComponent";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
// Container is the main container of our code.
const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const AppName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
// App Name is used to hold the Logo and Name of the App
const Header = styled.div`
  background-color: black;
  color: white;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  font-size: 25px;
  font-weight: bold;
  box-shadow: 0 3px 6px 0 #555;
`;
const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 10px;
  border-radius: 6px;
  margin-left: 20px;
  width: 50%;
  background-color: white;
`;
const SearchIcon = styled.img`
  width: 32px;
  height: 32px;
`;
const LogoImage = styled.img`
  width: 48px;
  height: 48px;
  margin: 15px;
  border-radius:10px;
`;
const SearchInput = styled.input`
  color: black;
  font-size: 16px;
  font-weight: bold;
  border: none;
  outline: none;
  margin-left: 15px;
`;
const ImageListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  gap: 25px;
  justify-content: space-evenly;
`;
const Placeholder = styled.img`
  width: 120px;
  height: 120px;
  margin: 150px;
  opacity: 50%;
`;


function App() {
  const [searchQuery, updateSearchQuery] = useState("");
  const [imageList, updateImageList] = useState([]);
  const [timeoutId, updateTimeoutId] = useState();
  const [mode,setMode]=useState("light")
  const darkTheme = createTheme({
    palette: {
      mode: mode
    },
  });
  const fetchData=async(searchString)=>{
      const response=await axios.get(
      `https://api.unsplash.com/search/photos?page=1&query=${searchString}&client_id=${process.env.REACT_APP_ACCESS_KEY}`
      )
      updateImageList(response.data.results);
     console.log(response.data.results)
  }
  const onTextChange=(e)=>{
      clearTimeout(timeoutId);
      updateSearchQuery(e.target.value);
      const timeout=setTimeout(()=>fetchData(e.target.value),200);
      updateTimeoutId(timeout);
  }
  const label = { inputProps: { 'aria-label': 'Color switch demo' } };
  return (
    <ThemeProvider theme={darkTheme}>
    <CssBaseline/>
    <Container>
      <Header>
        <AppName className="dark">
          <LogoImage src="https://thumbs.dreamstime.com/z/creative-colorful-camera-logo-design-symbol-vector-illustration-150574893.jpg" />
          Image Search Gallery
        </AppName>
        <SearchBox>
          <SearchIcon src="https://i.pinimg.com/736x/fa/0e/7b/fa0e7b992eff03c576727e95c746005c.jpg" />
          <SearchInput
            placeholder="Search Images"
            value={searchQuery}
            onChange={onTextChange}
          />
        </SearchBox>
    <FormGroup>
  <FormControlLabel control={<Switch onChange={(e)=>setMode(mode==="light"?"dark":"light")}  {...label} defaultUnChecked />} label="DarkMode" />
</FormGroup>
      </Header>
      <ImageListContainer>
      {
        imageList?.length?(imageList.map((img)=>
          <ImageComponent
            image={img}
            key={img.id} 
          />
        )):(
          <Placeholder src="https://play-lh.googleusercontent.com/NuJSG_bIoce6kvvtJnULAf34_Rsa1j-HDEt4MWTOrL_3XA51QH9qOQR5UmAYxPI96jA" />
        )
      }
      </ImageListContainer>
    </Container>
    </ThemeProvider>
  );
}

export default App;
