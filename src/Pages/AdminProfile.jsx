import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../Hooks/UseAuth';
import { toast } from 'react-toastify';

const AdminProfile = () => {
    const { register, handleSubmit } = useForm();
  const {user, setLoading, updateUser, loading } = useAuth();
  const updateProfile = (data) => {
    updateUser(data)
      .then(() => {
        toast.success("user profile updated");
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err.code);
        setLoading(false);
      });
  };
  const lastLoginTime = Number(user?.reloadUserInfo.lastLoginAt);
  if(loading){
    return <div className="text-center"><span className="loading loading-dots loading-xl"></span></div>;
  }
    return (
        <>
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl mx-auto my-8">
        <div className="flex items-center gap-5 flex-col my-8">
          <img
            src={user?.photoURL}
            alt="profile photo"
            className="w-24 rounded-full border-4 border-primary"
          />
          <div className="pl-4">
            <h2 className="font-bold text-xl lg:text-2xl text-base-content">
              Name : {user?.displayName}
            </h2>
            <h2 className="font-bold text-xl lg:text-2xl text-base-content">
              Email : {user?.email}
            </h2>
            <h2 className="font-bold text-xl lg:text-2xl text-base-content">
              Last login : {new Date(lastLoginTime).toLocaleDateString()}
            </h2>
          </div>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit(updateProfile)}>
            <fieldset className="fieldset">
              <label className="label">Change Name</label>
              <input
                type="text"
                className="input"
                placeholder="change Name"
                {...register("displayName")}
                defaultValue={user?.displayName}
              />
              <label className="label">Change Photo URL</label>
              <input
                type="text"
                className="input"
                placeholder="change Photo URL"
                {...register("photoURL")}
                defaultValue={user?.photoURL}
              />

              <button className="btn btn-neutral mt-4">Save Changes</button>
            </fieldset>
          </form>
        </div>
      </div>
    </>
    );
};

export default AdminProfile;