
import { useEffect, useState } from "react";
// import { getAJobApi, updateJobApi } from "../../api/axios/jobs/jobs";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducer/reducer";

import { ErrorMessage, Field, Form, Formik } from "formik";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { recruiterGetProfileApi, updateRecruiterProfileApi } from "../../api/axios/profile/recruiter";

interface ProfileFormData {
  name: string;
  email: string;
  phone: number;
  isVerified: boolean;
  isActive: boolean;
  gender?: string;
  company_id?: string;
  profile_image?: string;
  about?: string;
  userId: string;
}

function EditProfile() {
  const [profileDetails, setProfileDetails] = useState<any>(null);
  const navigate = useNavigate();
  const recruiterData = useSelector(
		(state: RootState) => state.recruiterData.recruiter
	);
  const {id} = recruiterData

  useEffect(() => {
    const fetchProfileDetails = async () => {
      try {
        const profile = await recruiterGetProfileApi(id);
        setProfileDetails(profile.data.data);
        console.log("edit profile data is ", profile.data.data);
        
      } catch (error) {
        console.error("Error fetching profile details:", error);
      }
    };

    fetchProfileDetails();
  }, [id]);

  if (!profileDetails) {
    return <div>Loading...</div>;
  }

  const notify = (msg: string, type: string) => {
    type === "error"
      ? toast.error(msg, {
          position: toast.POSITION.TOP_RIGHT,
        })
      : toast.success(msg, {
          position: toast.POSITION.TOP_RIGHT,
        });
  };

  const handleSubmit = async (profileData: ProfileFormData) => {
    try {
      const data = await updateRecruiterProfileApi(profileData);

      if (data.data) {
        notify("Profile updated successfully", "success");
        navigate("/dashboard");
      } else {
        notify("Profile not updated", "error");
      }
    } catch (error: any) {
      notify(error.response.data.errors[0].message, "error");
    }
  };

  const initialProfileValues: ProfileFormData = {
    name: profileDetails?.name ?? "",
    email: profileDetails?.email ?? "",
    phone: profileDetails?.phone ?? 0,
    isVerified: profileDetails?.isVerified ?? false,
    isActive: profileDetails?.isActive ?? false,
    gender: profileDetails?.gender ?? "",
    company_id: profileDetails?.company_id ?? "",
    profile_image: profileDetails?.profile_image ?? "",
    about: profileDetails?.about ?? "",
    userId: profileDetails?.userId ?? "",
  };

  return (
    <Formik
      initialValues={initialProfileValues}
      onSubmit={(values) => {
        handleSubmit(values);
      }}
    >
      {(formik) => {
        const { errors, touched } = formik;
        return (
          <div className="w-6/12 p-6">
            <div className="mb-16">
              <h1 className="text-center text-5xl font-bold">Edit Profile</h1>
              <div className="w-16 h-1 bg-black mx-auto my-4"></div>
            </div>

            <Form noValidate className="bg-slate-300 p-6">
              {/* Name field */}
              <div className="form-control w-6/6">
                <label htmlFor="name" className="label">
                  Name
                </label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  className={`input input-primary w-full rounded-xl ${
                    errors.name && touched.name ? "input-error" : ""
                  }`}
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="error label-text-alt"
                />
              </div>

              {/* Email field */}
              <div className="form-control w-6/6">
                <label htmlFor="email" className="label">
                  Email
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className={`input input-primary w-full rounded-xl ${
                    errors.email && touched.email ? "input-error" : ""
                  }`}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="error label-text-alt"
                />
              </div>

              {/* Phone field */}
              <div className="form-control w-6/6">
                <label htmlFor="phone" className="label">
                  Phone
                </label>
                <Field
                  type="tel"
                  id="phone"
                  name="phone"
                  className={`input input-primary w-full rounded-xl ${
                    errors.phone && touched.phone ? "input-error" : ""
                  }`}
                />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="error label-text-alt"
                />
              </div>

              {/* Gender field */}
              <div className="form-control w-6/6">
                <label htmlFor="gender" className="label">
                  Gender
                </label>
                <Field
                  type="text"
                  id="gender"
                  name="gender"
                  className={`input input-primary w-full rounded-xl ${
                    errors.gender && touched.gender ? "input-error" : ""
                  }`}
                />
                <ErrorMessage
                  name="gender"
                  component="div"
                  className="error label-text-alt"
                />
              </div>

              {/* About field */}
              <div className="form-control w-6/6">
                <label htmlFor="about" className="label">
                  About
                </label>
                <Field
                  as="textarea"
                  id="about"
                  name="about"
                  className={`input input-primary w-full rounded-xl ${
                    errors.about && touched.about ? "input-error" : ""
                  }`}
                />
                <ErrorMessage
                  name="about"
                  component="div"
                  className="error label-text-alt"
                />
              </div>

              <div className="flex items-center justify-center mt-3 mb-3">
                <button
                  type="submit"
                  className="btn w-60 btn-primary"
                >
                  Update Profile
                </button>
              </div>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
}

export default EditProfile;

