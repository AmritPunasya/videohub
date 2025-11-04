import { useState, useEffect } from 'react';
import { supabase } from '../../utils/supabase';
import {
  Container,
  Typography,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TextField,
  MenuItem,
  CircularProgress,
  Alert,
  Tabs,
  Tab,
  Grid,
  Chip
} from '@mui/material';
import { Edit, Delete, Settings, VideoLibrary, Category as CategoryIcon } from '@mui/icons-material';

export function AdminPanel() {
  const [videos, setVideos] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [editingVideo, setEditingVideo] = useState(null);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [formData, setFormData] = useState({
   
    title: '',
    description: '',
    url: '',
    views: 0,
    likes: 0,
    dislikes: 0,
    comments: '',
    category_id: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [videosResult, categoriesResult] = await Promise.all([
        supabase.from('videos').select('*').order('created_at', { ascending: false }),
        supabase.from('categories').select('*')
      ]);

      if (videosResult.data) setVideos(videosResult.data);
      console.log(videosResult.data)
      if (categoriesResult.data) setCategories(categoriesResult.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setMessage({ type: 'error', text: 'Failed to fetch data' });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
     
      title: '',
      description: '',
      url: '',
      views: 0,
      likes: 0,
      dislikes: 0,
      comments: '',
      category_id: ''
    });
    setEditingVideo(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'views' || name === 'likes' || name === 'dislikes' || name === 'category_id'
        ? parseInt(value) || 0
        : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    try {
      if (editingVideo) {
        const { error } = await supabase
          .from('videos')
          .update(formData)
          .eq('id', editingVideo.id);

        if (error) throw error;
        setMessage({ type: 'success', text: 'Video updated successfully!' });
      } else {
        const { error } = await supabase.from('videos').insert([formData]);

        if (error) throw error;
        setMessage({ type: 'success', text: 'Video added successfully!' });
      }

      fetchData();
      resetForm();
    } catch (error) {
      console.error('Error saving video:', error);
      setMessage({ type: 'error', text: 'Failed to save video' });
    }
  };

  const handleEdit = (video) => {
    setEditingVideo(video);
    setFormData(video);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (videoId) => {
    if (!window.confirm('Are you sure you want to delete this video?')) return;

    try {
      const { error } = await supabase.from('videos').delete().eq('id', videoId);

      if (error) throw error;
      setMessage({ type: 'success', text: 'Video deleted successfully!' });
      fetchData();
    } catch (error) {
      console.error('Error deleting video:', error);
      setMessage({ type: 'error', text: 'Failed to delete video' });
    }
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.category_name : 'Unknown';
  };

  const getYouTubeThumbnail = (url) => {
    const videoId = url.split('/embed/')[1]?.split('?')[0];
    return videoId ? `https://img.youtube.com/vi/${videoId}/mqdefault.jpg` : '';
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 10, mb: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Settings sx={{ mr: 1, fontSize: 32 }} />
        <Typography variant="h4" component="h1" sx={{ fontWeight: 500 }}>
          Admin Panel
        </Typography>
      </Box>

      <Paper sx={{ mb: 3 }}>
        <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
          <Tab icon={<VideoLibrary />} iconPosition="start" label="Videos" />
          <Tab icon={<CategoryIcon />} iconPosition="start" label="Categories" />
        </Tabs>
      </Paper>

      {message.text && (
        <Alert severity={message.type} sx={{ mb: 2 }} onClose={() => setMessage({ type: '', text: '' })}>
          {message.text}
        </Alert>
      )}

      {activeTab === 0 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                {editingVideo ? 'Edit Video' : 'Add New Video'}
              </Typography>
              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="Title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  margin="normal"
                  size="small"
                  required
                />
                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  margin="normal"
                  size="small"
                  multiline
                  rows={3}
                />
                <TextField
                  fullWidth
                  label="YouTube URL"
                  name="url"
                  value={formData.url}
                  onChange={handleInputChange}
                  margin="normal"
                  size="small"
                  required
                  placeholder="https://www.youtube.com/embed/VIDEO_ID"
                  helperText="Use YouTube embed format"
                />
                <TextField
                  fullWidth
                  select
                  label="Category"
                  name="category_id"
                  value={formData.category_id}
                  onChange={handleInputChange}
                  margin="normal"
                  size="small"
                  required
                >
                  {categories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.category_name}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  fullWidth
                  label="Views"
                  name="views"
                  type="number"
                  value={formData.views}
                  onChange={handleInputChange}
                  margin="normal"
                  size="small"
                />
                <TextField
                  fullWidth
                  label="Likes"
                  name="likes"
                  type="number"
                  value={formData.likes}
                  onChange={handleInputChange}
                  margin="normal"
                  size="small"
                />
                <TextField
                  fullWidth
                  label="Dislikes"
                  name="dislikes"
                  type="number"
                  value={formData.dislikes}
                  onChange={handleInputChange}
                  margin="normal"
                  size="small"
                />
                <TextField
                  fullWidth
                  label="Comments"
                  name="comments"
                  value={formData.comments}
                  onChange={handleInputChange}
                  margin="normal"
                  size="small"
                  multiline
                  rows={2}
                />
                <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                  <Button type="submit" variant="contained" fullWidth>
                    {editingVideo ? 'Update' : 'Add'}
                  </Button>
                  {editingVideo && (
                    <Button onClick={resetForm} variant="outlined" fullWidth>
                      Cancel
                    </Button>
                  )}
                </Box>
              </form>
            </Paper>
          </Grid>

          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Manage Videos
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 'bold' }}>Title</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Category</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Views</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Likes</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {videos.map((video) => (
                      <TableRow key={video.id} hover>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Box
                              component="img"
                              src={getYouTubeThumbnail(video.url)}
                              alt={video.title}
                              sx={{
                                width: 60,
                                height: 45,
                                objectFit: 'cover',
                                borderRadius: 1
                              }}
                            />
                            <Box>
                              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                {video.title}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {video.description?.substring(0, 30)}...
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={getCategoryName(video.category_id)}
                            size="small"
                            sx={{ bgcolor: '#666', color: 'white', textTransform: 'lowercase' }}
                          />
                        </TableCell>
                        <TableCell>{video.views}</TableCell>
                        <TableCell>
                          <Typography variant="body2" color="success.main">
                            {video.likes} <span style={{ color: '#666' }}>/{video.dislikes}</span>
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <IconButton
                            color="primary"
                            onClick={() => handleEdit(video)}
                            size="small"
                          >
                            <Edit />
                          </IconButton>
                          <IconButton
                            color="error"
                            onClick={() => handleDelete(video.id)}
                            size="small"
                          >
                            <Delete />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>
      )}

      {activeTab === 1 && (
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Categories Overview
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Category Name</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Total Videos</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {categories.map((cat) => {
                  const videoCount = videos.filter(v => v.category_id === cat.id).length;
                  return (
                    <TableRow key={cat.id} hover>
                      <TableCell>{cat.id}</TableCell>
                      <TableCell>
                        <Chip
                          label={cat.category_name}
                          sx={{ bgcolor: '#00bcd4', color: 'white', textTransform: 'capitalize' }}
                        />
                      </TableCell>
                      <TableCell>{videoCount}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
    </Container>
  );
}


