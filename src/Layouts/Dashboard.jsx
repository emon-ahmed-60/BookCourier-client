import React from "react";
import { Link, NavLink, Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import { CiDeliveryTruck } from "react-icons/ci";
import { FaBookReader, FaUserCircle, FaUsers } from "react-icons/fa";
import { MdOutlineFavorite, MdPayments } from "react-icons/md";
import { IoLibrary } from "react-icons/io5";
import { BiBookAdd } from "react-icons/bi";
import UseRole from "../Hooks/UseRole";
import { SiBookstack } from "react-icons/si";

const Dashboard = () => {
  const { role, isLoading } = UseRole();

  const currentRole = typeof role === "object" ? role?.role : role;

  return (
    <div>
      <div className="drawer lg:drawer-open mx-auto">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Navbar */}
          <nav className="navbar w-full bg-base-300">
            <label
              htmlFor="my-drawer-4"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                fill="none"
                stroke="currentColor"
                className="my-1.5 inline-block size-4"
              >
                <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                <path d="M9 4v16"></path>
                <path d="M14 10l2 2l-2 2"></path>
              </svg>
            </label>

            <div className="px-4 font-bold uppercase">
              Dashboard - {currentRole}
            </div>
          </nav>

          <div className="p-5">
            <Outlet></Outlet>
          </div>
        </div>

        <div className="drawer-side is-drawer-close:overflow-visible">
          <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
          <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
            <ul className="menu w-full grow p-4 space-y-2">
              <li>
                <Link
                  to="/"
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Homepage"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    fill="none"
                    stroke="currentColor"
                    className="my-1.5 inline-block size-4"
                  >
                    <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                    <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  </svg>
                  <span className="is-drawer-close:hidden">Homepage</span>
                </Link>
              </li>

              <div className="divider"></div>

              {isLoading ? (
                <div className="flex justify-center w-full py-4">
                  <span className="loading loading-spinner loading-md"></span>
                </div>
              ) : (
                <>
                  {currentRole === "user" && (
                    <>
                      <li>
                        <NavLink to="/dashboard/my-orders">
                          <CiDeliveryTruck size={20} />{" "}
                          <span className="is-drawer-close:hidden">
                            My Orders
                          </span>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/dashboard/my-wishlist">
                          <MdOutlineFavorite size={20} />{" "}
                          <span className="is-drawer-close:hidden">
                            My Wishlist
                          </span>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/dashboard/my-profile">
                          <FaUserCircle size={20} />{" "}
                          <span className="is-drawer-close:hidden">
                            My Profile
                          </span>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/dashboard/my-payments">
                          <MdPayments size={20} />{" "}
                          <span className="is-drawer-close:hidden">
                            My Payments
                          </span>
                        </NavLink>
                      </li>
                    </>
                  )}

                  {currentRole === "librarian" && (
                    <>
                      <li>
                        <NavLink to="/dashboard/add-book">
                          <BiBookAdd size={20} />{" "}
                          <span className="is-drawer-close:hidden">
                            Add Book
                          </span>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/dashboard/my-books">
                          <FaBookReader size={20} />{" "}
                          <span className="is-drawer-close:hidden">
                            My Books
                          </span>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/dashboard/manage-orders">
                          <CiDeliveryTruck size={20} />{" "}
                          <span className="is-drawer-close:hidden">
                            Manage Orders
                          </span>
                        </NavLink>
                      </li>
                    </>
                  )}

                  {currentRole === "admin" && (
                    <>
                      <li>
                        <NavLink to="/dashboard/approve-librarians">
                          <IoLibrary size={20} />{" "}
                          <span className="is-drawer-close:hidden">
                            All Librarians
                          </span>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/dashboard/all-users">
                          <FaUsers size={20} />{" "}
                          <span className="is-drawer-close:hidden">
                            All Users
                          </span>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/dashboard/manage-books">
                          <SiBookstack size={20} />{" "}
                          <span className="is-drawer-close:hidden">
                            Manage Books
                          </span>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/dashboard/admin-profile">
                          <FaUserCircle size={20} />{" "}
                          <span className="is-drawer-close:hidden">
                            My Profile
                          </span>
                        </NavLink>
                      </li>
                    </>
                  )}
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Dashboard;
