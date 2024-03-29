import React, { useState } from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import moment from 'moment'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'

import useStyles from './styles'
import { deletePost, likePost } from '../../../state/actions/posts';

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const navigate = useNavigate();
  const [likes, setLikes] = useState(post?.likes);

  const user = JSON.parse(localStorage.getItem('profile'));

  const userId = user?.result?.sub || user?.result?._id;
  const hasLikedPost = post.likes.find((like) => like === (userId));

  const handleLike = async () => {
    dispatch(likePost(post._id))

    if (hasLikedPost) {
      setLikes(post.likes.filter((id) => id !== userId))
    } else {
      setLikes([...post.likes, userId]);
    }
  }

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === (userId)) ?
        (<><ThumbUpAltIcon fontSize='small' />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}`}</>)
        : (<><ThumbUpAltOutlined fontSize='small' />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>);
    }
    return <><ThumbUpAltOutlined fontSize='small' />&nbsp;Like</>
  }

  const openPost = () => {
    navigate(`/posts/${post._id}`)
  };

  return (
    <Card className={classes.card} raised elevation={6}>
      <CardMedia className={classes.media} image={post.selectedFile} title={post.title} onClick={openPost} />
      <div className={classes.overlay} onClick={openPost}>
        <Typography variant="h6">{post.name}</Typography>
        <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
      </div>
      {(user?.result?.sub === post?.creator || user?.result?._id === post?.creator) && (
        <div className={classes.overlay2}>
          <Button style={{ color: 'white' }} size='small' onClick={() => { setCurrentId(post._id) }}>
            <MoreHorizIcon fontSize='medium' />
          </Button>
        </div>
      )}
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary">{post.tags.map((tag) => `#${tag} `)}</Typography>
      </div>
      <Typography className={classes.title} variant="h5" gutterBottom>{post.title}</Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="div">{post.message.length > 150 ? post.message.substring(0, 150) + "..." : post.message} <strong><p style={{ display: "inline", textDecoration: "underline" }} onClick={openPost}>Read More</p></strong></Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button size="small" disabled={!user?.result} color="primary" onClick={handleLike}>
          <Likes />
        </Button>
        {(user?.result?.sub === post?.creator || user?.result?._id === post?.creator) && (
          <Button size="small" color="primary" onClick={() => dispatch(deletePost(post._id))}>
            <DeleteIcon fontSize="small" /> &nbsp;Delete&nbsp;
          </Button>
        )}
      </CardActions>

    </Card>
  )
}

export default Post;