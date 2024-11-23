import React, { useEffect, useState } from 'react';
import { Container, Card, CardContent, Typography, Link, Box, Skeleton, Fade, Breadcrumbs } from '@mui/material';
import { collection, getDocs } from "firebase/firestore";
import { db } from './firebaseConfig';
import { Link as RouterLink } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import ArticleIcon from '@mui/icons-material/Article';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
const heroStyles = {
  textAlign: 'center',
  py: 8,
  mb: 6,
  background: 'linear-gradient(135deg, rgba(25,118,210,0.05) 0%, rgba(25,118,210,0.1) 100%)',
  borderRadius: '30px',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at 50% 50%, rgba(25,118,210,0.1) 0%, transparent 50%)',
  }
};

const cardStyles = {
  display: 'flex',
  flexDirection: { xs: 'column', sm: 'row' },
  marginBottom: 4,
  borderRadius: '24px',
  overflow: 'hidden',
  backgroundColor: 'background.paper',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  boxShadow: '0 10px 40px -15px rgba(0,0,0,0.1)',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 24px 50px -12px rgba(0,0,0,0.15)',
    '& .card-image': {
      transform: 'scale(1.08)',
    },
    '& .card-overlay': {
      opacity: 0.3,
    }
  },
  '& .card-overlay': {
    background: 'linear-gradient(45deg, rgba(190,30,47,0.4) 0%, rgba(209,55,68,0.4) 100%)',
    opacity: 0,
    transition: 'opacity 0.3s ease'
  }
};

const imageStyles = {
  width: '100%', // Changed
  height: '100%', // Changed
  position: 'absolute',
  objectFit: 'cover',
  transition: 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
};

const contentStyles = {
  flex: '1',
  padding: 4,
  textAlign: 'right',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  position: 'relative',
  zIndex: 1,
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, transparent 0%, rgba(25,118,210,0.03) 100%)',
    opacity: 0,
    transition: 'opacity 0.3s ease',
    zIndex: -1,
  },
  '&:hover::after': {
    opacity: 1,
  }
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
    <>
      <Helmet>
        <title>المدونة | Your Blog Name</title>
        <meta name="description" content="اقرأ أحدث المقالات والأخبار في مدونتنا" />
        <meta property="og:title" content="المدونة | Your Blog Name" />
        <meta property="og:description" content="اقرأ أحدث المقالات والأخبار في مدونتنا" />
      </Helmet>

      <Fade in={!loading} timeout={1000}>
        <Container maxWidth="lg" sx={{ 
          paddingY: 8,
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at top right, rgba(26,35,126,0.05), transparent 70%)',
            zIndex: -1
          }
        }}>
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
            variant="h1" 
            sx={{
              fontWeight: 900,
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              lineHeight: 1.2,
              mb: 6,
              textAlign: 'right',
              background: `linear-gradient(45deg, #be1e2f, #d13744)`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 10px 30px rgba(190,30,47,0.15)',
            }}
          >
            المدونة
          </Typography>

          {loading ? (
            <Box sx={{ display: 'grid', gap: 4 }}>
              <BlogPostSkeleton />
              <BlogPostSkeleton />
              <BlogPostSkeleton />
            </Box>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {blogPosts.map((post) => (
                <Card key={post.id} sx={cardStyles}>
                  <Box sx={{ 
                    overflow: 'hidden', 
                    position: 'relative',
                    width: { xs: '100%', sm: '45%' },
                    minHeight: { xs: 280, sm: 380 },
                    flex: { sm: '0 0 45%' }, // Added
                    alignSelf: 'stretch',    // Added
                  }}>
                    <Box
                      component="img"
                      className="card-image"
                      src={post.image}
                      alt={post.title}
                      sx={imageStyles}
                      loading="lazy"
                    />
                    <Box
                      className="card-overlay"
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(45deg, rgba(26,35,126,0.4) 0%, rgba(2,119,189,0.4) 100%)',
                        opacity: 0,
                        transition: 'opacity 0.3s ease'
                      }}
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
                          color: 'primary.main'
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
                        mt: 'auto',
                        pt: 3,
                        borderTop: '1px solid',
                        borderColor: 'divider'
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
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            gap: 2,
                            color: 'primary.dark',
                            transform: 'translateX(-8px)'
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
            </motion.div>
          )}
        </Container>
      </Fade>
    </>
  );
};

export default Blog;
