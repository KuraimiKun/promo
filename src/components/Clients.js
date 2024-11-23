import { Box, Typography, Container, Grid, Link } from "@mui/material";
import { styled } from "@mui/system";

const SectionWrapper = styled(Box)(({ theme }) => ({
  background: `linear-gradient(to right, #ffffff 8px, transparent 8px) 0 0,
               linear-gradient(to right, #ffffff 8px, transparent 8px) 0 100%,
               linear-gradient(to left, #ffffff 8px, transparent 8px) 100% 0,
               linear-gradient(to left, #ffffff 8px, transparent 8px) 100% 100%,
               linear-gradient(to bottom, #ffffff 8px, transparent 8px) 0 0,
               linear-gradient(to bottom, #ffffff 8px, transparent 8px) 100% 0,
               linear-gradient(to top, #ffffff 8px, transparent 8px) 0 100%,
               linear-gradient(to top, #ffffff 8px, transparent 8px) 100% 100%`,
  backgroundColor: '#fafafa',
  backgroundRepeat: 'no-repeat',
  backgroundSize: '40px 40px',
  padding: theme.spacing(10, 0),
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.9), transparent)',
    pointerEvents: 'none'
  }
}));

const ClientLogo = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100px',
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: '50%',
    width: 0,
    height: 2,
    background: theme.palette.primary.main,
    transition: 'all 0.3s ease',
    transform: 'translateX(-50%)',
    opacity: 0
  },
  '&:hover': {
    '& img': {
      transform: 'translateY(-5px)',
    },
    '&::after': {
      width: '30%',
      opacity: 1
    }
  }
}));

const LogoImage = styled('img')({
  maxWidth: '160px',
  maxHeight: '80px',
  transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  transform: 'translateY(0)',
});

const StyledTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  marginBottom: theme.spacing(8),
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    width: '140%',
    height: '100%',
    top: 0,
    left: '-20%',
    background: `linear-gradient(90deg, 
      transparent 0%, 
      ${theme.palette.primary.main}15 30%,
      ${theme.palette.primary.main}15 70%,
      transparent 100%
    )`,
    zIndex: -1,
    transform: 'rotate(-2deg)'
  }
}));

function ClientsSection() {
  const clients = [
    { id: 1, logo: "/images/partners/1.png", name: "شركة 1" },
    { id: 2, logo: "/images/partners/2.png", name: "شركة 2" },
    { id: 3, logo: "/images/partners/3.png", name: "شركة 3" },
    { id: 4, logo: "/images/partners/4.png", name: "شركة 4" },
    { id: 5, logo: "/images/partners/5.png", name: "شركة 5" },
    { id: 6, logo: "/images/partners/6.png", name: "شركة 6" },
  ];

  return (
    <SectionWrapper>
      <Container maxWidth="lg">
        <StyledTitle 
          variant="h4" 
          color="primary" 
          align="center"
        >
          شركاء مثلك وثقوا بنا...
        </StyledTitle>

        <Grid 
          container 
          spacing={{ xs: 2, md: 4 }} 
          justifyContent="center"
          sx={{ mb: -2 }}
        >
          {clients.map((client) => (
            <Grid item xs={6} sm={4} md={3} key={client.id}>
              <Link 
                href={client.url} 
                target="_blank"
                underline="none"
                sx={{ display: 'block' }}
              >
                <ClientLogo>
                  <LogoImage
                    src={client.logo}
                    alt={client.name}
                    loading="lazy"
                  />
                </ClientLogo>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Container>
    </SectionWrapper>
  );
}

export default ClientsSection;
