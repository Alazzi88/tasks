import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy, query, where } from "firebase/firestore";
import { db } from "../../firebase/config";
import ReactLoading from "react-loading";
import Moment from "react-moment";
import { useTranslation } from 'react-i18next';

const AllTasksSection = ({ user }) => {
  const {  i18n } = useTranslation();
  const allTasks = query(collection(db, user.uid), orderBy("id"));
  const completedTasks = query(
    collection(db, user.uid),
    where("completed", "==", true)
  );
  const notCompleted = query(
    collection(db, user.uid),
    where("completed", "==", false)
  );

  const [initialData, setinitialData] = useState(
    query(collection(db, user.uid), orderBy("id"))
  );

  const [value, loading, error] = useCollection(initialData);

  const [isFullOpacity, setisFullOpacity] = useState(false);

  const [selectValue, setSelectValue] = useState("All");

  if (error) {
    return <h1>ERROR</h1>;
  }

  if (loading) {
    return (
      <main>
        <section className="mttt">
          <ReactLoading type={"spin"} color={"white"} height={77} width={77} />
        </section>
      </main>
    );
  }

  if (value) {


    return (
      <div>
        {/* OPTIONS (FILTRED DATA) */}

        <section
          style={{ justifyContent: "center" }}
          className="parent-of-btns flex mt"
        >
          <button dir="auto"
            style={{ opacity: isFullOpacity ? "1" : "0.3" }}
            onClick={(params) => {
              setisFullOpacity(true);
              setinitialData(
                query(collection(db, user.uid), orderBy("id", "desc"))
              );
            }}
          >
          

                {i18n.language === "en" && "Newest first"}
                {i18n.language === "ar" && "الأحدث أولاً"}




          </button>

          <button
            style={{ opacity: isFullOpacity ? "0.3" : "1" }}
            onClick={(params) => {
              setisFullOpacity(false);
              setinitialData(
                query(collection(db, user.uid), orderBy("id", "asc"))
              );
            }}
          >
               {i18n.language === "en" && "Oldest first"}
                {i18n.language === "ar" && "الأقدم أولاً"}
          </button>

          <select
          style={{alignSelf:"flexEnd"}}
            value={selectValue}
            onChange={(eo) => {
              if (eo.target.value === "All") {
                setisFullOpacity( false)
                setinitialData(allTasks);
              } else if (eo.target.value === "comp") {
                setSelectValue("comp");
                setinitialData(completedTasks);
              } else if (eo.target.value === "notCopm") {
                setSelectValue("notComp");
                setinitialData(notCompleted);
              }
            }}
            id="browsers"
          >
            <option value="All">  {i18n.language === "ar" && "جميع المهام"}
              {i18n.language === "en" && "All Tasks "}</option>
            <option value="comp">  {i18n.language === "ar" && "المهام المكتملة"}
              {i18n.language === "en" && "Completed Tasks"} </option>
            <option value="notCopm">  {i18n.language === "en" && "Not Completed Tasks"}
              {i18n.language === "ar" && "المهام غير المكتملة"} </option>
          </select>
        </section>
        <section className="flex all-tasks mt">
          {value.docs.map((item) => {
            return (
              <article key={item.data().id} className="one-task">
                <Link className="task-link" to={`/edit-task/${item.data().id}`}>
                  <h2> {item.data().title} </h2>
                  <ul>
                    {item.data().details.map((item, index) => {
                      if (index < 2) {
                        return <li key={item}> {item} </li>;
                      } else {
                        return false;
                      }
                    })}
                  </ul>

                  <p className="time">
                    <Moment fromNow date={item.data().id} />
                  </p>
                </Link>
              </article>
            );
          })}
        </section>
      </div>
    );
  }
};

export default AllTasksSection;
