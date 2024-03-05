import {v2 as cloudinary} from "cloudinary"
import fs from "fs"


cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null
        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
        })
        // file has been uploaded successfull
        fs.unlinkSync(localFilePath)
        //console.log("file is uploaded on cloudinary ", response.url);
        return response;

    } catch (error) {
        fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
        return null;
    }
}

const extractPublicIdFromUrl = (url) => {
    const regex = /\/([^/]+?)\.[a-z0-9]+$/i;
    const match = url.match(regex);
    // console.log("match ", match);
    if (match && match[1]) {
        // console.log("match[1] ", match[1]);
      return match[1];
    }
    return null;
  };

  const deleteFromCloudinary = async (publicId) => {
    try {
      // console.log("publicId ", publicId);
      await cloudinary.uploader.destroy(publicId);
      console.log('Image deleted from Cloudinary');
    } catch (error) {
      console.error('Error deleting image from Cloudinary:', error);
      throw new Error('Failed to delete image from Cloudinary');
    }
  };



export {uploadOnCloudinary, extractPublicIdFromUrl, deleteFromCloudinary}