import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import axios from "axios";
import moment from "moment";
import "./Home.css";

const Home = () => {
  const [data, setData] = useState([]);

  const getUserData = async () => {
    const res = await axios.get("/getdata", {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.data.status === 201) {
      console.log("data get");
      setData(res.data.data);
    } else {
      console.log("error");
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <>
      <div className="card">
        {data.length > 0
          ? data.map((el, i) => {
              return (
                <>
                  <div className="cardd">
                    <div className="left">
                      <Card.Img
                        className="4"
                        src={`/uploads/${el.userimg}`}
                        style={{
                          width: "300px",
                          height: "370px",
                          textAlign: "center",
                          margin: "auto",
                        }}
                      />
                    </div>
                    <div className="right">
                      <div className="right1">
                        <div>
                          <h2> {el.username}</h2>
                        </div>
                        <div className="date">
                          {moment(el.date).format("DD-MM-YYYY")}
                        </div>
                      </div>
                      <div className="content">
                        <p>
                          {" "}
                          {el.usercontent} <a href="url">view more</a>{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="gap">
                    <br />
                    <br />
                    <br />
                  </div>
                </>
              );
            })
          : ""}
      </div>
    </>
  );
};

export default Home;


