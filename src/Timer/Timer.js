import React, { Component } from 'react';
import './Timer.css';

class Timer extends Component {
    constructor(){
        super()
        this.state = {
            alert: {
                type: '',
                message: ''
            },
            time: 0
        }

        //Defined time for work
        this.times = {
            defaultTime: 1500,
            shortBreak: 300,
            longBreak: 900
        }
    }

    componentDidMount(){
        this.setState({
            time: this.times.defaultTime
        })
    }

    setTime = newTime => {
        this.restartInterval();

        this.setState({
            time: newTime
        })
    }

    restartInterval = () => {
        clearInterval(this.interval)

        this.interval = setInterval(this.countDown, 1000)
    }

    countDown = () => {
        if (this.state.time === 0) {
            this.setState({
                alert: {
                    type: 'buz',
                    message: 'Buzzzzzzzzz!'
                }
            })
        } else {
            this.setState({
                time: this.state.time - 1
            })
        }
    }

    setTimeForWork = () =>{
        this.setState({
            alert:{
                type: 'work',
                message: 'Working!'
            }
        })
        return this.setTime(this.times.defaultTime)
    }

    setTimeForShortBreak = () =>{
        this.setState({
            alert: {
                type: 'shortBreak',
                message: 'Taking a Short Break'
            }
        })
        return this.setTime(this.times.shortBreak)
    }

    setTimeForLongBreak = () => {
        this.setState({
            alert:{
                type: 'longBreak',
                message: 'Taking a Long Break'
            }
        })
        return this.setTime(this.times.longBreak)
    }  
    
    displayTimer = seconds => {
        const min = Math.floor(seconds % 3600 / 60);
        const sec = Math.floor(seconds % 3600 % 60);
        return `${min <10 ? '0': ''}${min}:${sec < 10 ? '0': ''}${sec}`
    }

render(){

    const {alert:{type, message},time} = this.state;

    return(
        <div className="Pomodoro">
            <div className={`alert ${type}`}>
                {message}
            </div>
            <div className="timer">
                {this.displayTimer(time)}
            </div>
            <div className="types">
                <button className="start" onClick={this.setTimeForWork}>
                    Start Working
                </button>
                <button className="short" onClick={this.setTimeForShortBreak}>
                    Short Working
                </button>
                <button className="long" onClick={this.setTimeForLongBreak}>
                    Long Working
                </button>
            </div>
        </div>
    )
}

}
export default Timer;