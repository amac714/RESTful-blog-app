import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Header } from './header';

class DisplayPosts extends Component {
  constructor() {
    super();

    this.state = {
      posts: [],
      post: {
        date: '',
        blogpost: '',
        title: '',
      },
    };
  }

  componentDidMount() {
    this.getPosts();
  }

  getPosts = _ => {
    fetch('http://localhost:4040/blog')
      .then(res => res.json())
      .then(res => this.setState({ posts: res.data }))
      .catch(err => console.log(err));
  };

  deletePost = id => {
    fetch(`http://localhost:4040/blog/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(this.getPosts);
  };

  renderPosts = ({ id, date, blogpost, title }) => {
    const edit = {
      pathname: '/editpost',
      state: {
        id: `${id}`,
        date: `${date}`,
        blogpost: `${blogpost}`,
        title: `${title}`,
      },
    };

    return (
      <div className="post-container" key={id}>
        <h2>
          {title} - {date}
        </h2>
        <p>{blogpost}</p>
        <Link className="edit-button" to={edit}>Edit</Link>
        <button className="button" onClick={() => this.deletePost(`${id}`)}>Delete</button>
      </div>
    );
  };

  render() {
    const { posts } = this.state;
    return (
      <div>
        <Header />
        <div className="display-container">
          <div className="entry">
            <Link className="create-button" to="/add">Create Entry</Link>
          </div>
          {posts.slice(0).reverse().map(this.renderPosts)}
        </div>
      </div>
    );
  }
}

export default DisplayPosts;