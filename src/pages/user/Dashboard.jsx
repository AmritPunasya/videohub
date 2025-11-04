
import { useState, useEffect } from "react";
import { supabase } from "../../utils/supabase";
import { useAuth } from "../../context/AuthContext";
import {
  Grid,
  Card,
  Typography,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from "@mui/material";
import {
  PlayCircleOutline,
  ThumbUp,
  Star,
  AccessTime,
} from "@mui/icons-material";

export function Dashboard() {
  const { user, isAdmin } = useAuth();
  const [videos, setVideos] = useState([]);
  const [categories, setCategories] = useState([]);
  const [stats, setStats] = useState({
    totalVideos: 0,
    totalLikes: 0,
    favoriteCategory: "None",
  });
  const [categoryStats, setCategoryStats] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [videosResult, categoriesResult] = await Promise.all([
        supabase
          .from("videos")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(5),
        supabase.from("categories").select("*"),
      ]);

      if (videosResult.data) setVideos(videosResult.data);
      if (categoriesResult.data) setCategories(categoriesResult.data);

      const allVideosResult = await supabase.from("videos").select("*");

      if (allVideosResult.data && categoriesResult.data) {
        const totalLikes = allVideosResult.data.reduce(
          (sum, v) => sum + (v.likes || 0),
          0
        );

        const catStats = categoriesResult.data.map((cat) => {
          const catVideos = allVideosResult.data.filter(
            (v) => v.category_id === cat.id
          );
          const totalViews = catVideos.reduce(
            (sum, v) => sum + (v.views || 0),
            0
          );
          return {
            name: cat.category_name,
            videos: catVideos.length,
            views: totalViews,
          };
        });

        const favCat = catStats.reduce(
          (max, cat) => (cat.views > max.views ? cat : max),
          catStats[0]
        );

        setStats({
          totalVideos: allVideosResult.data.length,
          totalLikes,
          favoriteCategory: favCat?.views > 0 ? favCat.name : "None",
        });

        setCategoryStats(catStats);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.category_name : "Unknown";
  };

  const getYouTubeThumbnail = (url) => {
    const videoId = url.split("/embed/")[1]?.split("?")[0];
    return videoId
      ? `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`
      : "";
  };

  return (
    <Box 
      sx={{
        mt: 8,
        
      
        backgroundColor: "#f4f6f8",
      }}
    >
      {/* --- Header + Stats --- */}
      <Box
        sx={{
          px: { xs: 2, md: 6 },
          maxWidth: "1400px",
          mx: "auto",
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Dashboard
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 4 }}>
          Welcome back, {isAdmin ? user?.admin_id : user?.user_name} 👋
        </Typography>

        <Grid container spacing={30} sx={{ mb: 5 }}>
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                marginLeft:10,
                width:200,
                textAlign: "center",
                py: 3,
                boxShadow: 3,
                borderRadius: 3,
                transition: "0.3s",
                "&:hover": { transform: "translateY(-4px)", boxShadow: 6 },
              }}
            >
              <PlayCircleOutline sx={{ fontSize: 60, color: "#1976d2", mb: 1 }} />
              <Typography variant="h3" fontWeight={700}>
                {stats.totalVideos}
              </Typography>
              <Typography color="text.secondary">Videos Available</Typography>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                 
                width:200,
                textAlign: "center",
                py: 3,
                boxShadow: 3,
                borderRadius: 3,
                transition: "0.3s",
                "&:hover": { transform: "translateY(-4px)", boxShadow: 6 },
              }}
            >
              <ThumbUp sx={{ fontSize: 60, color: "#2e7d32", mb: 1 }} />
              <Typography variant="h3" fontWeight={700}>
                {stats.totalLikes}
              </Typography>
              <Typography color="text.secondary">Videos Liked</Typography>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                width:200,
                textAlign: "center",
                py: 3,
                boxShadow: 3,
                borderRadius: 3,
                transition: "0.3s",
                "&:hover": { transform: "translateY(-4px)", boxShadow: 6 },
              }}
            >
              <Star sx={{ fontSize: 60, color: "#00bcd4", mb: 1 }} />
              <Typography variant="h3" fontWeight={700}>
                {stats.favoriteCategory}
              </Typography>
              <Typography color="text.secondary">Favorite Category</Typography>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Recent Videos Section */}
      <Paper
        sx={{
          width: "100%",
          borderRadius: 0,
          px: { xs: 2, md: 6 },
          py: 4,
          mb: 5,
          boxShadow: 2,
          backgroundColor: "#fff",
          maxWidth: "100vw",
          overflowX: "hidden", 
        }}
      >
        <Typography variant="h6" fontWeight={700} sx={{ mb: 3 }}>
          <AccessTime sx={{ mr: 1, color: "#1976d2" }} /> Recent Videos
        </Typography>

        {videos.length === 0 ? (
          <Typography align="center" color="text.secondary">
            No videos available
          </Typography>
        ) : (
          videos.map((video) => (
            <Box
              key={video.id}
              sx={{
                display: "flex",
               
                gap: 70,
                mb: 3,
                pb: 3,
                borderBottom: "1px solid #e0e0e0",
                "&:last-child": { borderBottom: "none", mb: 0, pb: 0 },
              }}
            >
              <Box
                component="img"
                src={getYouTubeThumbnail(video.url)}
                alt={video.title}
                sx={{
                  width: 150,
                  height: 100,
                  objectFit: "cover",
                  borderRadius: 1,
                }}
              />
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6" gutterBottom>
                  {video.title}
                </Typography>
                <Chip
                  label={getCategoryName(video.category_id)}
                  size="small"
                  sx={{
                    bgcolor: "#00bcd4",
                    color: "white",
                    fontWeight: 500,
                    mb: 1,
                  }}
                />
                <Typography variant="body2" color="text.secondary">
                  {video.views} views
                </Typography>
              </Box>
            </Box>
          ))
        )}
      </Paper>

      {/*  Categories Overview Section */}
      <Paper
        sx={{
          width: "100%",
          borderRadius: 0,
          px: { xs: 2, md: 6 },
          py: 4,
          mb: 5,
          boxShadow: 2,
          backgroundColor: "#fff",
          maxWidth: "100vw",
          overflowX: "hidden",
        }}
      >
        <Typography variant="h6" fontWeight={700} sx={{ mb: 3 }}>
          <Box
            component="span"
            sx={{
              width: 10,
              height: 10,
              bgcolor: "#ff9800",
              display: "inline-block",
              borderRadius: "50%",
              mr: 1,
            }}
          />
          Categories Overview
        </Typography>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Category</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Videos</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Total Views</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categoryStats.map((cat, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Chip
                      label={cat.name}
                      size="small"
                      sx={{
                        bgcolor: "#00bcd4",
                        color: "white",
                        fontWeight: 500,
                      }}
                    />
                  </TableCell>
                  <TableCell>{cat.videos}</TableCell>
                  <TableCell>{cat.views}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
