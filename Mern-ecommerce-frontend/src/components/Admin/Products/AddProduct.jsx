import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from 'react-select'
import makeAnimated from "react-select/animated"
import { createProductAction } from "../../../redux/slices/products/productSlices";
// import getCategoryAction from "../../../redux/slices/categories/categoriesSlices.js"
import ErrorMsg from "../../ErrorMsg/ErrorMsg";
import LoadingComp from "../../LoadingComp/LoadingComp";
import SuccessMsg from "../../SuccessMsg/SuccessMsg";
import { getCategoryAction } from "../../../redux/slices/categories/categoriesSlices";
import { getBrandsAction } from "../../../redux/slices/brands/brandSlices,js";
import { getColorsAction } from "../../../redux/slices/colors/colorSlices,js";

const animatedComponents = makeAnimated()

export default function AddProduct() {
  const dispatch = useDispatch();


  // -------------- State Management --------------
  const [sizeOptions, setSizeOptions] = useState([])
  const [colorOptions, setColorOptions] = useState([])
  // files
  const [files,setFiles] = useState([]);
  const [fileErrs,setFileErrs] = useState([])

  // file handleChange
  const fileHandleChange = (event) => {
    const newFiles =  Array.from(event.target.files)
    const newErrs = []
    setFiles(newFiles)
    newFiles.forEach(file => {
      if(file?.size > 1000000){
        newErrs.push(`${file?.name} is to large`)
      }

      if(!file?.type?.startsWith('image/')){
        newErrs.push(`${file?.name} is not image`)
      }
    })
    console.log(event)
    setFileErrs(newErrs)
  }
  
  // --------------- Sizes --------------- 
  const sizes = ["S","M","L","XL","XXL"]

  const handleSizeChange = (sizes ) => {
    setSizeOptions(sizes)
  }

  // Converted Sizes
  const sizeOptionsCoverted = sizes?.map(size => {
    return {
      value : size,
      label : size
    }
  })


  
  // ---------- Categories -------------
  useEffect(() => {
    dispatch(getCategoryAction());
  },[dispatch]);
  
  // ---------- Retrive the data from store  -------------
  const {categories} = useSelector((state) => 
    state?.categories?.categories
  );
    // const categorie = categories?.map((category) => {
    //   return {
    //     value : category?._id,
    //     label : category?.name
    //   }
    // })


    // -------------- Brands  -----------------
    useEffect(() => {
      dispatch(getBrandsAction());
    },[dispatch]);

    // ---------- Retrive the data from store  -------------
    const {brands:{brands}} = useSelector((state) => 
      state?.brands
    )
    

    /* ---------------METHOD 2 -----------------
    const {brands} = useSelector((state) => 
      state?.brands?.brands
    )
    console.log(brands);
    */

   // ---------- Colors  -----------------

   const handleColorChange = (color) => {
     setColorOptions(color)
   }
  //  Dispatch is to connect with redux
    useEffect(() => {
      dispatch(getColorsAction());
    },[dispatch]);

    // ---------- Retrive the data from store  -------------
    const {colors} = useSelector((state) => 
      state?.colors?.colors
    )
    

    // ----------- Converted Colors ------------------
    const colorCoverted = colors?.map(color => {
      return {
        value : color.name,
        label : color.name
      }
    })
    
  

  
  const {product,isAdded, loading,error} = useSelector(
    (state) => state?.product
  )

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    sizes: "",
    brand: "",
    colors: "",
    price: "",
    totalQty: ""
  });

  const handleOnchange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //   onSubmit
  const handleOnSubmit = e => {
    e.preventDefault();
    console.log(fileErrs)
    // dispatch
    dispatch(createProductAction({ 
      ...formData,
      files,
      colors : colorOptions?.map(color => color.label),
      sizes : sizeOptions?.map(size => size?.label)
     }));
    // console.log(formData);
  

  // reset form data
  setFormData({
    name: "",
    description: "",
    category: "",
    sizes: "",
    brand: "",
    colors: "",
    price: "",
    totalQty: ""
  })
  }

  return(
    <>
    {error && <ErrorMsg message={error?.message} /> }
    {fileErrs?.length > 0 && <ErrorMsg message="File to large or upload an image" /> }
    {isAdded && <SuccessMsg message="Product Added Successfully"/>}
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-6">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Create New Product
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          <p className="font-medium text-indigo-600 hover:text-indigo-500">
            Manage Product
          </p>
        </p>
        {/* {error && <ErrorMsg message={error?.message} /> } */}
      </div>
      
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form className="space-y-6" onSubmit={handleOnSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Product Name
            </label>
            <div className="mt-1">
              <input 
              name="name"
              value={formData?.name}
              onChange={handleOnchange}
              className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" 
              />
            </div>
          </div>

          {/* ---------- Size Options  --------------- */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Select Size
            </label>
            <Select 
            components={animatedComponents}
            isMulti
            name="sizes"
            options={sizeOptionsCoverted}
            className="basic-multi-select"
            classNamePrefix="select"
            isClearable={true}
            isLoading={false}
            isSearchable={true}
            closeMenuOnSelect={false}
            onChange={(item) => handleSizeChange(item)}
            />
          </div>

          {/* ------------- Category ---------------*/}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Select Category
            </label>
            {/* <Select 
            components={animatedComponents}
            name="category"
            className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 text-base focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none sm:text-sm border"
            value={categorie.find((opt) => opt.value === formData.category)}
            onChange={(selectedOption) => handleOnchange({ target: { name: "category", value: selectedOption.value } })}
            options={categorie}
            placeholder="---Select Category---"
            /> */}
            
            {/* -------- ALTERNATE USUAL METHOD ---------- */}
            <select
              name="category"
              value={formData.category}
              onChange={handleOnchange}
              className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 text-base focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none sm:text-sm border"
            >
              <option value="">---Select Category---</option>
              {categories?.map((category) => (
                <option key={category?._id} value={category?.name}>
                  {category.name}
                </option>
              ))}
            </select>

          </div>

          {/* ---------- Brands ---------- */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Select Brands
            </label>
            <select 
            name="brand"
            value={formData.brand}
            onChange={handleOnchange}
            className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 text-base focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none sm:text-sm border"
            >
              <option value="">--- Select Brands ---</option>
              {brands?.map((brand) => (
                <option key={brand?._id} value={brand?.name}>
                  {brand.name}
                </option>
              ))}
            </select>
          </div>


          {/* ----------- Colors ----------- */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Select Colors
            </label>
            <Select 
            components={animatedComponents}
            isMulti
            name="colors"
            options={colorCoverted}
            className="basic-multi-select"
            classNamePrefix="select"
            isClearable={true}
            isLoading={false}
            isSearchable={true}
            closeMenuOnSelect={false}
            onChange={(item) => handleColorChange(item)}
            />
           

          </div>

          {/* ----------- Images ----------- */}
          <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="cover-photo"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Upload Images
                </label>
                <div className="mt-1 sm:col-span-2 sm:mt-0">
                  <div className="flex max-w-lg justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                    <div className="space-y-1 text-center">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                        >
                          <span>Upload files</span>
                          <input
                            multiple
                            onChange={fileHandleChange}
                            type="file"
                          />
                        </label>
                      </div>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, GIF up to 1MB
                      </p>
                    </div>
                  </div>
                </div>
          </div>

          {/* ----------- Prices ----------- */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Price
            </label>
            <div className="mt-1">
              <input 
              name="price"
              value={formData.price}
              onChange={handleOnchange}
              type="number"
              className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>

               {/* ----------- Total Quantity ----------- */}
          <div>
                <label className="block text-sm font-medium text-gray-700">
                  Total Quantity
                </label>
                <div className="mt-1">
                  <input
                    name="totalQty"
                    value={formData.totalQty}
                    onChange={handleOnchange}
                    type="number"
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
               {/* ----------- Description ----------- */}
              < div>
                <label
                  htmlFor="comment"
                  className="block text-sm font-medium text-gray-700"
                >
                  Add Product Description
                </label>
                <div className="mt-1">
                  <textarea
                    rows={4}
                    name="description"
                    value={formData.description}
                    onChange={handleOnchange}
                    className="block w-full rounded-md border-gray-300 border shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>


              <div>
                {
                loading ?
                (<LoadingComp/>) : 
                (
                <button 
                disabled = {fileErrs?.length < 0}           
                type="submit"
                className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Add Product
              </button>
                )}
              </div>
            
                 
        </form>
      </div>
    </div>

    </div>
    
    </>
  )
}
