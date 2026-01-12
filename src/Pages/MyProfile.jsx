// import React from "react";
// import { toast } from "react-toastify";
// import { useForm } from "react-hook-form";
// import useAuth from "../Hooks/UseAuth";

// const MyProfile = () => {
//   const { register, handleSubmit } = useForm();
//   const { user, setLoading, updateUser } = useAuth();
//   const updateProfile = (data) => {
//     updateUser(data)
//       .then(() => {
//         toast.success("user profile updated");
//         setLoading(false);
//       })
//       .catch((err) => {
//         toast.error(err.code);
//         setLoading(false);
//       });
//   };
//   const lastLoginTime = Number(user?.reloadUserInfo.lastLoginAt);

//   return (
//     <>
//       <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl mx-auto my-8">
//         <div className="flex items-center gap-5 flex-col my-8">
//           <img
//             src={user?.photoURL}
//             alt="profile photo"
//             className="w-24 rounded-full border-4 border-primary"
//           />
//           <div className="pl-4">
//             <h2 className="font-bold text-xl lg:text-2xl text-base-content">
//               Name : {user?.displayName}
//             </h2>
//             <h2 className="font-bold text-xl lg:text-2xl text-base-content">
//               Email : {user?.email}
//             </h2>
//             <h2 className="font-bold text-xl lg:text-2xl text-base-content">
//               Last login : {new Date(lastLoginTime).toLocaleDateString()}
//             </h2>
//           </div>
//         </div>
//         <div className="card-body">
//           <form onSubmit={handleSubmit(updateProfile)}>
//             <fieldset className="fieldset">
//               <label className="label">Change Name</label>
//               <input
//                 type="text"
//                 className="input"
//                 placeholder="change Name"
//                 {...register("displayName")}
//                 defaultValue={user?.displayName}
//               />
//               <label className="label">Change Photo URL</label>
//               <input
//                 type="text"
//                 className="input"
//                 placeholder="change Photo URL"
//                 {...register("photoURL")}
//                 defaultValue={user?.photoURL}
//               />

//               <button className="btn btn-neutral mt-4">Save Changes</button>
//             </fieldset>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

// export default MyProfile;
import useAuth from "../Hooks/useAuth";
import { toast } from "react-toastify";
import React, { useState } from "react";
import { Camera, Mail, Calendar, User, Save, Edit2 } from "lucide-react";
import { FaUserCircle } from "react-icons/fa";
import UseRole from "../Hooks/UseRole";

const ProfilePage = () => {
  const { role } = UseRole();
  const { user, setLoading, updateUser, theme } = useAuth();
  const lastLoginTime = Number(user?.reloadUserInfo.lastLoginAt);
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(user?.displayName);
  const [newPhoto, setNewPhoto] = useState(user?.photoURL);
  
  const currentRole = typeof role === "object" ? role?.role : role;
  const handleUpdate = () => {
    const newObj = { displayName: newName, photoURL: newPhoto };

    updateUser(newObj)
      .then(() => {
        toast.success("user profile updated");
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err.code);
        setLoading(false);
      });
    setIsEditing(false);
  };

  return (
    <div
      className={`min-h-screen ${
        theme === "light" ? "bg-slate-50" : "bg-slate-900"
      } transition-colors duration-300 py-12 px-4 sm:px-6 lg:px-8`}
    >
      <div className="max-w-3xl mx-auto">
        <div
          className={`shadow-xl rounded-2xl overflow-hidden border ${
            theme === "light"
              ? "border-slate-200 bg-white"
              : "border-slate-700 bg-slate-800"
          }`}
        >
          <div className="h-32 bg-gradient-to-r from-primary to-indigo-600"></div>

          <div className="relative px-6 pb-8">
            <div className="relative -top-12 flex items-end">
              <div className="relative group">
                {user?.photoURL ? (
                  <img
                    className={`h-32 w-32 rounded-2xl border-4 ${
                      theme === "light" ? "border-white" : "border-slate-800"
                    } object-cover shadow-md`}
                    src={user?.photoURL}
                    alt="User Profile"
                  />
                ) : (
                  <FaUserCircle
                    className={`h-32 w-32 rounded-2xl border-4 ${
                      theme === "light" ? "border-white" : "border-slate-800"
                    } object-cover shadow-md`}
                  />
                )}

                {isEditing && (
                  <div className="absolute inset-0 bg-black/40 rounded-2xl flex items-center justify-center cursor-pointer group-hover:bg-black/50 transition-all">
                    <Camera className="text-white w-8 h-8" />
                  </div>
                )}
              </div>
              <div className="mb-2 ml-4">
                <h1
                  className={`text-2xl font-bold ${
                    theme === "light" ? "text-slate-900" : "text-white"
                  }`}
                >
                  {user?.displayName}
                </h1>
                <span
                  className={`text-sm font-medium ${
                    theme === "light" ? "text-blue-600 " : "text-blue-400"
                  }`}
                >
                  BookCouriar {currentRole}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
              <div className="space-y-1">
                <label
                  className={`text-xs font-semibold ${
                    theme === "light" ? "text-slate-500" : "text-slate-400"
                  } uppercase tracking-wider flex items-center gap-2`}
                >
                  <User size={14} /> Full Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    className={`w-full px-4 py-2 rounded-lg border-none focus:ring-2 focus:ring-blue-500 ${
                      theme === "light"
                        ? "text-slate-900 bg-slate-100"
                        : "text-white bg-slate-700"
                    }`}
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                  />
                ) : (
                  <p
                    className={`text-lg font-medium ${
                      theme === "light" ? "text-slate-700" : "text-slate-200"
                    }`}
                  >
                    {user?.displayName}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <label
                  className={`text-xs font-semibold ${
                    theme === "light" ? "text-slate-500" : "text-slate-400"
                  } uppercase tracking-wider flex items-center gap-2`}
                >
                  <Mail size={14} /> Email Address
                </label>
                <p
                  className={`text-lg font-medium ${
                    theme === "light" ? "text-slate-700" : "text-slate-200"
                  }`}
                >
                  {user?.email}
                </p>
              </div>

              <div className="space-y-1">
                <label
                  className={`text-xs font-semibold ${
                    theme === "light" ? "text-slate-500" : "text-slate-400"
                  } uppercase tracking-wider flex items-center gap-2`}
                >
                  <Calendar size={14} /> Last Login
                </label>
                <p
                  className={`text-lg font-medium ${
                    theme === "light" ? "text-slate-700" : "text-slate-200"
                  }`}
                >
                  {new Date(lastLoginTime).toLocaleDateString()}
                </p>
              </div>

              {isEditing && (
                <div className="space-y-1">
                  <label
                    className={`text-xs font-semibold ${
                      theme === "light" ? "text-slate-500" : "text-slate-400"
                    } uppercase tracking-wider flex items-center gap-2`}
                  >
                    <Camera size={14} /> Photo URL
                  </label>
                  <input
                    type="text"
                    className={`w-full px-4 py-2 rounded-lg border-none focus:ring-2 focus:ring-blue-500 ${
                      theme === "light"
                        ? "bg-slate-100 text-slate-900 "
                        : "bg-slate-700 text-white"
                    }`}
                    value={newPhoto}
                    onChange={(e) => setNewPhoto(e.target.value)}
                  />
                </div>
              )}
            </div>

            <div className="mt-10 flex justify-end gap-3">
              {isEditing ? (
                <>
                  <button
                    onClick={() => setIsEditing(false)}
                    className={`px-6 py-2 rounded-lg ${
                      theme === "light"
                        ? "text-slate-600 hover:bg-slate-100"
                        : "text-slate-300 hover:bg-slate-700"
                    } transition-colors`}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdate}
                    className="flex items-center gap-2 px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all shadow-lg shadow-blue-500/30"
                  >
                    <Save size={18} /> Save Changes
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className={`flex items-center gap-2 px-6 py-2 rounded-lg border-2 ${
                    theme === "light"
                      ? "border-slate-200 text-slate-700 hover:bg-slate-50"
                      : "border-slate-700 text-slate-200 hover:bg-slate-700"
                  } font-semibold transition-all`}
                >
                  <Edit2 size={18} /> Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-slate-500">
            Need help with your account?{" "}
            <span className="text-blue-600 cursor-pointer">
              Contact Support
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;