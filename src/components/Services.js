import { Box, Card, Typography, Grid } from "@mui/material";
import { styled } from "@mui/system";
import MovieIcon from '@mui/icons-material/Movie';
import { useTheme } from "@mui/material/styles";

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
  "&:hover": {
    transform: "translateY(-10px)",
    boxShadow: `0 12px 32px ${theme.palette.primary.main}33`
  }
}));

function ServiceCardContent({ icon, title, description }) {
  return (
    <ServiceCard>
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
  const services = [
    {
      icon: <MovieIcon fontSize="large" />,
      title: "الإنتاج السينمائي",
      description: "الإعلانات والكليبات والأفلام ذات المعيار السينمائي"
    },
    {
      icon: <MovieIcon fontSize="large" />,
      title: "الإنتاج الرقمي",
      description: "الإنتاجات التي تناسب مواقع التواصل الاجتماعي"
    },
    {
      icon: <MovieIcon fontSize="large" />,
      title: "الوثائقي",
      description: "الأفلام الوثائقية بأنواعها من الفكرة حتى التنفيذ"
    },
    {
      icon: <MovieIcon fontSize="large" />,
      title: "الإنتاج التلفزيوني",
      description: "البرامج التلفزيونية وما تتضمن من فكرة وتحرير وإنتاج"
    },
    {
      icon: <MovieIcon fontSize="large" />,
      title: "الفعاليات والمؤتمرات",
      description: "ما يشمله من تجهيز وإجراءات وخطط عمل وتغطية إعلامية"
    },
  ];

  return (
    <Box sx={{ padding: "50px 20px" }}>
      <Typography variant="h4" color="primary" sx={{ textAlign: "center", fontWeight: "bold", mb: 6 }}>
        خدماتنا الرئيسية
      </Typography>
      <Grid container spacing={5} justifyContent="center">
        {services.map((service, index) => (
          <Grid item xs={12} sm={6} md={4} lg={2.4} key={index}>
            <ServiceCardContent icon={service.icon} title={service.title} description={service.description} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ServicesSection;
