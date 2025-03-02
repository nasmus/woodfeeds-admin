import React, { useContext, useEffect, useReducer, useRef, useState } from 'react';
import Sidebar from '../Component/Sidebar';

import axios from "axios";
import { useParams } from "react-router-dom";
import { useReactToPrint } from 'react-to-print';
import MobileSidebar from '../Component/MobileSidebar';
import { Store } from '../Store';
import { getError } from "../utils";

const reducer = (state, action) => {
    switch (action.type) {
      case "FETCH_REQUEST":
        return { ...state, loading: true };
      case "FETCH_SUCCESS":
        return { ...state, loading: false, orderDetail: action.payload };
      case "FETCH_FAIL":
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
};
  


function OrderDetails() {

    const { state } = useContext(Store);
  const { userInfo } = state;
  const params = useParams();
  const { id: orderId } = params;
  const [orderStatus, setOrderStatus] = useState("");
  const [{ eorro, loading, orderDetail }, dispatch] = useReducer(reducer, {
    error: "",
    loading: true,
    orderDetail: [],
  });

  const printRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
 
  });



  useEffect(() => {
    const fatchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const { data } = await axios.get(`/api/order/orderdetails/${orderId}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (error) {
        dispatch({ type: "FETCH_FAIL", payload: getError(error) });
      }
    };
    fatchData();
  }, [userInfo, orderId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `/api/order/status/${orderId}`,
        {
          orderStatus,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fatchDataApi = async () => {};
    fatchDataApi();
  }, [orderId, userInfo.token]);

  return (
    <div>
      <div className="hidden lg:block">
        <Sidebar />
      </div>
      <div className="lg:hidden">
        <MobileSidebar />
      </div>
      <div className="lg:pl-52 ml-2">
        <div className="flex items-center justify-between px-5 py-5">
          <h1 className="text-4xl text-center text-cyan-500 font-bold">
            Order Details
          </h1>
          <div className="flex md:flex-col lg:w-1/5">
            <form
              className="flex flex-col items-center"
              onSubmit={handleSubmit}
            >
              <select
                name="rderStatus"
                id="status"
                value={orderStatus}
                onChange={(e) => setOrderStatus(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full md:px-6 p-2 "
              >
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Received">Received</option>
              </select>
              <button className="bg-cyan-500 w-full hover:bg-cyan-600 p-2 ml-2 md:ml-0 md:px-6 md:my-1.5 text-white rounded-lg">
                Submit
              </button>
            </form>
          </div>
        </div>

        <div className="pt-14 px-5 flex justify-between  text-slate-500">
          <div className="flex">
            <div className="">
              <h5 className="text-black font-semibold me-5">Bill to:</h5>
            </div>
            <div>
              <p>
                {orderDetail.shippingAddress &&
                  orderDetail.shippingAddress.fullName}
              </p>
              <p>
                {orderDetail.shippingAddress &&
                  orderDetail.shippingAddress.address}
              </p>
              <p>
                <span>City: </span>
                {orderDetail.shippingAddress &&
                  orderDetail.shippingAddress.city}
              </p>
              <p>
                {orderDetail.shippingAddress &&
                  orderDetail.shippingAddress.phoneNumber}
              </p>
            </div>
          </div>
          <div className="flex ">
            <div className="text-black font-semibold me-5">Date:</div>
            <div>
              {orderDetail.updatedAt && orderDetail.updatedAt.slice(0, 10)}
            </div>
          </div>
        </div>
        <div className=" px-5 py-5 w-full ">
          <section className=" md:px-6 text-black">
            <div className="relative overflow-x-auto py-3 md:py-6">
              <table className="w-full text-sm text-left rtl:text-right text-black font-medium">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Product
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Order ID
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Quantity
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Status
                    </th>
                  </tr>
                </thead>
                {orderDetail.orderItems &&
                  orderDetail.orderItems.map((item, index) => {
                    return (
                      <tbody key={index}>
                        <tr className="bg-white border-b ">
                          <th
                            scope="row"
                            className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                          >
                            <img
                              src={`${process.env.REACT_APP_IMAGE_URL}/images/${item.image}`}
                              alt=""
                              className="w-8 h-8"
                            />
                            <span className="pl-2">{item.name}</span>
                          </th>
                          <td className="px-6 py-4">{item._id}</td>
                          <td className="px-6 py-4 ">
                            <span>{item.quantity}</span>
                          </td>
                          <td className="px-6 py-4">
                            {item.price * item.quantity}
                          </td>
                          <td className="px-6 py-4">
                            <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                              {item.orderStatus}
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    );
                  })}
              </table>
            </div>
          </section>
        </div>
        <div ref={printRef} className="hidden print:block mx-28 text-black">
          <h2 className="text-6xl pt-10 text-black font-semibold text-center">
            woodfeeds.com
          </h2>
          <div className="flex pt-10 justify-between">
            <h1 className=" text-4xl font-extralight">INVOICE</h1>
            <div className="text-slate-500">
              <p>Kazipur, Sirajganj, 6710</p>
              <p> Mob:01655555555 </p>
            </div>
          </div>
          <div className="pt-14 flex justify-between  text-slate-500">
            <div className="flex">
              <div className="">
                <h5 className="text-black font-semibold me-5">Bill to:</h5>
              </div>
              <div>
                <p>
                  {orderDetail.shippingAddress &&
                    orderDetail.shippingAddress.fullName}
                </p>
                <p>
                  {orderDetail.shippingAddress &&
                    orderDetail.shippingAddress.address}
                </p>
                <p>
                  <span>City: </span>
                  {orderDetail.shippingAddress &&
                    orderDetail.shippingAddress.city}
                </p>
                <p>
                  {orderDetail.shippingAddress &&
                    orderDetail.shippingAddress.phoneNumber}
                </p>
              </div>
            </div>
            <div className="flex ">
              <div className="text-black font-semibold me-5">Date:</div>
              <div>
                {orderDetail.updatedAt && orderDetail.updatedAt.slice(0, 10)}
              </div>
            </div>
          </div>

          <div className="relative  sm:rounded-lg mt-14">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-3 py-1">
                    Item
                  </th>
                  <th scope="col" className="px-3 py-1">
                    Description
                  </th>
                  <th scope="col" className="px-3 py-1">
                    Qty
                  </th>
                  <th scope="col" className="px-3 py-1">
                    Unit Price
                  </th>
                  <th scope="col" className="px-3 py-1">
                    Amount
                  </th>
                </tr>
              </thead>
              {orderDetail.orderItems &&
                orderDetail.orderItems.map((item, index) => {
                  return (
                    <tbody key={index}>
                      <tr className="bg-white border-b ">
                        <td className="p-3">
                          <img
                            src={`${process.env.REACT_APP_IMAGE_URL}/images/${item.image}`}
                            alt=""
                            className="w-8 h-8"
                          />
                        </td>
                        <th
                          scope="row"
                          className="p-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {item.name.slice(0, 50)}
                        </th>
                        <td className="p-3">{item.quantity}</td>
                        <td className="p-3">৳{item.price}</td>
                        <td className="p-3">৳{item.price * item.quantity}</td>
                      </tr>
                    </tbody>
                  );
                })}
            </table>
            <h4 className="text-2xl font-semibold  float-right me-6">
              Subtotal : ৳125
            </h4>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <button
            onClick={handlePrint}
            className=" bg-cyan-500 w-1/4 transition-colors hover:bg-cyan-600 p-2 ml-2 md:ml-0 md:px-6 md:my-2 text-white rounded-lg"
          >
            Generate Invoice
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderDetails