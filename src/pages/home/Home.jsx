import Header from "../../comp/Header";
import Footer from "../../comp/Footer";
import Loading from "../../comp/Loading";
import { Helmet } from "react-helmet-async";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase/config";
import { Link } from "react-router-dom";
import { sendEmailVerification } from "firebase/auth";
import Error404 from "../Error404";
import { doc, setDoc } from "firebase/firestore";
import "../home/Home.css";
import { useState } from "react";
import HomeModal from "./modal";
import AllTasksSection from "./AllTasksSection";
import { useTranslation } from "react-i18next";
import Snackbar from "shared/Snackbar";

const Home = () => {
  const {  i18n } = useTranslation();
  const [user, loading, error] = useAuthState(auth);

  // ================================
  // Functions of Modal
  //================================
  const [showModal, setshowModal] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [showMassage, setshowMassage] = useState(false);
  const [taskTitle, setTitle] = useState("");
  const [array, setArray] = useState([]);
  const [subTask, setsubTask] = useState("");

  const closeModal = () => {
    setshowModal(false);
    setTitle("");
    setArray([""]);
  };

  const titileInput = (eo) => {
    setTitle(eo.target.value);
  };

  const detailsInput = (eo) => {
    setsubTask(eo.target.value);
  };
  const addBTN = (eo) => {
    eo.preventDefault();

    if (!array.includes(subTask)) {
      array.push(subTask);
    }

    console.log(array);
    setsubTask("");
  };

  const submitBTN = async (eo) => {
    eo.preventDefault();
    setShowLoading(true);
    const idTask = new Date().getTime();
    await setDoc(doc(db, user.uid, `${idTask}`), {
      title: taskTitle,
      details: array,
      id: idTask,
    });
    setShowLoading(false);
    setTitle("");
    setArray([]);
    setshowModal(false);

    setshowMassage(true);

    setTimeout(() => {
      setshowMassage(false);
    }, 4000);
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error404 />;
  }

  const sendAgain = () => {
    sendEmailVerification(auth.currentUser).then(() => {
      alert("Please check your email");
      // ...
    });
  };

  if (!user) {
    return (
      <>
        <Helmet>
          <title>HOME Page</title>
        </Helmet>

        <Header />

        <main>
          <p className="pls">
            Please{" "}
            <Link style={{ fontSize: "30px" }} to="/signin">
              sign in
            </Link>{" "}
            to continue...{" "}
            <span>
              <i className="fa-solid fa-heart"></i>
            </span>
          </p>
        </main>

        <Footer />
      </>
    );
  }

  if (user) {
    if (!user.emailVerified) {
      return (
        <>
          <Helmet>
            <title>HOME Page</title>
            <meta name="description" content="HOMEEEEEEEEEEEE" />
          </Helmet>

          <Header />

          <main>
            <p>
              {" "}
              Welcome: {user.displayName}{" "}
              <span>
                {" "}
                <i className="fa-solid fa-heart"></i>
              </span>
            </p>

            <p>Please verify your email to continue ✋ </p>
            <button
              onClick={() => {
                sendAgain();
              }}
              className="delete"
            >
              Send email
            </button>
          </main>

          <Footer />
        </>
      );
    }
  }
  if (user.emailVerified) {
    return (
      <>
        <Helmet>
          <title>HOME Page</title>
          <style type="text/css">{`.Light main h1 span{color: #222}   `}</style>
        </Helmet>

        <Header />

        <main className="home">
          {/* SHOW ALL DATA */}
          <AllTasksSection user={user} />

          {/* ADD NEW TASK BTN */}

          <section className="mt">
            <button
              dir="auto"
              onClick={() => {
                setshowModal(true);
              }}
              className="add-task-btn"
            >
              {i18n.language === "en" && "Add new task"}
              {i18n.language === "ar" && "أضف مهمة جديدة"}{" "}
              <i className="fa-solid fa-plus"></i>
            </button>
          </section>

          {showModal && (
            <HomeModal
              closeModal={closeModal}
              titileInput={titileInput}
              detailsInput={detailsInput}
              addBTN={addBTN}
              submitBTN={submitBTN}
              taskTitle={taskTitle}
              subTask={subTask}
              array={array}
              showLoading={showLoading}
            />
          )}
          <Snackbar showMassage={showMassage} />
        </main>

        <Footer  />
      </>
    );
  }
};

export default Home;
