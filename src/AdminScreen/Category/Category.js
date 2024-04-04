import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MobileSidebar from "../../Component/MobileSidebar";
import Sidebar from "../../Component/Sidebar";
import { Store } from "../../Store";

function Category() {
  const navigate = useNavigate();
  const { state } = useContext(Store);
  const { userInfo } = state;
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    const fatchData = async () => {
      const category = await axios.get(`/api/admin/getcategory`, {
        headers: { authorization: `Bearer ${userInfo.token}` },
      });
      setCategoryList(category.data.categoryList);
    };
    fatchData();
  }, [userInfo.token]);

  return (
    <div>
      <div className="hidden lg:block">
        <Sidebar />
      </div>
      <div className="lg:hidden">
        <MobileSidebar />
      </div>

      <div  className="category lg:ml-96 ml-4">
        <Button
          variant="contained"
          color="success"
          onClick={() => {
            navigate(`/category/addcategory`);
          }}
        >
          Create Category
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            navigate(`/category/update_category`);
          }}
        >
          Update Category
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            navigate(`/category/category_image_add`);
          }}
        >
          Category Image Add
        </Button>
        <Button variant="outlined" startIcon={<DeleteIcon />}>
          Delete
        </Button>
        {categoryList.map((item, index) => {
          return (
            <ul key={index} style={{ color: "#336699" }}>
              <li>
                <h1 key={index}>{item.name}</h1>
              </li>

              {item.children.map((eleement, index) => {
                return (
                  <ul
                    style={{ marginLeft: "40px", color: "#cc6699" }}
                    key={index}
                  >
                    <li>
                      {" "}
                      <h2>{eleement.name}</h2>{" "}
                    </li>
                    {eleement.children.map((ele, index) => {
                      return (
                        <ul
                          style={{ marginLeft: "40px", color: "#00b3b3" }}
                          key={index}
                        >
                          <li>
                            <h3>{ele.name}</h3>
                          </li>
                        </ul>
                      );
                    })}
                  </ul>
                );
              })}
            </ul>
          );
        })}
      </div>
    </div>
  );
}

export default Category;
