import React from 'react';
import { Container, Typography, Box, Grid, Divider } from '@mui/material';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <Box sx={{ overflowX: 'hidden' }}> {/* Add this wrapper */}
      <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        sx={{
          position: 'relative',
          height: '75vh',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(45deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 100%)',
            zIndex: 1
          }
        }}
      >
        <Box
          component={motion.img}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          src="/images/promoTeam.jpg"
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transform: 'scale(1.1)',
            transition: 'transform 0.3s ease-out',
            '&:hover': {
              transform: 'scale(1.05)',
            }
          }}
        />
        <Container
          maxWidth={false}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 2,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.4) 100%)'
          }}
        >
          <Box
            sx={{
              position: 'relative',
              textAlign: 'center',
              '&::before, &::after': {
                content: '""',
                position: 'absolute',
                width: '150px',
                height: '3px',
                background: (theme) => theme.palette.primary.main,
                top: '50%',
                transform: 'translateY(-50%)',
              },
              '&::before': {
                right: '100%',
                marginRight: '2rem',
              },
              '&::after': {
                left: '100%',
                marginLeft: '2rem',
              }
            }}
          >
            <Typography
              component={motion.h1}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              variant="h1"
              sx={{
                fontWeight: 900,
                color: 'white',
                fontSize: { xs: '2.5rem', md: '4rem' },
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                mb: 2,
                position: 'relative',
                display: 'inline-block',
                px: 4
              }}
            >
              من نحن
            </Typography>
          </Box>
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <Typography
              variant="h5"
              sx={{
                color: 'white',
                mt: 2,
                textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                fontWeight: 500,
                opacity: 0.9
              }}
            >
              نبتكر لنصنع الفرق
            </Typography>
          </motion.div>
        </Container>
      </Box>

      <Box sx={{ 
        backgroundColor: '#f8f9fa', 
        py: 12,
        overflow: 'hidden' // Add this
      }}>
        <Container maxWidth="lg">
          <Grid container spacing={6}>
            <Grid item xs={12} md={6}>
              <Box
                component={motion.div}
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                sx={{
                  backgroundColor: 'white',
                  borderRadius: 4,
                  p: 6,
                  boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                  height: '100%',
                  position: 'relative',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '4px',
                    height: '100%',
                    background: 'primary.main',
                    borderTopRightRadius: 4,
                    borderBottomRightRadius: 4,
                  }
                }}
              >
                <Typography 
                  variant="h4" 
                  component="div" 
                  sx={{ 
                    mb: 4,
                    fontWeight: 700,
                    color: 'primary.main',
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: -8,
                      right: 0,
                      width: '60px',
                      height: '3px',
                      backgroundColor: 'primary.main',
                    }
                  }}
                >
                  تعرف على برومو
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <Typography 
                      variant="body1" 
                      paragraph 
                      sx={{ 
                        fontSize: '1.1rem', 
                        lineHeight: 2,
                        color: 'text.primary',
                        textAlign: 'justify',
                        '&:first-letter': {
                          fontSize: '1.5em',
                          color: 'primary.main',
                          fontWeight: 700,
                        }
                      }}
                    >
                      "برومو" هي شركة رائدة في مجال الإنتاج الإعلامي والتسويق الرقمي، تضم فريقًا من المحترفين الملتزمين بالإبداع والتميز، والذين يجمعهم شغف قوي نحو تقديم حلول إعلامية مبتكرة تعزز قوة العلامات التجارية وتحقق أهداف عملائنا بفعالية ودقة.
                    </Typography>
                  </motion.div>

                  <Divider sx={{ my: 2 }} />

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    <Box sx={{ 
                      backgroundColor: 'primary.main',
                      color: 'white',
                      p: 3,
                      borderRadius: 2,
                      mb: 4
                    }}>
                      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                        خدماتنا الرئيسية
                      </Typography>
                      <Typography sx={{ lineHeight: 1.8 }}>
                        نقدم مجموعة متكاملة من الخدمات الإعلامية تشمل إنتاج البرامج التلفزيونية وتصميم الإعلانات التجارية وإنشاء الأفلام الوثائقية، إلى جانب توثيق المناسبات الهامة، وتطوير الهوية البصرية، وتقديم خدمات المونتاج والموشن جرافيك، وكتابة المحتوى وصياغة السيناريوهات، وإدارة حسابات التواصل الاجتماعي، وتصميم المواقع الإلكترونية والتطبيقات، وإدارة الحملات الإعلامية، وتحسين محركات البحث (SEO) لتعزيز الظهور الرقمي.
                      </Typography>
                    </Box>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        fontSize: '1.1rem', 
                        lineHeight: 2,
                        px: 3,
                        borderRight: '2px solid',
                        borderColor: 'primary.main',
                      }}
                    >
                      وبالإضافة إلى ذلك، توفر "برومو بلس" مجموعة خدمات مساندة تلبي احتياجات المشاريع التقنية واللوجستية، مثل تأجير معدات التصوير، وتأجير شاشات LED الحديثة، وتوفير أنظمة الإضاءة والصوت المتقدمة، إلى جانب خدمات الترجمة الفورية لضمان التواصل الفعّال، وتصميم وإنتاج المطبوعات والهدايا التذكارية التي تضفي طابعًا خاصًا لكل فعالية.
                    </Typography>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    viewport={{ once: true }}
                  >
                    <Typography 
                      variant="body1" 
                      paragraph 
                      sx={{ 
                        fontSize: '1.1rem', 
                        lineHeight: 2,
                        color: 'text.primary',
                        textAlign: 'justify',
                        '&:first-letter': {
                          fontSize: '1.5em',
                          color: 'primary.main',
                          fontWeight: 700,
                        }
                      }}
                    >
                      نؤمن بأن الإبداع والابتكار هما جوهر النجاح، ونحرص على بناء شراكات طويلة الأمد مع عملائنا تقوم على الثقة والاحترام المتبادل، مع التزامنا بتقديم أعلى معايير الجودة والاحترافية في كل ما نقدمه.
                    </Typography>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <Typography 
                      variant="body1" 
                      paragraph 
                      sx={{ 
                        fontSize: '1.1rem', 
                        lineHeight: 2,
                        color: 'text.primary',
                        textAlign: 'justify',
                        '&:first-letter': {
                          fontSize: '1.5em',
                          color: 'primary.main',
                          fontWeight: 700,
                        }
                      }}
                    >
                      في "برومو"، نسعى دائمًا لتقديم حلول إعلامية شاملة تساهم في نجاح مشاريعكم وتعكس قوة علامتكم التجارية بأفضل صورة.
                    </Typography>
                  </motion.div>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                component={motion.div}
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                sx={{
                  position: 'sticky',
                  top: 100,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 4
                }}
              >
                <Box
                  component="img"
                  src="/images/promoTeam2.jpg" // Add another image here
                  sx={{
                    width: '100%',
                    height: 400,
                    objectFit: 'cover',
                    borderRadius: 4,
                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                  }}
                />
                <Box sx={{
                  backgroundColor: 'primary.main',
                  p: 4,
                  borderRadius: 4,
                  color: 'white'
                }}>
                  <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
                    رؤيتنا
                  </Typography>
                  <Typography>
                    نسعى لأن نكون الخيار الأول في عالم الإنتاج الإعلامي والتسويق الرقمي
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default About;
