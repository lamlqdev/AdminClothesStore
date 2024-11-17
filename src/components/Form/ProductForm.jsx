import { useState, useEffect } from "react";
import { Trash } from "lucide-react";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { serverTimestamp } from "firebase/firestore";
import { storage } from "../../firebase";

export default function ProductForm({
  product,
  categories,
  onSubmit,
  children,
}) {
  const [formData, setFormData] = useState({
    name: "",
    categoryId: "",
    price: "",
    gender: "Female",
    description: "",
  });

  const [sizes, setSizes] = useState([{ size: "", quantity: "" }]);
  const [mainImage, setMainImage] = useState(null);
  const [mainImagePreview, setMainImagePreview] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [galleryImagePreviews, setGalleryImagePreviews] = useState([]);
  const [removedGalleryImages, setRemovedGalleryImages] = useState([]);

  useEffect(() => {
    if (categories && categories.length > 0 && !product) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        categoryId: categories[0].categoryId,
      }));
    }
  }, [categories, product]);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        categoryId: product.categoryId || "",
        price: product.price || "",
        gender: product.gender || "Female",
        description: product.description || "",
      });
      setSizes(product.sizelist || [{ size: "", quantity: "" }]);
      setMainImagePreview(product.image || null);
      setGalleryImagePreviews(product.images || []);
    }
  }, [product]);

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

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setGalleryImages((prev) => [...prev, file]);
        setGalleryImagePreviews((prev) => {
          if (!prev.includes(reader.result)) {
            return [...prev, reader.result];
          }
          return prev;
        });
      };
      reader.readAsDataURL(file);
    });
  };

  const removeGalleryImage = (index) => {
    const removedImage = galleryImagePreviews[index];
    if (!galleryImages[index]) {
      setRemovedGalleryImages([...removedGalleryImages, removedImage]);
    }
    setGalleryImagePreviews((prev) => prev.filter((_, i) => i !== index));
    setGalleryImages((prev) => prev.filter((_, i) => i !== index));
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

    let mainImageUrl = mainImagePreview;
    const firebaseURLPattern = /^https?:\/\/firebasestorage\.googleapis\.com/;
    let galleryImageUrls = galleryImagePreviews.filter((url) =>
      firebaseURLPattern.test(url)
    );

    try {
      // Upload main image if updated
      if (mainImage) {
        const mainImageRef = ref(storage, `products/${mainImage.name}`);
        await uploadBytes(mainImageRef, mainImage);
        mainImageUrl = await getDownloadURL(mainImageRef);
      }

      // Upload new gallery images
      const newGalleryImageUrls = await Promise.all(
        galleryImages.map(async (image) => {
          const imageRef = ref(storage, `products/${image.name}`);
          await uploadBytes(imageRef, image);
          return await getDownloadURL(imageRef);
        })
      );
      galleryImageUrls = [...galleryImageUrls, ...newGalleryImageUrls];
    } catch (error) {
      console.error("Error uploading images:", error);
      alert("Error saving product images");
      return;
    }

    const validatedSizes = sizes.map((size) => ({
      ...size,
      quantity: Number(size.quantity),
    }));

    const productData = {
      ...formData,
      sizelist: validatedSizes,
      image: mainImageUrl,
      images: galleryImageUrls,
      rating: product ? product.rating : 0,
      sale: product ? product.sale : 0,
      updatedAt: product ? serverTimestamp() : null,
      createdAt: product ? product.createdAt : serverTimestamp(),
    };

    onSubmit(productData);
    setGalleryImages([]);
    setRemovedGalleryImages([]);
  };

  return (
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
          id="categoryId"
          name="categoryId"
          value={formData.categoryId}
          onChange={handleChange}
          required
          className="w-full mt-1 p-2 border border-gray-300 rounded-md"
        >
          {categories.map((category) => (
            <option key={category.id} value={category.categoryId}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Price & Gender */}
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
            Gender
          </label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          >
            <option value="Female">Female</option>
            <option value="Male">Male</option>
            <option value="Unisex">Unisex</option>
          </select>
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
        <div className="mt-2 flex flex-wrap gap-4">
          {galleryImagePreviews.map((url, index) => (
            <div key={index} className="relative w-36 h-36">
              <img
                src={url}
                alt={`Preview ${index}`}
                className="w-full h-full object-cover rounded-md"
              />
              <button
                type="button"
                className="absolute top-1 right-1 bg-red-500 text-white text-sm rounded-full p-1"
                onClick={() => removeGalleryImage(index)}
              >
                <Trash size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Sizes */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Sizes
        </label>
        {sizes.map((size, index) => (
          <div key={index} className="flex items-center space-x-4 mb-2">
            <input
              type="text"
              name="size"
              value={size.size}
              onChange={(e) => handleSizeChange(index, e)}
              placeholder="Size (e.g., M, L)"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            <input
              type="number"
              name="quantity"
              value={size.quantity}
              onChange={(e) => handleSizeChange(index, e)}
              placeholder="Quantity"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            <button
              type="button"
              className="px-2 py-1 bg-red-500 text-white text-sm rounded"
              onClick={() => handleRemoveSize(index)}
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
          onClick={handleAddSize}
        >
          Add Size
        </button>
      </div>
      {children}
    </form>
  );
}
