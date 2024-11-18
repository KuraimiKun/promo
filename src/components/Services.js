import { Box, Card, Typography } from "@mui/material"; // Remove Grid import
import { styled } from "@mui/system";
import { useRef, useEffect } from "react"; // Add useEffect import
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

// Custom styles
const IconWrapper = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
  color: "#fff",
  borderRadius: "50%",
  width: 70,
  height: 70,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "30px",
  margin: "0 auto",
  boxShadow: "0 8px 20px rgba(98, 0, 238, 0.2)",
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "scale(1.1)"
  }
}));

// Update SliderContainer styling
const SliderContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  overflow: 'hidden', // Hide overflow
  position: 'relative',
  padding: theme.spacing(2),
  marginBottom: theme.spacing(4),
}));

const SlideTrack = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(3),
  animation: 'slide 40s linear infinite',
  '@keyframes slide': {
    '0%': {
      transform: 'translateX(100%)',
    },
    '100%': {
      transform: 'translateX(-100%)',
    },
  },
  '&:hover': {
    animationPlayState: 'paused',
  },
}));

// Update ServiceCard width
const ServiceCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: "center",
  boxShadow: `0 8px 24px ${theme.palette.primary.main}33`,
  borderRadius: "20px",
  transition: "all 0.3s ease",
  width: 280, // Change maxWidth to width
  flex: '0 0 auto', // Prevent card from stretching
  margin: "auto",
  cursor: "pointer",
  "&:hover": {
    transform: "translateY(-10px)",
    boxShadow: `0 12px 32px ${theme.palette.primary.main}33`
  }
}));

function ServiceCardContent({ icon, title, description, onClick }) {
  return (
    <ServiceCard onClick={onClick}>
      <IconWrapper>{icon}</IconWrapper>
      <Typography variant="h6" color="primary" sx={{ fontWeight: "bold", mt: 3 }}>
        {title}
      </Typography>
      <Typography variant="body2" color="textSecondary" sx={{ mt: 1, fontSize: "0.95rem", lineHeight: "1.6" }}>
        {description}
      </Typography>
    </ServiceCard>
  );
}

function ServicesSection() {
  const sectionsRef = useRef([]);
  const services = [
    {
      icon: <TvIcon fontSize="large" />,
      title: "البرامج التلفزيونية",
      description: "إنتاج وتطوير برامج تلفزيونية متنوعة تتناسب مع اهتمامات جمهورك وتعكس رسالة علامتك التجارية.",
      imagePath: "/images/image.png"
    },
    {
      icon: <CampaignIcon fontSize="large" />,
      title: "الإعلانات التجارية",
      description: "تصميم وإنتاج إعلانات تجارية مبتكرة تروج لمنتجاتك وخدماتك بشكل جذاب وفعال.",
      imagePath: "/images/image.png"
    },
    {
      icon: <MovieCreationIcon fontSize="large" />,
      title: "الأفلام التعريفية والوثائقية",
      description: "إنشاء أفلام تعريفية تعكس قصصك وأفلام وثائقية تسلط الضوء على الواقع بأسلوب مميز.",
      imagePath: "/images/image.png"
    },
    {
      icon: <EventIcon fontSize="large" />,
      title: "توثيق المؤتمرات والمناسبات",
      description: "تقديم خدمات توثيق احترافية للمؤتمرات والمناسبات لضمان حفظ كل لحظة هامة وتفاصيل الحدث.",
      imagePath: "/images/image.png"
    },
    {
      icon: <BrushIcon fontSize="large" />,
      title: "الهويات البصرية",
      description: "تصميم هوية بصرية متكاملة تعكس روح علامتك التجارية وتعزز من تواجدك في السوق.",
      imagePath: "/images/branding.jpg"
    },
    {
      icon: <AnimationIcon fontSize="large" />,
      title: "المونتاج والموشن جرافيك والتصميم",
      description: "تقديم خدمات مونتاج احترافية وتصميم موشن جرافيك تضيف لمسة إبداعية لمحتواك.",
      imagePath: "/images/motion.jpg"
    },
    {
      icon: <DescriptionIcon fontSize="large" />,
      title: "إعداد المحتوى وكتابة السيناريوهات",
      description: "تطوير محتوى مكتوب وسيناريوهات مخصصة تدعم مشاريعك وتساهم في نجاحها.",
      imagePath: "/images/content.jpg"
    },
    {
      icon: <ShareIcon fontSize="large" />,
      title: "إدارة مواقع التواصل الاجتماعي",
      description: "إدارة وتطوير استراتيجيات مواقع التواصل الاجتماعي لتعزيز حضورك الرقمي والتفاعل مع جمهورك.",
      imagePath: "/images/socialmedia.jpg"
    },
    {
      icon: <WebIcon fontSize="large" />,
      title: "تصميم المواقع الإلكترونية والتطبيقات",
      description: "تصميم وتطوير مواقع إلكترونية وتطبيقات تفاعلية توفر تجربة مستخدم متميزة.",
      imagePath: "/images/webdesign.jpg"
    },
    {
      icon: <CampaignOutlinedIcon fontSize="large" />,
      title: "إدارة الحملات الإعلامية",
      description: "تنظيم وإدارة حملات إعلامية فعالة لتحقيق أهدافك الترويجية وزيادة تأثيرك في السوق.",
      imagePath: "/images/campaigns.jpg"
    },
    {
      icon: <SearchIcon fontSize="large" />,
      title: "تحسين محركات البحث (SEO)",
      description: "تحسين ظهور موقعك في نتائج محركات البحث لزيادة الوصول إلى جمهورك المستهدف.",
      imagePath: "/images/seo.jpg"
    },
  ];

  const handleCardClick = (index) => {
    sectionsRef.current[index].scrollIntoView({ behavior: "smooth" });
  };

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

      {/* Updated slider container */}
      <SliderContainer>
        <SlideTrack>
          {/* Double the items for seamless loop */}
          {[...services, ...services].map((service, index) => (
            <ServiceCardContent
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              onClick={() => handleCardClick(index % services.length)}
            />
          ))}
        </SlideTrack>
      </SliderContainer>

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
    </Box>
  );
}

export default ServicesSection;
