import multer from "multer";

// configure storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/")
    },

    filename:(req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`)
    },
})


// file filter

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ["image/jpeg", "image/png", "image/jpg"];

    if(allowedFileTypes.includes(file.mimetype)){
        cb(null, true)
    }else{
        cb(new Error("Invalid file type"), false)
    }
}

const upload = multer({
    storage: storage,
    fileFilter: fileFilter 
})

export default upload;