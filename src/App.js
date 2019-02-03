import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
	constructor(props) {
		super(props) 
		this.state = {}
		this.getData()
	}

	async getData() {
		await fetch('http://localhost:4001/clicks').then((res) => res.json()).then((json)=> {
			let visitors = []
			while(json.length > 0) {
				let ip = json[0].ip
				visitors.push(json.filter(click=> click.ip === ip))
				json = json.filter(click=> click.ip !== ip)
			}
			this.setState({visitors: visitors})
			}) 
	}

  render() {
    return (
      <div className="App">
        <header className="App-header">
        	{ this.state.visitors? this.state.visitors.map(visitor=>{
						return (
							<div className='visit-container'>
								{visitor.map(click=>{
									return (
										<div className='click-container'>
											<ul>
												<li>{click.section}</li>
												<li>{click.destination}</li>
												<li>{click.linktext}</li>
												<li>{click.position}</li>
												<li>{click.color}</li>
												<li>{click.time}</li>
											</ul>
										</div>
									)
								})}
							</div>
						)
        	}) : null }
        </header>
      </div>
    );
  }
}

export default App;
