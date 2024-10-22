import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { viewCandidateProfileDetailsApi } from "../../../axios/apiMethods/admin-service/candidates";
import CandidateProfile from "../../../components/admin/profile/CandidateProfile";
import { setLoaded, setLoading } from "../../../redux/slice/isLoading";
import { viewRecruiterProfileDetailsApi } from "../../../axios/apiMethods/admin-service/recruiters";
import RecruiterProfile from "../../../components/admin/profile/RecruiterProfile";

const ViewProfile: React.FC = () => {
    const dispatch = useDispatch();
    const { userId } = useParams();
    const urlPath = useLocation();

    const isCandidateUrl = urlPath.pathname.includes("candidate");

    const loadingStatus = useSelector((state: any) => state.loading.isLoading);

    const [profileData, setProfileData] = useState();

    useEffect(() => {
        const fetchProfileDetails = async () => {
            dispatch(setLoading());
            const candidate = isCandidateUrl
                ? await viewCandidateProfileDetailsApi(userId!)
                : await viewRecruiterProfileDetailsApi(userId!);
            setProfileData(candidate.data);

            dispatch(setLoaded());
        };

        fetchProfileDetails();
    }, [dispatch, userId]);

    if (loadingStatus) {
        return (
            <div className="h-screen w-screen flex justify-center items-center">
                <div className="text-4xl font-bold">Loading......</div>
            </div>
        );
    }

    return (
        <>
            {" "}
            {isCandidateUrl ? (
                <CandidateProfile data={profileData} />
            ) : (
                <RecruiterProfile data={profileData} />
            )}
        </>
    );
};

export default ViewProfile;
