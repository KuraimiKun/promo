import React, { useState, useEffect } from 'react';
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Dialog, DialogTitle, DialogContent, Typography, IconButton, Box, Chip,
  TextField, CircularProgress, Alert, Select, MenuItem
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FilterListIcon from '@mui/icons-material/FilterList';
import { collection, query, onSnapshot, orderBy, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { formatDistanceToNow } from 'date-fns';

const MessagesPanel = () => {
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const q = query(collection(db, "contacts"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, 
      (querySnapshot) => {
        const messagesData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          status: doc.data().status || 'unread'
        }));
        setMessages(messagesData);
        setLoading(false);
      },
      (error) => {
        setError(error.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleMessageClick = async (message) => {
    setSelectedMessage(message);
    if (message.status === 'unread') {
      await updateDoc(doc(db, "contacts", message.id), { status: 'read' });
    }
  };

  const getStatusChip = (status) => {
    const statusColors = {
      unread: 'error',
      read: 'default',
      responded: 'success'
    };
    return <Chip size="small" label={status} color={statusColors[status]} />;
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

  return (
    <Box sx={{ width: '100%', mb: 4 }}>
      <Box sx={{ mb: 3, display: 'flex', gap: 2, alignItems: 'center' }}>
        <TextField
          size="small"
          placeholder="Search messages..."
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
          <MenuItem value="all">All Messages</MenuItem>
          <MenuItem value="unread">Unread</MenuItem>
          <MenuItem value="read">Read</MenuItem>
          <MenuItem value="responded">Responded</MenuItem>
        </Select>
      </Box>

      <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: 'primary.main' }}>
              <TableCell sx={{ color: 'white' }}>Status</TableCell>
              <TableCell sx={{ color: 'white' }}>Name</TableCell>
              <TableCell sx={{ color: 'white' }}>Email</TableCell>
              <TableCell sx={{ color: 'white' }}>Phone</TableCell>
              <TableCell sx={{ color: 'white' }}>Subject</TableCell>
              <TableCell sx={{ color: 'white' }}>Received</TableCell>
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
      >
        {selectedMessage && (
          <>
            <DialogTitle>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                Message Details
                <IconButton onClick={() => setSelectedMessage(null)}>
                  <CloseIcon />
                </IconButton>
              </Box>
            </DialogTitle>
            <DialogContent>
              <Typography variant="h6" gutterBottom>From: {selectedMessage.name}</Typography>
              <Typography variant="body1" gutterBottom>Email: {selectedMessage.email}</Typography>
              <Typography variant="body1" gutterBottom>Phone: {selectedMessage.phone}</Typography>
              <Typography variant="body1" gutterBottom>Subject: {selectedMessage.subject}</Typography>
              <Typography variant="h6" gutterBottom>Request:</Typography>
              <Typography variant="body1" paragraph>{selectedMessage.request}</Typography>
              <Typography variant="body2">
                Preferred Contact Method: {
                  Object.entries(selectedMessage.contactMethod)
                    .filter(([_, value]) => value)
                    .map(([key]) => key)
                    .join(', ')
                }
              </Typography>
            </DialogContent>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default MessagesPanel;
