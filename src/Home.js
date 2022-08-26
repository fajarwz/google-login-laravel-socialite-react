import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

export default function Home() {
  const [googleSignInUrl, setgoogleSignInUrl] = useState("");

  useEffect(() => {
    fetch("https://noobium.herokuapp.com/api/sign-in/google/get-url", {
      headers: new Headers({ accept: "application/json" }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Something went wrong!");
      })
      .then((data) => setgoogleSignInUrl(data.data.url))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Test</p>
        {googleSignInUrl && (
          <a
            className="App-link"
            href={googleSignInUrl}
            rel="noopener noreferrer"
          >
            Login with Google
          </a>
        )}
      </header>
    </div>
  );
}
