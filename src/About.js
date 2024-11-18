import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const About = () => {
  return (
    <Box sx={{ 
      py: 12,
      backgroundColor: 'background.paper'
    }}>
      <Container 
        maxWidth="lg" 
        sx={{ 
          maxWidth: '900px !important',
          // Remove 'pl: 0' to allow default padding
        }}
      >
        <Typography 
          variant="h3" 
          component="h1" 
          sx={{ 
            mb: 6,
            fontWeight: 800,
            color: 'primary.main',
            borderBottom: '3px solid',
            borderColor: 'primary.main',
            pb: 2,
            display: 'inline-block'
          }}
        >
          من نحن
        </Typography>

        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: 3,
          lineHeight: 1.8,
          fontSize: '1.1rem'
        }}>
          <Typography variant="body1" paragraph sx={{ fontSize: 'inherit' }}>
            "برومو" هي شركة رائدة في مجال الإنتاج الإعلامي والتسويق الرقمي، تضم فريقًا من المحترفين الملتزمين بالإبداع والتميز، والذين يجمعهم شغف قوي نحو تقديم حلول إعلامية مبتكرة تعزز قوة العلامات التجارية وتحقق أهداف عملائنا بفعالية ودقة.
          </Typography>

          <Typography variant="body1" paragraph sx={{ fontSize: 'inherit' }}>
            نضع الإبداع في قلب كل مشروع نعمل عليه، ونعمل على تحويل الأفكار إلى واقع ملموس يتجاوز التوقعات. نقدم مجموعة متكاملة من الخدمات الإعلامية تشمل إنتاج البرامج التلفزيونية وتصميم الإعلانات التجارية وإنشاء الأفلام الوثائقية، إلى جانب توثيق المناسبات الهامة، وتطوير الهوية البصرية، وتقديم خدمات المونتاج والموشن جرافيك، وكتابة المحتوى وصياغة السيناريوهات، وإدارة حسابات التواصل الاجتماعي، وتصميم المواقع الإلكترونية والتطبيقات، وإدارة الحملات الإعلامية، وتحسين محركات البحث (SEO) لتعزيز الظهور الرقمي.
          </Typography>

          <Typography variant="body1" paragraph sx={{ fontSize: 'inherit' }}>
            وبالإضافة إلى ذلك، توفر "برومو بلس" مجموعة خدمات مساندة تلبي احتياجات المشاريع التقنية واللوجستية، مثل تأجير معدات التصوير، وتأجير شاشات LED الحديثة، وتوفير أنظمة الإضاءة والصوت المتقدمة، إلى جانب خدمات الترجمة الفورية لضمان التواصل الفعّال، وتصميم وإنتاج المطبوعات والهدايا التذكارية التي تضفي طابعًا خاصًا لكل فعالية.
          </Typography>

          <Typography variant="body1" paragraph sx={{ fontSize: 'inherit' }}>
            نؤمن بأن الإبداع والابتكار هما جوهر النجاح، ونحرص على بناء شراكات طويلة الأمد مع عملائنا تقوم على الثقة والاحترام المتبادل، مع التزامنا بتقديم أعلى معايير الجودة والاحترافية في كل ما نقدمه.
          </Typography>

          <Typography variant="body1" paragraph sx={{ fontSize: 'inherit' }}>
            في "برومو"، نسعى دائمًا لتقديم حلول إعلامية شاملة تساهم في نجاح مشاريعكم وتعكس قوة علامتكم التجارية بأفضل صورة.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default About;
