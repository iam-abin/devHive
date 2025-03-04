import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { notify } from "../../utils/toastMessage";
import {
    blockUnblockCandidateApi,
    getAllCandidatesApi,
} from "../../axios/apiMethods/admin-service/candidates";
import {
    blockUnblockRecruiterApi,
    getAllRecruitersApi,
} from "../../axios/apiMethods/admin-service/recruiters";

import { searchApi } from "../../axios/apiMethods/admin-service/search";

import { IResponse } from "../../types/api";
import { IUserData } from "../../types/user";
import { swal } from "../../utils/swal";
import Table from "../../components/table/Table";
import { ROLES, SEARCH_RESOURCE_TYPES } from "../../utils/constants";
import SearchBar from "../../components/filterSearch/SearchBar";

function UsersListPage() {
    const navigate = useNavigate();
    const [usersData, setUsersData] = useState<IUserData[]>([]);
    const [numberOfPages, setNumberOfPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchKey, setSearchKey] = useState("");

    const locationUrl = useLocation();
    const isCandidateUrl: boolean = locationUrl.pathname.includes(
        ROLES.CANDIDATE
    );

    const USERS_PER_PAGE: number = 2;

    const fetchUsers = async (currentPage: number) => {
        let usersData: IResponse | [] = [];
        if (isCandidateUrl) {
            if (!searchKey) {
                usersData = await getAllCandidatesApi(
                    currentPage,
                    USERS_PER_PAGE
                );
                setUsersData(usersData.data.candidates);
            } else {                
                usersData = await searchApi(
                    searchKey,
                    SEARCH_RESOURCE_TYPES.CANDIDATE,
                    currentPage,
                    USERS_PER_PAGE
                );
                setUsersData(usersData.data.result);
            }
            
        } else {
            if (!searchKey) {
                usersData = await getAllRecruitersApi(
                    currentPage,
                    USERS_PER_PAGE
                );
                setUsersData(usersData.data.recruiters);
            } else {
                usersData = await searchApi(
                    searchKey,
                    SEARCH_RESOURCE_TYPES.RECRUITER,
                    currentPage,
                    USERS_PER_PAGE
                );
                setUsersData(usersData.data.result);
            }
        }

        if (usersData) {
            setNumberOfPages(usersData.data.numberOfPages);
        }
    };

    useEffect(() => {
        setSearchKey("");
    }, [locationUrl]);


    // Reset to page 1 when starting a new search
    useEffect(() => {
        setCurrentPage(1);
    }, [searchKey]);

    useEffect(() => {
        fetchUsers(1); // Fetch initial data for the first page
    }, [locationUrl, searchKey, currentPage]);

    const viewProfileDetails = async (userId: string) => {
        if (isCandidateUrl) {
            navigate(`/admin/candidate/viewProfileDetails/${userId}`);
        } else {
            navigate(`/admin/recruiter/viewProfileDetails/${userId}`);
        }
    };

    const handleBlockUnblock = async (userId: string, isActive: boolean) => {
        swal(
            `Do you want to ${isActive ? "block" : "unblock"} this ${
                isCandidateUrl ? "Candidate" : "Recruiter"
            }?`,
            `Yes, ${isActive ? "block" : "unblock"}`
        ).then(async (result) => {
            if (result.isConfirmed) {
                let updatedUser: IResponse | null = null;
                if (isCandidateUrl) {
                    updatedUser = await blockUnblockCandidateApi(userId);
                } else {
                    updatedUser = await blockUnblockRecruiterApi(userId);
                }

                if (updatedUser) {
                    notify(updatedUser.message, "success");

                    const users = usersData.map((user) => {
                        if (user.id === userId) {
                            return {
                                ...user,
                                isActive: updatedUser?.data.isActive,
                            };
                        }

                        return user;
                    });

                    setUsersData(users);
                }
            }
        });
    };

    const columns = [
        { Header: "Name", accessor: "name" },
        { Header: "Email", accessor: "email" },
        { Header: "Phone", accessor: "phone" },
        {
            Header: "View",
            button: (row: { id: string }) => (
                <button
                    onClick={() => {
                        viewProfileDetails(row.id);
                    }}
                    className="btn btn-info btn-sm w-24"
                >
                    view details
                </button>
            ),
        },
        {
            Header: "Status",
            button: (row: { isActive: string }) => (
                <div
                    className={`badge ${
                        row.isActive
                            ? "badge badge-success gap-2 w-20"
                            : "badge badge-error gap-2 w-20"
                    } `}
                >
                    {row.isActive ? "active" : "inActive"}
                </div>
            ),
        },
        {
            Header: "Action",
            button: (row: { id: string; isActive: boolean }) => (
                <button
                    onClick={() => {
                        handleBlockUnblock(row.id, row.isActive);
                    }}
                    className={`btn ${
                        row.isActive
                            ? "btn-success btn-sm w-24 bg-green-600"
                            : "btn btn-error btn-sm w-24 bg-red-600"
                    } `}
                >
                    {row.isActive ? "Block" : "unBlock"}
                </button>
            ),
        },
    ];

    return (
        <div className="text-center mx-10">
            <h1 className="font-semibold text-5xl mt-4 mb-10">
                {isCandidateUrl
                    ? "Candidates Management"
                    : " Recruiters Management"}
            </h1>
            <div className="flex flex-row justify-end my-2">
                <SearchBar placeholder={"search with name"} onSearch={setSearchKey} />
            </div>
            <Table
                columns={columns}
                data={usersData}
                numberOfPages={numberOfPages}
                fetchData={fetchUsers}
            />
        </div>
    );
}

export default UsersListPage;
