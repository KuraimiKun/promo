import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import 'swiper/css';
import 'swiper/css/pagination';

const TestimonialContent = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: 'center',
  position: 'relative',
  maxWidth: '800px',
  margin: '0 auto',
}));

const QuoteIcon = styled(FormatQuoteIcon)(({ theme }) => ({
  color: theme.palette.primary.main,
  opacity: 0.2,
  fontSize: 60,
  marginBottom: theme.spacing(2)
}));

function ClientsSection() {
  const clients = [
    { id: 1, logo: "https://via.placeholder.com/150x80?text=Client+1", name: "شركة 1" },
    { id: 2, logo: "https://via.placeholder.com/150x80?text=Client+2", name: "شركة 2" },
    { id: 3, logo: "https://via.placeholder.com/150x80?text=Client+3", name: "شركة 3" },
    { id: 4, logo: "https://via.placeholder.com/150x80?text=Client+4", name: "شركة 4" },
    { id: 5, logo: "https://via.placeholder.com/150x80?text=Client+5", name: "شركة 5" },
    { id: 6, logo: "https://via.placeholder.com/150x80?text=Client+6", name: "شركة 6" },
  ];

  const testimonials = [
    {
      id: 1,
      text: "تجربة رائعة في العمل مع هذا الفريق المحترف. النتائج كانت مذهلة وتجاوزت توقعاتنا",
      author: "أحمد محمد",
      position: "المدير التنفيذي",
      company: "شركة الأفق"
    },
    {
      id: 2,
      text: "خدمة احترافية وجودة عالية في التنفيذ. سعداء جداً بالتعاون معهم وننصح بالتعامل معهم",
      author: "سارة أحمد",
      position: "مدير التسويق",
      company: "مجموعة النور"
    },
    {
      id: 3,
      text: "فريق متميز يقدم حلولاً إبداعية وخدمة ممتازة. نتطلع للعمل معهم مرة أخرى",
      author: "خالد عبدالله",
      position: "مدير العمليات",
      company: "شركة المستقبل"
    },
  ];

  return (
    <Box sx={{ padding: "50px 20px" }}>
      {/* Clients Slideshow */}
      <Typography variant="h4" color="primary" sx={{ textAlign: "center", fontWeight: "bold", mb: 6 }}>
        ...شركاء مثلك وثقوا بنا
      </Typography>
      
      <Box sx={{ mb: 8 }}>
        <Swiper
          modules={[Autoplay]}
          spaceBetween={30}
          slidesPerView={2}
          centeredSlides={false}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
            pauseOnMouseEnter: false
          }}
          speed={1000}
          loop={true}
          breakpoints={{
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
          }}
          style={{ padding: '20px 10px' }}
        >
          {clients.map((client) => (
            <SwiperSlide key={client.id}>
              <Box
                component="img"
                src={client.logo}
                alt={client.name}
                sx={{
                  maxWidth: '150px',
                  height: 'auto',
                  margin: '0 auto',
                  filter: 'grayscale(100%)',
                  transition: 'filter 0.3s ease',
                  '&:hover': {
                    filter: 'grayscale(0%)'
                  }
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>

      {/* Testimonials Slideshow */}
      <Typography variant="h4" color="primary" sx={{ textAlign: "center", fontWeight: "bold", mb: 6 }}>
        ماذا يقول عملاؤنا
      </Typography>

      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: false
        }}
        speed={800}
        pagination={{
          clickable: true,
        }}
        loop={true}
        style={{ padding: '20px 10px 60px' }}
      >
        {testimonials.map((testimonial) => (
          <SwiperSlide key={testimonial.id}>
            <TestimonialContent>
              <QuoteIcon />
              <Typography variant="h6" sx={{ mb: 3, lineHeight: 1.8, color: 'text.secondary' }}>
                {testimonial.text}
              </Typography>
              <Box sx={{ mt: 4 }}>
                <Typography variant="h6" color="primary" sx={{ fontWeight: "bold" }}>
                  {testimonial.author}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  {testimonial.position}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary">
                  {testimonial.company}
                </Typography>
              </Box>
            </TestimonialContent>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}

export default ClientsSection;
