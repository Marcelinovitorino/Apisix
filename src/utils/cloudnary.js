import { v2 as cloudinary } from 'cloudinary';

// Configuração
cloudinary.config({ 
    cloud_name: 'dflmadewp', 
    api_key: '449244588228321', 
    api_secret: process.env.CLOUDINARY_API_SECRET 
});

export default cloudinary;
