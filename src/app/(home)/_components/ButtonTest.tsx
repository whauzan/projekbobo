"use client";

import React from "react";

import { Button } from "@/components/ui/Button";

const ButtonTest = () => {
  const fetchTest = async () => {
    const res = await fetch("api/test", { method: "GET" });
    console.log(res);
    const data = await res.json();
    console.log(data);
  };

  return <Button onClick={fetchTest}>Test</Button>;
};

export default ButtonTest;
