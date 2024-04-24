import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import './styles.scss';
import { checkUserIsAdmin } from "../../Utlis";
import { useSelector } from "react-redux/es/hooks/useSelector";

const mapState = ({ user }) => ({
    currentUser: user.currentUser
})

const AdminToolbar = props => {
    const { currentUser } = useSelector(mapState);

    const isAdmin = checkUserIsAdmin(currentUser);
    if (!isAdmin) {
        return null;
        
    }

    return (
        <div className="adminToolbar">
            <ul>
                <li>
                    <Link to="/admin">
                        Admin Panel
                    </Link>
                </li>
            </ul>

        </div>
    );
}
export default AdminToolbar;