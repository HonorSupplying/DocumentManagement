import React, { useEffect } from "react";

const SearchWidget = () => {
  useEffect(() => {
    // Load Google AI Search Widget script
    const script = document.createElement("script");
    script.src = "https://cloud.google.com/ai/gen-app-builder/client?hl=en_US";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script); // Cleanup script when component unmounts
    };
  }, []);

  return (
    <div className="container my-5">
      {/* Heading */}
      <h2 className="text-center mb-4">
        <strong>AI-Powered Document Search</strong>
      </h2>

      {/* Search Widget */}
      <div className="row mb-4">
        <div className="col-md-8 mx-auto">
          <div className="input-group">
            <input
              placeholder="Search documents here..."
              id="searchWidgetTrigger"
              className="form-control"
            />
            <div className="input-group-append">
              {/* Google AI Search Widget */}
              <gen-search-widget
                configId="d0abac3f-14b6-4af2-8448-7851639f5030"
                triggerId="searchWidgetTrigger"
              ></gen-search-widget>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer to push carousel to the bottom */}
      <div className="my-5"></div> {/* Adjust spacing as necessary */}

      {/* Image Slider (Carousel) */}
      <div
        id="carouselExampleAutoplaying"
        className="carousel slide"
        data-bs-ride="carousel"
        style={{ maxWidth: "550px", margin: "0 auto" }} // Make the carousel smaller
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src={`${process.env.PUBLIC_URL}/Example_1.jpg`}
              className="d-block w-100"
              alt="A beautiful landscape with mountains and a sunset"
              style={{ maxHeight: "350px", objectFit: "cover" }} // Adjust size
            />
          </div>
          <div className="carousel-item">
            <img
              src={`${process.env.PUBLIC_URL}/Example_2.jpg`}
              className="d-block w-100"
              alt="City skyline during the day"
              style={{ maxHeight: "350px", objectFit: "cover" }} // Adjust size
            />
          </div>
          <div className="carousel-item">
            <img
              src={`${process.env.PUBLIC_URL}/Example_3.jpg`}
              className="d-block w-100"
              alt="A close-up of a colorful flower"
              style={{ maxHeight: "350px", objectFit: "cover" }} // Adjust size
            />
          </div>
        </div>
        {/* Carousel Controls */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default SearchWidget;