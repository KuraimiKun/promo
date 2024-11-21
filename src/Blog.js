import React, { useEffect, useState } from 'react';
import { Container, Card, CardContent, Typography, Link, Box, Skeleton, Fade } from '@mui/material';
import { collection, getDocs } from "firebase/firestore";
import { db } from './firebaseConfig';
import { Link as RouterLink } from 'react-router-dom';

const cardStyles = {
  display: 'flex',
  flexDirection: { xs: 'column', sm: 'row' },
  marginBottom: 4,
  borderRadius: 4,
  boxShadow: 3,
  overflow: 'hidden',
};

const imageStyles = {
  width: { xs: '100%', sm: '40%' },
  height: { xs: 200, sm: 300 },
  objectFit: 'cover',
};

const contentStyles = {
  flex: '1',
  padding: 3,
  textAlign: 'right',
  position: 'relative', // This is important to position the button inside this area
};

const BlogPostSkeleton = () => (
  <Card sx={cardStyles}>
    <Skeleton
      variant="rectangular"
      sx={imageStyles}
    />
    <CardContent sx={contentStyles}>
      <Skeleton variant="text" width="80%" height={40} sx={{ marginBottom: 2 }} />
      <Skeleton variant="text" width="100%" height={20} />
      <Skeleton variant="text" width="100%" height={20} />
      <Skeleton variant="text" width="60%" height={20} />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Skeleton variant="text" width="20%" height={30} />
      </Box>
    </CardContent>
  </Card>
);

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        setLoading(true);
        const querySnapshot = await getDocs(collection(db, "blogPosts"));
        const posts = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setBlogPosts(posts);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  return (
    <Container maxWidth="md" sx={{ paddingTop: 4, paddingBottom: 4 }}>
      {loading ? (
        <>
          <BlogPostSkeleton />
          <BlogPostSkeleton />
          <BlogPostSkeleton />
        </>
      ) : (
        <Fade in={!loading} timeout={800}>
          <div>
            {blogPosts.map((post) => (
              <Card
                key={post.id}
                sx={cardStyles}
              >
                {/* Image Section */}
                <Box
                  component="img"
                  src={post.image}
                  alt={post.title}
                  sx={imageStyles}
                />

                {/* Content Section */}
                <CardContent sx={contentStyles}>
                  <Typography variant="h5" component="h2" gutterBottom>
                    {post.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" paragraph>
                    {post.description}
                  </Typography>
                  
                  {/* "Read More" Button */}
                  <Box sx={{ position: 'absolute', bottom: 30 , left: 30 }}>
                    <Link
                      component={RouterLink}
                      to={`/blog/${post.id}`}
                      color="primary"
                      underline="hover"
                      sx={{ fontWeight: 'bold' }}
                    >
                      قراءة المزيد &raquo;
                    </Link>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </div>
        </Fade>
      )}
    </Container>
  );
};

export default Blog;
