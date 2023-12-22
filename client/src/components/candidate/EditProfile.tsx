import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducer/reducer";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { candidateGetProfileApi, updateCandidateProfileApi } from "../../axios/api/profile/candidate";
import { notify } from "../../utils/toastMessage";

interface ProfileFormData {
  name: string;
  email: string;
  phone: number;
  isActive: boolean;
  gender: string;
  currentLocation: string;
  address: string;
  keySkills: string[];
  profile_image: string;
  about: string;
  resume: string;
  experience: string;
  userId: string;
}

function EditProfile() {
  const [profileDetails, setProfileDetails] = useState<any>(null);
  const navigate = useNavigate();
  const candidateData = useSelector(
    (state: RootState) => state.candidateData.candidate
  );
  const { id } = candidateData;

  useEffect(() => {
    const fetchProfileDetails = async () => {
      try {
        const profile = await candidateGetProfileApi(id);
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

  const handleSubmit = async (profileData: ProfileFormData) => {
    try {
      const data = await updateCandidateProfileApi(profileData);

      if (data.data) {
        notify("Profile updated successfully", "success");
        navigate("/candidate/profile");
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
    isActive: profileDetails?.isActive ?? false,
    gender: profileDetails?.gender ?? "",
    currentLocation: profileDetails?.currentLocation ?? "",
    address: profileDetails?.address ?? "",
    keySkills: profileDetails?.keySkills ?? [],
    profile_image: profileDetails?.profile_image ?? "",
    about: profileDetails?.about ?? "",
    resume: profileDetails?.resume ?? "",
    experience: profileDetails?.experience ?? "",
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


              {/* Gender field (radio button) */}
              <div className="form-control w-6/6">
                <label className="label">Gender</label>
                <div className="flex items-center space-x-4 mt-2">
                  <label className="radio-label">
                    <Field
                      type="radio"
                      name="gender"
                      value="male"
                      className="radio-input"
                    />
                    Male
                  </label>
                  <label className="radio-label">
                    <Field
                      type="radio"
                      name="gender"
                      value="female"
                      className="radio-input"
                    />
                    Female
                  </label>
                </div>
                <ErrorMessage
                  name="gender"
                  component="div"
                  className="error label-text-alt"
                />
              </div>

              {/* currentLocation field */}
              <div className="form-control w-6/6">
                <label htmlFor="currentLocation" className="label">
                  Current Location
                </label>
                <Field
                  type="text"
                  id="currentLocation"
                  name="currentLocation"
                  className={`input input-primary w-full rounded-xl ${
                    errors.currentLocation && touched.currentLocation
                      ? "input-error"
                      : ""
                  }`}
                />
                <ErrorMessage
                  name="currentLocation"
                  component="div"
                  className="error label-text-alt"
                />
              </div>

              {/* address field */}
              <div className="form-control w-6/6">
                <label htmlFor="address" className="label">
                  Address
                </label>
                <Field
                  type="text"
                  id="address"
                  name="address"
                  className={`input input-primary w-full rounded-xl ${
                    errors.address && touched.address ? "input-error" : ""
                  }`}
                />
                <ErrorMessage
                  name="address"
                  component="div"
                  className="error label-text-alt"
                />
              </div>

              {/* keySkills field */}
              <div className="form-control w-6/6">
                <label htmlFor="keySkills" className="label">
                  Key Skills (comma-separated)
                </label>
                <Field
                  type="text"
                  id="keySkills"
                  name="keySkills"
                  className={`input input-primary w-full rounded-xl ${
                    errors.keySkills && touched.keySkills ? "input-error" : ""
                  }`}
                />
                <ErrorMessage
                  name="keySkills"
                  component="div"
                  className="error label-text-alt"
                />
              </div>

              {/* profile_image field */}
              <div className="form-control w-6/6">
                <label htmlFor="profile_image" className="label">
                  Profile Image URL
                </label>
                <Field
                  type="text"
                  id="profile_image"
                  name="profile_image"
                  className={`input input-primary w-full rounded-xl ${
                    errors.profile_image && touched.profile_image
                      ? "input-error"
                      : ""
                  }`}
                />
                <ErrorMessage
                  name="profile_image"
                  component="div"
                  className="error label-text-alt"
                />
              </div>

              {/* about field */}
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

              {/* resume field */}
              <div className="form-control w-6/6">
                <label htmlFor="resume" className="label">
                  Resume
                </label>
                <Field
                  type="text"
                  id="resume"
                  name="resume"
                  className={`input input-primary w-full rounded-xl ${
                    errors.resume && touched.resume ? "input-error" : ""
                  }`}
                />
                <ErrorMessage
                  name="resume"
                  component="div"
                  className="error label-text-alt"
                />
              </div>

              {/* experience field */}
              <div className="form-control w-6/6">
                <label htmlFor="experience" className="label">
                  Experience
                </label>
                <Field
                  type="text"
                  id="experience"
                  name="experience"
                  className={`input input-primary w-full rounded-xl ${
                    errors.experience && touched.experience
                      ? "input-error"
                      : ""
                  }`}
                />
                <ErrorMessage
                  name="experience"
                  component="div"
                  className="error label-text-alt"
                />
              </div>

              <div className="flex items-center justify-center mt-3 mb-3">
                <button type="submit" className="btn w-60 btn-primary">
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
