import { useState, useEffect } from "react";
import { supabase } from "../../utils/supabase";

export function Home() {
  const [videos, setVideos] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [videosResult, categoriesResult] = await Promise.all([
        supabase.from("videos").select("*").order("created_at", { ascending: false }),
        supabase.from("categories").select("*"),
      ]);

      if (videosResult.data) setVideos(videosResult.data);
      if (categoriesResult.data) setCategories(categoriesResult.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.category_name : "Unknown";
  };

  // ✅ Convert normal YouTube link to embed link
  const getEmbedUrl = (url) => {
    if (!url) return "";
    if (url.includes("watch?v=")) {
      return url.replace("watch?v=", "embed/");
    } else if (url.includes("youtu.be/")) {
      return url.replace("youtu.be/", "www.youtube.com/embed/");
    }
    return url;
  };

  const filteredVideos = videos.filter((video) => {
    const matchesSearch =
      video.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      selectedFilter === "all" ||
      getCategoryName(video.category_id).toLowerCase() === selectedFilter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const categoryCount = categories.reduce((acc, cat) => {
    acc[cat.id] = videos.filter((v) => v.category_id === cat.id).length;
    return acc;
  }, {});

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4 mb-3">
      {/* Header */}
      <div className="d-flex align-items-center mb-3  ">
        <i className="bi bi-collection-play me-2 fs-3 text-primary mt-5"></i>
        <h3 className="fw-semibold mb-0 mt-5 ">All Videos</h3>
      </div>
      <p className="text-muted mb-4">{filteredVideos.length} videos found</p>

      {/* Category Filter */}
      <div className="mb-4 d-flex flex-wrap gap-2">
        <button
          className={`btn btn-sm ${
            selectedFilter === "all" ? "btn-primary text-white" : "btn-outline-secondary"
          }`}
          onClick={() => setSelectedFilter("all")}
        >
          All ({videos.length})
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`btn btn-sm ${
              selectedFilter.toLowerCase() === cat.category_name.toLowerCase()
                ? "btn-primary text-white"
                : "btn-outline-secondary"
            } text-capitalize`}
            onClick={() => setSelectedFilter(cat.category_name)}
          >
            {cat.category_name} ({categoryCount[cat.id] || 0})
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="mb-4" style={{ maxWidth: "400px" }}>
        <div className="input-group">
          <span className="input-group-text">
            <i className="bi bi-search"></i>
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Search videos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Video Grid */}
      <div className="row g-4" style={{gap:120}}>
        {filteredVideos.length > 0 ? (
          filteredVideos.map((video) => (
            <div key={video.id} className="col-12 col-sm-6 col-md-4 col-lg-3 ">
              <div className="card h-100 shadow-sm" style={{width:300}}>
                {/* ✅ Embedded Video Player */}
                <div className="ratio ratio-16x9">
                  <iframe
                    src={getEmbedUrl(video.url)}
                    title={video.title}
                    allowFullScreen
                    style={{ borderRadius: "5px" }}
                  ></iframe>
                </div>

                <div className="card-body">
                  <span className="badge bg-info text-dark mb-2 text-lowercase">
                    {getCategoryName(video.category_id)}
                  </span>
                  <h6 className="card-title fw-semibold">{video.title}</h6>
                  <p className="card-text text-muted" style={{ fontSize: "0.9rem" }}>
                    {video.description}
                  </p>

                  <div className="d-flex justify-content-between text-secondary small mt-2">
                    <span>
                      <i className="bi bi-eye me-1"></i>
                      {video.views}
                    </span>
                    <span>
                      <i className="bi bi-hand-thumbs-up text-success me-1"></i>
                      {video.likes}
                    </span>
                    <span>
                      <i className="bi bi-hand-thumbs-down text-danger me-1"></i>
                      {video.dislikes}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-5">
            <h5 className="text-muted">No videos found matching your search</h5>
          </div>
        )}
      </div>
    </div>
  );
}
