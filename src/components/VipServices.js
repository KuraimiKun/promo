import { Box, Card, Typography, Grid, Avatar } from '@mui/material';
import { motion } from 'framer-motion';
import { styled, keyframes } from "@mui/system";
import VideocamIcon from '@mui/icons-material/Videocam';
import TvIcon from '@mui/icons-material/Tv';
import SpeakerIcon from '@mui/icons-material/Speaker';
import TranslateIcon from '@mui/icons-material/Translate';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';

const shimmer = keyframes`
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const vipServices = [ 
  { 
    title: 'تأجير معدات تصوير',
    description: 'نوفر أحدث معدات التصوير الاحترافية بما في ذلك الكاميرات، العدسات، والملحقات لتلبية احتياجات مشاريعك الإعلامية بأعلى جودة.',
    imagePath: '/images/camera-rental.jpg',
    icon: <VideocamIcon fontSize="large" />
  },
  // ...rest of your vipServices array...
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 }
  }
};

const IconWrapper = styled(Box)(({ theme }) => ({
  // ... your existing IconWrapper styles ...
}));

function VipServices() {
  return (
    <>
      {/* VIP Services Cards Section */}
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
            background: theme => `linear-gradient(45deg, ${theme.palette.primary.main}15, ${theme.palette.secondary.main}15)`,
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
        {/* Your existing VIP services grid content */}
        {/* ... Copy the Grid container and its contents from your current file ... */}
      </Box>

      {/* VIP Services Detailed Sections */}
      {vipServices.map((service, index) => (
        <Box
          key={index}
          sx={{
            width: "100%",
            padding: { xs: "40px 0", md: "60px 0" },
            backgroundColor: index % 2 === 0 ? "#f5f5f5" : "#fff",
            display: "flex",
            justifyContent: "center"
          }}
        >
          {/* ... Copy the detailed section content from your current file ... */}
        </Box>
      ))}
    </>
  );
}

export default VipServices;
