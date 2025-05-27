import React from "react";

export default function App() {
  const [status, setStatus] = React.useState({});

  React.useEffect(() => {
    async function getServerStatus() {
      const status = await fetch("/api/health/status");
      return setStatus(await status.json());
    }

    getServerStatus();
  }, []);

  return <h1 className="text-2xl">{JSON.stringify(status)}</h1>;
}
