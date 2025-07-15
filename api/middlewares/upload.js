import multer from "multer"

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads/')
    },
    filename:(req,file,cb)=>{
        const unique = Date.now() + "-" + file.originalname;
        cb(null,unique)
    }
})

const fileFilter =(req,filter,cb)=>{
    if(file.mimetype.startsWith("image/")) cb(null,true)
    else cb(new Error("only images allowed"),false)    
}

export const upload =multer({storage,fileFilter})