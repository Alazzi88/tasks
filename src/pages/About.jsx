import Header from "../comp/Header";
import Footer from "../comp/Footer";
import Loading from "../comp/Loading";
import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";
import Error404 from "./Error404";

const About = () => {

  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && loading) {
      navigate("/");
    }



    if (user) {
      if (!user.emailVerified) {
        navigate("/");
      }
    }
  });

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error404 />;
  }

  if (!user.emailVerified) {
    navigate("/");
  }

  if (user) {
    if (user.emailVerified) {
      return (
        <>
          <Helmet>
            <title>About Page</title>
          </Helmet>
          <Header />
          <main>
            About Page
          </main>
          <Footer />
        </>
      );
    }
  }
};

export default About;


