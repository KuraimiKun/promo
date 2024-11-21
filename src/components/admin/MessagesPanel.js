import React, { useState, useEffect } from 'react';
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Dialog, DialogTitle, DialogContent, Typography, IconButton, Box, Chip,
  TextField, CircularProgress, Alert, Select, MenuItem, Button, Tooltip, Divider,
  Stack, ButtonGroup
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FilterListIcon from '@mui/icons-material/FilterList';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import { collection, query, onSnapshot, orderBy, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { formatDistanceToNow } from 'date-fns';

const STATUS_TRANSLATIONS = {
  unread: 'غير مقروء',
  read: 'مقروء',
  responded: 'تم الرد'
};

const TRANSLATIONS = {
  messageDetails: 'تفاصيل الرسالة',
  status: 'الحالة',
  contactInfo: 'معلومات الاتصال',
  message: 'الرسالة',
  preferredContact: 'طريقة الاتصال المفضلة',
  sendEmail: 'إرسال بريد إلكتروني',
  call: 'اتصال',
  copyEmail: 'نسخ البريد الإلكتروني',
  copyPhone: 'نسخ رقم الهاتف',
  noMessages: 'لا توجد رسائل'
};

const MessagesPanel = () => {
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    console.log('Initializing Firebase listener...');
    setLoading(true);
    
    try {
      const q = query(collection(db, "contacts"), orderBy("createdAt", "desc"));
      const unsubscribe = onSnapshot(q, 
        (querySnapshot) => {
          console.log('Received Firebase data:', querySnapshot.size, 'documents');
          const messagesData = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            status: doc.data().status || 'unread'
          }));
          console.log('Processed messages:', messagesData);
          setMessages(messagesData);
          setLoading(false);
        },
        (error) => {
          console.error('Firebase error:', error);
          setError(`Failed to fetch messages: ${error.message}`);
          setLoading(false);
        }
      );

      return () => {
        console.log('Cleaning up Firebase listener');
        unsubscribe();
      };
    } catch (err) {
      console.error('Setup error:', err);
      setError(`Failed to setup Firebase listener: ${err.message}`);
      setLoading(false);
    }
  }, []);

  const handleMessageClick = async (message) => {
    setSelectedMessage(message);
    if (message.status === 'unread') {
      await updateDoc(doc(db, "contacts", message.id), { status: 'read' });
    }
  };

  const handleMessageStatus = async (messageId, newStatus) => {
    try {
      await updateDoc(doc(db, "contacts", messageId), { 
        status: newStatus 
      });
    } catch (error) {
      console.error('Error updating message status:', error);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const getStatusChip = (status) => {
    const statusColors = {
      unread: 'error',
      read: 'default',
      responded: 'success'
    };
    return <Chip size="small" label={STATUS_TRANSLATIONS[status]} color={statusColors[status]} />;
  };

  const filteredMessages = messages
    .filter(message => filter === 'all' || message.status === filter)
    .filter(message => 
      searchTerm === '' || 
      message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

  if (loading) return <Box display="flex" justifyContent="center" m={4}><CircularProgress /></Box>;
  if (error) return <Alert severity="error">{error}</Alert>;

  if (messages.length === 0 && !loading) {
    return (
      <Box display="flex" justifyContent="center" m={4}>
        <Typography>No messages found</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', mb: 4 }}>
      <Box sx={{ mb: 3, display: 'flex', gap: 2, alignItems: 'center' }}>
        <TextField
          size="small"
          placeholder="بحث في الرسائل..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ flexGrow: 1 }}
        />
        <Select
          size="small"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          startAdornment={<FilterListIcon sx={{ mr: 1 }} />}
        >
          <MenuItem value="all">كل الرسائل</MenuItem>
          <MenuItem value="unread">غير مقروء</MenuItem>
          <MenuItem value="read">مقروء</MenuItem>
          <MenuItem value="responded">تم الرد</MenuItem>
        </Select>
      </Box>

      <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: 'primary.main' }}>
              <TableCell sx={{ color: 'white' }}>الحالة</TableCell>
              <TableCell sx={{ color: 'white' }}>الاسم</TableCell>
              <TableCell sx={{ color: 'white' }}>البريد الإلكتروني</TableCell>
              <TableCell sx={{ color: 'white' }}>رقم الهاتف</TableCell>
              <TableCell sx={{ color: 'white' }}>الموضوع</TableCell>
              <TableCell sx={{ color: 'white' }}>تاريخ الاستلام</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredMessages.map((message) => (
              <TableRow 
                key={message.id} 
                onClick={() => handleMessageClick(message)}
                sx={{ 
                  cursor: 'pointer',
                  bgcolor: message.status === 'unread' ? 'action.hover' : 'inherit',
                  '&:hover': { bgcolor: 'action.selected' }
                }}
              >
                <TableCell>{getStatusChip(message.status)}</TableCell>
                <TableCell>{message.name}</TableCell>
                <TableCell>{message.email}</TableCell>
                <TableCell>{message.phone}</TableCell>
                <TableCell>{message.subject}</TableCell>
                <TableCell>
                  {formatDistanceToNow(message.timestamp?.toDate() || new Date(), { addSuffix: true })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog 
        open={!!selectedMessage} 
        onClose={() => setSelectedMessage(null)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: { minHeight: '60vh' }
        }}
      >
        {selectedMessage && (
          <>
            <DialogTitle>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h6">{TRANSLATIONS.messageDetails}</Typography>
                <IconButton onClick={() => setSelectedMessage(null)}>
                  <CloseIcon />
                </IconButton>
              </Box>
            </DialogTitle>
            <DialogContent>
              <Stack spacing={3}>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">{TRANSLATIONS.status}</Typography>
                  <Select
                    fullWidth
                    size="small"
                    value={selectedMessage.status}
                    onChange={(e) => handleMessageStatus(selectedMessage.id, e.target.value)}
                    sx={{ mt: 1 }}
                  >
                    <MenuItem value="unread">{STATUS_TRANSLATIONS.unread}</MenuItem>
                    <MenuItem value="read">{STATUS_TRANSLATIONS.read}</MenuItem>
                    <MenuItem value="responded">{STATUS_TRANSLATIONS.responded}</MenuItem>
                  </Select>
                </Box>

                <Divider />

                <Box>
                  <Typography variant="subtitle2" color="text.secondary">{TRANSLATIONS.contactInfo}</Typography>
                  <Stack spacing={2} sx={{ mt: 1 }}>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Typography variant="body1" fontWeight="500">{selectedMessage.name}</Typography>
                    </Box>
                    
                    <Box display="flex" alignItems="center" gap={1}>
                      <EmailIcon color="action" />
                      <Typography variant="body1">{selectedMessage.email}</Typography>
                      <Tooltip title={TRANSLATIONS.copyEmail}>
                        <IconButton size="small" onClick={() => copyToClipboard(selectedMessage.email)}>
                          <ContentCopyIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>

                    <Box display="flex" alignItems="center" gap={1}>
                      <PhoneIcon color="action" />
                      <Typography variant="body1">{selectedMessage.phone}</Typography>
                      <Tooltip title={TRANSLATIONS.copyPhone}>
                        <IconButton size="small" onClick={() => copyToClipboard(selectedMessage.phone)}>
                          <ContentCopyIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Stack>
                </Box>

                <Divider />

                <Box>
                  <Typography variant="subtitle2" color="text.secondary">{TRANSLATIONS.message}</Typography>
                  <Typography variant="body1" sx={{ mt: 1 }} fontWeight="500">
                    {selectedMessage.subject}
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 2 }}>
                    {selectedMessage.request}
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    {TRANSLATIONS.preferredContact}
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 1 }}>
                    {Object.entries(selectedMessage.contactMethod)
                      .filter(([_, value]) => value)
                      .map(([key]) => key)
                      .join(', ')}
                  </Typography>
                </Box>

                <ButtonGroup 
                  variant="contained" 
                  fullWidth 
                  sx={{
                    '& .MuiButton-root': {
                      flex: 1,
                      py: 1,
                      '&:hover': {
                        backgroundColor: 'primary.dark',
                      }
                    }
                  }}
                >
                  <Button
                    startIcon={<EmailIcon />}
                    onClick={() => window.location.href = `mailto:${selectedMessage.email}`}
                  >
                    {TRANSLATIONS.sendEmail}
                  </Button>
                  <Button
                    startIcon={<PhoneIcon />}
                    onClick={() => window.location.href = `tel:${selectedMessage.phone}`}
                  >
                    {TRANSLATIONS.call}
                  </Button>
                </ButtonGroup>
              </Stack>
            </DialogContent>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default MessagesPanel;
