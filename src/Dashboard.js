import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState({});
  const [searchParams] = useSearchParams();

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = () => {
    fetch(`https://noobium.herokuapp.com/api/sign-in/google/callback?${searchParams}`, {
      headers: new Headers({ accept: "application/json" }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Something went wrong!");
      })
      .then((data) => {
        setLoading(false);
        setUserData(data);
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
        console.error(error);
      });
  };

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <div>
          <p>Error:</p>
          <code>{error.toString()}</code>
        </div>
      ) : (
        <div>
          <summary>Welcome {userData.data.user.name}</summary>
          <p>Here is your info: </p>
          <code>{JSON.stringify(userData, null, 2)}</code>
        </div>
      )}
    </>
  );
}
