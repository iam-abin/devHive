import React, { ReactNode } from "react";
import TopNavBar from "../../components/navBar/TopNavBar";
import Footer from "../../components/footer/Footer";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducer";

const CandidateLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
     // Dropdown menu items for candidate
     const currentUser = useSelector(
        (store: RootState) => store.userReducer.authData
    );


     const menus = [
        { title: "Jobs", to: "/candidate/all-jobs" },

        {
            title: "Applied Jobs",
            to: "/candidate/applied-jobs",
        },
        {
            title: "Profile",
            to: "/candidate/profile",
        },
        {
            title: "Premium",
            to: "/candidate/payment-plans",
        },
        { title: "Chat", to: `/candidate/chat/${currentUser.id}` },
        { title: "Reset Password", to: "/candidate/passwordResetMobile" },
    ];

    return (
        <div className="flex h-screen flex-col">
            <TopNavBar menus={menus} />
            <main className="pt-16">{children}</main>
            <Footer />
        </div>
    );
};

export default CandidateLayout;
