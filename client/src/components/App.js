import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Login from './Login';

class App extends Component {
	state = {isLoading: true};

	componentDidMount() {
    console.log(this.props);
		this.props.fetchUser().then(() => {
			setTimeout(() => this.setState({ isLoading: false }), 3000);
		}).catch((err) => console.log(err))
	}

	render() {
		if(this.state.isLoading)
			return (
   			   <h1>loading</h1>
			);
		return (
			<div>
				<BrowserRouter>
				 <div>
				   <Route exact path="/login" component={Login} />
           </div>
      </BrowserRouter>
    </div>
  )
}

}

function mapStateToProps({ auth }) {
return { auth }
}

export default connect(mapStateToProps, actions)(App);
