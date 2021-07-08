import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAutheticated } from "../auth/helper";
import { getCategories, deleteCategory } from "./helper/adminapicall";

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);

  const { user, token } = isAutheticated();

  const preload = () => {
    //get all the categories from backend and display it
    getCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const deleteThisCategory = (categoryId) => {
    deleteCategory(categoryId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        preload();
      }
    });
  };

  return (
    <Base title="Welcome admin" description="Manage products here">
      <div className="container bg-light p-4">
        <h2 className="mb-4 text-dark">All categories:</h2>
        <Link className="btn btn-dark" to={`/admin/dashboard`}>
          <span className="">Admin Home</span>
        </Link>
        <div className="row">
          <div className="col-12">
            <h2 className="text-center text-dark my-3">Total 3 products</h2>
            {categories.map((category, index) => {
              return (
                <div>
                  <h3 className="text-success" key={index}>
                    {category.name}
                  </h3>
                  <div className="row text-center mb-2 ">
                    <div className="col-4">
                      <h3 className="text-dark text-left">Think again</h3>
                    </div>
                    <div className="col-4">
                      <button
                        onClick={() => {
                          deleteThisCategory(category._id);
                        }}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Base>
  );
};

export default ManageCategories;
