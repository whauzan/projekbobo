import React from "react";

import { auth } from "@/auth";

const OrderListPage = async () => {
  const session = await auth();

  return <div>OrderListPage | {JSON.stringify(session)}</div>;
};

export default OrderListPage;
