import { Box, Card, Typography, Grid } from "@mui/material";
import { styled } from "@mui/system";
import MovieIcon from '@mui/icons-material/Movie';
import { useRef } from "react";

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

const ServiceCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: "center",
  boxShadow: `0 8px 24px ${theme.palette.primary.main}33`,
  borderRadius: "20px",
  transition: "all 0.3s ease",
  maxWidth: 280,
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
      icon: <MovieIcon fontSize="large" />,
      title: "الإنتاج السينمائي",
      description: "الإعلانات والكليبات والأفلام ذات المعيار السينمائي",
      imagePath: "/images/image.png"
    },
    {
      icon: <MovieIcon fontSize="large" />,
      title: "الإنتاج الرقمي",
      description: "الإنتاجات التي تناسب مواقع التواصل الاجتماعي",
      imagePath: "/images/digital.jpg"
    },
    {
      icon: <MovieIcon fontSize="large" />,
      title: "الوثائقي",
      description: "الأفلام الوثائقية بأنواعها من الفكرة حتى التنفيذ",
      imagePath: "/images/documentary.jpg"
    },
    {
      icon: <MovieIcon fontSize="large" />,
      title: "الإنتاج التلفزيوني",
      description: "البرامج التلفزيونية وما تتضمن من فكرة وتحرير وإنتاج",
      imagePath: "/images/tv.jpg"
    },
    {
      icon: <MovieIcon fontSize="large" />,
      title: "الفعاليات والمؤتمرات",
      description: "ما يشمله من تجهيز وإجراءات وخطط عمل وتغطية إعلامية",
      imagePath: "/images/events.jpg"
    },
  ];

  const handleCardClick = (index) => {
    sectionsRef.current[index].scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Box sx={{ padding: "50px 20px" }}>
      <Typography variant="h4" color="primary" sx={{ textAlign: "center", fontWeight: "bold", mb: 6 }}>
        خدماتنا الرئيسية
      </Typography>
      <Grid container spacing={5} justifyContent="center">
        {services.map((service, index) => (
          <Grid item xs={12} sm={6} md={4} lg={2.4} key={index}>
            <ServiceCardContent
              icon={service.icon}
              title={service.title}
              description={service.description}
              onClick={() => handleCardClick(index)}
            />
          </Grid>
        ))}
      </Grid>

      {/* Detailed Sections */}
      {services.map((service, index) => (
        <Box
          key={index}
          ref={(el) => (sectionsRef.current[index] = el)}
          sx={{
            width: "100%",
            padding: "50px 0",
            backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#fff", // Alternating background color
            display: "flex",
            justifyContent: "center"
          }}
        >
          <Box
            sx={{
              display: "flex",
              maxWidth: "1200px",
              gap: 4,
              paddingX: 3,
              flexDirection: { xs: "column", md: "row" },
              alignItems: "center"
            }}
          >
            {/* Image wrapper with fixed dimensions */}
            <Box
              sx={{
                flexBasis: { xs: "100%", md: "50%" },
                width: "100%",
                height: { xs: "300px", md: "400px" }, // Fixed height
                position: "relative",
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Box
                component="img"
                src={service.imagePath}
                alt={service.title}
                sx={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                }}
              />
            </Box>

            {/* Text wrapper */}
            <Box sx={{ flexBasis: { xs: "100%", md: "50%" }, padding: 3 }}>
              <Typography variant="h5" color="primary" sx={{ fontWeight: "bold", mb: 2, fontSize: { xs: "1.5rem", md: "2rem" } }}>
                {service.title}
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: "1.8", fontSize: { xs: "1rem", md: "1.25rem" } }}>
                {/* Placeholder text */}
                هذا النص هو مثال على نص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربي، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التي يولدها التطبيق.
              </Typography>
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  );
}

export default ServicesSection;
