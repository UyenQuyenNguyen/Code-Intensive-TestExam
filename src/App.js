import React from 'react';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';



const Main = styled.div`
	height: 100vh;
	width: 100vw;
	background-image: url("https://wallpapers.com/images/hd4/earth-thick-clouds-4k-space-9cz439cbas77vab6.jpg");
	background-position: left;
	display: flex;
  flex-direction: column;
	justify-content: center;
	align-items: center;
`

const InputBox = styled.div`
	width: 20rem;
	background-color: white;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 8px ;
`

const Img = styled.img`
	width: 35px;
	:hover{
    transform: scale(1.5);
	}
`

const Input = styled.input`
	border: none;
	outline: none;
	height: 3rem;
	width: 80%;
`
const Button = styled.button`
	border: none;
	background-color: white ;
	cursor: pointer;
`
const Card = styled.div`
  width: 30rem;
  height: 40rem;
  background-color: white ;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
	justify-content: center;
	align-items: center;
  padding: 2rem;
  box-sizing: border-box;
  margin-top: 1.5rem;
`

const Info = styled.div`
    display: flex;
    justify-content: center;
	  align-items: center;
`
const InfoItem = styled.div`
    text-align: left;
    margin: 0 2rem;
`


function App() {
  const [weather, setWeather] = useState([]);
  const [capacity, setCapacity] = useState("");
  const [show, setShow] = useState(false);

  const ListIcon = [
    {
      type: "Clear",
      img: "https://cdn-icons-png.flaticon.com/512/6974/6974833.png",
    },
    {
      type: "Rain",
      img: "https://cdn-icons-png.flaticon.com/512/3351/3351979.png",
    },
    {
      type: "Snow",
      img: "https://cdn-icons-png.flaticon.com/512/642/642102.png",
    },
    {
      type: "Clouds",
      img: "https://cdn-icons-png.flaticon.com/512/414/414825.png",
    },
    {
      type: "Haze",
      img: "https://cdn-icons-png.flaticon.com/512/1197/1197102.png",
    },
    {
      type: "Smoke",
      img: "https://cdn-icons-png.flaticon.com/512/4380/4380458.png",
    },
    {
      type: "Mist",
      img: "https://cdn-icons-png.flaticon.com/512/4005/4005901.png",
    },
    {
      type: "Drizzle",
      img: "https://cdn-icons-png.flaticon.com/512/3076/3076129.png",
    },
  ]

  const fetchWeather = async (e) => {
    console.log(capacity);
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${capacity}&appid=35d07d252a9d84ede2e3b060a973f1ab&=&=`);
    const data = await response.json();
    console.log(data);
    setWeather(data);
    setShow(true);
  }

  const getIconWeather = (type) => {
    const item = ListIcon.filter((item) => item.type === type);
    return item && item[0].img;
  }

  const rederResult = () => {
    if (weather.cod >= 200 && weather.cod < 400) {
      return (
        <Card>
          <h1 style={{ margin: '0' }}>{weather.name}</h1>
          <p>City</p>
          <img src={getIconWeather(weather.weather[0].main)} width={150} />
          <h2>{weather.weather[0].main}</h2>
          <Info>
            <InfoItem>
              <h4>Wind</h4>
              <p>Speed: {weather.wind.speed}</p>
              <p>Deg: {weather.wind.deg}</p>
              <p>Gust: {weather.wind.gust}</p>
            </InfoItem>
            <InfoItem>
              <h4>Temperature</h4>
              <p>Temp: {weather.main.temp}</p>
              <p>Temp-min: {weather.main.temp_min}</p>
              <p>Temp-max: {weather.main.temp_max}</p>
            </InfoItem>
          </Info>
        </Card>
      )
    } else {
      return(
      <Card>
         <img style={{width: '200px'}} src={require('./Img/Error.png')} />
        <h1 style={{marginBottom: '0'}}>Error: {weather.cod}</h1>
        <p>Không tìm thấy thành phố</p>
      </Card>

      )
    }
  }

  return (
    <Main>
      {!show && 
        <h1>Weather forecast</h1>
      }
      <InputBox>
        <Input id="capacity"
          type="text" onChange={(e) => { setCapacity(e.target.value) }} placeholder='Input city to search...'/>
        <Button onClick={fetchWeather}><Img src={require('./Img/Search.png')} /></Button>

      </InputBox>

      {show && rederResult()}


    </Main>
  )
}

export default App;

