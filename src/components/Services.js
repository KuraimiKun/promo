import { Box, Card, Typography } from "@mui/material";
import { styled, keyframes } from "@mui/system";
import { useRef, useEffect, useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from 'framer-motion'; // Add AnimatePresence
import MovieIcon from '@mui/icons-material/Movie';
import TvIcon from '@mui/icons-material/Tv';
import CampaignIcon from '@mui/icons-material/Campaign';
import MovieCreationIcon from '@mui/icons-material/MovieCreation';
import EventIcon from '@mui/icons-material/Event';
import BrushIcon from '@mui/icons-material/Brush';
import AnimationIcon from '@mui/icons-material/Animation';
import DescriptionIcon from '@mui/icons-material/Description';
import ShareIcon from '@mui/icons-material/Share';
import WebIcon from '@mui/icons-material/Web';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import SearchIcon from '@mui/icons-material/Search';
import { Grid, Avatar } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import VideocamIcon from '@mui/icons-material/Videocam';
import SpeakerIcon from '@mui/icons-material/Speaker';
import TranslateIcon from '@mui/icons-material/Translate';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';

// Add these new animations
const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const glowingEffect = keyframes`
  0% { box-shadow: 0 0 5px rgba(98, 0, 238, 0.2), 0 0 10px rgba(98, 0, 238, 0.2), 0 0 15px rgba(98, 0, 238, 0.2); }
  50% { box-shadow: 0 0 10px rgba(98, 0, 238, 0.5), 0 0 20px rgba(98, 0, 238, 0.3), 0 0 25px rgba(98, 0, 238, 0.2); }
  100% { box-shadow: 0 0 5px rgba(98, 0, 238, 0.2), 0 0 10px rgba(98, 0, 238, 0.2), 0 0 15px rgba(98, 0, 238, 0.2); }
`;

const borderAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Custom styles
const IconWrapper = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
  color: "#fff",
  borderRadius: "50%",
  width: 40, // Increased from 32
  height: 40, // Increased from 32
  display: "flex",
  alignItems: "center",
  justifyContent: "center", 
  fontSize: "20px", // Increased from 16px
  margin: "0 auto",
  boxShadow: "0 6px 15px rgba(98, 0, 238, 0.2)", // Enhanced shadow
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "scale(1.2)", // Enhanced hover effect
    boxShadow: "0 8px 20px rgba(98, 0, 238, 0.3)" // Enhanced hover shadow
  }
}));

// Update ServiceCard to work better with Swiper
const ServiceCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2), // Increased padding
  textAlign: "center",
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)', // Enhanced shadow
  borderRadius: "12px", // Increased border radius
  transition: "all 0.3s ease",
  height: '220px', // Adjusted height
  width: '100%',
  cursor: "pointer",
  display: "flex",
  flexDirection: "column",
  background: '#fff',
  marginBottom: theme.spacing(1), // Adjusted margin
  "&:hover": {
    transform: "translateY(-5px)", // Enhanced hover effect
    boxShadow: '0 8px 24px rgba(0,0,0,0.15)' // Enhanced hover shadow
  }
}));

function ServiceCardContent({ icon, title, description, onClick }) {
  return (
    <ServiceCard onClick={onClick}>
      <IconWrapper sx={{ mb: 2 }}>{icon}</IconWrapper> {/* Adjusted margin */}
      <Typography 
        variant="h6" 
        color="primary" 
        sx={{ 
          fontWeight: "bold", 
          mb: 1.5, // Adjusted margin
          fontSize: '1rem', // Adjusted font size
          height: 'auto', // Adjusted height to auto
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          textOverflow: 'ellipsis', // Added text overflow
          whiteSpace: 'normal', // Adjusted white space
        }}
      >
        {title}
      </Typography>
      <Typography 
        variant="body2" 
        color="text.secondary" 
        sx={{ 
          fontSize: "0.85rem", // Adjusted font size
          lineHeight: 1.5, // Adjusted line height
          flex: 1,
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitLineClamp: 4,
          WebkitBoxOrient: 'vertical',
          opacity: 0.9 // Adjusted opacity
        }}
      >
        {description}
      </Typography>
    </ServiceCard>
  );
}

const fadeAnimation = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

function ServicesSection() {
  const location = useLocation();
  const sectionsRef = useRef([]);
  const vipSectionsRef = useRef({}); // Add this for VIP services
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  
  // Move services array into useMemo
  const services = useMemo(() => [
    {
      icon: <TvIcon fontSize="large" />,
      title: "البرامج التلفزيونية",
      description: "إنتاج وتطوير برامج تلفزيونية متنوعة تتناسب مع اهتمامات جمهورك وتعكس رسالة علامتك التجارية.",
      imagePath: "/images/services/teleServices.jpg"
    },
    
    {
      icon: <MovieCreationIcon fontSize="large" />,
      title: "الأفلام التعريفية والوثائقية",
      description: "إنشاء أفلام تعريفية تعكس قصصك وأفلام وثائقية تسلط الضوء على الواقع بأسلوب مميز.",
      imagePath: "/images/services/personal.jpg"
    },
    {
      icon: <EventIcon fontSize="large" />,
      title: "توثيق المؤتمرات والمناسبات",
      description: "تقديم خدمات توثيق احترافية للمؤتمرات والمناسبات لضمان حفظ كل لحظة هامة وتفاصيل الحدث.",
      imagePath: "/images/services/conference.jpg"
    },
    {
      icon: <CampaignOutlinedIcon fontSize="large" />,
      title: "إدارة الحملات الإعلامية",
      description: "تنظيم وإدارة حملات إعلامية فعالة لتحقيق أهدافك الترويجية وزيادة تأثيرك في السوق.",
      imagePath: "/images/services/ads.jpg"
    },
    {
      icon: <CampaignIcon fontSize="large" />,
      title: "الإعلانات التجارية",
      description: "تصميم وإنتاج إعلانات تجارية مبتكرة تروج لمنتجاتك وخدماتك بشكل جذاب وفعال.",
      imagePath: "/images/promoTeam.jpg"
    },
    {
      icon: <BrushIcon fontSize="large" />,
      title: "الهويات البصرية",
      description: "تصميم هوية بصرية متكاملة تعكس روح علامتك التجارية وتعزز من تواجدك في السوق.",
      imagePath: "/images/promoTeam.jpg"
    },
    {
      icon: <AnimationIcon fontSize="large" />,
      title: "المونتاج والموشن جرافيك والتصميم",
      description: "تقديم خدمات مونتاج احترافية وتصميم موشن جرافيك تضيف لمسة إبداعية لمحتواك.",
      imagePath: "/images/promoTeam.jpg"
    },
    {
      icon: <DescriptionIcon fontSize="large" />,
      title: "إعداد المحتوى وكتابة السيناريوهات",
      description: "تطوير محتوى مكتوب وسيناريوهات مخصصة تدعم مشاريعك وتساهم في نجاحها.",
      imagePath: "/images/promoTeam.jpg"
    },
    {
      icon: <ShareIcon fontSize="large" />,
      title: "إدارة مواقع التواصل الاجتماعي",
      description: "إدارة وتطوير استراتيجيات مواقع التواصل الاجتماعي لتعزيز حضورك الرقمي والتفاعل مع جمهورك.",
      imagePath: "/images/promoTeam.jpg"
    },
    {
      icon: <WebIcon fontSize="large" />,
      title: "تصميم المواقع الإلكترونية والتطبيقات",
      description: "تصميم وتطوير مواقع إلكترونية وتطبيقات تفاعلية توفر تجربة مستخدم متميزة.",
      imagePath: "/images/promoTeam.jpg"
    },
    
    {
      icon: <SearchIcon fontSize="large" />,
      title: "تحسين محركات البحث (SEO)",
      description: "تحسين ظهور موقعك في نتائج محركات البحث لزيادة الوصول إلى جمهورك المستهدف.",
      imagePath: "/images/promoTeam.jpg"
    },
  ], []); // Empty dependency array since these values never change

  // Modify the useEffect to handle both main and VIP services
  useEffect(() => {
    if (location.state?.scrollToService !== undefined) {
      const index = location.state.scrollToService;
      if (sectionsRef.current[index]) {
        sectionsRef.current[index].scrollIntoView({ behavior: "smooth" });
        window.history.replaceState({}, document.title);
      }
    } else if (location.state?.scrollToVipService) {
      const serviceName = location.state.scrollToVipService;
      if (vipSectionsRef.current[serviceName]) {
        vipSectionsRef.current[serviceName].scrollIntoView({ behavior: "smooth" });
        window.history.replaceState({}, document.title);
      }
    }
  }, [location]);

  const handleCardClick = (index) => {
    sectionsRef.current[index].scrollIntoView({ behavior: "smooth" });
  };

  const handleVipCardClick = (serviceName) => {
    const element = vipSectionsRef.current[serviceName];
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const vipServices = [ 
    { 
      title: 'تأجير معدات تصوير',
      description: 'نوفر أحدث معدات التصوير الاحترافية بما في ذلك الكاميرات، العدسات، والملحقات لتلبية احتياجات مشاريعك الإعلامية بأعلى جودة.',
      imagePath: '/images/vipServices/photography-enthusiasts.svg',
      icon: <VideocamIcon fontSize="large" />
    },
    { 
      title: 'تأجير شاشات LED',
      description: 'شاشات LED عالية الدقة بمختلف الأحجام والمواصفات، مثالية للمؤتمرات والفعاليات والعروض الخارجية والداخلية.',
      imagePath: '/images/vipServices/monitor.svg',
      icon: <TvIcon fontSize="large" />
    },
    { 
      title: 'تأجير نظام إضاءة + نظام صوت',
      description: 'أنظمة إضاءة وصوت متكاملة عالية الجودة لتغطية جميع أنواع الفعاليات والمناسبات مع دعم فني متخصص.',
      imagePath: '/images/vipServices/sound.svg',
      icon: <SpeakerIcon fontSize="large" />
    },
    { 
      title: 'الترجمة الفورية',
      description: 'خدمات ترجمة فورية احترافية مع مترجمين متخصصين وأحدث أنظمة الترجمة للمؤتمرات والفعاليات متعددة اللغات.',
      imagePath: '/images/vipServices/global-language-translate.svg',
      icon: <TranslateIcon fontSize="large" />
    },
    { 
      title: 'مطبوعات وهدايا',
      description: 'تصميم وإنتاج مطبوعات وهدايا دعائية مبتكرة تعزز هوية علامتك التجارية وتترك انطباعاً دائماً.',
      imagePath: '/images/vipServices/businessman-is-distributing-bonus-among-employees.svg',
      icon: <CardGiftcardIcon fontSize="large" />
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const serviceGroups = useMemo(() => {
    const groups = [];
    const isMobile = window.innerWidth < 600; // You can adjust this breakpoint
    const itemsPerGroup = isMobile ? 2 : 5;
    
    for (let i = 0; i < services.length; i += itemsPerGroup) {
      groups.push(services.slice(i, i + itemsPerGroup));
    }
    
    // For desktop: Ensure the last group has at least 2 elements
    if (!isMobile && groups.length > 1 && groups[groups.length - 1].length === 1) {
      const lastGroup = groups.pop();
      groups[groups.length - 1].push(...lastGroup);
    }
    
    return groups;
  }, [services]);

  useEffect(() => {
    if (!isHovered) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % serviceGroups.length);
      }, 4000); // Increased time to 4 seconds for better readability on mobile
  
      return () => clearInterval(timer);
    }
  }, [serviceGroups.length, isHovered]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const renderServiceCards = () => (
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        justifyContent: 'center',
        mb: 8,
        px: { xs: 2, md: 4 },
        minHeight: '220px', // Set fixed height to prevent layout shift
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={{
            initial: { opacity: 0 },
            animate: {
              opacity: 1,
              transition: {
                when: "beforeChildren",
                staggerChildren: 0.1,
              },
            },
            exit: {
              opacity: 0,
              transition: {
                when: "afterChildren",
                staggerChildren: 0.1,
              },
            },
          }}
          style={{
            display: 'flex',
            gap: '16px',
            width: '100%',
            justifyContent: 'center',
          }}
        >
          {serviceGroups[currentIndex].map((service, index) => (
            <motion.div
              key={service.title}
              variants={fadeAnimation}
              style={{
                width: window.innerWidth < 600 ? 'calc(50% - 8px)' : '160px',
                maxWidth: window.innerWidth < 600 ? '160px' : '160px',
                flex: 'none',
              }}
            >
              <ServiceCardContent
                icon={service.icon}
                title={service.title}
                description={service.description}
                onClick={() => handleCardClick(currentIndex * (window.innerWidth < 600 ? 2 : 5) + index)}
              />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </Box>
  );

  return (
    <Box sx={{ padding: { xs: "30px 0", md: "50px 20px" }, direction: "rtl" }}>
      <Typography variant="h4" color="primary" sx={{ 
        textAlign: "center", 
        fontWeight: "bold", 
        mb: 6,
        width: "100%" 
      }}>
        خدماتنا الرئيسية
      </Typography>

      {/* {renderServiceCards()} */}

      {/* Detailed Sections */}
      <Box sx={{ 
        width: '100vw', 
        position: 'relative', 
        left: '50%', 
        right: '50%', 
        marginLeft: '-50vw', 
        marginRight: '-50vw',
        direction: "rtl"
      }}>
        {services.map((service, index) => (
          <Box
            key={index}
            ref={(el) => (sectionsRef.current[index] = el)}
            sx={{
              width: "100%",
              padding: { xs: "40px 0", md: "60px 0" },
              backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#fff", // Alternating background color
              display: "flex",
              justifyContent: "center"
            }}
          >
            <Box
              sx={{
                display: "flex",
                maxWidth: { xs: "95%", md: "1400px" },
                width: "100%",
                gap: { xs: 4, md: 6 },
                flexDirection: { xs: "column", md: "row" },
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              {/* Content wrapper to handle mobile order */}
              <Box sx={{ 
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                width: "100%",
                gap: { xs: 3, md: 6 },
                alignItems: "center",
                justifyContent: "center"
              }}>
                {/* Text wrapper */}
                <Box sx={{ 
                  order: { xs: 1, md: index % 2 === 0 ? 2 : 1 },
                  flex: 1,
                  padding: { xs: 2, md: 3 },
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center"
                }}>
                  <Avatar
                    sx={{
                      width: 80,
                      height: 80,
                      background: theme => `linear-gradient(135deg, 
                        ${theme.palette.primary.main}, 
                        ${theme.palette.secondary.main}
                      )`,
                      boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                      margin: '0 auto 20px auto',
                      transition: 'transform 0.6s ease',
                      '& svg': {
                        fontSize: '2rem',
                        transition: 'transform 0.3s ease',
                      },
                      '&:hover': {
                        transform: 'rotateY(180deg)',
                        '& svg': {
                          transform: 'scale(1.2)',
                        },
                      },
                    }}
                  >
                    {service.icon}
                  </Avatar>
                  <Typography variant="h5" color="primary" sx={{ 
                    fontWeight: "bold",
                    mb: { xs: 2, md: 3 },
                    fontSize: { xs: "1.75rem", md: "2rem" },
                    textAlign: "center",
                    width: "100%",
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: -8,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '40%',
                      height: 3,
                      background: theme => 
                        `linear-gradient(90deg, 
                          ${theme.palette.primary.main}, 
                          ${theme.palette.secondary.main}
                        )`,
                      borderRadius: '2px',
                      transition: 'width 0.3s ease',
                    },
                    '&:hover::after': {
                      width: '60%',
                    },
                  }}>
                    {service.title}
                  </Typography>
                  <Typography variant="body1" sx={{ 
                    lineHeight: "1.8",
                    fontSize: { xs: "1.1rem", md: "1.25rem" },
                    textAlign: "center",
                    width: "100%",
                    maxWidth: "800px"
                  }}>
                    {service.description}
                  </Typography>
                </Box>

                {/* Image wrapper */}
                <Box sx={{
                  order: { xs: 2, md: index % 2 === 0 ? 1 : 2 },
                  flex: 1,
                  width: "100%",
                  height: { xs: "300px", md: "450px" },
                  position: "relative",
                  borderRadius: "12px",
                  overflow: "hidden",
                  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
                }}>
                  <Box
                    component="img"
                    src={service.imagePath}
                    alt={service.title}
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "center",
                    }}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>

         {/* Add VIP Services section here, right after the Swiper */}
         <Box
        component={motion.div}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        sx={{
          position: 'relative',
          padding: { xs: 3, md: 8 },
          background: `linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)`,
          backdropFilter: 'blur(10px)',
          borderRadius: 4,
          overflow: 'hidden',
          mb: 8,
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(45deg, ${theme => theme.palette.primary.main}15, ${theme => theme.palette.secondary.main}15)`,
            zIndex: -1,
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
            backgroundSize: '1000px 100%',
            animation: `${shimmer} 5s infinite linear`,
            zIndex: -1,
          }
        }}
      >
        <Grid container spacing={4} alignItems="center">
          {/* Title Section */}
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                position: 'relative',
                textAlign: 'center',
                p: 3,
                background: 'rgba(255,255,255,0.1)',
                borderRadius: 2,
                backdropFilter: 'blur(5px)',
                border: '1px solid rgba(255,255,255,0.2)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                overflow: 'hidden',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '3px',
                  background: theme => `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                }
              }}
            >
              <motion.div variants={itemVariants}>
                <Typography
                  variant="h2"
                  sx={{
                    fontFamily: 'Cairo, sans-serif',
                    fontWeight: 800,
                    background: theme => `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    mb: 2,
                  }}
                >
                  برومو
                  <Box component="span" sx={{ color: theme => theme.palette.secondary.main }}>+</Box>
                  بلس
                </Typography>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Typography
                  variant="body1"
                  sx={{
                    fontFamily: 'Cairo, sans-serif',
                    fontSize: '1.1rem',
                    color: 'text.secondary',
                    lineHeight: 1.8,
                  }}
                >
                  تقدم برومو أيضًا العديد من الخدمات الفردية المميزة في مجال الإنتاج الإعلامي
                </Typography>
              </motion.div>
            </Box>
          </Grid>

          {/* Services Grid */}
          <Grid item xs={12} md={8}>
            <Grid 
              container 
              spacing={2}
              justifyContent="center"
            >
              {vipServices.map((service, index) => (
                <Grid 
                  item 
                  xs={12} 
                  sm={6} 
                  md={6}
                  key={index}
                  sx={{
                    display: 'flex',
                    justifyContent: 'center'
                  }}
                >
                  <motion.div 
                    variants={itemVariants} 
                    style={{ width: '100%' }}
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Card
                      onClick={() => handleVipCardClick(service.title)}
                      sx={{
                        cursor: 'pointer',  // Add this
                        p: 3,
                        height: '100%',
                        background: 'rgba(255,255,255,0.9)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: 3,
                        position: 'relative',
                        overflow: 'visible',
                        transition: 'all 0.4s ease',

                        // Gradient border effect
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          inset: -2,
                          zIndex: -1,
                          borderRadius: '16px',
                          background: theme => 
                            `linear-gradient(45deg, 
                              ${theme.palette.primary.main}, 
                              ${theme.palette.secondary.main}, 
                              ${theme.palette.primary.light}
                            )`,
                          backgroundSize: '200% 200%',
                          animation: `${borderAnimation} 4s linear infinite`,
                          opacity: 0,
                          transition: 'opacity 0.3s ease',
                        },

                        // Premium shadow effect
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          inset: 0,
                          borderRadius: '12px',
                          background: 'transparent',
                          animation: `${glowingEffect} 3s ease-in-out infinite`,
                          opacity: 0,
                          transition: 'opacity 0.3s ease',
                        },

                        // Hover effects
                        '&:hover': {
                          transform: 'translateY(-5px)',
                          background: theme => 
                            `linear-gradient(135deg, 
                              rgba(255,255,255,0.95), 
                              rgba(255,255,255,0.85)
                            )`,
                          '&::before': {
                            opacity: 1,
                          },
                          '&::after': {
                            opacity: 1,
                          },
                          '& .service-icon': {
                            transform: 'rotateY(180deg)',
                          },
                        },
                      }}
                    >
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <Avatar
                          className="service-icon"
                          sx={{
                            width: 80,
                            height: 80,
                            background: theme => `linear-gradient(135deg, 
                              ${theme.palette.primary.main}, 
                              ${theme.palette.secondary.main}
                            )`,
                            boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                            margin: '0 auto 20px auto',
                            transition: 'transform 0.6s ease',
                            '& svg': {
                              fontSize: '2rem',
                              transition: 'transform 0.3s ease',
                            },
                            '&:hover svg': {
                              transform: 'scale(1.2)',
                            },
                          }}
                        >
                          {service.icon}
                        </Avatar>
                        <Typography 
                          variant="h6" 
                          sx={{ 
                            fontFamily: 'Cairo, sans-serif',
                            fontWeight: 700,
                            color: 'text.primary',
                            textAlign: 'center',
                            position: 'relative',
                            '&::after': {
                              content: '""',
                              position: 'absolute',
                              bottom: -8,
                              left: '50%',
                              transform: 'translateX(-50%)',
                              width: '40%',
                              height: 3,
                              background: theme => 
                                `linear-gradient(90deg, 
                                  ${theme.palette.primary.main}, 
                                  ${theme.palette.secondary.main}
                                )`,
                              borderRadius: '2px',
                              transition: 'width 0.3s ease',
                            },
                            '&:hover::after': {
                              width: '60%',
                            },
                          }}
                        >
                          {service.title}
                        </Typography>
                      </motion.div>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>

      {/* Add VIP Services Detailed Sections */}
      {vipServices.map((service, index) => (
        <Box
          key={index}
          ref={(el) => (vipSectionsRef.current[service.title] = el)}
          sx={{
            width: '100vw', // Changed from 100%
            position: 'relative',
            left: '50%',
            right: '50%',
            marginLeft: '-50vw',
            marginRight: '-50vw',
            padding: { xs: "40px 0", md: "60px 0" },
            backgroundColor: index % 2 === 0 ? "#f5f5f5" : "#fff",
            display: "flex",
            justifyContent: "center"
          }}
        >
          <Box
            sx={{
              display: "flex",
              maxWidth: { xs: "95%", md: "1400px" },
              width: "100%",
              gap: { xs: 4, md: 6 },
              flexDirection: { xs: "column", md: "row" },
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Box sx={{ 
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              width: "100%",
              gap: { xs: 3, md: 6 },
              alignItems: "center",
              justifyContent: "center"
            }}>
              <Box sx={{ 
                order: { xs: 1, md: index % 2 === 0 ? 2 : 1 },
                flex: 1,
                padding: { xs: 2, md: 3 },
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}>
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    background: theme => `linear-gradient(135deg, 
                      ${theme.palette.primary.main}, 
                      ${theme.palette.secondary.main}
                    )`,
                    boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                    margin: '0 auto 20px auto',
                    transition: 'transform 0.6s ease',
                    '& svg': {
                      fontSize: '2rem',
                      transition: 'transform 0.3s ease',
                    },
                    '&:hover': {
                      transform: 'rotateY(180deg)',
                      '& svg': {
                        transform: 'scale(1.2)',
                      },
                    },
                  }}
                >
                  {service.icon}
                </Avatar>
                <Typography variant="h5" color="primary" sx={{ 
                  fontWeight: "bold",
                  mb: { xs: 2, md: 3 },
                  fontSize: { xs: "1.75rem", md: "2rem" },
                  textAlign: "center",
                  width: "100%"
                }}>
                  {service.title}
                </Typography>
                <Typography variant="body1" sx={{ 
                  lineHeight: "1.8",
                  fontSize: { xs: "1.1rem", md: "1.25rem" },
                  textAlign: "center",
                  width: "100%",
                  maxWidth: "800px"
                }}>
                  {service.description}
                </Typography>
              </Box>

              {/* SVG Image */}
              <Box
                component="img"
                src={service.imagePath}
                alt={service.title}
                sx={{
                  order: { xs: 2, md: index % 2 === 0 ? 1 : 2 },
                  flex: 1,
                  width: { xs: "100%", md: "400px" },
                  height: "auto",
                  maxWidth: "100%",
                  objectFit: "contain",
                  filter: "drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.1))",
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.05)"
                  }
                }}
              />
            </Box>
          </Box>
        </Box>
      ))}
    </Box>

    
  );
}

export default ServicesSection;
