const express = require('express');
const router = express.Router(); // importing express router
const checkAuth = require('../middleware/check-auth');
const ProductController = require('../controllers/products')

// Multer set-up for file upload
const multer = require('multer');

const storage = multer.diskStorage({ // executed everytime a new file is received
  destination: (req, file, cb) => {  // function that defines where the incoming file should be store. cb = callback
    cb(null, './uploads/')
  },
  filename: (req, file, cb) => { // function that defines the file name
    cb(null, new Date().toISOString() + file.originalname)
  }
})

const fileFilter = (req, file, cb) => { // To only accept certain file types
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true) // will store a file
  } else {
    cb(null, false) // ignores a file, does not store it
  }
}

const upload = multer({
  storage: storage,
  limits: { // where multer will store uploaded files
    fileSize: 1024 * 1024 * 5 // max-size: 5mb
  },
  fileFilter: fileFilter
})


// ALL
router.get('/', ProductController.products_get_all)

// CREATE
router.post('/', checkAuth, upload.single('productImage'), ProductController.products_create_product)

// GET ONE
router.get('/:productId', ProductController.products_get_one )

// PATCH (update)
router.patch('/:productId', checkAuth, ProductController.products_update_one)

// DELETE
router.delete('/:productId', checkAuth, ProductController.products_delete_one)

module.exports = router;

