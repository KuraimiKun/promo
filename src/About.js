import React from 'react';
import { Container, Typography, Box, Divider } from '@mui/material';

const About = () => {
  return (
    <Container maxWidth="md" style={{ paddingTop: '2rem', paddingBottom: '2rem', direction: 'rtl' }}>
      <Box textAlign="center" marginBottom={4}>
        <Typography variant="h3" component="h1" gutterBottom>
          عن تأثير
        </Typography>
      </Box>

      <Divider variant="middle" />

      <Box marginTop={4}>
        {/* Section 1: Our Story */}
        <Typography variant="h4" component="h2" gutterBottom>
          قصتنا
        </Typography>
        <Typography variant="body1" paragraph>
          في عام 2007، دخلت تأثير إلى الساحة الإعلامية السعودية بتجربة تلفزيونية جريئة ثورية غيرت معايير الإعلام التقليدي. بتقديم محتوى جريء ورفع سقف الحرية الإعلامية، اكتسبت تأثير شهرة واسعة وسرعان ما أسرَت قلوب الجماهير. تحت قيادة الإعلامي صالح الغيدان، أنتجت الشركة محتوى تفاعلياً وصل لجمهور واسع وأشعل موجة جديدة من التفاعل في المنطقة.
        </Typography>
      </Box>

      <Box marginTop={4}>
        {/* Section 2: Our Vision and Growth */}
        <Typography variant="h4" component="h2" gutterBottom>
          رؤيتنا ونمونا
        </Typography>
        <Typography variant="body1" paragraph>
          مع مرور السنوات، استمرت تأثير في التطور، وفي عام 2013، قمنا بإعادة تعريف مهمتنا. لم نعد مجرد منتجي محتوى، بل أصبحنا ملتزمين بإنشاء علامة تجارية إعلامية شاملة. كان هدفنا واضحًا: إلهام الجماهير وتشكيل تأثير يمتد إلى ما هو أبعد من الترفيه. قادتنا هذه الرؤية إلى تأسيس تأثير للإنتاج الإعلامي، حيث تم إطلاق ستوديو حديث في الرياض بحلول عام 2015، حيث نستمر في تقديم قصص مؤثرة وملهمة.
        </Typography>
      </Box>

      <Box marginTop={4}>
        {/* Section 3: Making an Impact */}
        <Typography variant="h4" component="h2" gutterBottom>
          صنع التأثير
        </Typography>
        <Typography variant="body1" paragraph>
          اليوم، تُعد تأثير لاعبًا رئيسيًا في صناعة الإعلام السعودية، حيث تتعاون مع كبار المنتجين والقنوات الإعلامية. نحن فخورون برحلتنا وبالمشاريع التي نقدمها للجمهور. من خلال كل إنتاج، نسعى إلى تحويل الأحلام إلى واقع، مدفوعين بشغف الإعلام الذي يلهم ويعلم ويسلي.
        </Typography>
      </Box>

      <Box marginTop={4} marginBottom={4}>
        {/* Section 4: Our Mission */}
        <Typography variant="h4" component="h2" gutterBottom>
          مهمتنا
        </Typography>
        <Typography variant="body1" paragraph>
          في تأثير، مهمتنا هي أن نكون في طليعة صناعة الإعلام السعودية، نصيغ الحكايات ونبني اتصالات ذات معنى مع الجماهير. نحن ملتزمون بالابتكار والتميز وفن السرد الذي يتردد صداه مع الناس في جميع أنحاء المنطقة.
        </Typography>
      </Box>
    </Container>
  );
};

export default About;
