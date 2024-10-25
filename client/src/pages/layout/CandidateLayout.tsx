import React, { ReactNode } from "react";
import TopNavBar from "../../components/navBar/TopNavBar";
import Footer from "../../components/footer/Footer";

const CandidateLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <div className="flex h-screen flex-col">
            <TopNavBar />
            <main className="pt-16">{children}</main>
            <Footer />
        </div>
    );
};

export default CandidateLayout;
