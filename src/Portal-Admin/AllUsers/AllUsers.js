import React, { useEffect }  from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Spinner from '../../Shared/Components/UI Element/Spinner';
import UserItem from './UserItem/UserItem';
import classes from './AllUsers.module.css';
import { getAllUsers } from '../../Actions/UsersActions';
import isEmpty from '../../Shared/Util/Validators/isEmpty';

const AllUsers = props =>
{
    const dispatch = useDispatch();
    const { users, users_loading } = useSelector( state => state.authentication);

    useEffect( ()=>
    {
      dispatch(getAllUsers());
    },[dispatch]);


    return <>
        <div className={classes.allUsers}>
            <h3>All Users</h3>

            {(users_loading || (!users_loading && users === null)) &&
                <div className={classes.loading}> 
                    <Spinner />
                    <h3>Loading Users...</h3>
                </div>
            }

            {!users_loading && isEmpty(users) && users !== null && <h3>No User Found</h3>   }
            
            {!users_loading && !isEmpty(users) && <>
            <div className={classes.allUsersHeader}>
                <div>ID</div>
                <div>Name</div>
                <div>User Name</div>
                <div>Role</div>
            </div>
            
            <div className={classes.usersDetail}>
                <ul>
                    {users.map( user => 
                    <UserItem 
                    key={user?.id} 
                    id={user?.id} 
                    name={user?.name} 
                    user_name={user.user_name} 
                    role={user.role}/>)}
                </ul>
            </div></>
            }
        </div>
    </>
}

export default AllUsers;