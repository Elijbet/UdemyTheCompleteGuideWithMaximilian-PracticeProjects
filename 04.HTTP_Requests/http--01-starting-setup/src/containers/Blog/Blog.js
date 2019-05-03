import React, { Component } from 'react';
import axios from 'axios';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
    state={
        posts: []
    }
    componentDidMount(){
        //you can't save this in a variable directly, since requests are
        //asynchronous and will block the execution of the next line.
        //Use .then
        axios.get('http://jsonplaceholder.typicode.com/posts')
            .then(response => {
                this.setState({posts: response.data})
                //console.log('response', response)
            })
    }
    render () {
        const posts = this.state.posts.map(post => {
            return <Post key={post.id} title={post.title}/>;
        })
        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost />
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;