import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useCallback } from "react";

const Component = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    const handleFetch = async () => {
      try {
        const response = await axios.get(
          "https://randomuser.me/api/?results=20",
          {
            signal: controller.signal,
          }
        );
        setData(response.data.results);
      } catch (error) {
        console.log(error);
      }
    };

    handleFetch();
    return () => {
      console.log("cancelando");
      controller.abort();
    };
  }, []);

  return (
    <>
      {data?.map((item) => (
        <div key={item.cell}>
          <p>{item.name.first}</p>
        </div>
      ))}
    </>
  );
};

const Fetch = () => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <>
      <h1>Fetch</h1>
      <button onClick={() => setIsVisible(!isVisible)}>click</button>
      {isVisible && <Component />}
    </>
  );
};

export default Fetch;
