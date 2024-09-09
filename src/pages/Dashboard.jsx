import { useEffect, useState } from "react";
import Tasks from "./Tasks";
import { isAuthenticated } from './../utils/authCheck';
import NotAuthenticatedPage from "./NotAuthenticatedPage";

const Dashboard = () => {
    const [AuthenticatedOrNot, SetAuthenticatedOrNot] = useState(false);

    useEffect(() => {
        SetAuthenticatedOrNot(isAuthenticated());
    }, []);
    
    
    return (
        <div className="h-screen">
            {
                AuthenticatedOrNot ? (
                    <Tasks />
                ) : (
                    <NotAuthenticatedPage></NotAuthenticatedPage>
                )
            }
        </div>
    );
};

export default Dashboard;