import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Box, Skeleton, Fade } from '@mui/material';
import { doc, getDoc } from "firebase/firestore";
import { db } from './firebaseConfig';

const SingleBlog = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        setLoading(true);
        const docRef = doc(db, "blogPosts", id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setPost({ id: docSnap.id, ...docSnap.data() });
        }
      } catch (error) {
        console.error("Error fetching blog post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPost();
  }, [id]);

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ paddingTop: 4 }}>
        <Skeleton variant="rectangular" height={400} sx={{ marginBottom: 2 }} />
        <Skeleton variant="text" height={60} sx={{ marginBottom: 2 }} />
        <Skeleton variant="text" height={30} count={5} />
      </Container>
    );
  }

  if (!post) {
    return (
      <Container maxWidth="md" sx={{ paddingTop: 4 }}>
        <Typography variant="h4">Blog post not found</Typography>
      </Container>
    );
  }

  return (
    <Fade in={!loading} timeout={800}>
      <Container maxWidth="md" sx={{ paddingTop: 4, paddingBottom: 4 }}>
        <Box
          component="img"
          src={post.image}
          alt={post.title}
          sx={{
            width: '100%',
            height: 400,
            objectFit: 'cover',
            borderRadius: 2,
            marginBottom: 3
          }}
        />
        <Typography variant="h4" component="h1" gutterBottom>
          {post.title}
        </Typography>
        <Typography variant="body1" paragraph>
          {post.content || post.description}
        </Typography>
      </Container>
    </Fade>
  );
};

export default SingleBlog;
