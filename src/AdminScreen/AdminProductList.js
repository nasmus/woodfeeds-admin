import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MobileSidebar from "../Component/MobileSidebar";
import Sidebar from "../Component/Sidebar";
import "../Css/SellerDashboard.css";
import { Store } from "../Store";

function AdminProductList() {
  const navigate = useNavigate();
  const { state } = useContext(Store);
  const { userInfo } = state;
  const [allProduct, setAllProduct] = useState([]);
  const params = useParams();
  const { id: productId } = params;
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);

  useEffect(() => {
    const fatchDate = async () => {
      const productList = await axios.get(`/api/admin/productlist/allproduct`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      setAllProduct(productList.data);
    };
    fatchDate();
  }, [userInfo.token]);

  
    const handleDelete = async (id) => {
      const response = await axios.delete(`/api/delete/${id}`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }); 
      if (response.status === 201) {
        alert('Product delete successfully!');
      } else {
        alert('Failed to delete product');
      }
    }

  

  // Calculate the indexes for the products to be displayed on the current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = allProduct.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="hidden lg:block">
        <Sidebar />
      </div>
      <div className="lg:hidden">
        <MobileSidebar />
      </div>
      <div>
        <div className=" lg:ml-52 ml-2 relative overflow-x-auto shadow-md sm:rounded-lg">
          <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
            <div>
              <button
                id="dropdownRadioButton"
                data-dropdown-toggle="dropdownRadio"
                className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                type="button"
              >
                <svg
                  className="w-3 h-3 text-gray-500 dark:text-gray-400 me-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z" />
                </svg>
                Last 30 days
                <svg
                  className="w-2.5 h-2.5 ms-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              {/* <!-- Dropdown menu --> */}
              <div
                id="dropdownRadio"
                className=" dropwown z-10 hidden w-48 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
                data-popper-reference-hidden=""
                data-popper-escaped=""
                data-popper-placement="top"
              >
                <ul
                  className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownRadioButton"
                >
                  <li>
                    <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                      <input
                        id="filter-radio-example-1"
                        type="radio"
                        value=""
                        name="filter-radio"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        htmlFor="filter-radio-example-1"
                        className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                      >
                        Last day
                      </label>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                      <input
                        defaultChecked
                        id="filter-radio-example-2"
                        type="radio"
                        value=""
                        name="filter-radio"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        htmlFor="filter-radio-example-2"
                        className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                      >
                        Last 7 days
                      </label>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                      <input
                        id="filter-radio-example-3"
                        type="radio"
                        value=""
                        name="filter-radio"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        htmlFor="filter-radio-example-3"
                        className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                      >
                        Last 30 days
                      </label>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                      <input
                        id="filter-radio-example-4"
                        type="radio"
                        value=""
                        name="filter-radio"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        htmlFor="filter-radio-example-4"
                        className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                      >
                        Last month
                      </label>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                      <input
                        id="filter-radio-example-5"
                        type="radio"
                        value=""
                        name="filter-radio"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        htmlFor="filter-radio-example-5"
                        className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                      >
                        Last year
                      </label>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <label htmlFor="table-search" className="sr-only">
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <input
                type="text"
                id="table-search"
                className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search for items"
              />
            </div>
          </div>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th>Image</th>
                <th scope="col" className="px-6 py-3">
                  Product name
                </th>
                <th scope="col" className="px-6 py-3">
                  Id
                </th>
                <th scope="col" className="px-6 py-3">
                  SUK
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Product Stock
                </th>
                <th scope="col" className="px-6 py-3">
                  rating
                </th>
                <th scope="col" className="px-6 py-3">
                  review
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.map((item, index) => {
                return (
                  <tr
                    key={index}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <th>
                      <img
                        className=" p-1 h-12 "
                        src={`${process.env.REACT_APP_IMAGE_URL}/images/${item.image}`}
                        alt=""
                      />
                    </th>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {item.name}
                    </th>
                    <td className="px-6 py-4">{item._id}</td>
                    <td className="px-6 py-4">Laptop</td>
                    <td className="px-6 py-4">{item.price}</td>
                    <td className="px-6 py-4">{item.countInStock}</td>
                    <td className="px-6 py-4">{item.rating}</td>
                    <td className="px-6 py-4">{item.numReviews}</td>
                    <td className="px-6 py-4 flex">
                      <button
                        type="button"
                        className="me-2 p-1.5 text-xs font-medium text-center text-white bg-gradient-to-r rounded-lg from-cyan-400 via-cyan-500 to-cyan-600 focus:ring-4 focus:outline-none focus:ring-blue-300 "
                        variant="contained"
                        color="success"
                        onClick={() => {
                          navigate(`/productdetails/${item._id}`);
                        }}
                      >
                        <ModeEditIcon />
                      </button>
                      <button
                        type="button"
                        className=" p-1.5 text-xs font-medium text-center text-white rounded-lg bg-red-500 focus:ring-4 focus:outline-none focus:ring-blue-300 "
                        variant="contained"
                        color="success"
                        onClick={() => handleDelete(item._id)}
                      >
                        <DeleteIcon />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {/* Pagination */}
          <div className="flex justify-center items-center pt-4">
            {Array.from({
              length: Math.ceil(allProduct.length / productsPerPage),
            }).map((_, index) => (
              <button
                className="px-3 mr-1 py-2 text-xs font-medium text-center text-white bg-cyan-500 rounded-lg hover:bg-cyan-700  focus:outline-none focus:ring-blue-300 "
                key={index}
                onClick={() => paginate(index + 1)}
              >
                <b>{index + 1}</b>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminProductList;
