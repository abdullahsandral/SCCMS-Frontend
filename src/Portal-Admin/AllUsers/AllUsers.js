import React, { useState, useEffect }  from 'react';

import Spinner from '../../Shared/Components/UI Element/Spinner';
import UserItem from './UserItem/UserItem';
import classes from './AllUsers.module.css';

const AllUsers = props =>
{
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect( ()=>
    {
       const getAllUsers = async () => 
       {
            try 
            {
                const response = await fetch('http://localhost:5000/api/shared/allusers');
                const data = await response.json();
                
                if(response.ok) 
                {setUsers(data);
                setLoading(false);}
                
                else    {setLoading(false); throw new Error(response)}
                
            } catch (error) { alert(error.message); setLoading(false);   }
       }; getAllUsers();
    },[]);


    return <>
        <div className={classes.allUsers}>
            <h3>All Users</h3>

            {loading && <div className={classes.loading}> <Spinner /> <h3>Loading Users...</h3> </div>}

            {!loading && users.length<=0 && <h3>No User Found</h3>   }
            
            {!loading && users.length>0 && <>
            <div className={classes.allUsersHeader}>
                <div>ID</div>
                <div>Name</div>
                <div>Contact Number</div>
                <div>Role</div>
            </div>
            
            <div className={classes.usersDetail}>
                <ul>
                    {users.map( user => 
                    <UserItem 
                    key={user.First_Name+user.Teacher_ID} 
                    id={user.Teacher_ID} 
                    name={user.First_Name} 
                    email={user.Contact_Number} 
                    //contact={user.Contact} 
                    role={user.Role}/>)}
                </ul>
            </div></>
            }
        </div>
    </>
}

export default AllUsers;