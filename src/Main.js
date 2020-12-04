import React, { Component } from 'react'
import duck from './duck.gif'

class Main extends Component {
    state = {
        current_location_latitude: "",
        current_location_longitude: "",
        name: "",
        main: {},
        weather: [],
        clouds: [],
        sunset: 0,
        sunrise: 0
    }
    componentDidMount() {
        this.getLocation()
    }


    getLocation = async () => {
        const success = (pos) => {
            var crd = pos.coords;
            this.setState({ current_location_latitude: crd.latitude })
            this.setState({ current_location_longitude: crd.longitude })
            this.getForecast()
        }
        const error = (err) => {
            console.warn(`Error :${err.code} : ${err.message}`)
        }
        const options = {
            maximumAge: 0,
            timeout: 5000
        }
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(success, error, options)
        } else {
            console.log("Geolocation not Available")
        }

    }

    getForecast = async () => {
        try {
            // const res = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=London,uk&units=metric&appid=3473ec5c5d8fa414e3efb52d529e4b14`);

            const res = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${this.state.current_location_latitude}&lon=${this.state.current_location_longitude}&units=metric&appid=3473ec5c5d8fa414e3efb52d529e4b14`)
            const data = await res.json()
            this.setState({ name: data.name })
            this.setState({ main: data.main })
            this.setState({ weather: data.weather[0] })
            this.setState({ clouds: data.clouds })
            this.setState({ sunset: data.sys.sunset })
            this.setState({ sunrise: data.sys.sunrise })
            console.log('data', data)
        } catch (err) {
            console.log("err", err)
        }
    }

    convertUnixTime = (unix) => {
        let convertedDate = new Date(unix * 1e3)
        let pm = convertedDate.getHours() >= 12;
        let hour12 = convertedDate.getHours() % 12;
        if (!hour12)
            hour12 += 12;
        let minute = convertedDate.getMinutes();
        let final = `${hour12}:${minute} ${pm ? 'pm' : 'am'}`
        return final
    }


    render() {
        return (
            <div className="container">
                <h1> {this.state.name}</h1>
                <p> Temperature: {0 || this.state.main.temp}°</p>
                <p> Thermal sensation:  {0 || this.state.main.feels_like}°</p>
                <p> Min:  {0 || this.state.main.temp_min}°</p>
                <p> Max:  {0 || this.state.main.temp_max}°</p>
                <p>Humidity: {this.state.main.humidity} %</p>
                <p> Clouds: {this.state.clouds.all} %  </p>
                <p>{this.state.weather.main}</p>
                <p>{this.state.weather.description}</p>
                <p>Sunrise: {this.convertUnixTime(this.state.sunrise)} </p>
                <p>Sunset:{this.convertUnixTime(this.state.sunset)}</p>
                <img src={duck} alt="spinning duck" />
            </div >
        )
    }
}

export default Main;