const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');// lấy ảnh từ client
const multer = require('multer')// lưu file và upload file

cloudinary.config({
  cloud_name: 'dccijrcef',
  api_key: '777912698449137',
  api_secret: '8LyxmGzZT0DgUme0VrIstqEKVik'
});

const storage = new CloudinaryStorage({
  cloudinary,
  allowedFormats: ['jpg', 'png'],
 params:{
    folder:'cuahangdientu',
 }
});

const uploadCloud = multer({ storage });

module.exports = uploadCloud;
