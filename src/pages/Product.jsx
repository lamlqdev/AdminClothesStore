import React, { useState } from "react";

export default function AddProduct() {
  const [galleryImages, setGalleryImages] = useState([]);
  const [productData, setProductData] = useState({
    name: "",
    category: "",
    brand: "",
    price: "",
    discount: "",
    description: "",
    mainImage: null,
    galleryImages: [],
    sizes: [
      { size: "S", quantity: 0 },
      { size: "M", quantity: 0 },
      { size: "L", quantity: 0 },
    ],
    tags: "",
    status: "Available",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    setProductData({ ...productData, [name]: files[0] });
  };

  const handleGalleryChange = (event) => {
    const files = Array.from(event.target.files);
    const newImages = files.map((file) => URL.createObjectURL(file));
    setGalleryImages((prevImages) => [...prevImages, ...newImages]);
  };

  const handleSizeChange = (index, value) => {
    const updatedSizes = productData.sizes.map((size, i) =>
      i === index ? { ...size, quantity: parseInt(value) } : size
    );
    setProductData({ ...productData, sizes: updatedSizes });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Product Data:", productData);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-8">Add New Product</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg space-y-6"
      >
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Product Name
          </label>
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            name="category"
            value={productData.category}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select Category</option>
            <option value="Clothing">Clothing</option>
            <option value="Footwear">Footwear</option>
            <option value="Accessories">Accessories</option>
          </select>
        </div>

        {/* Brand */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Brand
          </label>
          <input
            type="text"
            name="brand"
            value={productData.brand}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Price & Discount */}
        <div className="flex space-x-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">
              Price
            </label>
            <input
              type="number"
              name="price"
              value={productData.price}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">
              Discount (%)
            </label>
            <input
              type="number"
              name="discount"
              value={productData.discount}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            value={productData.description}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          ></textarea>
        </div>

        {/* Main Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Main Image
          </label>
          <input
            type="file"
            name="mainImage"
            onChange={handleImageChange}
            className="w-full mt-1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gallery Images
          </label>
          <input
            type="file"
            name="galleryImages"
            onChange={handleGalleryChange}
            multiple
            accept="image/*"
            className="w-full mt-1 mb-4"
          />

          {/* Preview Gallery */}
          <div className="flex flex-wrap gap-4">
            {galleryImages.map((image, index) => (
              <div key={index} className="w-24 h-24 overflow-hidden rounded-lg">
                <img
                  src={image}
                  alt={`Preview ${index + 1}`}
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Sizes & Quantities */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Sizes & Quantities
          </label>
          {productData.sizes.map((size, index) => (
            <div key={index} className="flex items-center space-x-4 mt-1">
              <span className="w-16">{size.size}</span>
              <input
                type="number"
                value={size.quantity}
                onChange={(e) => handleSizeChange(index, e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          ))}
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Tags
          </label>
          <input
            type="text"
            name="tags"
            value={productData.tags}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            placeholder="e.g., Summer, Sale, New Arrival"
          />
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            name="status"
            value={productData.status}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          >
            <option value="Available">Available</option>
            <option value="Out of Stock">Out of Stock</option>
            <option value="Coming Soon">Coming Soon</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-200"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}
