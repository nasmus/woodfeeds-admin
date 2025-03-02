import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import MobileSidebar from "../Component/MobileSidebar";
import Sidebar from "../Component/Sidebar";
import { Store } from "../Store";

function ProdcutUpload() {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [chieldCategory, setChieldCategory] = useState([]);
  const [chieldCategoryId, setChieldCategoryId] = useState("");
  const [brand, setBrand] = useState();
  const [description, setDescription] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [multipleImage, setMultipleImages] = useState([]);
  const [submitCategory, setSubmitCategory] = useState("");
  const [height, setHeight] = useState('');
  const [width, setWidth] = useState('');
  const [thickness, setThickness] = useState('');
  const [color, setColor] = useState('');
  const [productMaterials, setProductMaterials] = useState('')

  const editorRef = useRef(null);

  const handleMultipleImageChange = (e) => {
    const files = e.target.files;
    setMultipleImages([...multipleImage, ...files]);
  };

  useEffect(() => {
    const fatchData = async () => {
      const category = await axios.get(`/api/seller/category/getcategory`, {
        headers: { authorization: `Bearer ${userInfo.token}` },
      });
      setCategory(category.data);
    };
    fatchData();
  }, [userInfo.token]);

  useEffect(() => {
    const fatchData = async () => {
      try {
        const category = await axios.get(
          `/api/seller/category/chield_category/${categoryId}`,
          {
            headers: { authorization: `Bearer ${userInfo.token}` },
          }
        );
        setChieldCategory(category.data);
      } catch {
        setChieldCategory(null);
      }
    };
    fatchData();
  }, [userInfo.token, categoryId]);

  useEffect(() => {
    setSubmitCategory(categoryId);
  }, [categoryId]);

  useEffect(() => {
    setSubmitCategory(chieldCategoryId);
  }, [chieldCategoryId]);

  
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("name", name);
    form.append("description", description);
    form.append("price", price);
    form.append("brand", brand);
    form.append("category", submitCategory);
    form.append("countInStock", countInStock);
    form.append("height", height);
    form.append("width", width);
    form.append("thickness", thickness);
    form.append("color", color);
    form.append("productMaterials", productMaterials);
    
    if (multipleImage) {
      multipleImage.forEach((image, index) => {
        form.append("multipleImage", image);
      });
    } else {
      console.log("problem");
    }

    try {
      const upload = await axios.post(`/api/product/create`, form, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      const response = await axios.post(`https://server.woodfeeds.com:443/api/image/upload`, form);
      //const response = await axios.post(`http://localhost:4000/api/image/upload`, form)
      alert("product upload successfully");
      console.log(response.data)
      
      setName("");
      setPrice("");
      setCategory('');
      setCategoryId('')
      setChieldCategory('')
      setChieldCategoryId('')
      setBrand('')
      setDescription('')
      setCountInStock('')
      setMultipleImages('')
      setSubmitCategory('')
      setHeight('')
      setWidth('')
      setThickness('');
      setColor('')
      setProductMaterials('')



      
    } catch (error) {
      alert(error);
    }
  };


  return (
    <div>
      <div className="hidden lg:block">
        <Sidebar />
      </div>
      <div className="lg:hidden">
        <MobileSidebar />
      </div>
      <div className="lg:pl-52">
        <form
          onSubmit={handleSubmit}
          method="post"
          encType="multipart/form-data"
          className="row g-3"
        >
          <div className="w-full min-h-screen p-4 bg-gray-100">
            <div className="flex justify-between border-b-2 pb-2">
              <div className="flex">
                <h1 className="text-2xl font-semibold">Product Upload</h1>
              </div>
              <div>
                <button
                  type="submit"
                  className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                >
                  Upload Product
                </button>
              </div>
            </div>

            <div className="md:flex">
              <section className="bg-slate-50 p-2 m-2 md:w-2/3">
                <h3 className="my-3 text-lg font-semibold">
                  Basic Information
                </h3>
                <div>
                  <label
                    htmlFor="countries_multiple"
                    className="block mb-2 text-sm font-semibold text-gray-900  w-full "
                  >
                    Product Name
                  </label>
                  <input
                    type="text"
                    className="p-2.5 rounded-lg border-2  w-full"
                    id="inputName"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div>
                  <label
                    htmlFor="countries_multiple"
                    className="block mb-2 text-sm font-semibold text-gray-900  w-full "
                  >
                    Product Model
                  </label>
                  <input
                    type="text"
                    className="p-2.5 rounded-lg border-2  w-full"
                    id="brandname"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                  />
                </div>
                {/* TinyMCE Section */}
                <div className="py-4">
                  <label
                    htmlFor="countries_multiple"
                    className="block mb-2 text-sm font-semibold text-gray-900  w-full "
                  >
                    Description
                  </label>
                  <Editor
                    onInit={(evt, editor) => (editorRef.current = editor)}
                    onEditorChange={(des, edt) => {
                      setDescription(des);
                    }}
                    apiKey="fgipol2b63zlyibdodysp7um2z1in5jqmf1ghtbv0z03orz1"
                    init={{
                      height: 400,
                      menubar: false,
                      plugins: [
                        "advlist autolink lists link image charmap print preview anchor",
                        "searchreplace visualblocks code fullscreen",
                        "insertdatetime media table paste code help wordcount",
                      ],
                      toolbar:
                        "undo redo | formatselect | " +
                        "bold italic backcolor | alignleft aligncenter " +
                        "alignright alignjustify | bullist numlist outdent indent | " +
                        "removeformat | help",
                      content_style:
                        "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                    }}
                  />
                </div>
                <div className="flex justify-between py-4">
                  <div>
                    <label
                      htmlFor="countries_multiple"
                      className="block mb-2 text-sm font-semibold text-gray-900  w-full "
                    >
                      Category
                    </label>
                    <select
                      id="countries_multiple"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-48 p-4 md:w-60"
                      value={categoryId}
                      onChange={(e) => setCategoryId(e.target.value)}
                    >
                      <option>Select Category</option>
                      {category &&
                        category.map((option, index) => {
                          if (option.parentId === "")
                            return (
                              <option key={index} value={option._id}>
                                {option.name}
                              </option>
                            );
                        })}
                    </select>
                  </div>
                  <div className="pl-16 md:pl-10">
                    <label
                      htmlFor="countries_multiple"
                      className="block mb-2 text-sm font-semibold text-gray-900  w-full "
                    >
                      Sub Category
                    </label>
                    <select
                      id="countries_multiple"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-48 p-4 md:w-60"
                      value={categoryId}
                      onChange={(e) => setCategoryId(e.target.value)}
                    >
                      <option>Select Sub Category</option>
                      {chieldCategory &&
                        chieldCategory.map((option, index) => {
                          return (
                            <option key={index} value={option._id}>
                              {option.name}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                </div>
                <div className="flex justify-between ">
                  <div>
                    <label
                      htmlFor="countries_multiple"
                      className="block mb-2 text-sm font-semibold text-gray-900  w-full "
                    >
                      Price
                    </label>
                    <input
                      type="number"
                      className="p-2.5 mb-2 rounded-lg w-full border-2 md:w-60"
                      id="price1"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                  <div className="pl-16 md:pl-40">
                    <label
                      htmlFor="countries_multiple"
                      className="block mb-2 text-sm font-semibold text-gray-900  w-full "
                    >
                      Quantity
                    </label>
                    <input
                      type="number"
                      className="p-2.5 mb-2 rounded-lg w-full border-2 md:w-60"
                      value={countInStock}
                      onChange={(e) => setCountInStock(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-2">
                  <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      for="grid-city"
                    >
                      Height
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-city"
                      type="text"
                      value={height}
                      placeholder="Height"
                      onChange={(e) => setHeight(e.target.value)}
                    />
                  </div>
                  <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      for="grid-city"
                    >
                      Width
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-city"
                      type="text"
                      value={width}
                      placeholder="Width"
                      onChange={(e) => setWidth(e.target.value)}
                    />
                  </div>
                  <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      for="grid-zip"
                    >
                      Thickness
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-zip"
                      type="text"
                      value={thickness}
                      placeholder="Product Thickness"
                      onChange={(e) => setThickness(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex justify-between ">
                  <div>
                    <label
                      htmlFor="countries_multiple"
                      className="block mb-2 text-sm font-semibold text-gray-900  w-full "
                    >
                      Color
                    </label>
                    <input
                      type="text"
                      className="p-2.5 mb-2 rounded-lg w-full border-2 md:w-60"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                    />
                  </div>
                  <div className="pl-16 md:pl-40">
                    <label
                      htmlFor="countries_multiple"
                      className="block mb-2 text-sm font-semibold text-gray-900  w-full "
                    >
                      product Materials
                    </label>
                    <input
                      type="text"
                      className="p-2.5 mb-2 rounded-lg w-full border-2 md:w-60"
                      value={productMaterials}
                      onChange={(e) => setProductMaterials(e.target.value)}
                    />
                  </div>
                </div>
              </section>
              <section className="bg-slate-50 p-2 m-1 md:w-1/3">
                <h3 className="my-3 text-lg font-semibold">Image Upload</h3>
                <div>
                  <div className="image_grid">
                    {multipleImage &&
                      multipleImage.map((images, index) => (
                        <div key={index} className="image">
                          <img
                            className="max-h-80 w-full object-scale-down"
                            src={URL.createObjectURL(images)}
                            alt=""
                          />
                        </div>
                      ))}
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="dropzone-file"
                      className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Upload Image</span> or
                          drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          SVG, PNG, JPG or GIF (MAX. 800x400px)
                        </p>
                      </div>
                      <input
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                        accept="image/*"
                        name="multipleImage"
                        multiple
                        onChange={handleMultipleImageChange}
                      />
                    </label>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProdcutUpload;
