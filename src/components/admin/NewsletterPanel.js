import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, CircularProgress,
  Alert, IconButton, Tooltip
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { collection, query, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import * as XLSX from 'xlsx';

const TRANSLATIONS = {
  title: 'النشرة البريدية',
  subscribers: 'المشتركين',
  email: 'البريد الإلكتروني',
  date: 'تاريخ الاشتراك',
  actions: 'الإجراءات',
  deleteConfirm: 'هل أنت متأكد من حذف هذا المشترك؟',
  exportToExcel: 'تصدير إلى Excel'
};

const NewsletterPanel = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const q = query(collection(db, "newsletter"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const subscribersData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setSubscribers(subscribersData);
      setLoading(false);
    }, (error) => {
      setError(error.message);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm(TRANSLATIONS.deleteConfirm)) {
      try {
        await deleteDoc(doc(db, "newsletter-subscribers", id));
      } catch (error) {
        console.error("Error deleting subscriber:", error);
      }
    }
  };

  const handleExportToExcel = () => {
    const exportData = subscribers.map(subscriber => ({
      [TRANSLATIONS.email]: subscriber.email,
      [TRANSLATIONS.date]: new Date(subscriber.subscribeDate?.toDate()).toLocaleDateString('ar-SA')
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Subscribers");
    XLSX.writeFile(wb, "newsletter_subscribers.xlsx");
  };

  if (loading) return <Box display="flex" justifyContent="center" m={4}><CircularProgress /></Box>;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box sx={{ width: '100%', mb: 4 }}>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">{TRANSLATIONS.subscribers}</Typography>
        <IconButton
          color="primary"
          onClick={handleExportToExcel}
          title={TRANSLATIONS.exportToExcel}
        >
          <FileDownloadIcon />
        </IconButton>
      </Box>

      <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: 'primary.main' }}>
              <TableCell sx={{ color: 'white' }}>{TRANSLATIONS.email}</TableCell>
              <TableCell sx={{ color: 'white' }}>{TRANSLATIONS.date}</TableCell>
              <TableCell sx={{ color: 'white' }}>{TRANSLATIONS.actions}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {subscribers.map((subscriber) => (
              <TableRow key={subscriber.id}>
                <TableCell>{subscriber.email}</TableCell>
                <TableCell>
                  {new Date(subscriber.subscribeDate?.toDate()).toLocaleDateString('ar-SA')}
                </TableCell>
                <TableCell>
                  <Tooltip title="حذف">
                    <IconButton onClick={() => handleDelete(subscriber.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default NewsletterPanel;
