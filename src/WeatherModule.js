import React, { Component } from 'react';


class WeatherModule extends Component {
    render() {
        return (
            <div>
                <p> Temperature : {0 || this.props.temp}°</p>
                <p> Thermal sensation  {0 || this.props.feels_like}°</p>
                <p> Min  {0 || this.props.temp_min}°</p>
                <p> Max  {0 || this.props.temp_max}°</p>
            </div>
        )
    }

}

export default WeatherModule 