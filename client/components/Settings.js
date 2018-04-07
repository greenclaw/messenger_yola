import React from 'react';
import {Link} from 'react-router';
import Photo from './Photo'
import Comments from './Comments'



class Single extends React.Component{

  render(){
    //index of the post
    const postId = this.props.params.postId
    const index = this.props.posts.findIndex((post) => post.code === postId);
    const post = this.props.posts[index];
    const postComments = this.props.comments[postId] || [];

    return(
      <div className="single-photo">
        <Photo {...this.props} index={index} post={post}/>
        <Comments postComments={postComments} {...this.props}/>
      </div>
    )
  }
};

export default Single;
