import React, { useState, useEffect } from "react";
import { baseUrl } from "../utils";

//prepared but not ready to use yet, waiting for the updates on the back-end

export const useGetTag = () => {
  const [tags, setTags] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(async () => {
    try {
      setisLoading(true);
      const res = await axios.get(`${baseUrl}/tags`);
      const data = res.json();
      setTags(data);
      setisLoading(false);
    } catch (error) {
      setError(error);
      console.log(error);
    } finally {
      setisLoading(false);
    }
  }, []);

  return [tags, isLoading, error];
};
