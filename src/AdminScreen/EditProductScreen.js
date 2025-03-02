import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import React, {
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import MobileSidebar from "../Component/MobileSidebar";
import Sidebar from "../Component/Sidebar";
import { Store } from "../Store";
import { getError } from "../utils";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, product: action.payload };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "FETCH_UPDATE_REQUEST":
      return { ...state, updateLoading: true };
    case "FETCH_UPDATE_SUCCESS":
      return { ...state, updateLoading: false };
    case "FETCH_UPDATE_FALI":
      return { ...state, updateLoading: false };
    default:
      return state;
  }
};

function EditProductScreen() {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const params = useParams();
  const { id: productId } = params;
  const navigate = useNavigate();
  const editorRef = useRef(null);

  const [{ loading, error, updateProduct, updateLoading, product }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: "",
      updateProduct: [],
    });
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [chieldCategory, setChieldCategory] = useState([]);
  const [multipleImage, setMultipleImages] = useState([]);
  const [category, setCategory] = useState([]);
  const [viewCategory, setViewCategory] = useState("");
  const [viewImage, setViewImage] = useState([]);
  const [newImage, setNewImage] = useState(null);
  const [height, setHeight] = useState("");
  const [width, setWidth] = useState("");
  const [thickness, setThickness] = useState("");
  const [color, setColor] = useState("");
  const [productMaterials, setProductMaterials] = useState("");

  const handleMultipleImageChange = (e) => {
    const files = e.target.files;
    setMultipleImages([...multipleImage, ...files]);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewImage(file);
  };

  useEffect(() => {
    const fatchdata = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/productdetails/${productId}`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        setName(data.name);
        setImage(data.image);
        setDescription(data.description);
        setBrand(data.brand);
        setPrice(data.price);
        setCountInStock(data.countInStock);
        setViewCategory(data.category);
        setViewImage(data.multipleImage);
        dispatch({ type: "FETCH_SUCCESS" });
      } catch (error) {
        dispatch({ type: "FETCH_FAIL", payload: getError(error) });
      }
    };
    fatchdata();
  }, [userInfo, productId]);

  const handleUpdateData = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: "FETCH_UPDATE_REQUEST" });
      await axios.put(
        `/api/edit/${productId}`,
        {
          _id: productId,
          name,
          slug: name,
          price,
          description,
          image,
          countInStock,
          brand,
          newImage,
        },
        { headers: { authorization: `Bearer ${userInfo.token}` } }
      );
      dispatch({ type: "FETCH_UPDATE_SUCCESS" });
      alert("product update successfully");
      navigate("/productlist");
    } catch (error) {
      dispatch({ type: "FETCH_UPDATE_FALI", error: getError(error) });
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
      <div className="lg:ml-52 ml-2">
        <form
          onSubmit={handleUpdateData}
          method="post"
          encType="multipart/form-data"
          className="row g-3"
        >
          <div className="w-full min-h-screen p-4 bg-gray-100">
            <div className="flex justify-between border-b-2 pb-2">
              <div className="flex">
                <h1 className="text-2xl font-semibold">Edit Prodcut</h1>
              </div>
              <div>
                <button
                  type="submit"
                  class="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                >
                  Update Product
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
                    Category ID
                  </label>
                  <input
                    type="text"
                    className="p-2.5 rounded-lg border-2  w-full"
                    id="inputName"
                    value={viewCategory}
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
                    value={description}
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
                <div>
                  <label
                    htmlFor="countries_multiple"
                    className="block mb-2 text-sm font-semibold text-gray-900  w-full "
                  >
                    Brand Name
                  </label>
                  <input
                    type="text"
                    className="p-2.5 rounded-lg border-2  w-full"
                    id="brandname"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
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
                      {category.map((option) => {
                        if (option.parentId === "")
                          return (
                            <option key={option.value} value={option._id}>
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
                      {chieldCategory.map((option) => {
                        return (
                          <option key={option.value} value={option._id}>
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
                    {viewImage.map((images, index) => (
                      <div className="image" key={index}>
                        <img src={`/images/${images}`} alt={`${index + 1}`} />
                        <input type="file" onChange={handleImageChange} />
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div class="flex items-center justify-center w-full">
                    <label
                      for="dropzone-file"
                      class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                    >
                      <div class="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          />
                        </svg>
                        <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span class="font-semibold">Upload Image</span> or
                          drag and drop
                        </p>
                        <p class="text-xs text-gray-500 dark:text-gray-400">
                          SVG, PNG, JPG or GIF (MAX. 800x400px)
                        </p>
                      </div>
                      <input
                        id="dropzone-file"
                        type="file"
                        class="hidden"
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

export default EditProductScreen;
