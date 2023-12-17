import Header from "../comp/Header";
import Footer from "../comp/Footer";
import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { deleteUser } from "firebase/auth";
import { auth } from "../firebase/config";
import Moment from "react-moment";
import Loading from "../comp/Loading";

const Profile = () => {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user && loading) {
      navigate("/");
    }
  });

  const DeleteBTN = () => {
    deleteUser(user)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        // An error ocurred
        // ...
      });
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div>
         <p>Error: {error.message}</p>
      </div>
    );
  }

  if (user) {
    if (!user.emailVerified) {
      navigate("/");
    }
  }

  if (user) {
    if (user.emailVerified) {
      return (
        <>
          <Helmet>
            <title>Profile</title>

            <style type="text/css">{` 
        main{
          flex-direction: column;
          align-items: flex-start;
  
    width: fit-content;
    margin: auto;
        }
        .delete{
          margin-top: 25px;
        background-color:  #dc3545;
        padding: 0.375rem 0.75rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: 0.25rem;
    border-color: #dc3545;
        }
        
        `}</style>
          </Helmet>
          <Header />

          <main>
            <h6>Email: {user.email}</h6>
            <h6>UserName: {user.displayName}</h6>

            <h6>
              Last Sign-in :{" "}
              <Moment fromNow date={user.metadata.lastSignInTime} />{" "}
            </h6>

            <h6>
              Account Created :{" "}
              <Moment fromNow date={user.metadata.creationTime}/>
            </h6>
            <button
              onClick={() => {
                DeleteBTN();
              }}
              className="delete"
            >
              Delete account
            </button>
          </main>
          <Footer />
        </>
      );
    }
  }
};

export default Profile;
