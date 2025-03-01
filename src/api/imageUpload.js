import axios from "axios";

// Image upload
export const imageUpload = async (image) => {
  const formData = new FormData();
  formData.append("image", image);

  try {
    const { data } = await axios.post(
      `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_IMGBB_API_KEY
      }`,
      formData
    );

    // Check if the upload was successful
    if (data.success) {
      return data.data.display_url; // Return the display URL of the uploaded image
    } else {
      throw new Error("Image upload failed: " + data.error);
    }
  } catch (error) {
    console.error("Image upload error:", error);
    throw new Error("Image upload failed: " + error.message);
  }
};
