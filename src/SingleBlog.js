import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Box, Skeleton, Fade, Breadcrumbs, Link, Alert, LinearProgress } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ArticleIcon from '@mui/icons-material/Article';
import { Link as RouterLink } from 'react-router-dom';
import { doc, getDoc } from "firebase/firestore";
import { db } from './firebaseConfig';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import DOMPurify from 'dompurify';

const SingleBlog = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        setLoading(true);
        setError(null);
        const docRef = doc(db, "blogPosts", id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setPost({ id: docSnap.id, ...docSnap.data() });
        } else {
          setError('Blog post not found');
        }
      } catch (error) {
        console.error("Error fetching blog post:", error);
        setError('Failed to load blog post');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPost();
  }, [id]);

  // Loading state
  if (loading) {
    return (
      <Container maxWidth="md" sx={{ paddingY: 4 }}>
        <LinearProgress />
        <Skeleton variant="text" width={300} height={30} sx={{ mb: 4 }} />
        <Skeleton variant="text" width="80%" height={60} sx={{ mb: 3 }} />
        <Skeleton variant="rectangular" height={400} sx={{ mb: 3 }} />
        <Skeleton variant="text" height={30} count={5} />
      </Container>
    );
  }

  // Error state
  if (error) {
    return (
      <Container maxWidth="md" sx={{ paddingY: 4 }}>
        <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
        <Link component={RouterLink} to="/blog">Return to Blog List</Link>
      </Container>
    );
  }

  // Not found state
  if (!post) {
    return (
      <Container maxWidth="md" sx={{ paddingY: 4 }}>
        <Alert severity="info">Blog post not found</Alert>
        <Link component={RouterLink} to="/blog">Return to Blog List</Link>
      </Container>
    );
  }

  const sanitizedContent = DOMPurify.sanitize(post.content || post.description);

  return (
    <>
      <Helmet>
        <title>{post.title} | Your Blog Name</title>
        <meta name="description" content={post.description || post.content?.substring(0, 155)} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description || post.content?.substring(0, 155)} />
        {post.image && <meta property="og:image" content={post.image} />}
      </Helmet>

      <Fade in={!loading} timeout={1000}>
        <Container maxWidth="md" sx={{ 
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
          {/* Breadcrumbs */}
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
            <Link
              component={RouterLink}
              to="/blog"
              color="inherit"
              sx={{
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
                '&:hover': { color: 'primary.main' }
              }}
            >
              <ArticleIcon sx={{ mr: 0.5 }} fontSize="small" />
              المدونة
            </Link>
            <Typography
              sx={{
                display: 'flex',
                alignItems: 'center',
                color: 'text.primary'
              }}
            >
              {post.title}
            </Typography>
          </Breadcrumbs>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Box sx={{ mb: 8, textAlign: 'right' }}>
              {post.category && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Typography 
                    component="span"
                    sx={{
                      display: 'inline-block',
                      background: `linear-gradient(45deg, #be1e2f, #d13744)`,
                      color: 'white',
                      px: 3,
                      py: 0.8,
                      borderRadius: '20px',
                      mb: 3,
                      fontSize: '0.95rem',
                      fontWeight: 600,
                      boxShadow: '0 4px 15px rgba(190,30,47,0.2)',
                      backdropFilter: 'blur(8px)',
                    }}
                  >
                    {post.category}
                  </Typography>
                </motion.div>
              )}

              <Typography 
                variant="h1" 
                sx={{
                  fontWeight: 900,
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  lineHeight: 1.2,
                  mb: 3,
                  background: `linear-gradient(45deg, #be1e2f, #d13744)`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 10px 30px rgba(190,30,47,0.15)',
                }}
              >
                {post.title}
              </Typography>

              <Box 
                sx={{ 
                  display: 'flex', 
                  gap: 3, 
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  color: 'text.secondary'
                }}
              >
                <Typography variant="body2">
                  {`${Math.ceil((post.content?.length || 0) / 1000)} دقائق للقراءة`}
                </Typography>
                <Typography variant="body2">
                  {post.date ? new Date(post.date).toLocaleDateString('ar-SA') : ''}
                </Typography>
              </Box>
            </Box>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <Box sx={{ 
              position: 'relative',
              mb: 8,
              '&::before': {
                content: '""',
                position: 'absolute',
                inset: '-10px',
                background: `linear-gradient(45deg, rgba(190,30,47,0.1), rgba(209,55,68,0.1))`,
                borderRadius: '32px',
                zIndex: -1,
                filter: 'blur(20px)'
              }
            }}>
              <Box
                component="img"
                src={post.image}
                alt={post.title}
                sx={{
                  width: '100%',
                  height: { xs: 400, md: 600 },
                  objectFit: 'cover',
                  borderRadius: '28px',
                  boxShadow: '0 30px 60px rgba(0,0,0,0.15)',
                  transition: 'transform 0.5s ease',
                  '&:hover': {
                    transform: 'scale(1.02)'
                  }
                }}
              />
            </Box>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <Typography 
              variant="body1" 
              sx={{
                fontSize: { xs: '1.1rem', md: '1.25rem' },
                lineHeight: 2,
                color: 'text.secondary',
                textAlign: 'right',
                '& p': {
                  mb: 4
                },
                position: 'relative',
                zIndex: 1,
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: -60,
                  right: -80,
                  fontSize: '200px',
                  background: 'linear-gradient(45deg, rgba(190,30,47,0.05), rgba(209,55,68,0.05))',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  zIndex: -1
                }
              }}
              dangerouslySetInnerHTML={{ __html: sanitizedContent }}
            />
          </motion.div>

          {/* Optional: Add social share buttons or related posts here */}
        </Container>
      </Fade>
    </>
  );
};

export default SingleBlog;
