import React, { useState, useEffect } from 'react';
import {
  Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Dialog, DialogTitle, DialogContent, DialogActions, TextField,
  IconButton, Box, CircularProgress, Alert, Tabs, Tab,
  Typography
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { collection, query, onSnapshot, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db, storage } from '../../firebaseConfig';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const BlogsPanel = () => {
  const [blogs, setBlogs] = useState([]);
  const [open, setOpen] = useState(false);
  const [editBlog, setEditBlog] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    image: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentTab, setCurrentTab] = useState(0);
  const [imageFile, setImageFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    const q = query(collection(db, "blogPosts"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const blogsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setBlogs(blogsData);
      setLoading(false);
    }, (error) => {
      setError(error.message);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleOpen = (blog = null) => {
    if (blog) {
      setEditBlog(blog);
      setFormData({
        title: blog.title,
        description: blog.description,
        content: blog.content,
        image: blog.image
      });
    } else {
      setEditBlog(null);
      setFormData({
        title: '',
        description: '',
        content: '',
        image: ''
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditBlog(null);
  };

  const handleSubmit = async () => {
    try {
      if (editBlog) {
        await updateDoc(doc(db, "blogPosts", editBlog.id), formData);
      } else {
        await addDoc(collection(db, "blogPosts"), formData);
      }
      handleClose();
    } catch (error) {
      console.error("Error saving blog:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      try {
        await deleteDoc(doc(db, "blogPosts", id));
      } catch (error) {
        console.error("Error deleting blog:", error);
      }
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    try {
      setUploadProgress(0);
      const storageRef = ref(storage, `blog-images/${Date.now()}_${file.name}`);
      
      const uploadTask = uploadBytesResumable(storageRef, file);
      
      uploadTask.on('state_changed', 
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => {
          console.error("Error uploading image:", error);
          setUploadProgress(0);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setFormData(prev => ({ ...prev, image: downloadURL }));
          setUploadProgress(100);
        }
      );
    } catch (error) {
      console.error("Error uploading image:", error);
      setUploadProgress(0);
    }
  };

  const handleEditorChange = (event) => {
    setFormData(prev => ({ ...prev, content: event.target.value }));
  };

  return (
    <Box sx={{ width: '100%', mb: 4 }}>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Button
          variant="contained"
          onClick={() => handleOpen()}
          startIcon={<EditIcon />}
          sx={{ boxShadow: 2 }}
        >
          Create New Post
        </Button>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" m={4}><CircularProgress /></Box>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: 'primary.main' }}>
                <TableCell sx={{ color: 'white' }}>Image</TableCell>
                <TableCell sx={{ color: 'white' }}>Title</TableCell>
                <TableCell sx={{ color: 'white' }}>Status</TableCell>
                <TableCell sx={{ color: 'white' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {blogs.map((blog) => (
                <TableRow 
                  key={blog.id}
                  sx={{ '&:hover': { bgcolor: 'action.hover' } }}
                >
                  <TableCell>
                    {blog.image && (
                      <Box
                        component="img"
                        src={blog.image}
                        sx={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 1 }}
                      />
                    )}
                  </TableCell>
                  <TableCell>{blog.title}</TableCell>
                  <TableCell>{blog.description}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleOpen(blog)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(blog.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Dialog 
        open={open} 
        onClose={handleClose} 
        maxWidth="lg" 
        fullWidth
        PaperProps={{ sx: { height: '90vh' } }}
      >
        <DialogTitle sx={{ borderBottom: 1, borderColor: 'divider' }}>
          {editBlog ? 'Edit Blog Post' : 'Create New Blog Post'}
        </DialogTitle>
        <DialogContent sx={{ p: 0 }}>
          <Tabs value={currentTab} onChange={(e, v) => setCurrentTab(v)} sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tab label="Content" />
            <Tab label="Preview" />
          </Tabs>
          <Box sx={{ p: 3 }}>
            {currentTab === 0 ? (
              <>
                <TextField
                  fullWidth
                  label="Title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  margin="normal"
                />
                <Box sx={{ mt: 2, mb: 2 }}>
                  <input
                    accept="image/*"
                    type="file"
                    id="image-upload"
                    style={{ display: 'none' }}
                    onChange={handleImageUpload}
                  />
                  <label htmlFor="image-upload">
                    <Button
                      variant="outlined"
                      component="span"
                      sx={{ mr: 2 }}
                    >
                      Upload Image
                    </Button>
                  </label>
                  {uploadProgress > 0 && uploadProgress < 100 && (
                    <CircularProgress 
                      variant="determinate" 
                      value={uploadProgress} 
                      size={24} 
                      sx={{ ml: 2 }}
                    />
                  )}
                  {formData.image && (
                    <Box sx={{ mt: 2 }}>
                      <img 
                        src={formData.image} 
                        alt="Preview" 
                        style={{ maxWidth: '200px', maxHeight: '200px' }}
                      />
                    </Box>
                  )}
                </Box>
                <TextField
                  fullWidth
                  label="Content"
                  value={formData.content}
                  onChange={handleEditorChange}
                  margin="normal"
                  multiline
                  rows={10}
                  sx={{
                    '& .MuiInputBase-root': {
                      fontFamily: 'monospace',
                      fontSize: '14px'
                    }
                  }}
                />
              </>
            ) : (
              <Box sx={{ p: 2 }}>
                <Typography variant="h4">{formData.title}</Typography>
                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                  {formData.description}
                </Typography>
                {formData.image && (
                  <Box component="img" src={formData.image} sx={{ maxWidth: '100%', my: 2 }} />
                )}
                <div dangerouslySetInnerHTML={{ __html: formData.content }} />
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editBlog ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BlogsPanel;
