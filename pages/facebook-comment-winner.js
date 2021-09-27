import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Input, Button } from "antd";
import { useState } from "react";
import $ from "cheerio";
const { TextArea } = Input;
export default function Home() {
  const [state, setState] = useState({
    html: "",
    winners: [],
  });

  const onClick = () => {
    const html = $.load(state.html);
    console.log(html);
    let arr = [];

    html("li").each((i, ele) => {
      const current = $.load(ele);
      let username = current("span.pq6dq46d > span").first().text();
      username = username.replace(
        /                                                                                /gim,
        ""
      );

      username = username.replace(/\n/gim, "").replace(/^\s*$/gim, "");

      let gif = current("img[alt=GIF]").attr("src");

      if (username) {
        const f = arr.find((i) => i.name === username.trim());
        if (!f) {
          arr.push({
            name: username.trim(),
            gif,
          });
        }
      }
    });
    console.log(arr);

    let maxwinners = 5;
    let currentwinners = 0;

    let finalwinners = [];
    while (currentwinners != maxwinners) {
      currentwinners++;
      finalwinners.push(arr[[Math.floor(Math.random() * arr.length)]]);
    }

    setState({
      ...state,
      winners: finalwinners,
    });
  };
  return (
    <div
      style={{
        width: "800px",
        margin: "auto",
      }}
    >
      <h1>Facebook Comment Winner</h1>
      <h2>Enter the html of the comments area then you get 5 winners</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div style={{ width: "70%" }}>
          {/* issues with oneline html  */}
          <TextArea
            onChange={(e) => setState({ ...state, html: e.target.value })}
            rows={10}
            placeholder="Enter html here"
          />
        </div>
        <div style={{ width: "25%" }}>
          <Button block type="primary" onClick={onClick}>
            Get a winner
          </Button>
        </div>
      </div>

      <div>
        <h1>Winners</h1>

        {state.winners?.map((i) => (
          <div>
            <h1 style={{ color: "red" }}>{i.name}</h1>
            <div>
              <img src={i.gif} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
