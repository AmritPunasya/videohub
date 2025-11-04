// import { useState, useEffect } from "react";
// import { supabase } from "../../utils/supabase";
// import { useAuth } from "../../context/AuthContext";

// function Category() {
//   const { isAdmin } = useAuth();
//   const [categories, setCategories] = useState([]);
//   const [videos, setVideos] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [editingCategory, setEditingCategory] = useState(null);
//   const [categoryName, setCategoryName] = useState("");
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   useEffect(()=>{
//        fetchData();
//   },[]
//   )  

//     const fetchData = async()=>{
//          try{
//           const [videoResult,categoriesResult] = await Promise.all([
//             supabase.from('videos').select('*').order('created_at',{ascending:false}),
//             supabase.from('categories').select('*').order('id'),
//           ]);
//            if(videoResult.data) setVideos(videoResult.data)
//            if(categoriesResult.data) setCategories(categoriesResult.data)
//          }
//         catch(err){
//           console.log("Error fetching data",err);
//           setError("Failed to fetch ");
//         }
//         finally{
//           setLoading(false);
//         }

//     }
//   const getCategoryName=(categoryId)=>{
//     const cat = categories.find((c)=>c.id === categoryId)
//     return cat ? cat.category_name : "Unknown";
//   }
//     const getFilteredVideo=()=>{
//       if(selectedCategory === 0)
//         return videos;
//       const categoryId = categories[selectedCategory-1]?.id;
//       return videos.filter((v)=>v.category_id === categoryId)
//     }

//      const FilteredVideos = getFilteredVideo();

    


 
//   return (
//     <div className="container mb-5" style={{marginTop:90}}>
//       {/* Header */}
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h3>Browse by Category</h3>
//         {isAdmin && (
//           <button
//             className="btn btn-primary"
//             data-bs-toggle="modal"
//             data-bs-target="#categoryModal"
//             onClick={() => {
//               setEditingCategory(null);
//               setCategoryName("");
//               setError("");
//               setSuccess("");
//             }}
//           >
//             <i className="bi bi-plus-circle me-1"></i> Add Category
//           </button>
//         )}
//       </div>

//       {/* Alerts */}
//       {error && (
//         <div className="alert alert-danger alert-dismissible fade show" role="alert">
//           {error}
//           <button type="button" className="btn-close" onClick={() => setError("")}></button>
//         </div>
//       )}
//       {success && (
//         <div className="alert alert-success alert-dismissible fade show" role="alert">
//           {success}
//           <button type="button" className="btn-close" onClick={() => setSuccess("")}></button>
//         </div>
//       )}

//       {/* Manage Categories */}
//       {isAdmin && categories.length > 0 && (
//         <div className="card mb-4">
//           <div className="card-body">
//             <h5 className="card-title mb-3">Manage Categories</h5>
//             <div className="row g-3">
//               {categories.map((cat) => (
//                 <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={cat.id}>
//                   <div className="border rounded p-3 d-flex flex-column justify-content-between h-100">
//                     <h6 className="text-capitalize">{cat.category_name}</h6>
//                     <div>
//                       <button
//                         className="btn btn-sm btn-outline-primary me-2"
//                         data-bs-toggle="modal"
//                         data-bs-target="#categoryModal"
//                         onClick={() => {
//                           setEditingCategory(cat);
//                           setCategoryName(cat.category_name);
//                           setError("");
//                           setSuccess("");
//                         }}
//                       >
//                         <i className="bi bi-pencil"></i>
//                       </button>
//                       <button
//                         className="btn btn-sm btn-outline-danger"
//                     //    onClick={() => handleDeleteCategory(cat.id)}
//                       >
//                         <i className="bi bi-trash"></i>
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Tabs */}
//       <ul className="nav nav-tabs mb-4">
//         <li className="nav-item">
//           <button
//             className={`nav-link ${selectedCategory === 0 ? "active" : ""}`}
//             onClick={() => setSelectedCategory(0)}
//           >
//             All
//           </button>
//         </li>
//         {categories.map((cat, i) => (
//           <li className="nav-item" key={cat.id}>
//             <button
//               className={`nav-link ${selectedCategory === i + 1 ? "active" : ""}`}
//               onClick={() => setSelectedCategory(i + 1)}
//             >
//               {cat.category_name.toUpperCase()}
//             </button>
//           </li>
//         ))}
//       </ul>

//     {/* Videos Grid */}
//       {FilteredVideos.length === 0 ? (
//         <h5 className="text-center text-muted mt-5">
//           No videos available in this category
//         </h5>
//       ) : (
//         <div className="row g-4">
//           {FilteredVideos.map((video) => (
//             <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={video.id}>
//               <div className="card h-100 shadow-sm">
//                 <div className="ratio ratio-16x9">
//                   <iframe
//                     src={video.url}
//                     title={video.title}
//                     allowFullScreen
//                     style={{ borderRadius: "5px", border: "none" }}
//                   ></iframe>
//                 </div>
//                 <div className="card-body">
               
//                  <span className="badge bg-info text-dark mb-2 text-lowercase">
//                   {getCategoryName(video.category_id)}   
//                  </span>
//                  <h6 className="card-title fw-semibold">{video.title}</h6>
//                  <p className="card-text text-muted "style={{fontSize:".9rem"}}>
//                   {video.description}
//                  </p>
//                 <div className="d-flex justify-content-between text-secondary small mt-2">
//                   <span>
//                      <i className="bi bi-eye me-1"> {video.views}</i>
//                   </span>
//                   <span>
//                       <i className=" bi bi-hand-thumbs-up text-success me-1">{video.likes}</i>
//                   </span>
//                   <span>
//                      <i className="bi bi-chat-quote text-info me-1">{video.comments}</i>
//                   </span>
//                 </div>  
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Modal */}
//       <div
//         className="modal fade"
//         id="categoryModal"
//         tabIndex="-1"
//         aria-labelledby="categoryModalLabel"
//         aria-hidden="true"
//       >
//         <div className="modal-dialog modal-dialog-centered">
//           <form className="modal-content">
//             <div className="modal-header">
//               <h5 className="modal-title" id="categoryModalLabel">
//                 {editingCategory ? "Edit Category" : "Add New Category"}
//               </h5>
//               <button
//                 type="button"
//                 className="btn-close"
//                 data-bs-dismiss="modal"
//               ></button>
//             </div>
//             <div className="modal-body">
//               <div className="mb-3">
//                 <label className="form-label">Category Name</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   value={categoryName}
//                   onChange={(e) => setCategoryName(e.target.value)}
//                   placeholder="Enter category name"
//                   autoFocus
//                 />
//               </div>
//             </div>
//             <div className="modal-footer">
//               <button
//                 type="button"
//                 className="btn btn-secondary"
//                 data-bs-dismiss="modal"
//               >
//                 Cancel
//               </button>
//               <button type="submit" className="btn btn-primary">
//                 {editingCategory ? "Update" : "Add"}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Category;

import { useState, useEffect } from 'react';
import { supabase } from '../../utils/supabase';
import { useAuth } from '../../context/AuthContext';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  Tabs,
  Tab,
  CircularProgress,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  IconButton,
  Paper
} from '@mui/material';
import { ThumbUp, Visibility, Add, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

function Category() {
  const { isAdmin } = useAuth();
  const [categories, setCategories] = useState([]);
  const [videos, setVideos] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [categoryName, setCategoryName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [videosResult, categoriesResult] = await Promise.all([
        supabase.from('videos').select('*').order('created_at', { ascending: false }),
        supabase.from('categories').select('*').order('id')
      ]);

      if (videosResult.data) setVideos(videosResult.data);
      if (categoriesResult.data) setCategories(categoriesResult.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (event, newValue) => {
    setSelectedCategory(newValue);
  };

  const getFilteredVideos = () => {
    if (selectedCategory === 0) {
      return videos;
    }
    const categoryId = categories[selectedCategory - 1]?.id;
    return videos.filter((video) => video.category_id === categoryId);
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.category_name : 'Unknown';
  };

  const handleOpenDialog = (category = null) => {
    if (category) {
      setEditingCategory(category);
      setCategoryName(category.category_name);
    } else {
      setEditingCategory(null);
      setCategoryName('');
    }
    setError('');
    setSuccess('');
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCategoryName('');
    setEditingCategory(null);
  };

  const handleSaveCategory = async () => {
    if (!categoryName.trim()) {
      setError('Category name is required');
      return;
    }

    try {
      if (editingCategory) {
        const { error: updateError } = await supabase
          .from('categories')
          .update({ category_name: categoryName })
          .eq('id', editingCategory.id);

        if (updateError) throw updateError;
        setSuccess('Category updated successfully');
      } else {
        const { error: insertError } = await supabase
          .from('categories')
          .insert([{ category_name: categoryName }]);

        if (insertError) throw insertError;
        setSuccess('Category added successfully');
      }

      await fetchData();
      handleCloseDialog();
    } catch (err) {
      setError(err.message || 'Failed to save category');
      console.error(err);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;

    try {
      const { error: deleteError } = await supabase
        .from('categories')
        .delete()
        .eq('id', categoryId);

      if (deleteError) throw deleteError;
      setSuccess('Category deleted successfully');
      await fetchData();
    } catch (err) {
      setError(err.message || 'Failed to delete category');
      console.error(err);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  const filteredVideos = getFilteredVideos();

  return (
    <Container sx={{ mt: 10, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1">
          Browse by Category
        </Typography>
        {isAdmin && (
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => handleOpenDialog()}
            sx={{ textTransform: 'none' }}
          >
            Add Category
          </Button>
        )}
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess('')}>
          {success}
        </Alert>
      )}

      {isAdmin && categories.length > 0 && (
        <Paper sx={{ mb: 4, p: 2 }}>
          <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
            Manage Categories
          </Typography>
          <Grid container spacing={2}>
            {categories.map((category) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={category.id}>
                <Card sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ textTransform: 'capitalize' }}>
                      {category.category_name}
                    </Typography>
                  </CardContent>
                  <Box sx={{ display: 'flex', gap: 1, p: 1 }}>
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => handleOpenDialog(category)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleDeleteCategory(category.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>
      )}

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
        <Tabs value={selectedCategory} onChange={handleCategoryChange}>
          <Tab label="All" />
          {categories.map((category) => (
            <Tab key={category.id} label={category.category_name.toUpperCase()} />
          ))}
        </Tabs>
      </Box>

      {filteredVideos.length === 0 ? (
        <Typography variant="h6" color="text.secondary" align="center" sx={{ mt: 4 }}>
          No videos available in this category
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {filteredVideos.map((video) => (
            <Grid item xs={12} sm={6} md={4} key={video.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="iframe"
                  height="200"
                  src={video.url}
                  title={video.title}
                  sx={{ border: 'none' }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h6" component="h2">
                    {video.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {video.description}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 1 }}>
                    <Chip
                      label={getCategoryName(video.category_id)}
                      color="primary"
                      size="small"
                    />
                  </Box>
                  <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <Visibility fontSize="small" />
                      <Typography variant="body2">{video.views}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <ThumbUp fontSize="small" />
                      <Typography variant="body2">{video.likes}</Typography>
                    </Box>
                  </Box>
                  {video.comments && (
                    <Typography variant="body2" sx={{ mt: 2, fontStyle: 'italic' }}>
                      "{video.comments}"
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingCategory ? 'Edit Category' : 'Add New Category'}
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <TextField
            fullWidth
            label="Category Name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="Enter category name"
            autoFocus
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSaveCategory} variant="contained">
            {editingCategory ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default Category;
