import React, { Component } from 'react';
import { Header } from './header';

class EditPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      title: '',
      blogpost: '',
      date: '',
      callBackRes: null
    }
  }

  componentDidMount(){
    this.displayPost();
  }

  displayPost = () => {
    this.setState({
      id: this.props.location.state.id,
      title: this.props.location.state.title,
      blogpost: this.props.location.state.blogpost,
      date: this.props.location.state.date,
      callBackRes: false
    });
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const data = {
      id: this.state.id,
      date: this.state.date,
      blogpost: this.state.blogpost,
      title: this.state.title
    }

    fetch(`http://localhost:4040/blog/${data.id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(() => this.props.history.push('/'))
      .catch(err => console.log(err));

  }

  renderEdit = () => {
    return (
      <div>
        <Header />
        <div className="edit-header">
          <div className="display-container">
            <h1 className="h1-edit">Edit Post</h1>
          </div>
        </div>
        <div className="display-container">
          <form className="form" onSubmit={this.handleSubmit}>
            <input 
              id="title"
              className="text-input" 
              name="title" 
              type="text" 
              value={this.state.title}
              onChange={e => this.setState({ title: e.target.value })} />

            <input 
              id="date"
              className="text-input" 
              name="date" 
              type="date" 
              value={this.state.date}
              onChange={e => this.setState({ date: e.target.value })} />

            <textarea 
              id="blogpost"
              className="textarea" 
              name="blogpost" 
              value={this.state.blogpost}
              onChange={e => this.setState({ blogpost: e.target.value })} />

            <div>
              <button className="create-button" type="submit">Save Post</button>
            </div>
          </form>
        </div>
      </div> 
    );
  }

  render() {
    return (
      this.renderEdit()
    )
  }
}

export default EditPost;