import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Logo from '../../olx-logo.png'
import Header from '../Header/Header';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { FirebaseContext, AuthContext } from '../../store/Context';
import {collection, addDoc} from 'firebase/firestore'

const Create = () => {
  const history = useHistory()
  const { firestore } = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  // Function to upload image to Cloudinary
  const uploadToCloudinary = async (file) => {
    if (!file) {
      setErrorMessage('Please select an image.');
      return null;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'olx-clone');

    try {
      const response = await fetch('https://api.cloudinary.com/v1_1/dst1r978j/image/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }

      const data = await response.json();
      if (data.secure_url) {
        setUploadedImageUrl(data.secure_url);
        return data.secure_url;
      }
    } catch (err) {
      console.error(err);
      setErrorMessage(`Image upload failed. Please try again: ${err.message}`);
      return null;
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!image || !name || !category || !price) {
      alert('Please fill all fields and upload an image.');
      return;
    }

    try {
      // Upload image first
      const imageUrl = await uploadToCloudinary(image);
      if (!imageUrl) return;

      console.log('getting uploaded image url', imageUrl)
      // Save to Firebase Firestore
      await addDoc(collection(firestore, "products"), {
        name,
        category,
        price,
        imageUrl,
        userId: user.uid,
        createdAt: new Date().toDateString(),
      })

      alert('Product added successfully');
      setName('');
      setCategory('');
      setPrice('');
      setImage(null);
      setUploadedImageUrl(null);
      history.push('/')
    } catch (error) {
      console.error('Upload Error:', error);
      alert('Error saving product. Please try again.');
    }
  };

  return (
    <Fragment>
      <Header />
      <div className="centerDiv">
        <div className='olx_logo'>
        <img width="200px" height="200px" src={Logo} alt='olx-logo'></img>
        </div>
        <label htmlFor="name">Name</label>
        <input
          className="input"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          id="name"
          name="Name"
        />
        <br/>
        <label htmlFor="category">Category</label>
        <input
          className="input"
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          id="category"
          name="Category"
        />
        <br/>

        <label htmlFor="price">Price</label>
        <input
          className="input"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          id="price"
          name="Price"
        />
        <br/>
        <br/>
        <div>
        {image && <img alt="Uploaded" width="200px" height="200px" src={URL.createObjectURL(image)} />}
        </div>
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        <br/>

        <button onClick={handleSubmit} className="uploadBtn">
          Upload and Submit
        </button>

        {errorMessage && <p className="error">{errorMessage}</p>}
      </div>
    </Fragment>
  );
};

export default Create;
