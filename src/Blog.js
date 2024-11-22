import React, { useEffect, useState } from 'react';
import { Container, Card, CardContent, Typography, Link, Box, Skeleton, Fade, Breadcrumbs } from '@mui/material';
import { collection, getDocs } from "firebase/firestore";
import { db } from './firebaseConfig';
import { Link as RouterLink } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import ArticleIcon from '@mui/icons-material/Article';

const cardStyles = {
  display: 'flex',
  flexDirection: { xs: 'column', sm: 'row' },
  marginBottom: 4,
  borderRadius: '20px',
  overflow: 'hidden',
  backgroundColor: 'background.paper',
  transition: 'all 0.3s ease-in-out',
  boxShadow: '0 10px 30px -15px rgba(0,0,0,0.1)',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 20px 40px -20px rgba(0,0,0,0.2)',
  }
};

const imageStyles = {
  width: { xs: '100%', sm: '45%' },
  height: { xs: 250, sm: 350 },
  objectFit: 'cover',
  transition: 'transform 0.5s ease',
  '&:hover': {
    transform: 'scale(1.05)'
  }
};

const contentStyles = {
  flex: '1',
  padding: 4,
  textAlign: 'right',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  backgroundColor: 'background.paper',
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
    <Container maxWidth="md" sx={{ paddingY: 6 }}>
      <Breadcrumbs 
        aria-label="breadcrumb" 
        sx={{ 
          mb: 4,
          '& .MuiBreadcrumbs-separator': {
            mx: 1
          }
        }}
      >
        <Link
          component={RouterLink}
          to="/"
          color="inherit"
          sx={{
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            '&:hover': { color: 'primary.main' }
          }}
        >
          <HomeIcon sx={{ mr: 0.5 }} fontSize="small" />
          الرئيسية
        </Link>
        <Typography
          sx={{
            display: 'flex',
            alignItems: 'center',
            color: 'text.primary'
          }}
        >
          <ArticleIcon sx={{ mr: 0.5 }} fontSize="small" />
          المدونة
        </Typography>
      </Breadcrumbs>

      <Typography 
        variant="h3" 
        component="h1" 
        sx={{ 
          mb: 5, 
          textAlign: 'right',
          fontWeight: 800,
          background: 'linear-gradient(45deg, #1a237e, #0277bd)',
          backgroundClip: 'text',
          textFillColor: 'transparent',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        المدونة
      </Typography>

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
              <Card key={post.id} sx={cardStyles}>
                <Box sx={{ overflow: 'hidden', position: 'relative' }}>
                  <Box
                    component="img"
                    src={post.image}
                    alt={post.title}
                    sx={imageStyles}
                    loading="lazy"
                  />
                  {post.category && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        bgcolor: 'rgba(255,255,255,0.9)',
                        px: 2,
                        py: 0.5,
                        borderRadius: '15px',
                        backdropFilter: 'blur(5px)',
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        color: 'primary.main',
                      }}
                    >
                      {post.category}
                    </Box>
                  )}
                </Box>

                <CardContent sx={contentStyles}>
                  <Box>
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        color: 'text.secondary',
                        mb: 1,
                        display: 'block',
                        fontSize: '0.875rem'
                      }}
                    >
                      {post.date ? new Date(post.date).toLocaleDateString('ar-SA') : ''}
                    </Typography>
                    <Typography 
                      variant="h5" 
                      component="h2" 
                      sx={{
                        fontWeight: 700,
                        mb: 2,
                        lineHeight: 1.4,
                        color: 'text.primary'
                      }}
                    >
                      {post.title}
                    </Typography>
                    <Typography 
                      variant="body1" 
                      sx={{
                        color: 'text.secondary',
                        lineHeight: 1.7,
                        mb: 3
                      }}
                    >
                      {post.description}
                    </Typography>
                  </Box>

                  <Box 
                    sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      mt: 'auto'
                    }}
                  >
                    <Link
                      component={RouterLink}
                      to={`/blog/${post.id}`}
                      sx={{
                        color: 'primary.main',
                        textDecoration: 'none',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          gap: 2,
                          color: 'primary.dark'
                        }
                      }}
                    >
                      قراءة المزيد &laquo;
                    </Link>
                    
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        color: 'text.secondary',
                        fontWeight: 500
                      }}
                    >
                      {`${Math.ceil((post.content?.length || 0) / 1000)} دقائق للقراءة`}
                    </Typography>
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
