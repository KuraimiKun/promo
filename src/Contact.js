import React, { useState, useEffect } from 'react';
import { Container, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Checkbox, Button, Typography, Box, Paper, Grid, Snackbar, Alert, CircularProgress, Fade, Grow } from '@mui/material';
import { collection, addDoc } from "firebase/firestore";
import { db } from './firebaseConfig';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import BusinessIcon from '@mui/icons-material/Business';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        gender: '',
        subject: '',
        request: '',
        contactMethod: {
            phone: false,
            email: false
        }
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success'
    });
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'الاسم مطلوب';
        if (!formData.email.trim()) newErrors.email = 'البريد الإلكتروني مطلوب';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'البريد الإلكتروني غير صالح';
        if (!formData.phone.trim()) newErrors.phone = 'رقم الهاتف مطلوب';
        if (!formData.subject.trim()) newErrors.subject = 'الموضوع مطلوب';
        if (!formData.request.trim()) newErrors.request = 'الطلب مطلوب';
        if (!formData.contactMethod.phone && !formData.contactMethod.email) {
            newErrors.contactMethod = 'يرجى اختيار وسيلة تواصل واحدة على الأقل';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setFormData((prevData) => ({
                ...prevData,
                contactMethod: {
                    ...prevData.contactMethod,
                    [name]: checked,
                },
            }));
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            setSnackbar({
                open: true,
                message: 'يرجى ملء جميع الحقول المطلوبة',
                severity: 'error'
            });
            return;
        }

        setLoading(true);
        try {
            await addDoc(collection(db, "contacts"), formData);
            setSnackbar({
                open: true,
                message: 'تم إرسال النموذج بنجاح!',
                severity: 'success'
            });
            setFormData({
                name: '',
                email: '',
                phone: '',
                gender: '',
                subject: '',
                request: '',
                contactMethod: {
                    phone: false,
                    email: false
                }
            });
            setErrors({});
        } catch (error) {
            setSnackbar({
                open: true,
                message: 'حدث خطأ أثناء إرسال النموذج',
                severity: 'error'
            });
        }
        setLoading(false);
    };

    const handleSnackbarClose = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            {/* Welcome Message */}
            <Paper elevation={3} sx={{ p: 3, mb: 4, backgroundColor: '#f8f9fa' }}>
                <Typography variant="h6" component="h1" gutterBottom align="right" color="primary">
                    شكرا لزيارتكم موقعنا. نرحب برسائلكم وأسئلتكم واقتراحاتكم التي ستلقى اهتماما وترحيبا من إدارة الموقع. لا تتردد في إرسال ما تريد.
                </Typography>
            </Paper>

            {/* Contact Form */}
            <Grow
                in={mounted}
                timeout={800}
                mountOnEnter
                unmountOnExit
            >
                <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
                    <Typography variant="h5" component="h2" gutterBottom align="right" color="primary" sx={{ mb: 3 }}>
                        نموذج التواصل
                    </Typography>
                    <form onSubmit={handleSubmit} noValidate>
                        <Grid container spacing={2}>
                            {mounted && ( // Only render Fade components when mounted
                                <>
                                    <Grid item xs={12}>
                                        <Fade in={mounted} timeout={400}>
                                            <TextField
                                                label="الاسم"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                fullWidth
                                                required
                                                variant="outlined"
                                                InputProps={{ sx: { direction: 'rtl' } }}
                                                error={!!errors.name}
                                                helperText={errors.name}
                                                sx={{
                                                    '& .MuiOutlinedInput-root': {
                                                        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                                                        '&:hover': {
                                                            transform: 'translateY(-2px)',
                                                            boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                                                        }
                                                    }
                                                }}
                                            />
                                        </Fade>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Fade in={mounted} timeout={400}>
                                            <TextField
                                                label="البريد الإلكتروني"
                                                name="email"
                                                type="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                fullWidth
                                                required
                                                variant="outlined"
                                                InputProps={{ sx: { direction: 'rtl' } }}
                                                error={!!errors.email}
                                                helperText={errors.email}
                                                sx={{
                                                    '& .MuiOutlinedInput-root': {
                                                        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                                                        '&:hover': {
                                                            transform: 'translateY(-2px)',
                                                            boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                                                        }
                                                    }
                                                }}
                                            />
                                        </Fade>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Fade in={mounted} timeout={400}>
                                            <TextField
                                                label="الهاتف"
                                                name="phone"
                                                type="tel"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                fullWidth
                                                required
                                                variant="outlined"
                                                InputProps={{ sx: { direction: 'rtl' } }}
                                                error={!!errors.phone}
                                                helperText={errors.phone}
                                                sx={{
                                                    '& .MuiOutlinedInput-root': {
                                                        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                                                        '&:hover': {
                                                            transform: 'translateY(-2px)',
                                                            boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                                                        }
                                                    }
                                                }}
                                            />
                                        </Fade>
                                    </Grid>
                                </>
                            )}
                            {/* <Grid item xs={12} sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-end',
                                marginBottom: '1rem'
                            }}>
                                <FormControl component="fieldset" margin="normal" error={!!errors.gender}>
                                    <FormLabel component="legend" align="right">الجنس</FormLabel>
                                    <RadioGroup
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleChange}
                                        row
                                        sx={{
                                            justifyContent: 'flex-end',
                                            margin: '0.5rem 0 0rem 2rem' // Adjust margin as needed (e.g., top and bottom)
                                        }}
                                    >
                                        <FormControlLabel
                                            value="male"
                                            control={<Radio />}
                                            label="ذكر"
                                            sx={{ textAlign: 'right' }}
                                        />
                                        <FormControlLabel
                                            value="female"
                                            control={<Radio />}
                                            label="أنثى"
                                            sx={{ textAlign: 'right' }}
                                        />
                                    </RadioGroup>
                                    {errors.gender && <Typography color="error" sx={{ textAlign: 'right' }}>{errors.gender}</Typography>}
                                </FormControl>
                            </Grid> */}

                            {mounted && (
                                <>
                                    <Grid item xs={12}>
                                        <Fade in={mounted} timeout={400}>
                                            <TextField
                                                label="الموضوع"
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                fullWidth
                                                required
                                                variant="outlined"
                                                InputProps={{ sx: { direction: 'rtl' } }}
                                                error={!!errors.subject}
                                                helperText={errors.subject}
                                                sx={{
                                                    '& .MuiOutlinedInput-root': {
                                                        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                                                        '&:hover': {
                                                            transform: 'translateY(-2px)',
                                                            boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                                                        }
                                                    }
                                                }}
                                            />
                                        </Fade>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Fade in={mounted} timeout={400}>
                                            <TextField
                                                label="الطلب"
                                                name="request"
                                                value={formData.request}
                                                onChange={handleChange}
                                                fullWidth
                                                required
                                                variant="outlined"
                                                multiline
                                                rows={4}
                                                InputProps={{ sx: { direction: 'rtl' } }}
                                                error={!!errors.request}
                                                helperText={errors.request}
                                                sx={{
                                                    '& .MuiOutlinedInput-root': {
                                                        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                                                        '&:hover': {
                                                            transform: 'translateY(-2px)',
                                                            boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                                                        }
                                                    }
                                                }}
                                            />
                                        </Fade>
                                    </Grid>
                                </>
                            )}
                            <Grid item xs={12}>
                                <FormControl component="fieldset" margin="normal" error={!!errors.contactMethod}>
                                    <FormLabel component="legend" align="right">وسيلة التواصل</FormLabel>
                                    <Box display="flex" flexDirection="row" justifyContent="flex-end">
                                        <FormControlLabel
                                            control={<Checkbox checked={formData.contactMethod.phone} onChange={handleChange} name="phone" />}
                                            label="عبر الهاتف"
                                        />
                                        <FormControlLabel
                                            control={<Checkbox checked={formData.contactMethod.email} onChange={handleChange} name="email" />}
                                            label="عبر البريد الإلكتروني"
                                        />
                                    </Box>
                                    {errors.contactMethod && <Typography color="error">{errors.contactMethod}</Typography>}
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            disabled={loading}
                            sx={{
                                mt: 3,
                                mb: 2,
                                py: 1.5,
                                fontSize: '1.1rem',
                                position: 'relative',
                                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                                '&:hover': {
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 6px 12px rgba(0,0,0,0.2)'
                                }
                            }}
                        >
                            {loading ? (
                                <CircularProgress size={24} color="inherit" />
                            ) : (
                                'إرسال'
                            )}
                        </Button>
                    </form>
                </Paper>
            </Grow>

            {/* Contact Information */}
            <Fade in={mounted} timeout={1200}>
                <Paper elevation={3} sx={{ p: 4, mb: 4, backgroundColor: '#f8f9fa' }}>
                    <Grid container spacing={3} justifyContent="center">
                        <Grid item xs={12}>
                            <Typography variant="h6" align="center" color="primary" gutterBottom sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                تأثير للإنتاج الإعلامي
                                <BusinessIcon sx={{ ml: 1, mr: 1 }} /> {/* Changed from mr to ml */}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1" align="center" gutterBottom sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                المقر الرئيسي - الإدارة
                                <LocationOnIcon sx={{ ml: 1, mr: 1 }} /> {/* Changed from mr to ml */}
                            </Typography>
                            <Typography variant="body1" align="center">
                                تقاطع طريق العروبة مع طريق الأمير تركي الأول
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body1" align="center" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                966114833363
                                <PhoneIcon sx={{ ml: 1, mr: 1 }} /> {/* Changed from mr to ml */}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body1" align="center" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                966114833363
                                <PhoneIcon sx={{ ml: 1, mr: 1 }} /> {/* Changed from mr to ml */}
                            </Typography>
                        </Grid>
                    </Grid>
                </Paper>
            </Fade>

            {/* Google Map */}
            <Fade in={mounted} timeout={1600}>
                <Paper elevation={3} sx={{ height: '400px', width: '100%', mb: 4 }}>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=YOUR_GOOGLE_MAPS_EMBED_URL"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </Paper>
            </Fade>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    onClose={handleSnackbarClose}
                    severity={snackbar.severity}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default ContactForm;
