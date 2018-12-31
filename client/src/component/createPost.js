import React from 'react';
import { Header } from './header';

class CreatePost extends React.Component {


  state = {
    title: '',
    blogpost: '',
    date: ''
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      date: this.state.date,
      blogpost: this.state.blogpost,
      title: this.state.title
    }

    fetch('http://localhost:4040/blog/add', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(() => this.props.history.push('/'))
      .catch(err => console.log(err))
  }

  renderForm = () => {
    return (
      <div>
        <Header />
        <div className="create-header">
          <div className="display-container">
            <h1 className="create-header__title">Create Blog Post</h1>
          </div>
        </div>
        <div className="display-container">
          <form className="form" onSubmit={this.handleSubmit}>
            <input 
              className="text-input" 
              id="title" 
              name="title" 
              type="text"
              placeholder="Title" 
              onChange={(e) => this.setState({ title: e.target.value })} />

            <input 
              className="text-input" 
              id="date" 
              name="date" 
              type="date" 
              onChange={(e) => this.setState({ date: e.target.value })} />

            <textarea 
              className="textarea" 
              id="blogpost" 
              name="blogpost"
              placeholder="Add a blog post" 
              onChange={(e) => this.setState({ blogpost: e.target.value })} />

            <div>
              <button className="create-button" type="submit">Create Entry</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
  render() {
    return (
      this.renderForm()
    )
  }
}

export default CreatePost;