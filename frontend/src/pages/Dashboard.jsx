import { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import DashEmployee from "../components/DashEmployee";
import DashHome from "../components/DashHome";
import DashWork from "../components/DashWork";
import Header from "../components/Header";
import AddWork from "../components/AddWork";
import EditWork from "../components/EditWork";
import AutoLogout from "../components/AutoLogout";
import AddProduct from "../components/AddProduct";
import CreateEmployee from "../components/CreateEmployee";
import ProductList from "../components/ProductList";
import AddCategory from "../components/AddCategory";
import AddSubCategory from "../components/AddSubCategory";
import OrderList from "../components/OrderList";
import ReturnOrder from "../components/ReturnOrder";

const Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="w-1/6">
        <Sidebar />
      </div>
      <div className="w-full bg-[#f9f9fa]">
        <Header />
        {tab === "home" && <DashHome />}
        {tab === "employee" && <DashEmployee />}
        {tab === "work" && <DashWork/>} 
        {tab === "editwork" && <EditWork />}
        {tab === "createemployee" && <CreateEmployee />}
        {tab === "addproduct" && <AddProduct />}
        {tab === "productlist" && <ProductList />}
        {tab === "addcategory" && <AddCategory />}
        {tab === "addsubcategory" && <AddSubCategory />}
        {tab === "orderlist" && <OrderList />}
        {tab === "returnorder" && <ReturnOrder />}
      </div>
    </div>
  );
};

export default Dashboard;
