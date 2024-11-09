import React, { useState } from "react";
import { Trash } from "lucide-react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebase";
import { useLoaderData, useNavigate } from "react-router-dom";

export default function AddProduct() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    discount: "",
    description: "",
    status: "Available",
  });
  const [sizes, setSizes] = useState([{ size: "", quantity: "" }]);
  const [mainImage, setMainImage] = useState(null);
  const [mainImagePreview, setMainImagePreview] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [galleryImagePreviews, setGalleryImagePreviews] = useState([]);

  const categories = useLoaderData();
  const categoryOptions = categories.map((category) => ({
    id: category.id,
    categoryName: category.name,
  }));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleMainImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMainImage(file);
        setMainImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeMainImage = () => {
    setMainImage(null);
    setMainImagePreview(null);
    document.getElementById("mainImage").value = "";
  };

  const handleGalleryImagesChange = (event) => {
    const files = Array.from(event.target.files);
    const newGalleryImages = [...galleryImages];
    const newGalleryImagePreviews = [...galleryImagePreviews];

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newGalleryImages.push(file);
        newGalleryImagePreviews.push(reader.result);
        setGalleryImages(newGalleryImages);
        setGalleryImagePreviews(newGalleryImagePreviews);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeGalleryImage = (index) => {
    const newGalleryImages = galleryImages.filter((_, i) => i !== index);
    const newGalleryImagePreviews = galleryImagePreviews.filter(
      (_, i) => i !== index
    );
    setGalleryImages(newGalleryImages);
    setGalleryImagePreviews(newGalleryImagePreviews);
  };

  const handleAddSize = () => {
    setSizes([...sizes, { size: "", quantity: "" }]);
  };

  const handleRemoveSize = (index) => {
    const newSizes = sizes.filter((_, i) => i !== index);
    setSizes(newSizes);
  };

  const handleSizeChange = (index, event) => {
    const newSizes = sizes.map((size, i) => {
      if (i === index) {
        return { ...size, [event.target.name]: event.target.value };
      }
      return size;
    });
    setSizes(newSizes);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Upload main image
      let mainImageUrl = null;
      if (mainImage) {
        const mainImageRef = ref(storage, `products/${mainImage.name}`);
        await uploadBytes(mainImageRef, mainImage);
        mainImageUrl = await getDownloadURL(mainImageRef);
      }

      // Upload gallery images
      const galleryImageUrls = await Promise.all(
        galleryImages.map(async (image) => {
          const imageRef = ref(storage, `products/${image.name}`);
          await uploadBytes(imageRef, image);
          return await getDownloadURL(imageRef);
        })
      );

      // Save product data to Firestore
      const productData = {
        ...formData,
        sizes,
        mainImage: mainImageUrl,
        galleryImages: galleryImageUrls,
      };
      await addDoc(collection(db, "NewProducts"), productData);
      alert("Product added successfully");
      navigate("/ecommerce");
    } catch (error) {
      console.error("Error adding product: ", error);
      alert("Error adding product");
    }
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
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          >
            {categoryOptions.map((category) => (
              <option key={category.id} value={category.categoryName}>
                {category.categoryName}
              </option>
            ))}
          </select>
        </div>

        {/* Price & Discount */}
        <div className="flex space-x-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">
              Discount (%)
            </label>
            <input
              type="number"
              id="discount"
              name="discount"
              value={formData.discount}
              onChange={handleChange}
              required
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
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
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
            id="mainImage"
            name="mainImage"
            className="w-full mt-1"
            onChange={handleMainImageChange}
          />
          {mainImagePreview && (
            <div className="mt-2">
              <img
                src={mainImagePreview}
                alt="Main Preview"
                className="w-36 h-36 object-cover rounded-md"
              />
              <button
                type="button"
                className="mt-2 px-2 py-1 bg-red-500 text-white text-sm rounded"
                onClick={removeMainImage}
              >
                Remove
              </button>
            </div>
          )}
        </div>

        {/* Gallery Images */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gallery Images
          </label>
          <input
            type="file"
            id="galleryImages"
            name="galleryImages"
            className="w-full mt-1"
            multiple
            onChange={handleGalleryImagesChange}
          />
          <div className="mt-2 grid grid-cols-3 gap-1">
            {galleryImagePreviews.map((preview, index) => (
              <div key={index} className="relative">
                <img
                  src={preview}
                  alt={`Gallery Preview ${index + 1}`}
                  className="w-36 h-36 object-cover rounded-md"
                />
                <button
                  type="button"
                  className="px-2 py-1 bg-red-500 text-white text-xs rounded"
                  onClick={() => removeGalleryImage(index)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Sizes and Quantities */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Sizes and Quantities
          </label>
          {sizes.map((size, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="text"
                id="size"
                name="size"
                value={size.size}
                onChange={(e) => handleSizeChange(index, e)}
                placeholder="Size"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md mr-2"
              />
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={size.quantity}
                onChange={(e) => handleSizeChange(index, e)}
                placeholder="Quantity"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md mr-2"
              />
              <button
                type="button"
                onClick={() => handleRemoveSize(index)}
                className="py-2 px-4 text-red-500 hover:text-red-600 transition duration-200"
              >
                <Trash />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddSize}
            className="py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-200"
          >
            Add Size
          </button>
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
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

export async function loader() {
  const categoriesSnapshot = await getDocs(collection(db, "Categories"));
  const categories = categoriesSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return categories;
}
