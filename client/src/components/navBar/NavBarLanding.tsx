import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../../redux/reducer";
import { ROLES } from "../../utils/constants";
import { hotToastMessage } from "../../utils/hotToastMessage";
import { checkUserRole } from "../../utils/checkRole";

function NavBarLanding() {
    const navigate = useNavigate();
    const currentUser: any = useSelector((store: RootState) => store.userReducer.authData);

    const {isCandidate, isRecruiter} = checkUserRole(currentUser) 

    const handleNavigation = (role: string) => {
        if (role === ROLES.RECRUITER && isCandidate) {
            hotToastMessage("Please log out of your Candidate account before signing in as a Recruiter.", "warn");
        } else if (role === ROLES.CANDIDATE && isRecruiter) {
            hotToastMessage("Please log out of your Recruiter account before signing in as a Candidate.", "warn");
        } else {
            navigate(`/${role}/signin`);
        }
    };

    return (
        <nav className="sticky top-0 z-50 navbar bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900">
            <div className="flex-1">
                <Link className="btn bg-transparent border-transparent text-white hover:text-black normal-case text-xl" to="/">
                    DevHive
                </Link>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1 mx-4 gap-4">
                    {!isRecruiter && (
                        <li className="bg-accent rounded-3xl hover:bg-yellow-600">
                            <span
                                role="button"
                                onClick={() => handleNavigation(ROLES.RECRUITER)}
                            >
                                Recruiter Signin
                            </span>
                        </li>
                    )}

                    {!isCandidate && (
                        <li className="bg-accent rounded-3xl hover:bg-yellow-600">
                            <span
                                role="button"
                                onClick={() => handleNavigation(ROLES.CANDIDATE)}
                            >
                                Candidate Signin
                            </span>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
}

export default NavBarLanding;
