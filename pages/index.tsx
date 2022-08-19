import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { supabase } from "../supabase/config";

const Home: NextPage = () => {
  const [events, setEvents] = useState<any>([]);

  const getEvents = async () => {
    try {
      const { data } = await supabase
        .from("events")
        .select("*, seasons(*, persons(*)))");

      console.log(data);
      setEvents(data);
    } catch (error) {
      setEvents([]);
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <div>
      <h1>Hola mundo</h1>
      <pre>{JSON.stringify(events, null, 4)}</pre>
    </div>
  );
};

export default Home;
