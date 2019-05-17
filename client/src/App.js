import React from 'react';
// import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      title: '',
      contents: ''
    }
  }

  componentDidMount() {
    axios.get('http://daly-deployment.herokuapp.com/api/posts')
         .then(res => {
           this.setState({ posts: res.data });
         })
         .catch(err => {
           console.log(err);
         });
  }
  render() {
    return (
      <div className="App">
        {this.state.posts.map(post => {
          return (
            <div>
              <h3>{post.title}</h3>
              <p>{post.contents}</p>
            </div>
          );
        })}
      </div>
    );
  }
}

export default App;
